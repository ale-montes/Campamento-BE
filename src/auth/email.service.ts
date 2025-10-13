import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (
  destino: string,
  verificationUrl: string,
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false, // true si usas 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Soporte" <verify@campament.org>',
      to: destino,
      subject: 'Verifica tu email',
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
          <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <tr>
              <td style="background:#78a000; color:#ffffff; text-align:center; padding:20px; font-size:24px; font-weight:bold;">
                Bienvenido a Nuestra Plataforma
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333; font-size:16px;">
                <p>Hola,</p>
                <p>Gracias por registrarte. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el botón de abajo:</p>
                <div style="text-align:center; margin:30px 0;">
                  <a href="${verificationUrl}" 
                     style="background:#78a000; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
                    Verificar mi correo
                  </a>
                </div>
                <p>Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:</p>
                <p style="word-break:break-all; color:#78a000;">${verificationUrl}</p>
                <hr style="border:none; border-top:1px solid #e0e0e0; margin:30px 0;" />
                <p style="font-size:12px; color:#888888;">
                  Si no solicitaste este registro, puedes ignorar este mensaje.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
    return false;
  }
};
