// ==UserScript==
// @name         Khamsat Notification Manager
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Manage custom notifications for Khamsat
// @author       Your name
// @match        https://khamsat.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// ==/UserScript==

(function() {
    'use strict';

    class NotificationManager {
        constructor(githubRepo) {
            this.githubRepo = githubRepo;
            this.notifications = GM_getValue('customNotifications', []);
            this.lastUpdate = GM_getValue('lastUpdate', 0);
            this.initializeEventBus();
        }

        initializeEventBus() {
            window.customNotificationBus = {
                getNotifications: () => this.getActiveNotifications(),
                markAsRead: (id) => this.markNotificationAsRead(id),
                addNotification: (notification) => this.addNotification(notification)
            };
        }

        async fetchFromGitHub() {
            try {
                const response = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: `https://api.github.com/repos/${this.githubRepo}/contents/notifications.json`,
                        headers: { 'Accept': 'application/vnd.github.v3+json' },
                        onload: (response) => resolve(response),
                        onerror: (error) => reject(error)
                    });
                });

                if (response.status === 200) {
                    const content = JSON.parse(atob(JSON.parse(response.responseText).content));
                    this.updateNotifications(content);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        }

        updateNotifications(newNotifications) {
            const currentTime = Date.now();
            newNotifications.forEach(notification => {
                if (!this.notifications.find(n => n.id === notification.id)) {
                    this.notifications.push({
                        ...notification,
                        read: false,
                        timestamp: currentTime
                    });
                }
            });

            this.saveNotifications();
            this.notifyUpdate();
        }

        getActiveNotifications() {
            return this.notifications.filter(n => !n.read);
        }

        markNotificationAsRead(id) {
            const notification = this.notifications.find(n => n.id === id);
            if (notification) {
                notification.read = true;
                this.saveNotifications();
                this.notifyUpdate();
            }
        }

        addNotification(notification) {
            this.notifications.push({
                ...notification,
                id: Date.now(),
                read: false,
                timestamp: Date.now()
            });
            this.saveNotifications();
            this.notifyUpdate();
        }

        saveNotifications() {
            GM_setValue('customNotifications', this.notifications);
            GM_setValue('lastUpdate', Date.now());
        }

        notifyUpdate() {
            const event = new CustomEvent('customNotificationsUpdated', {
                detail: { notifications: this.getActiveNotifications() }
            });
            document.dispatchEvent(event);
        }

        startPeriodicCheck() {
            setInterval(() => this.fetchFromGitHub(), 300000); // كل 5 دقائق
            this.fetchFromGitHub();
        }
    }

    function initializeManager() {
        const manager = new NotificationManager('YOUR_USERNAME/YOUR_REPO');
        manager.startPeriodicCheck();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeManager);
    } else {
        initializeManager();
    }
})();
