/**
 * This class call email factory will help me to determine which is the correct object to create...
 * 1. Grettings
 * 2. Error
 * 3. work
 * 4. Opinion.
 */
import { GreetingEmail } from "./GreetingEmail";
import { OpinionEmails } from "./OpinionEmail";
import { IEFactory } from "../interfaces/IEmails";

class EmailFactory {
    static CreateEmail(type: string, opinion: IEFactory): object | null{
        switch(type){
            case 'greetings':
                return new GreetingEmail(opinion.name, opinion.email, opinion.tz);
            case 'opinion':
                return new OpinionEmails(opinion.name, opinion.email, opinion.id_email);
        }
        return null;
    }
}

export { EmailFactory };