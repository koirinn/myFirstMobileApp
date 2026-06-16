import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Alert,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './EmailControl.styles';
import BottomBar from '../../components/BottomBar/BottomBar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface EmailItem {
    id: number;
    email_name: string;
    email_address: string;
    email_from: string;
    email_password: string;
}

const EmailControl: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    
    const [emails, setEmailsList] = useState<EmailItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmails = useCallback(async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem(
                'accessToken'
            );

            if (!token) {
                throw new Error('NOT_AUTHORIZED');
            }
            const response = await fetch('http://89.111.169.247/api/mobileapp/email/findAllEmailsByUserId', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setEmailsList(data.data);
            } else {
                setEmailsList([]);
            }
        } catch (error) {
            console.error('Ошибка загрузки email:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            console.log('Экран EmailControl в фокусе, обновляю данные...');
            fetchEmails();
        }, [])
    );

    useEffect(() => {
        fetchEmails();
    }, []);

    const handleAddEmail = () => {
        navigation.navigate('EmailSetting');
    };

    const handleDeleteEmail = async (id: number) => {
        Alert.alert(
            'Удаление',
            'Удалить email?',
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://89.111.169.247/api/mobileapp/email/deleteEmail/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                            });
                            if (response.ok) {
                                setEmailsList(prev => prev.filter(item => item.id !== id));
                                Alert.alert('Успешно', 'Устройство удалено');
                            } else {
                                Alert.alert('Ошибка', 'Не удалось удалить устройство');
                            }
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
                        }
                    },
                },
            ]
        );
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleRefresh = () => {
        fetchEmails();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable 
                    onPress={handleGoBack}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </Pressable>
                <Text style={styles.headerText}>Контроль Email</Text>
                
                <Pressable 
                    onPress={handleRefresh}
                    style={({ pressed }) => [
                        { position: 'absolute', right: 16 },
                        pressed && styles.buttonPressed,
                    ]}
                >
                    <Text style={[styles.backButtonText, { fontSize: 20 }]}>⟳</Text>
                </Pressable>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={handleRefresh}
                        colors={['#4CAF50']}
                        tintColor="#4CAF50"
                    />
                }
            >
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                        <Text style={styles.loadingText}>Загрузка почтовых адресов...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <Pressable
                            style={styles.retryButton}
                            onPress={handleRefresh}
                        >
                            <Text style={styles.retryButtonText}>Повторить</Text>
                        </Pressable>
                    </View>
                ) : emails.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Нет добавленных почтовых адресов</Text>
                        <Text style={styles.emptySubText}>
                            Нажмите "Добавить почтовый адрес" для начала
                        </Text>
                    </View>
                ) : (
                    <>
                        {emails.map((item) => (
                            <Pressable
                                key={item.id}
                                style={({ pressed }) => [
                                    styles.smsItem,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => {
                                    navigation.navigate('EmailSetting', {
                                        id: item.id,
                                        email_name: item.email_name,
                                        email_address: item.email_address,
                                        email_from: item.email_from,
                                        email_password: item.email_password,
                                    });
                                }}
                                android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
                            >
                                <View style={styles.itemContent}>
                                    <Text style={styles.bankName}>{item.email_name}</Text>
                                    <Text style={styles.phoneNumber}>{["Получатель: ", item.email_address]}</Text>
                                    <Text style={styles.phoneNumber}>{["Отправитель: ", item.email_from]}</Text>
                                    <Text style={styles.phoneNumber}>{["Пароль: ",item.email_password]}</Text>
                                </View>
                                <Pressable
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteEmail(item.id)}
                                >
                                    <Text style={styles.deleteIcon}>🗑️</Text>
                                </Pressable>
                            </Pressable>
                        ))}
                        
                        <View style={styles.floatingButtonSpacing} />
                    </>
                )}
            </ScrollView>

            <Pressable
                style={({ pressed }) => [
                    styles.floatingAddButton,
                    { bottom: insets.bottom + 70 },
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleAddEmail}  
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
                disabled={isLoading}
            >
                <Text style={styles.floatingAddButtonText}>Добавить почтовый адрес</Text>
                <Text style={styles.floatingAddIcon}>+</Text>
            </Pressable>

            <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
                <BottomBar />
            </View>
        </View>
    );
};

export default EmailControl;