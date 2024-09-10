"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationTitle = void 0;
const notificationTitle = (type) => {
    switch (type) {
        case 'work':
            return {
                title: 'New Wrok Email',
                num: 0
            };
        case 'opinion':
            return {
                title: '',
                num: 1
            };
        case 'greetings':
            return {
                title: 'New Greetings Email',
                num: 2
            };
        case 'error_report':
            return {
                title: 'New Error Report Email',
                num: 3
            };
        default:
            return null;
    }
};
exports.notificationTitle = notificationTitle;
