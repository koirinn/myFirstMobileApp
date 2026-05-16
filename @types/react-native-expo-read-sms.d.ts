declare module '@maniac-tech/react-native-expo-read-sms' {
  export function checkIfHasSMSPermission(): Promise<{
    hasReceiveSmsPermission: boolean;
    hasReadSmsPermission: boolean;
  }>;
  export function requestReadSMSPermission(): Promise<boolean>;
  export function startReadSMS(callback: (status: string, smsData: string) => void): void;
}