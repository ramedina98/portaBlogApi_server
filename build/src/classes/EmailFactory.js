"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailFactory = void 0;
/**
 * This class call email factory will help me to determine which is the correct object to create...
 * 1. Grettings
 * 2. Error
 * 3. work
 * 4. Opinion.
 */
const GreetingEmail_1 = require("./GreetingEmail");
const OpinionEmail_1 = require("./OpinionEmail");
const WorkEmail_1 = require("./WorkEmail");
class EmailFactory {
    static CreateEmail(type, option) {
        switch (type) {
            case 'greetings':
                return new GreetingEmail_1.GreetingEmail(option.name, option.email, option.tz);
            case 'opinion':
                return new OpinionEmail_1.OpinionEmails(option.name, option.email, option.id_email);
            case 'work':
                return new WorkEmail_1.WorkEmail(option.name, option.email, option.tz, option.id_email);
        }
        return null;
    }
}
exports.EmailFactory = EmailFactory;
