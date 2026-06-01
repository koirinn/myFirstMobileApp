// class EmailSendService {

//     private static instance: EmailSendService;

//     static getInstance() {

//         if (!EmailSendService.instance) {
//             EmailSendService.instance = new EmailSendService();
//         }

//         return EmailSendService.instance;
//     }

//     async sendEmail(
//         to: string,
//         subject: string,
//         text: string
//     ) {

//         try {

//             console.log("Отправка email через сервер...");

//             const response = await fetch(
//                 "http://89.111.169.247/api/mobileapp/phoneNumber/sendEmail",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         to,
//                         subject,
//                         text,
//                     }),
//                 }
//             );

//             const data = await response.json();

//             console.log("Ответ сервера:", data);

//         } catch (error) {

//             console.error("Ошибка отправки email:", error);
//         }
//     }
// }

// export default EmailSendService.getInstance();















class EmailSendService {

    private static instance: EmailSendService;

    static getInstance() {
        if (!EmailSendService.instance) {
            EmailSendService.instance = new EmailSendService();
        }
        return EmailSendService.instance;
    }

    async sendEmail(to: string, subject: string, text: string) {
        try {
            console.log(`Отправка email на ${to}...`);

            const response = await fetch(
                "http://89.111.169.247/api/mobileapp/phoneNumber/sendEmail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to,
                        subject,
                        text,
                    }),
                }
            );

            const data = await response.json();
            console.log("Ответ сервера:", data);
            
            if (response.ok && data.success) {
                console.log("Email успешно отправлен");
            } else {
                console.error("Ошибка отправки email:", data.message);
            }
        } catch (error) {
            console.error("Ошибка отправки email:", error);
        }
    }
}

export default EmailSendService.getInstance();