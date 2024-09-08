enum EmailType {
    Work = 'work',
    Opinion = 'opinion',
    Greetings = 'greetings',
    ErrorReport = 'error_report',
    Response = 'response'
}

interface Emails {
    id_email: string;
    email_sender: string;
    name_sender: string;
    email_recipient: string;
    message: string;
    date_message: Date;
    email_type: EmailType;
}

interface EmailBaseMethods {
    send(): Promise<void>;
}

interface IEFactory{
    id_email: string;
    name: string;
    email: string;
    tz: string;
}

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export { Emails, EmailType, EmailBaseMethods, IEFactory, MailOptions }