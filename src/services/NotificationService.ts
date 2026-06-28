import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import SirenService from './SirenService';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

class NotificationService {

    async registerForPushNotifications() {
        console.log("1. Начало");

        if (!Device.isDevice) {
            console.log("Не физическое устройство");
            return null;
        }

        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } =
                await Notifications.requestPermissionsAsync();

            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            return null;
        }

        console.log("Получаем projectId");

        const projectId =
            Constants.expoConfig?.extra?.eas?.projectId;

        console.log(projectId);

        console.log("Получаем токен");

        const token =
            await Notifications.getExpoPushTokenAsync({
                projectId
            });

        console.log(token);

        return token.data;
    }



    listenNotifications() {
        Notifications.addNotificationReceivedListener(
            notification => {
                console.log(
                    "Получен push:",
                    notification.request.content.data
                );

                const data =
                    notification.request.content.data;

                if (data.type === "START_SIREN") {
                    console.log("Запускаем сирену");

                    SirenService.startSiren();
                }
            }
        );

        Notifications.addNotificationResponseReceivedListener(
            response => {
                console.log(
                    "Пользователь нажал уведомление",
                    response.notification.request.content.data
                );

                const data =
                    response.notification.request.content.data;

                if (data.type === "START_SIREN") {
                    SirenService.startSiren();
                }
            }
        );
    }
}

export default new NotificationService();