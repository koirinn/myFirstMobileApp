class SmsSendService {

    private static instance: SmsSendService;

    static getInstance() {

        if (!SmsSendService.instance) {
            SmsSendService.instance =
                new SmsSendService();
        }

        return SmsSendService.instance;
    }

    async sendSms(
        phone: string,
        text: string
    ) {

        try {

            const response = await fetch(
                'http://89.111.169.247/api/mobileapp/phoneNumber/sendSms',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone,
                        text,
                    }),
                }
            );

            const data =
                await response.json();

            console.log(data);

        } catch (error) {

            console.error(error);
        }
    }
}

export default SmsSendService.getInstance();