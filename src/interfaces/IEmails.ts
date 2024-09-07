enum EmailType {
    Work = 'work',
    Opinion = 'opinion',
    Greetings = 'greetings',
    ErrorReport = 'error_report'
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

export { Emails, EmailType }