// Определяем типы для навигации
// Это помогает TypeScript понимать, какие экраны есть в приложении

export type RootStackParamList = {
    Home: undefined;       // Главный экран без параметров
    Settings: undefined;   // Экран настроек без параметров
    Profile: undefined;    // Экран профиля без параметров
    SmsControl: undefined;
    NumberSetting: {
        id?: number;           // при редактировании — передаётся, при добавлении — отсутствует
        phone_name?: string;
        phone_number?: string;
        newRules?: Array<{ id: number; ruleName: string; description: string }>;
        updatedRule?: { id: number; ruleName: string; description: string };
    } | undefined; 
    RuleSetting: { 
        phoneNumberId: number;
        numberName: string; 
        phoneNumber: string;
        ruleId?: number;
        ruleName?: string;
        ruleCondition?: string;
        ruleNameId?: number;
    };
};

// Экспортируем тип для использования в компонентах
// export type HomeScreenNavigationProp = {
//     navigate: (screen: keyof RootStackParamList) => void;
// };