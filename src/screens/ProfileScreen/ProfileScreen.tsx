import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './ProfileScreen.styles';
import BottomBar from '../../components/BottomBar/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



const ProfileScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const checkAuth = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                setIsLoggedIn(false);
                return;
            }
            const payload = JSON.parse(
                atob(token.split('.')[1])
            );
            setUsername(payload.username);
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleFunctionButtonPress = (buttonName: string) => {
        console.log(`Нажата кнопка: ${buttonName}`);
    };

    const handleLogin = () => {
        console.log("Переход на Login");
        navigation.navigate('LoginScreen');
    };

    const handleRegister = () => {
        console.log("Переход на Register");
        navigation.navigate('RegisterScreen');
    };

    const handleLogout = () => {
        Alert.alert(
            'Выход из аккаунта',
            'Вы уверены, что хотите выйти?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Выйти',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('accessToken');
                            setIsLoggedIn(false);
                            setUsername('');
                            setEmail('');
                            console.log('Выход выполнен');
                        } catch (error) {
                            console.error(error);
                        }
                    },
                },
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Удаление аккаунта',
            'Это действие нельзя отменить.\n\nВы уверены, что хотите удалить аккаунт?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token =
                                await AsyncStorage.getItem(
                                    'accessToken'
                                );
                            const response = await fetch(
                                'http://89.111.169.247/api/mobileapp/users/delete',
                                {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type':
                                            'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            const data = await response.json();

                            if (response.ok) {
                                await AsyncStorage.removeItem('accessToken');
                                setIsLoggedIn(false);
                                setUsername('');
                                setEmail('');
                                Alert.alert(
                                    'Готово',
                                    'Аккаунт успешно удалён'
                                );
                            } else {
                                Alert.alert(
                                    'Ошибка',
                                    data.error ||
                                        'Не удалось удалить аккаунт'
                                );
                            }
                        } catch (error) {
                            console.error(error);
                            Alert.alert(
                                'Ошибка',
                                'Ошибка соединения с сервером'
                            );
                        }
                    },
                },
            ]
        );
    };

    const functionButtons = [
        { id: 1, title: 'Настройка профиля 1' },
        { id: 2, title: 'Настройка профиля 2' },
        { id: 3, title: 'Настройка профиля 3' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Профиль</Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
            >
                {!isLoggedIn && (
                    <View style={styles.authBlock}>
                        <Text style={styles.authTitle}>
                            Вы не вошли в аккаунт
                        </Text>

                        <Pressable
                            style={styles.authButton}
                            onPress={handleLogin}
                        >
                            <Text style={styles.authButtonText}>
                                Войти
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.authButton, styles.authButtonSecondary]}
                            onPress={handleRegister}
                        >
                            <Text style={styles.authButtonText}>
                                Зарегистрироваться
                            </Text>
                        </Pressable>
                    </View>
                )}

                {isLoggedIn && (
                <>
                    <View style={styles.userCard}>
                        <View style={styles.avatar} />

                        <Text style={styles.userName}>
                            {username}
                        </Text>

                        <Text style={styles.userEmail}>
                            {email}
                        </Text>

                        <Text style={styles.userStatus}>
                            Пользователь авторизован
                        </Text>
                    </View>

                    {functionButtons.map((button) => (
                        <Pressable
                            key={button.id}
                            style={({ pressed }) => [
                                styles.functionButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() =>
                                handleFunctionButtonPress(button.title)
                            }
                        >
                            <View style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>
                                {button.title}
                            </Text>
                        </Pressable>
                    ))}

                    <Pressable
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>
                            Выйти из аккаунта
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.deleteAccountButton}
                        onPress={handleDeleteAccount}
                    >
                        <Text style={styles.deleteAccountText}>
                            Удалить аккаунт
                        </Text>
                    </Pressable>
                </>
            )}

            </ScrollView>

            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default ProfileScreen;