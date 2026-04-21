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

// Функция для инициализации прослушивания SMS
const initSmsListener = async () => {
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
  startReadSMS((smsData: string) => {
    // smsData имеет формат: '[+79001234567, текст сообщения]'
    const parsedData = smsData.slice(1, -1).split(', ');
    const senderNumber = parsedData[0];
    const messageBody = parsedData[1];

    console.log(`Получено SMS от: ${senderNumber}`);
    console.log(`Текст сообщения: ${messageBody}`);

    ApiServise.fetchRulesForPhoneNumberByNumber(senderNumber).then(rules => {
      rules.forEach((rule) => {
        switch(rule.rule_name_id){
          case 1: { // Например сирена
            SirenService.startSiren();
          }
        }
      });
    })

    // ЗДЕСЬ БУДЕТ ВАША ЛОГИКА ОБРАБОТКИ SMS
    // Нужно будет загрузить номера и правила, проверить отправителя и текст,
    // и выполнить нужное действие.
  });
};

// Вызываем функцию инициализации при старте приложения
if (Platform.OS === 'android') {
  initSmsListener();
}

// Регистрируем корневой компонент приложения
registerRootComponent(App);