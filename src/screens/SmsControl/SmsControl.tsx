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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './SmsControl.styles';
import BottomBar from '../../components/BottomBar/BottomBar';
import * as SmsWatcher from 'react-native-sms-watcher';
import ApiServise from '../../services/ApiServise';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PhoneNumberItem {
    id: number;
    phone_name: string;
    phone_number: string;
}

const SmsControl: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    
    const [smsList, setSmsList] = useState<PhoneNumberItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPhoneNumbers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const numbersList: PhoneNumberItem[] = await ApiServise.fetchPhoneNumbers() || [];
            setSmsList(numbersList);
            const phoneNumbers = numbersList.map((item: PhoneNumberItem) => item.phone_number);
            SmsWatcher.setWatchedNumbers(phoneNumbers);
            console.log('Установлены отслеживаемые номера:', phoneNumbers);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error instanceof Error ? error.message : 'Ошибка соединения с сервером');
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.log('Экран SmsControl в фокусе, обновляю данные...');
            fetchPhoneNumbers();
        }, [])
    );

    useEffect(() => {
        fetchPhoneNumbers();
    }, []);

    const handleAddNumber = () => {
        navigation.navigate('NumberSetting');
    };

    const handleDeleteItem = async (id: number) => {
        try {
            await ApiServise.fetchDeleteNumber(id);
            setSmsList(prevList => prevList.filter(item => item.id !== id));
            Alert.alert('Успешно', 'Номер удален');
            fetchPhoneNumbers();
        } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Ошибка', error instanceof Error ? error.message : 'Не удалось соединиться с сервером');
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleRefresh = () => {
        fetchPhoneNumbers();
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
                <Text style={styles.headerText}>Контроль СМС</Text>
                
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
                        <Text style={styles.loadingText}>Загрузка номеров...</Text>
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
                ) : smsList.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Нет добавленных номеров</Text>
                        <Text style={styles.emptySubText}>
                            Нажмите "Добавить номер" для начала
                        </Text>
                    </View>
                ) : (
                    <>
                        {smsList.map((item) => (
                            <Pressable
                                key={item.id}
                                style={({ pressed }) => [
                                    styles.smsItem,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => {
                                    navigation.navigate('NumberSetting', {
                                        id: item.id,
                                        phone_name: item.phone_name,
                                        phone_number: item.phone_number,
                                    });
                                }}
                                android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
                            >
                                <View style={styles.itemContent}>
                                    <Text style={styles.bankName}>{item.phone_name}</Text>
                                    <Text style={styles.phoneNumber}>{item.phone_number}</Text>
                                </View>
                                <Pressable
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteItem(item.id)}
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
                onPress={handleAddNumber}  
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
                disabled={isLoading}
            >
                <Text style={styles.floatingAddButtonText}>Добавить номер</Text>
                <Text style={styles.floatingAddIcon}>+</Text>
            </Pressable>

            <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
                <BottomBar />
            </View>
        </View>
    );
};

export default SmsControl;