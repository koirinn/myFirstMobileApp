import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomBar from '../../components/BottomBar/BottomBar';
import { styles } from './BackScreen.styles';

// Интерфейс устройства, соответствующий ответу сервера
interface DeviceItem {
    id: number;
    device_name: string;
    device_number: string;      // номер телефона
    device_request: string;     // кодовая фраза
    device_response: string;    // кодовый ответ
    period: number;             // периодичность (минуты)
    interval: number;           // интервал между запросом и ответом
}

const BackScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    const [devices, setDevices] = useState<DeviceItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDevices = useCallback(async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem(
                'accessToken'
            );

            if (!token) {
                throw new Error('NOT_AUTHORIZED');
            }
            const response = await fetch('http://89.111.169.247/api/mobileapp/device/findAllDevicesByUserId', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setDevices(data.data);
            } else {
                setDevices([]);
            }
        } catch (error) {
            console.error('Ошибка загрузки устройств:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchDevices();
        }, [fetchDevices])
    );

    const handleAddDevice = () => {
        navigation.navigate('DeviceSetting');
    };

    const handleEditDevice = (device: DeviceItem) => {
        // Передаём все поля с правильными именами
        navigation.navigate('DeviceSetting', {
            id: device.id,
            device_name: device.device_name,
            device_phone: device.device_number,
            code_phrase: device.device_request,
            code_response: device.device_response,
            period_minutes: device.period,
            response_interval_minutes: device.interval,
        });
    };

    const handleDeleteDevice = async (id: number) => {
        Alert.alert(
            'Удаление',
            'Удалить устройство?',
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('accessToken');
                            const response = await fetch(`http://89.111.169.247/api/mobileapp/device/deleteDevice/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                            });
                            if (response.ok) {
                                setDevices(prev => prev.filter(item => item.id !== id));
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

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </Pressable>
                <Text style={styles.headerText}>Фоновые задачи</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {devices.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Нет устройств</Text>
                        <Text style={styles.emptySubText}>Добавьте первое устройство</Text>
                    </View>
                ) : (
                    <>
                        {devices.map(item => (
                            <Pressable
                                key={item.id}
                                style={({ pressed }) => [
                                    styles.smsItem,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => handleEditDevice(item)}
                            >
                                <View style={styles.itemContent}>
                                    <Text style={styles.bankName}>{item.device_name}</Text>
                                    <Text style={styles.phoneNumber}>{item.device_number}</Text>
                                    <Text style={styles.phoneNumber}>Кодовая фраза: {item.device_request}</Text>
                                    <Text style={styles.phoneNumber}>Период: {item.period} мин</Text>
                                </View>
                                <Pressable
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteDevice(item.id)}
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
                style={[styles.floatingAddButton, { bottom: insets.bottom + 70 }]}
                onPress={handleAddDevice}
            >
                <Text style={styles.floatingAddButtonText}>Добавить устройство</Text>
                <Text style={styles.floatingAddIcon}>+</Text>
            </Pressable>

            <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
                <BottomBar />
            </View>
        </View>
    );
};

export default BackScreen;