import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
    throw new Error("SENDGRID_API_KEY is missing in production environment. Please add it to your Vercel project settings.");
}

if (apiKey) {
    sgMail.setApiKey(apiKey);
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
