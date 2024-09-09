"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailFactory = void 0;
/**
 * This class call email factory will help me to determine which is the correct object to create...
 * 1. Grettings TODO: Listo, pero hacer pruebas...
 * 2. Error
 * 3. work
 * 4. Opinion TODO: Listo, pero hacer pruebas...
 */
const GreetingEmail_1 = require("./GreetingEmail");
const OpinionEmail_1 = require("./OpinionEmail");
class EmailFactory {
    static CreateEmail(type, opinion) {
        switch (type) {
            case 'greetings':
                return new GreetingEmail_1.GreetingEmail(opinion.name, opinion.email, opinion.tz);
            case 'opinion':
                return new OpinionEmail_1.OpinionEmails(opinion.name, opinion.email, opinion.id_email);
        }
        return null;
    }
}
exports.EmailFactory = EmailFactory;
