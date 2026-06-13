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
import { styles } from './DeviceSetting.styles';
import BottomBar from '../../components/BottomBar/BottomBar';
import ApiServise from '../../services/ApiServise';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = {
    key: string;
    name: string;
    params?: {
        id?: number;
        device_name?: string;
        device_phone?: string;
        code_phrase?: string;
        code_response?: string;
        period_minutes?: number;
        response_interval_minutes?: number;
    };
};

interface RuleItem {
    id: number;
    ruleName: string;
    description: string;
    rule_name_id: number;
}

const DeviceSetting: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();

    // Поля устройства
    const [deviceName, setDeviceName] = useState('');
    const [devicePhone, setDevicePhone] = useState('');
    const [codePhrase, setCodePhrase] = useState('');
    const [codeResponse, setCodeResponse] = useState('');
    const [periodMinutes, setPeriodMinutes] = useState('');
    const [responseIntervalMinutes, setResponseIntervalMinutes] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rules, setRules] = useState<RuleItem[]>([]);
    const [isLoadingRules, setIsLoadingRules] = useState(false);

    const isEditing = route.params?.id !== undefined;
    const editingId = route.params?.id;

    // Заполняем поля при редактировании
    useEffect(() => {
        if (route.params?.device_name) setDeviceName(route.params.device_name);
        if (route.params?.device_phone) setDevicePhone(route.params.device_phone);
        if (route.params?.code_phrase) setCodePhrase(route.params.code_phrase);
        if (route.params?.code_response) setCodeResponse(route.params.code_response);
        if (route.params?.period_minutes) setPeriodMinutes(String(route.params.period_minutes));
        if (route.params?.response_interval_minutes) setResponseIntervalMinutes(String(route.params.response_interval_minutes));
    }, [route.params]);

    console.log(route.params);7

    // Загрузка правил для устройства
    const fetchRulesForDevice = async (deviceId: number) => {
        try {
            setIsLoadingRules(true);
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/device/findRulesByDeviceId/${deviceId}`,
            );
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setRules(data.data);
            } else {
                setRules([]);
            }
        } catch (error) {
            console.error('Ошибка загрузки правил устройства:', error);
            setRules([]);
        } finally {
            setIsLoadingRules(false);
        }
    };

    // Загружаем правила при первом открытии (если редактирование)
    useEffect(() => {
        if (isEditing && editingId) {
            fetchRulesForDevice(editingId);
        }
    }, []);

    // Перезагружаем правила при возврате на экран (после добавления/редактирования правила)
    useFocusEffect(
        useCallback(() => {
            if (isEditing && editingId) {
                fetchRulesForDevice(editingId);
            }
        }, [isEditing, editingId])
    );

    const handleSave = async () => {
        if (!deviceName.trim() || !devicePhone.trim() || !codePhrase.trim() || !codeResponse.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните обязательные поля (название, телефон, кодовая фраза, кодовый ответ)');
            return;
        }
        const period = parseInt(periodMinutes, 10);
        const responseInterval = parseInt(responseIntervalMinutes, 10);
        if (isNaN(period) || period <= 0) {
            Alert.alert('Ошибка', 'Периодичность отправки должна быть положительным числом (минуты)');
            return;
        }
        if (isNaN(responseInterval) || responseInterval <= 0) {
            Alert.alert('Ошибка', 'Интервал между запросом и ответом должен быть положительным числом (минуты)');
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
                url = `http://89.111.169.247/api/mobileapp/device/saveDevice/${editingId}`;
                method = 'PUT';
                body = {
                    device_name: deviceName.trim(),
                    device_phone: devicePhone.trim(),
                    code_phrase: codePhrase.trim(),
                    code_response: codeResponse.trim(),
                    period_minutes: period,
                    response_interval_minutes: responseInterval,
                };
            } else {
                url = 'http://89.111.169.247/api/mobileapp/device/addDevice';
                method = 'POST';
                body = {
                    device_name: deviceName.trim(),
                    device_phone: devicePhone.trim(),
                    code_phrase: codePhrase.trim(),
                    code_response: codeResponse.trim(),
                    period_minutes: period,
                    response_interval_minutes: responseInterval,
                };
            }

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
            Alert.alert('Ошибка', 'Сначала сохраните устройство');
            return;
        }
        if (!deviceName.trim() || !devicePhone.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните название и телефон устройства');
            return;
        }
        navigation.navigate('DeviceRuleSetting', {
            DeviceId: editingId!, // здесь можно использовать deviceId, но для правил устройств нужен отдельный RuleSetting или адаптация
            DeviceName: deviceName.trim(),
            DeviceNumber: devicePhone.trim(),
        });
    };

    const handleDeleteRule = async (id: number, ruleName: string) => {
        try {
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/device/deleteDeviceRule/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const responseData = await response.json();
            if (response.ok && response.status === 200) {
                setRules(prev => prev.filter(rule => rule.id !== id));
                Alert.alert('Успешно', `Правило "${ruleName}" удалено`);
            } else {
                Alert.alert('Ошибка', responseData.message || 'Не удалось удалить правило');
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
                    {isEditing ? 'Редактирование устройства' : 'Настройка устройства'}
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Название устройства</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите название"
                        placeholderTextColor="#999999"
                        value={deviceName}
                        onChangeText={setDeviceName}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Номер телефона устройства</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите номер телефона"
                        placeholderTextColor="#999999"
                        keyboardType="phone-pad"
                        value={devicePhone}
                        onChangeText={setDevicePhone}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Кодовая фраза</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите кодовую фразу"
                        placeholderTextColor="#999999"
                        value={codePhrase}
                        onChangeText={setCodePhrase}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Кодовый ответ</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите кодовый ответ"
                        placeholderTextColor="#999999"
                        value={codeResponse}
                        onChangeText={setCodeResponse}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Периодичность отправки (в минутах)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите время"
                        placeholderTextColor="#999999"
                        keyboardType="numeric"
                        value={periodMinutes}
                        onChangeText={setPeriodMinutes}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Интервал между запросом и ответом (в минутах)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите время"
                        placeholderTextColor="#999999"
                        keyboardType="numeric"
                        value={responseIntervalMinutes}
                        onChangeText={setResponseIntervalMinutes}
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

                <Text style={styles.rulesTitle}>Правила для устройства</Text>

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
                                navigation.navigate('DeviceRuleSetting', {
                                    DeviceId: editingId!,
                                    DeviceName: deviceName,
                                    DeviceNumber: devicePhone,
                                    ruleId: item.id,
                                    ruleName: item.ruleName,
                                    ruleNameId: item.rule_name_id,
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
                    (!isEditing || !deviceName.trim() || !devicePhone.trim()) && styles.buttonDisabled,
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleAddRule}
                disabled={isSaving || !isEditing || !deviceName.trim() || !devicePhone.trim()}
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

export default DeviceSetting;