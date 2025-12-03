import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendEmail = async (to: string, subject: string, html: string, attachments?: any[]) => {
    const msg = {
        to,
        from: "noreply@vertragsklar.de", // Needs to be a verified sender
        subject,
        html,
        attachments,
    };

    try {
        await sgMail.send(msg);
        return { success: true };
    } catch (error) {
        console.error("Email send error", error);
        return { success: false, error };
    }
};
