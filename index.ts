// import { registerRootComponent } from 'expo';

// import App from './App';

// registerRootComponent(App);





import { registerRootComponent } from 'expo';
import { AppRegistry, Platform } from 'react-native';
import {
  checkIfHasSMSPermission,
  requestReadSMSPermission,
  startReadSMS,
} from '@maniac-tech/react-native-expo-read-sms';
import ApiServise from './src/services/ApiServise';
import SirenService from './src/services/SirenService';

import App from './App';



const checkSmsWord = (description: string, smsText: string) => {
  return smsText.includes(description);
}

// Функция для инициализации прослушивания SMS
const initSmsListener = async () => {
  try{

    console.log("Инициализация прослушивания SMS...");
    // Проверяем, есть ли уже разрешения
    const { hasReceiveSmsPermission, hasReadSmsPermission } =
      await checkIfHasSMSPermission();
  
    // Если разрешений нет, запрашиваем их
    if (!hasReceiveSmsPermission || !hasReadSmsPermission) {
      const granted = await requestReadSMSPermission();
      if (!granted) {
        console.warn('Не удалось получить разрешения для SMS');
        return;
      }
    }
  
    // Запускаем прослушивание и передаём функцию-обработчик
    // Каждое новое SMS будет приходить сюда как строка в формате: [номер, текст сообщения]
    startReadSMS((status: string, smsData: string) => {
      try{
        const parsedData = smsData.replace(/^\[|\]$/g, '').split(',').map(item => item.trim());
        console.log("Получено новое SMS:", parsedData[0]);
        const senderNumber = parsedData[0];
        const messageBody = parsedData.slice(1).join(',');
    
        console.log(`Получено SMS от: ${senderNumber}`);
        console.log(`Текст сообщения: ${messageBody}`);
    
        ApiServise.fetchRulesForPhoneNumberByNumber(senderNumber).then(rules => {
          console.log("Загруженные правила для номера:", rules);
          rules.forEach((rule) => {
            if(checkSmsWord(rule.description, messageBody)){
              switch(rule.rule_name_id){
                case 1: { // Например сирена
                  SirenService.startSiren();
                }
              }
            }
          });
        }).catch(err => console.error("Ошибка загрузки правил:", err));
      } catch (err) {
        console.error("Ошибка обработки SMS:", err);
      }
      // smsData имеет формат: '[+79001234567, текст сообщения]'
  
      // ЗДЕСЬ БУДЕТ ВАША ЛОГИКА ОБРАБОТКИ SMS
      // Нужно будет загрузить номера и правила, проверить отправителя и текст,
      // и выполнить нужное действие.
    });
  } catch (err) {
    console.error("Ошибка инициализации SMS слушателя:", err);
  }
};

// Вызываем функцию инициализации при старте приложения
// if (Platform.OS === 'android') {
  initSmsListener();
// }

// Регистрируем корневой компонент приложения
registerRootComponent(App);