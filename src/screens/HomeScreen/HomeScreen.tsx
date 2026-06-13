import React, { useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    PermissionsAndroid,
    Platform,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './HomeScreen.styles';
import BottomBar from '../../components/BottomBar/BottomBar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();

    // Запрос разрешений на чтение SMS при загрузке экрана
    useEffect(() => {
        const requestSmsPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                        PermissionsAndroid.PERMISSIONS.READ_SMS,
                    ]);
                    if (granted['android.permission.RECEIVE_SMS'] === 'granted') {
                        console.log('Разрешение на SMS получено');
                    } else {
                        console.warn('Разрешение на SMS не получено');
                        Alert.alert('Внимание', 'Без доступа к SMS приложение не сможет анализировать сообщения');
                    }
                } catch (err) {
                    console.warn('Ошибка при запросе разрешений:', err);
                }
            }
        };
        requestSmsPermission();
    }, []);

    const handleFunctionButtonPress = (buttonName: string) => {
        console.log(`Нажата кнопка: ${buttonName}`);
        
        if (buttonName === 'Контроль СМС') {
            console.log('Переход на экран контроля СМС');
            navigation.navigate('SmsControl');
        }
        else if (buttonName === 'Контроль E-MAIL') {
            console.log('Переход на экран контроля E-MAIL');
            navigation.navigate('EmailControl');
        }
        else if (buttonName === 'Фоновые задачи') {
            console.log('Переход на экран фоновых задач');
            navigation.navigate('BackScreen');
        }
    };

    const functionButtons = [
        { id: 1, title: 'Контроль СМС' },
        { id: 2, title: 'Контроль E-MAIL' },
        { id: 3, title: 'Фоновые задачи' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>SaveMyTime</Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
            >
                {functionButtons.map((button) => (
                    <Pressable
                        key={button.id}
                        style={({ pressed }) => [
                            styles.functionButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => handleFunctionButtonPress(button.title)}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
                    >
                        <View style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>{button.title}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default HomeScreen;