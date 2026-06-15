export type RootStackParamList = {
    Home: undefined;   
    Settings: undefined; 
    Profile: undefined;   
    SmsControl: undefined;
    EmailControl: undefined;
    BackScreen: undefined;
    NumberSetting: {
        id?: number;         
        phone_name?: string;
        phone_number?: string;
        newRules?: Array<{ id: number; ruleName: string; description: string }>;
        updatedRule?: { id: number; ruleName: string; description: string };
    } | undefined; 
    EmailSetting: {
        id?: number;     
        email_name?: string;
        email_address?: string;
        email_from?: string;
        email_password?: string;
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
        emailFrom: string;
        emailPassword: string;
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