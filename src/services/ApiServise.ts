class ApiService{
    private static instance : ApiService;
    static getInstance(){
        if (!ApiService.instance){
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    fetchRulesForPhoneNumber = async (phoneNumberId: number) => {
        try {
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/phoneNumber/findRulesByPhoneNumberId/${phoneNumberId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                return data.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Ошибка загрузки правил:', error);
            return [];
        }
    };
}


export default ApiService.getInstance();