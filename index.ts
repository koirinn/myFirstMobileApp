import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import {
  checkIfHasSMSPermission,
  requestReadSMSPermission,
  startReadSMS,
} from '@maniac-tech/react-native-expo-read-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiServise from './src/services/ApiServise';
import SirenService from './src/services/SirenService';
import SmsSendService from "./src/services/SmsSendService";
import EmailSendService from './src/services/EmailSendService';
import NotificationService from './src/services/NotificationService';

import App from './App';

const checkSmsWord = (description: string, smsText: string) => {
  return smsText.includes(description);
}

// Функция для получения email данных по rule_id
const fetchEmailDataByRuleId = async (ruleId: number) => {
  try {
    const response = await fetch(
      `http://89.111.169.247/api/mobileapp/phoneNumber/getPhoneEmailsByRuleId/${ruleId}`
    );
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      const emailInfo = data.data[0];
      return {
        email: emailInfo.email,
        subject: emailInfo.theme,
        body: emailInfo.description
      };
    }
    return null;
  } catch (error) {
    console.error('Ошибка загрузки email данных:', error);
    return null;
  }
};


const fetchSmsDataByRuleId = async (ruleId: number) => {

  try {

    const response = await fetch(
      `http://89.111.169.247/api/mobileapp/phoneNumber/getPhoneSmsByRuleId/${ruleId}`
    );

    const data = await response.json();

    if (
      data.success &&
      data.data &&
      data.data.length > 0
    ) {

      const smsInfo = data.data[0];

      return {
        phone: smsInfo.phone,
        text: smsInfo.text
      };
    }

    return null;

  } catch (error) {

    console.error(
      'Ошибка загрузки SMS данных:',
      error
    );

    return null;
  }
};

// Функция для инициализации прослушивания SMS
const initSmsListener = async () => {
  try {
    console.log("Инициализация прослушивания SMS...");
    
    const { hasReceiveSmsPermission, hasReadSmsPermission } =
      await checkIfHasSMSPermission();
  
    if (!hasReceiveSmsPermission || !hasReadSmsPermission) {
      const granted = await requestReadSMSPermission();
      if (!granted) {
        console.warn('Не удалось получить разрешения для SMS');
        return;
      }
    }
  
    startReadSMS(async (status: string, smsData: string) => {
      try {
        const parsedData = smsData.replace(/^\[|\]$/g, '').split(',').map(item => item.trim());
        const senderNumber = parsedData[0];
        const messageBody = parsedData.slice(1).join(',');
    
        console.log(`Получено SMS от: ${senderNumber}`);
        console.log(`Текст сообщения: ${messageBody}`);


        ///
        try {
          await fetch(
            'http://89.111.169.247/api/mobileapp/device/response',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                phone: senderNumber,
                text: messageBody,
              }),
            }
          );
        } catch (error) {
          console.error(
            'Ошибка отправки ответа устройства на сервер:',
            error
          );
        }
        ///
    
        const rules = await ApiServise.fetchRulesForPhoneNumberByNumber(senderNumber);
        console.log("Загруженные правила для номера:", rules);
        
        for (const rule of rules) {
          if (checkSmsWord(rule.description, messageBody)) {
            console.log(`Сработало правило: ${rule.rule_name_id}`);
            
            switch(rule.rule_name_id) {
              case 1: { // запуск сирены
                console.log("🔊 Запуск сирены...");
                SirenService.startSiren();
                break;
              }
              case 2: { // отправка email
                console.log("📧 Загрузка данных для отправки email...");
                const emailData = await fetchEmailDataByRuleId(rule.id);
                
                if (emailData) {
                  console.log(`Отправка email на: ${emailData.email}`);
                  await EmailSendService.sendEmail(
                    emailData.email,
                    emailData.subject,
                    emailData.body
                  );
                } else {
                  console.error("Не найдены email данные для правила:", rule.id);
                }
                break;
              }
              case 3: {
                console.log("📱 Загрузка SMS настроек...");

                const smsData =
                  await fetchSmsDataByRuleId(rule.id);
                if (smsData) {
                  console.log(
                    `Отправка SMS на ${smsData.phone}`
                  );
                  await SmsSendService.sendSms(
                    smsData.phone,
                    smsData.text
                  );
                } else {
                  console.error(
                    "Не найдены SMS настройки для правила:",
                    rule.id
                  );
                }
                break;
              }
              default: {
                console.log(`Неизвестный тип правила: ${rule.rule_name_id}`);
              }
            }
          }
        }
      } catch (err) {
        console.error("Ошибка обработки SMS:", err);
      }
    });
  } catch (err) {
    console.error("Ошибка инициализации SMS слушателя:", err);
  }
};




const initPush = async () => {
    NotificationService.listenNotifications();
    console.log("initPush");
    const token = await NotificationService.registerForPushNotifications();

    console.log("токен такой: ", token);

    if (token) {
      const accessToken = await AsyncStorage.getItem(
        'accessToken'
      );

      if (!accessToken) {
        throw new Error('NOT_AUTHORIZED');
      }

    await fetch(
        "http://89.111.169.247/api/mobileapp/users/savePushToken",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                push_token: token,
            }),
        }
    );
}
};




// Вызываем функцию инициализации при старте приложения
if (Platform.OS === 'android') {
  initSmsListener();
  initPush();
}

registerRootComponent(App);