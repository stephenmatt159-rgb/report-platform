import { Request, Response } from 'express';
import { MailerService } from '../services/smtp.service';
import { site } from '../config/site';

export const sendContactFormMail = async (req: Request, res: Response) => {
  const mailer = new MailerService();

  try {
    const { name, email, phone, subject, message } = req.body;

    const supportEmail = mailer.send({
      to: 'reportplaform777@gmail.com',
      subject: `${subject}`,
      templateName: 'contact-form',
      templateData: {
        name,
        email,
        phone,
        subject,
        message,
        siteName: site.SITE_NAME,
      },
    });

    const userConfirmationEmail = mailer.send({
      to: email,
      subject: 'I have gotten your message',
      templateName: 'confirm-contact-form',
      templateData: {
        name,
        email,
        subject,
        year: new Date().getFullYear(),
        siteName: site.SITE_NAME,
      },
    });

    // 🔥 Run both emails at the same time
    await Promise.all([userConfirmationEmail, supportEmail]);

    res
      .status(200)
      .json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to send message.' });
  }
};

export const propertyRequestForm = async (req: Request, res: Response) => {
  const mailer = new MailerService();

  try {
    const { name, phone, email, id, price, message } = req.body;

    const propertyLink = `${site.SITE_LINK}/properties/${id}`;

    // First send to support
    const support = mailer.send({
      to: 'communications@easyrentprops.com',
      subject: `Property Request: ${name}`,
      templateName: 'property-request',
      templateData: {
        name,
        phone,
        email,
        message,
        price,
        property: propertyLink,
      },
    });

    // Then confirmation to user
    const confirmation = mailer.send({
      to: email,
      subject: "We've received your property request",
      templateName: 'property-request-confirmation',
      templateData: {
        name,
        email,
        propertyLink: propertyLink,
        year: new Date().getFullYear(),
        siteName: site.SITE_NAME,
      },
    });

    await Promise.all([support, confirmation]);

    res.status(200).json({
      success: true,
      message: 'Property request submitted successfully.',
    });
  } catch (error) {
    console.error('❌ Error sending property request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send property request.',
    });
  }
};
