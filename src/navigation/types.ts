// Определяем типы для навигации
// Это помогает TypeScript понимать, какие экраны есть в приложении

export type RootStackParamList = {
    Home: undefined;       // Главный экран без параметров
    Settings: undefined;   // Экран настроек без параметров
    Profile: undefined;    // Экран профиля без параметров
    SmsControl: undefined;
    EmailControl: undefined;
    BackScreen: undefined;
    NumberSetting: {
        id?: number;           // при редактировании — передаётся, при добавлении — отсутствует
        phone_name?: string;
        phone_number?: string;
        newRules?: Array<{ id: number; ruleName: string; description: string }>;
        updatedRule?: { id: number; ruleName: string; description: string };
    } | undefined; 
    EmailSetting: {
        id?: number;           // при редактировании — передаётся, при добавлении — отсутствует
        email_name?: string;
        email_address?: string;
        newRules?: Array<{ id: number; ruleName: string; description: string }>;
        updatedRule?: { id: number; ruleName: string; description: string };
    } | undefined; 
    DeviceSetting: {
        id?: number;
        device_name?: string;
        device_phone?: string;
        code_phrase?: string;
        code_answer?: string;
        send_period?: number;
        response_timeout?: number;
    };
    RuleSetting: { 
        phoneNumberId: number;
        numberName: string; 
        phoneNumber: string;
        ruleId?: number;
        ruleName?: string;
        ruleCondition?: string;
        ruleNameId?: number;
    };
    EmailRuleSetting: { 
        emailId: number;
        emailName: string; 
        emailBoxAddress: string;
        ruleId?: number;
        ruleName?: string;
        ruleCondition?: string;
        ruleNameId?: number;
    };
    DeviceRuleSetting: { 
        DeviceId: number;
        DeviceName: string; 
        DeviceNumber: string;
        ruleId?: number;
        ruleName?: string;
        ruleNameId?: number;
    };
    LoginScreen: undefined;
    RegisterScreen: undefined;
};

// Экспортируем тип для использования в компонентах
// export type HomeScreenNavigationProp = {
//     navigate: (screen: keyof RootStackParamList) => void;
// };