import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomBar from '../../components/BottomBar/BottomBar';
import { styles } from './LoginScreen.styles';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async () => {
        try {
            const response = await fetch(
                'http://89.111.169.247/api/mobileapp/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userEmail: email,
                        userPassword: password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem(
                    'accessToken',
                    data.token
                );

                setEmail('');
                setPassword('');

                console.log('Успешный вход:', data);
                navigation.navigate('Profile');
            } else {
                alert(
                    data.error ||
                    data.message ||
                    'Ошибка авторизации'
                );
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Ошибка соединения с сервером');
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backText}>←</Text>
                </Pressable>

                <Text style={styles.headerText}>
                    Авторизация
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>
                        Войти
                    </Text>
                </Pressable>
            </ScrollView>

            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default LoginScreen;