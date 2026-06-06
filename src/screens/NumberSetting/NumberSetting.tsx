// import React, { useState, useEffect, useCallback } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Pressable,
//     TextInput,
//     Alert,
//     ActivityIndicator,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../navigation/types';
// import { styles } from './NumberSetting.styles';
// import BottomBar from '../../components/BottomBar/BottomBar';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
// type RouteProps = {
//     key: string;
//     name: string;
//     params?: {
//         id?: number;
//         phone_name?: string;
//         phone_number?: string;
//         // newRules и updatedRule больше не нужны, так как обновление через useFocusEffect
//     };
// };

// interface RuleItem {
//     id: number;
//     ruleName: string;
//     description: string;
// }

// const NumberSetting: React.FC = () => {
//     const insets = useSafeAreaInsets();
//     const navigation = useNavigation<NavigationProp>();
//     const route = useRoute<RouteProps>();

//     const [numberName, setNumberName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [isSaving, setIsSaving] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [rules, setRules] = useState<RuleItem[]>([]);
//     const [isLoadingRules, setIsLoadingRules] = useState(false);

//     const isEditing = route.params?.id !== undefined;
//     const editingId = route.params?.id;

//     // Заполняем поля при получении параметров (для редактирования)
//     useEffect(() => {
//         if (route.params?.phone_name) {
//             setNumberName(route.params.phone_name);
//         }
//         if (route.params?.phone_number) {
//             setPhoneNumber(route.params.phone_number);
//         }
//     }, [route.params]);

//     // Функция загрузки правил
//     const fetchRulesForPhoneNumber = async (phoneNumberId: number) => {
//         try {
//             setIsLoadingRules(true);
//             const response = await fetch(
//                 `http://89.111.169.247/api/mobileapp/phoneNumber/findRulesByPhoneNumberId/${phoneNumberId}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                 }
//             );
//             const data = await response.json();
//             if (data.success && Array.isArray(data.data)) {
//                 setRules(data.data);
//             } else {
//                 setRules([]);
//             }
//         } catch (error) {
//             console.error('Ошибка загрузки правил:', error);
//             setRules([]);
//         } finally {
//             setIsLoadingRules(false);
//         }
//     };

//     // Загружаем правила при первом открытии (если редактирование)
//     useEffect(() => {
//         if (isEditing && editingId) {
//             fetchRulesForPhoneNumber(editingId);
//         }
//     }, []);

//     // Перезагружаем правила при возврате на экран (после добавления/редактирования правила)
//     useFocusEffect(
//         useCallback(() => {
//             if (isEditing && editingId) {
//                 fetchRulesForPhoneNumber(editingId);
//             }
//         }, [isEditing, editingId])
//     );

//     const handleSave = async () => {
//         if (!numberName.trim() || !phoneNumber.trim()) {
//             Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
//             return;
//         }

//         try {
//             setIsSaving(true);
//             setError(null);

//             let url: string;
//             let method: string;
//             let body: any;

//             if (isEditing && editingId) {
//                 url = `http://89.111.169.247/api/mobileapp/phoneNumber/saveNumber/${editingId}`;
//                 method = 'PUT';
//                 body = {
//                     phone_name: numberName.trim(),
//                     phone_number: phoneNumber.trim(),
//                 };
//             } else {
//                 url = 'http://89.111.169.247/api/mobileapp/phoneNumber/addNumber';
//                 method = 'POST';
//                 body = {
//                     user_id: 1, // тестовый ID
//                     phone_name: numberName.trim(),
//                     phone_number: phoneNumber.trim(),
//                 };
//             }

//             console.log(`${method} запрос на:`, url, body);

//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 body: JSON.stringify(body),
//             });

//             const responseData = await response.json();
//             console.log('Ответ сервера:', responseData);

//             if (response.ok && response.status === 200) {
//                 navigation.goBack();
//             } else if (response.status >= 400 && response.status < 500) {
//                 const errorMessage = responseData.message || 'Ошибка при сохранении';
//                 setError(errorMessage);
//                 Alert.alert('Ошибка', errorMessage);
//             } else {
//                 setError('Ошибка сервера. Попробуйте позже.');
//                 Alert.alert('Ошибка сервера', 'Попробуйте позже');
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError('Ошибка соединения с сервером');
//             Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleAddRule = () => {
//         if (!isEditing) {
//             Alert.alert('Ошибка', 'Сначала сохраните номер');
//             return;
//         }
//         if (!numberName.trim() || !phoneNumber.trim()) {
//             Alert.alert('Ошибка', 'Пожалуйста, заполните название и номер телефона');
//             return;
//         }

//         const currentId = editingId as number;

//         navigation.navigate('RuleSetting', {
//             phoneNumberId: currentId,
//             numberName: numberName.trim(),
//             phoneNumber: phoneNumber.trim(),
//         });
//     };

//     const handleDeleteRule = async (id: number, ruleName: string) => {
//         try {
//             const response = await fetch(
//                 `http://89.111.169.247/api/mobileapp/phoneNumber/deleteRule/${id}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                 }
//             );

//             const responseData = await response.json();
//             console.log('Удаление правила, ответ:', responseData);

//             if (response.ok && response.status === 200) {
//                 setRules(prevRules => prevRules.filter(rule => rule.id !== id));
//                 Alert.alert('Успешно', `Правило "${ruleName}" удалено`);
//             } else if (response.status >= 400 && response.status < 500) {
//                 const errorMessage = responseData.message || 'Ошибка при удалении правила';
//                 Alert.alert('Ошибка', errorMessage);
//             } else {
//                 Alert.alert('Ошибка сервера', 'Попробуйте позже');
//             }
//         } catch (error) {
//             console.error('Delete rule error:', error);
//             Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
//         }
//     };

//     const handleGoBack = () => {
//         navigation.goBack();
//     };

//     return (
//         <View style={[styles.container, { paddingTop: insets.top }]}>
//             <View style={styles.header}>
//                 <Pressable onPress={handleGoBack} style={styles.backButton}>
//                     <Text style={styles.backButtonText}>←</Text>
//                 </Pressable>
//                 <Text style={styles.headerText}>
//                     {isEditing ? 'Редактирование' : 'Настройка номера'}
//                 </Text>
//             </View>

//             <ScrollView
//                 style={styles.content}
//                 contentContainerStyle={styles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.inputSection}>
//                     <Text style={styles.inputLabel}>Название номера</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Введите название"
//                         placeholderTextColor="#999999"
//                         value={numberName}
//                         onChangeText={setNumberName}
//                         editable={!isSaving}
//                     />

//                     <Text style={styles.inputLabel}>Номер телефона</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Введите номер телефона"
//                         placeholderTextColor="#999999"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                         editable={!isSaving}
//                     />
//                 </View>

//                 {error && (
//                     <View style={styles.errorContainer}>
//                         <Text style={styles.errorText}>{error}</Text>
//                     </View>
//                 )}

//                 <Pressable
//                     style={({ pressed }) => [
//                         styles.saveButton,
//                         pressed && styles.buttonPressed,
//                         isSaving && styles.buttonDisabled,
//                     ]}
//                     onPress={handleSave}
//                     disabled={isSaving}
//                 >
//                     {isSaving ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                     ) : (
//                         <Text style={styles.saveButtonText}>
//                             {isEditing ? 'Сохранить изменения' : 'Сохранить'}
//                         </Text>
//                     )}
//                 </Pressable>

//                 <Text style={styles.rulesTitle}>Правила</Text>

//                 {isLoadingRules ? (
//                     <View style={styles.loadingRulesContainer}>
//                         <ActivityIndicator size="small" color="#4CAF50" />
//                         <Text style={styles.loadingRulesText}>Загрузка правил...</Text>
//                     </View>
//                 ) : rules.length === 0 ? (
//                     <Text style={styles.emptyRulesText}>Нет добавленных правил</Text>
//                 ) : (
//                     rules.map((item) => (
//                         <Pressable
//                             key={item.id}
//                             style={({ pressed }) => [
//                                 styles.ruleItem,
//                                 pressed && styles.buttonPressed,
//                             ]}
//                             onPress={() => {
//                                 navigation.navigate('RuleSetting', {
//                                     phoneNumberId: editingId!,
//                                     numberName: numberName,
//                                     phoneNumber: phoneNumber,
//                                     ruleId: item.id,
//                                     ruleName: item.ruleName,
//                                     ruleCondition: item.description,
//                                 });
//                             }}
//                         >
//                             <View style={styles.itemContent}>
//                                 <Text style={styles.ruleName}>{item.ruleName}</Text>
//                                 <Text style={styles.ruleDescription}>{item.description}</Text>
//                             </View>
//                             <Pressable
//                                 style={styles.deleteButton}
//                                 onPress={() => handleDeleteRule(item.id, item.ruleName)}
//                             >
//                                 <Text style={styles.deleteIcon}>🗑️</Text>
//                             </Pressable>
//                         </Pressable>
//                     ))
//                 )}

//                 <View style={styles.floatingButtonSpacing} />
//             </ScrollView>

//             <Pressable
//                 style={({ pressed }) => [
//                     styles.floatingAddButton,
//                     { bottom: insets.bottom + 70 },
//                     (!isEditing || !numberName.trim() || !phoneNumber.trim()) && styles.buttonDisabled,
//                     pressed && styles.buttonPressed,
//                 ]}
//                 onPress={handleAddRule}
//                 disabled={isSaving || !isEditing || !numberName.trim() || !phoneNumber.trim()}
//             >
//                 <Text style={styles.floatingAddButtonText}>Добавить правило</Text>
//                 <Text style={styles.floatingAddIcon}>+</Text>
//             </Pressable>

//             <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
//                 <BottomBar />
//             </View>
//         </View>
//     );
// };

// export default NumberSetting;



















import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './NumberSetting.styles';
import BottomBar from '../../components/BottomBar/BottomBar';
import ApiServise from '../../services/ApiServise';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = {
    key: string;
    name: string;
    params?: {
        id?: number;
        phone_name?: string;
        phone_number?: string;
    };
};

interface RuleItem {
    id: number;
    ruleName: string;
    description: string;
    rule_name_id: number; // ID типа правила (из phone_rules_list)
}

const NumberSetting: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();

    const [numberName, setNumberName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rules, setRules] = useState<RuleItem[]>([]);
    const [isLoadingRules, setIsLoadingRules] = useState(false);

    const isEditing = route.params?.id !== undefined;
    const editingId = route.params?.id;

    // Заполняем поля при получении параметров (для редактирования)
    useEffect(() => {
        if (route.params?.phone_name) {
            setNumberName(route.params.phone_name);
        }
        if (route.params?.phone_number) {
            setPhoneNumber(route.params.phone_number);
        }
    }, [route.params]);

    // Функция загрузки правил
    const fetchRulesForPhoneNumber = async (phoneNumberId: number) => {
        try {
            setIsLoadingRules(true);
            setRules(await ApiServise.fetchRulesForPhoneNumber(phoneNumberId) || []);
        } catch (error) {
            console.error('Ошибка загрузки правил:', error);
            setRules([]);
        } finally {
            setIsLoadingRules(false);
        }
    };

    // Загружаем правила при первом открытии (если редактирование)
    useEffect(() => {
        if (isEditing && editingId) {
            fetchRulesForPhoneNumber(editingId);
        }
    }, []);

    // Перезагружаем правила при возврате на экран (после добавления/редактирования правила)
    useFocusEffect(
        useCallback(() => {
            if (isEditing && editingId) {
                fetchRulesForPhoneNumber(editingId);
            }
        }, [isEditing, editingId])
    );

    const handleSave = async () => {
        if (!numberName.trim() || !phoneNumber.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
            return;
        }

        try {
            setIsSaving(true);
            setError(null);
            
            const token = await AsyncStorage.getItem(
                'accessToken'
            );

            if (!token) {
                throw new Error('NOT_AUTHORIZED');
            }

            let url: string;
            let method: string;
            let body: any;

            if (isEditing && editingId) {
                url = `http://89.111.169.247/api/mobileapp/phoneNumber/saveNumber/${editingId}`;
                method = 'PUT';
                body = {
                    phone_name: numberName.trim(),
                    phone_number: phoneNumber.trim(),
                };
            } else {
                url = 'http://89.111.169.247/api/mobileapp/phoneNumber/addNumber';
                method = 'POST';
                body = {
                    // user_id: 1,
                    phone_name: numberName.trim(),
                    phone_number: phoneNumber.trim(),
                };
            }

            console.log(`${method} запрос на:`, url, body);

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const responseData = await response.json();
            console.log('Ответ сервера:', responseData);

            if (response.ok && response.status === 200) {
                navigation.goBack();
            } else if (response.status >= 400 && response.status < 500) {
                const errorMessage = responseData.message || 'Ошибка при сохранении';
                setError(errorMessage);
                Alert.alert('Ошибка', errorMessage);
            } else {
                setError('Ошибка сервера. Попробуйте позже.');
                Alert.alert('Ошибка сервера', 'Попробуйте позже');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Ошибка соединения с сервером');
            Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddRule = () => {
        if (!isEditing) {
            Alert.alert('Ошибка', 'Сначала сохраните номер');
            return;
        }
        if (!numberName.trim() || !phoneNumber.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните название и номер телефона');
            return;
        }

        const currentId = editingId as number;

        navigation.navigate('RuleSetting', {
            phoneNumberId: currentId,
            numberName: numberName.trim(),
            phoneNumber: phoneNumber.trim(),
        });
    };

    const handleDeleteRule = async (id: number, ruleName: string) => {
        try {
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/phoneNumber/deleteRule/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            const responseData = await response.json();
            console.log('Удаление правила, ответ:', responseData);

            if (response.ok && response.status === 200) {
                setRules(prevRules => prevRules.filter(rule => rule.id !== id));
                Alert.alert('Успешно', `Правило "${ruleName}" удалено`);
            } else if (response.status >= 400 && response.status < 500) {
                const errorMessage = responseData.message || 'Ошибка при удалении правила';
                Alert.alert('Ошибка', errorMessage);
            } else {
                Alert.alert('Ошибка сервера', 'Попробуйте позже');
            }
        } catch (error) {
            console.error('Delete rule error:', error);
            Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable onPress={handleGoBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </Pressable>
                <Text style={styles.headerText}>
                    {isEditing ? 'Редактирование' : 'Настройка номера'}
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Название номера</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите название"
                        placeholderTextColor="#999999"
                        value={numberName}
                        onChangeText={setNumberName}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Номер телефона</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите номер телефона"
                        placeholderTextColor="#999999"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        editable={!isSaving}
                    />
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <Pressable
                    style={({ pressed }) => [
                        styles.saveButton,
                        pressed && styles.buttonPressed,
                        isSaving && styles.buttonDisabled,
                    ]}
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            {isEditing ? 'Сохранить изменения' : 'Сохранить'}
                        </Text>
                    )}
                </Pressable>

                <Text style={styles.rulesTitle}>Правила</Text>

                {isLoadingRules ? (
                    <View style={styles.loadingRulesContainer}>
                        <ActivityIndicator size="small" color="#4CAF50" />
                        <Text style={styles.loadingRulesText}>Загрузка правил...</Text>
                    </View>
                ) : rules.length === 0 ? (
                    <Text style={styles.emptyRulesText}>Нет добавленных правил</Text>
                ) : (
                    rules.map((item) => (
                        <Pressable
                            key={item.id}
                            style={({ pressed }) => [
                                styles.ruleItem,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={() => {
                                navigation.navigate('RuleSetting', {
                                    phoneNumberId: editingId!,
                                    numberName: numberName,
                                    phoneNumber: phoneNumber,
                                    ruleId: item.id,                 // ID записи в phone_rules
                                    ruleName: item.ruleName,
                                    ruleCondition: item.description,
                                    ruleNameId: item.rule_name_id,   // ID типа правила (ключевое!)
                                });
                            }}
                        >
                            <View style={styles.itemContent}>
                                <Text style={styles.ruleName}>{item.ruleName}</Text>
                                <Text style={styles.ruleDescription}>{item.description}</Text>
                            </View>
                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => handleDeleteRule(item.id, item.ruleName)}
                            >
                                <Text style={styles.deleteIcon}>🗑️</Text>
                            </Pressable>
                        </Pressable>
                    ))
                )}

                <View style={styles.floatingButtonSpacing} />
            </ScrollView>

            <Pressable
                style={({ pressed }) => [
                    styles.floatingAddButton,
                    { bottom: insets.bottom + 70 },
                    (!isEditing || !numberName.trim() || !phoneNumber.trim()) && styles.buttonDisabled,
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleAddRule}
                disabled={isSaving || !isEditing || !numberName.trim() || !phoneNumber.trim()}
            >
                <Text style={styles.floatingAddButtonText}>Добавить правило</Text>
                <Text style={styles.floatingAddIcon}>+</Text>
            </Pressable>

            <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
                <BottomBar />
            </View>
        </View>
    );
};

export default NumberSetting;