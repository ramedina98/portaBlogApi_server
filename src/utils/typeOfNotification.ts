/**
 * This utils function helps me to create a good short title for the web socket
 * notification, about new emails, depending on the type of email it is...
 */
import { INotificationTitle } from "../interfaces/IEmails";

const notificationTitle = (type: string): INotificationTitle | null => {
    switch(type){
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
            }

        case 'error_report':

            return {
                title: 'New Error Report Email',
                num: 3
            }

        default:
            return null;
    }
};

export { notificationTitle };