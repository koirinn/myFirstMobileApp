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
import { styles } from './EmailSetting.styles';
import BottomBar from '../../components/BottomBar/BottomBar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = {
    key: string;
    name: string;
    params?: {
        id?: number;
        email_name?: string;
        email_address?: string;
        email_from?: string;
        email_password?: string;
    };
};

interface RuleItem {
    id: number;
    ruleName: string;
    description: string;
    rule_name_id: number; 
}

const EmailSetting: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();

    const [emailName, setEmailName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emailFrom, setEmailFrom] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rules, setRules] = useState<RuleItem[]>([]);
    const [isLoadingRules, setIsLoadingRules] = useState(false);

    const isEditing = route.params?.id !== undefined;
    const editingId = route.params?.id;

    console.log(isEditing, editingId);

    useEffect(() => {
        if (route.params?.email_name) {
            setEmailName(route.params.email_name);
        }
        if (route.params?.email_address) {
            setEmailAddress(route.params.email_address);
        }
        if (route.params?.email_from) {
            setEmailFrom(route.params.email_from);
        }
        if (route.params?.email_password) { 
            setEmailPassword(route.params.email_password)
        }
    }, [route.params]);

    const fetchRulesForEmail = async (EmailId: number) => {
        try {
            setIsLoadingRules(true);
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/email/findAllRulesByEmailId/${EmailId}`,
            );
            const data = await response.json();
            console.log(data);
            if (data.success && Array.isArray(data.data)) {
                setRules(data.data);
            } else {
                setRules([]);
            }
        } catch (error) {
            console.error('Ошибка загрузки правил почтового адреса:', error);
            setRules([]);
        } finally {
            setIsLoadingRules(false);
        }
    };

    useEffect(() => {
        if (isEditing && editingId) {
            fetchRulesForEmail(editingId);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (isEditing && editingId) {
                fetchRulesForEmail(editingId);
            }
        }, [isEditing, editingId])
    );

    const handleSave = async () => {
        if (!emailName.trim() || !emailAddress.trim() || !emailFrom.trim() || !emailPassword.trim()) {
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
                url = `http://89.111.169.247/api/mobileapp/email/saveEmail/${editingId}`;
                method = 'PUT';
                body = {
                    email_name: emailName.trim(),
                    email_address: emailAddress.trim(),
                    email_from: emailFrom.trim(),
                    email_password: emailPassword.trim(),
                };
            } else {
                url = 'http://89.111.169.247/api/mobileapp/email/addEmail';
                method = 'POST';
                body = {
                    email_name: emailName.trim(),
                    email_address: emailAddress.trim(),
                    email_from: emailFrom.trim(),
                    email_password: emailPassword.trim(),
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
            Alert.alert('Ошибка', 'Сначала сохраните email');
            return;
        }
        if (!emailName.trim() || !emailAddress.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните название и почтовый адрес');
            return;
        }

        const currentId = editingId as number;

        navigation.navigate('EmailRuleSetting', {
            emailId: currentId,
            emailName: emailName.trim(),
            emailBoxAddress: emailAddress.trim(),
            emailFrom: emailFrom.trim(),
            emailPassword: emailPassword.trim(),
        });
    };

    const handleDeleteRule = async (id: number, ruleName: string) => {
        try {
            const response = await fetch(
                `http://89.111.169.247/api/mobileapp/email/deleteEmailRule/${id}`,
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
                    {isEditing ? 'Редактирование' : 'Настройка email'}
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Название почтового адреса</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите название"
                        placeholderTextColor="#999999"
                        value={emailName}
                        onChangeText={setEmailName}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Почтовый адрес получателя</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите почтовый адрес"
                        placeholderTextColor="#999999"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Почтовый адрес отправителя</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите почтовый адрес"
                        placeholderTextColor="#999999"
                        value={emailFrom}
                        onChangeText={setEmailFrom}
                        editable={!isSaving}
                    />

                    <Text style={styles.inputLabel}>Пароль приложения (не является паролем от почты)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите пароль"
                        placeholderTextColor="#999999"
                        value={emailPassword}
                        onChangeText={setEmailPassword}
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
                                navigation.navigate('EmailRuleSetting', {
                                    emailId: editingId!,
                                    emailName: emailName,
                                    emailBoxAddress: emailAddress,
                                    emailFrom: emailFrom,
                                    emailPassword: emailPassword,
                                    ruleId: item.id,           
                                    ruleName: item.ruleName,
                                    ruleCondition: item.description,
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
                    (!isEditing || !emailName.trim() || !emailAddress.trim() || !emailFrom.trim() || !emailPassword.trim()) && styles.buttonDisabled,
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleAddRule}
                disabled={isSaving || !isEditing || !emailName.trim() || !emailAddress.trim() || !emailFrom.trim() || !emailPassword.trim()}
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

export default EmailSetting;