import { createTransport } from 'nodemailer';

// const transporter = createTransport({
//     service: "gmail",
//     auth: {
//         user: "",
//         pass: "",
//     }
// });
const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "28c6fd85c8be69",
        pass: "8cb2c9a2aea609"
    }
});

const sendMailFunction = async (email, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: "28c6fd85c8be69",
            to: email,
            subject,
            text
        })

    } catch (error) {
        console.log("error while sending mail", error);

    }

}

export default sendMailFunction;