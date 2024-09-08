/**
 * This class call email factory will help me to determine which is the correct object to create...
 * 1. Grettings TODO: Listo, pero hacer pruebas...
 * 2. Error
 * 3. work
 * 4. Opinion TODO: Listo, pero hacer pruebas...
 */
import { GreetingEmail } from "./GreetingEmail";
import { OpinionEmails } from "./OpinionEmail";
import { IEFactory } from "../interfaces/IEmails";

class EmailFactory {
    static CreateEmail(type: string, opinion: IEFactory){
        switch(type){
            case 'greetings':
                return new GreetingEmail(opinion.name, opinion.email, opinion.tz);
            case 'opinion':
                return new OpinionEmails(opinion.name, opinion.email, opinion.id_email);
            case 'work':
                return 0;
            case 'erro':
                return 0;
        }
    }
}

export { EmailFactory };