import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

class NotificationService {
    async registerForPushNotifications() {
        if (!Device.isDevice) {
            return null;
        }
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } =
                await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return null;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(
            'Expo Push Token:',
            token.data
        );
        return token.data;
    }
}

export default new NotificationService();