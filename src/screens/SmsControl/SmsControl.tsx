// import React, { useState, useCallback, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Pressable,
//     Alert,
//     ActivityIndicator,
//     RefreshControl,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../navigation/types';
// import { styles } from './SmsControl.styles';
// import BottomBar from '../../components/BottomBar/BottomBar';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// interface PhoneNumberItem {
//     id: number;
//     phone_name: string;
//     phone_number: string;
// }

// const SmsControl: React.FC = () => {
//     const insets = useSafeAreaInsets();
//     const navigation = useNavigation<NavigationProp>();
    
//     const [smsList, setSmsList] = useState<PhoneNumberItem[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchPhoneNumbers = async () => {
//         try {
//             setIsLoading(true);
//             setError(null);
            
//             const userId = 1;
//             const url = `http://89.111.169.247/api/mobileapp/phoneNumber/findAllNumbersByUserId/${userId}`;
//             console.log('Отправляю запрос на:', url);
            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//             });

//             if (response.ok && response.status === 200) {
//                 const data = await response.json();
//                 console.log('Данные получены:', data);
//                 setSmsList(data.data || []);
//             } else if (response.status >= 400 && response.status < 500) {
//                 setError('Ошибка при загрузке данных. Проверьте авторизацию.');
//                 console.error('Client error:', response.status);
//             } else {
//                 setError('Ошибка сервера. Попробуйте позже.');
//                 console.error('Server error:', response.status);
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError('Ошибка соединения с сервером');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Автоматическое обновление при фокусе на экране
//     useFocusEffect(
//         useCallback(() => {
//             console.log('Экран SmsControl в фокусе, обновляю данные...');
//             fetchPhoneNumbers();
//         }, [])
//     );

//     // Первоначальная загрузка
//     useEffect(() => {
//         fetchPhoneNumbers();
//     }, []);

//     const handleAddNumber = () => {
//         navigation.navigate('NumberSetting');
//     };

//     const handleDeleteItem = async (id: number) => {
//         try {
//             const response = await fetch(
//                 `http://89.111.169.247/api/mobileapp/phoneNumber/deleteNumber/${id}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                 }
//             );

//             if (response.ok && response.status === 200) {
//                 setSmsList(prevList => prevList.filter(item => item.id !== id));
//                 Alert.alert('Успешно', 'Номер удален');
//                 // После удаления обновляем список
//                 fetchPhoneNumbers();
//             } else if (response.status >= 400 && response.status < 500) {
//                 Alert.alert('Ошибка', 'Не удалось удалить номер');
//             } else {
//                 Alert.alert('Ошибка сервера', 'Попробуйте позже');
//             }
//         } catch (error) {
//             console.error('Delete error:', error);
//             Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
//         }
//     };

//     const handleGoBack = () => {
//         navigation.goBack();
//     };

//     const handleRefresh = () => {
//         fetchPhoneNumbers();
//     };

//     return (
//         <View style={[styles.container, { paddingTop: insets.top }]}>
//             {/* Заголовок с кнопкой "Назад" */}
//             <View style={styles.header}>
//                 <Pressable 
//                     onPress={handleGoBack}
//                     style={styles.backButton}
//                 >
//                     <Text style={styles.backButtonText}>←</Text>
//                 </Pressable>
//                 <Text style={styles.headerText}>Контроль СМС</Text>
                
//                 {/* Кнопка обновления */}
//                 <Pressable 
//                     onPress={handleRefresh}
//                     style={({ pressed }) => [
//                         { position: 'absolute', right: 16 },
//                         pressed && styles.buttonPressed,
//                     ]}
//                 >
//                     <Text style={[styles.backButtonText, { fontSize: 20 }]}>⟳</Text>
//                 </Pressable>
//             </View>

//             {/* Основной контент */}
//             <ScrollView
//                 style={styles.content}
//                 contentContainerStyle={styles.scrollContent}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={isLoading}
//                         onRefresh={handleRefresh}
//                         colors={['#4CAF50']}
//                         tintColor="#4CAF50"
//                     />
//                 }
//             >
//                 {isLoading ? (
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="large" color="#4CAF50" />
//                         <Text style={styles.loadingText}>Загрузка номеров...</Text>
//                     </View>
//                 ) : error ? (
//                     <View style={styles.errorContainer}>
//                         <Text style={styles.errorText}>{error}</Text>
//                         <Pressable
//                             style={styles.retryButton}
//                             onPress={handleRefresh}
//                         >
//                             <Text style={styles.retryButtonText}>Повторить</Text>
//                         </Pressable>
//                     </View>
//                 ) : smsList.length === 0 ? (
//                     <View style={styles.emptyContainer}>
//                         <Text style={styles.emptyText}>Нет добавленных номеров</Text>
//                         <Text style={styles.emptySubText}>
//                             Нажмите "Добавить номер" для начала
//                         </Text>
//                     </View>
//                 ) : (
//                     <>
//                         {/* Список номеров */}
//                         {smsList.map((item) => (
//                             <Pressable
//                                 key={item.id}
//                                 style={({ pressed }) => [
//                                     styles.smsItem,
//                                     pressed && styles.buttonPressed,
//                                 ]}
//                                 onPress={() => {
//                                     // Переход на экран редактирования с передачей данных
//                                     navigation.navigate('NumberSetting', {
//                                         id: item.id,
//                                         phone_name: item.phone_name,
//                                         phone_number: item.phone_number,
//                                     });
//                                 }}
//                                 android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
//                             >
//                                 <View style={styles.itemContent}>
//                                     <Text style={styles.bankName}>{item.phone_name}</Text>
//                                     <Text style={styles.phoneNumber}>{item.phone_number}</Text>
//                                 </View>
//                                 <Pressable
//                                     style={styles.deleteButton}
//                                     onPress={() => handleDeleteItem(item.id)}
//                                 >
//                                     <Text style={styles.deleteIcon}>🗑️</Text>
//                                 </Pressable>
//                             </Pressable>
//                         ))}
                        
//                         {/* Отступ для плавающей кнопки */}
//                         <View style={styles.floatingButtonSpacing} />
//                     </>
//                 )}
//             </ScrollView>

//             {/* Плавающая кнопка "Добавить номер" */}
//             <Pressable
//                 style={({ pressed }) => [
//                     styles.floatingAddButton,
//                     { bottom: insets.bottom + 70 },
//                     pressed && styles.buttonPressed,
//                 ]}
//                 onPress={handleAddNumber}  
//                 android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
//                 disabled={isLoading}
//             >
//                 <Text style={styles.floatingAddButtonText}>Добавить номер</Text>
//                 <Text style={styles.floatingAddIcon}>+</Text>
//             </Pressable>

//             {/* Нижняя навигация */}
//             <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
//                 <BottomBar />
//             </View>
//         </View>
//     );
// };

// export default SmsControl;








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
            // Устанавливаем номера для отслеживания SMS
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

    // Автоматическое обновление при фокусе на экране
    useFocusEffect(
        useCallback(() => {
            console.log('Экран SmsControl в фокусе, обновляю данные...');
            fetchPhoneNumbers();
        }, [])
    );

    // Первоначальная загрузка
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
            // После удаления обновляем список и переустанавливаем наблюдаемые номера
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
            {/* Заголовок с кнопкой "Назад" */}
            <View style={styles.header}>
                <Pressable 
                    onPress={handleGoBack}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </Pressable>
                <Text style={styles.headerText}>Контроль СМС</Text>
                
                {/* Кнопка обновления */}
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

            {/* Основной контент */}
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
                        {/* Список номеров */}
                        {smsList.map((item) => (
                            <Pressable
                                key={item.id}
                                style={({ pressed }) => [
                                    styles.smsItem,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => {
                                    // Переход на экран редактирования с передачей данных
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
                        
                        {/* Отступ для плавающей кнопки */}
                        <View style={styles.floatingButtonSpacing} />
                    </>
                )}
            </ScrollView>

            {/* Плавающая кнопка "Добавить номер" */}
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

            {/* Нижняя навигация */}
            <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
                <BottomBar />
            </View>
        </View>
    );
};

export default SmsControl;