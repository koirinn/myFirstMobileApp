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

    fetchRulesForPhoneNumberByNumber = async (phoneNumber: string) => {
        try {
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/phoneNumber/findRulesByPhoneNumber/${phoneNumber}`,
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


    fetchDeleteRule = async (id: number, ruleName: string) => {
        try {
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/phoneNumber/deleteRule/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            const responseData = await response.json();
            console.log('Удаление правила, ответ:', responseData);

            if (response.ok && response.status === 200) {
                return true;
            } else if (response.status >= 400 && response.status < 500) {
                throw new Error("Ошибка при удалении правила");
            }
        } catch (error) {
            throw error; 
        }
    };

    fetchAllNumberRules = async (id: number, ruleName: string) => {
        const response = await fetch(
            'http://89.111.169.247/api/mobileapp/phoneNumber/findAllNumbersRules',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );
        if(response.ok){
            return await response.json();
        }
    }

    fetchSaveNumberRule = async (ruleId: number, selectedRuleId: number, smsText: string) => {
        try{
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/phoneNumber/saveRule/${ruleId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        rule_name_id: selectedRuleId,
                        rule_condition: smsText.trim(),
                    }),
                }
            );
            if(response.ok){
                return true;
            }
        }
        catch(error){
            throw error;
        }
    }

    fetchAddRule = async (phoneNumberId: number, ruleId: number, smsText: string) => {
        try{
            
            const response = await fetch('http://89.111.169.247/api/mobileapp/phoneNumber/addRule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        phone_number_id: phoneNumberId,
                        rule_name_id: ruleId,
                        rule_condition: smsText.trim(),
                    }),
                })
            if(response.ok){
                return true;
            }
        }
        catch(error){
            throw error;
        }
    } 

    fetchPhoneNumbers = async () => {
        try {
            const userId = 1;
            const url = `http://89.111.169.247/api/mobileapp/phoneNumber/findAllNumbersByUserId/${userId}`;
            console.log('Отправляю запрос на:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            if (response.ok && response.status === 200) {
                const data = await response.json();
                console.log('Данные получены:', data);
                return data.data || [];
            } else if (response.status >= 400 && response.status < 500) {
                throw new Error('Ошибка при загрузке данных. Проверьте авторизацию.');
            } else {
                throw new Error('Ошибка сервера. Попробуйте позже.');
            }
        } catch (error) {
            throw error;
        }
    };


    fetchDeleteNumber = async (id: number) => {
        try{
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/phoneNumber/deleteNumber/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            if(response.ok){
                return true;
            }
        }
        catch(error){
            throw error;
        }
    }
}


export default ApiService.getInstance();