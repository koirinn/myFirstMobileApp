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

import BottomBar from '../../components/BottomBar/BottomBar';
import { styles } from './RegisterScreen.styles';

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }

            const response = await fetch(
                'http://89.111.169.247/api/mobileapp/users/registration',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName: name,
                        userEmail: email,
                        userPassword: password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error || data.message);
            }
        } catch (error) {
            console.error(error);

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
                    Регистрация
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    value={name}
                    onChangeText={setName}
                />

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

                <TextInput
                    style={styles.input}
                    placeholder="Подтвердите пароль"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Pressable
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>
                        Зарегистрироваться
                    </Text>
                </Pressable>
            </ScrollView>

            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default RegisterScreen;