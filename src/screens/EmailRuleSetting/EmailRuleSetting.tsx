import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    TextInput,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './EmailRuleSetting.styles';
import BottomBar from '../../components/BottomBar/BottomBar';
import ApiServise from '../../services/ApiServise';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = {
    key: string;
    name: string;
    params: {
        emailId: number;
        emailName: string;
        emailBoxAddress: string;
        emailFrom: string;
        emailPassword: string;
        ruleId?: number;
        ruleName?: string;
        ruleCondition?: string;
        ruleNameId?: number;
    };
};

interface Rule {
    id: number;
    rule_name: string;
}

const EmailRuleSetting: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();

    const { emailId, emailName, emailBoxAddress, emailFrom, emailPassword, ruleId, ruleCondition, ruleNameId } = route.params;

    console.log('RuleSetting params:', route.params);

    const [emailText, setEmailText] = useState('');
    const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [rules, setRules] = useState<Rule[]>([]);
    const [isLoadingRules, setIsLoadingRules] = useState(true);
    const [rulesError, setRulesError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Дополнительные поля для правила №2 (отправка email)
    const [emailAddress, setEmailAddress] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [showEmailFields, setShowEmailFields] = useState(false);
    const [currentEmailRuleId, setCurrentEmailRuleId] = useState<number | null>(null);


    // Дополнительные поля для правила №3 (отправка SMS)
    const [smsPhone, setSmsPhone] = useState('');
    const [smsMessage, setSmsMessage] = useState('');
    const [showSmsFields, setShowSmsFields] = useState(false);
    const [currentSmsRuleId, setCurrentSmsRuleId] = useState<number | null>(null);

    const isEditing = ruleId !== undefined;
    const isEmailRuleSelected = selectedRuleIds.includes(2);
    const isSmsRuleSelected = selectedRuleIds.includes(3);

    // Загрузка email данных при редактировании email правила
    useEffect(() => {
        const fetchEmailData = async () => {
            if (isEditing && ruleId) {
                console.log('fetchEmailData');
                try {
                    const emailResponse = await fetch(
                        `http://89.111.169.247/api/mobileapp/email/getEmailEmailsByRuleId/${ruleId}`
                    );
                    const emailData = await emailResponse.json();
                    console.log(emailData);
                    
                    if (emailData.success && emailData.data && emailData.data.length > 0) {
                        const emailInfo = emailData.data[0];
                        setEmailAddress(emailInfo.email || '');
                        setEmailSubject(emailInfo.theme || '');
                        setEmailBody(emailInfo.description || '');
                        setCurrentEmailRuleId(ruleId);
                    } else {
                        // Очищаем поля, если нет данных
                        setEmailAddress('');
                        setEmailSubject('');
                        setEmailBody('');
                        setCurrentEmailRuleId(null);
                    }
                } catch (error) {
                    console.error('Ошибка загрузки email данных:', error);
                    setEmailAddress('');
                    setEmailSubject('');
                    setEmailBody('');
                    setCurrentEmailRuleId(null);
                }
            }
        };
        
        fetchEmailData();
    }, [isEditing, ruleId]);


    // Загрузка SMS данных при редактировании SMS правила
    useEffect(() => {
        const fetchSmsData = async () => {
            if (
                isEditing &&
                ruleId &&
                selectedRuleIds.includes(3)
            ) {
                try {
                    const response = await fetch(
                        `http://89.111.169.247/api/mobileapp/email/getEmailSmsByRuleId/${ruleId}`
                    );

                    const data = await response.json();
                    console.log(data);

                    if (
                        data.success &&
                        data.data &&
                        data.data.length > 0
                    ) {

                        const smsInfo = data.data[0];

                        setSmsPhone(smsInfo.phone || '');
                        setSmsMessage(smsInfo.text || '');

                        setCurrentSmsRuleId(ruleId);

                    } else {

                        setSmsPhone('');
                        setSmsMessage('');
                        setCurrentSmsRuleId(null);

                    }

                } catch (error) {

                    console.error(error);

                    setSmsPhone('');
                    setSmsMessage('');
                    setCurrentSmsRuleId(null);
                }
            }
        };

        fetchSmsData();

    }, [isEditing, ruleId, selectedRuleIds]);

    // Предзаполняем поле условия
    useEffect(() => {
        if (isEditing && ruleCondition) {
            setEmailText(ruleCondition);
        }
    }, [isEditing, ruleCondition]);

    // Устанавливаем выбранное правило из параметров (если есть ruleNameId)
    useEffect(() => {
        if (isEditing && ruleNameId !== undefined) {
            setSelectedRuleIds([Number(ruleNameId)]);
        }
    }, [isEditing, ruleNameId]);

    // Загружаем список всех доступных правил
    useEffect(() => {
        const fetchRules = async () => {
            try {
                setIsLoadingRules(true);
                setRulesError(null);

                const data = await ApiServise.fetchAllNumberRules();
                if (data.success && Array.isArray(data.data)) {
                    setRules(data.data.map((rule: any) => ({
                        id: Number(rule.id),
                        rule_name: rule.rule_name
                    })));
                } else {
                    setRulesError('Некорректный формат данных');
                }
            } catch (error) {
                console.error('Fetch rules error:', error);
                setRulesError('Не удалось загрузить правила');
            } finally {
                setIsLoadingRules(false);
            }
        };
        fetchRules();
    }, []);


    useEffect(() => {
        setShowEmailFields(isEmailRuleSelected);
        setShowSmsFields(isSmsRuleSelected);

        if (!isEmailRuleSelected) {
            setEmailAddress('');
            setEmailSubject('');
            setEmailBody('');
            setCurrentEmailRuleId(null);
        }

        if (!isSmsRuleSelected && !currentSmsRuleId) {

            setSmsPhone('');
            setSmsMessage('');
        }

    }, [
        isEmailRuleSelected,
        currentEmailRuleId,
        isSmsRuleSelected,
        currentSmsRuleId
    ]);

    const toggleRule = (ruleId: number) => {
        if (isEditing) {
            setSelectedRuleIds([ruleId]);
        } else {
            setSelectedRuleIds(prev =>
                prev.includes(ruleId)
                    ? prev.filter(id => id !== ruleId)
                    : [...prev, ruleId]
            );
        }
        // При переключении правила очищаем email поля, если не выбрано email правило
        // if (ruleId !== 2) {
        //     setEmailAddress('');
        //     setEmailSubject('');
        //     setEmailBody('');
        //     setCurrentEmailRuleId(null);
        // }


        if (ruleId !== 2) {
            setEmailAddress('');
            setEmailSubject('');
            setEmailBody('');
            setCurrentEmailRuleId(null);
        }

        if (ruleId !== 3) {
            setSmsPhone('');
            setSmsMessage('');
        }
    };

    const getSelectedRuleNames = () => {
        return rules
            .filter(rule => selectedRuleIds.includes(rule.id))
            .map(rule => rule.rule_name);
    };

    const renderSelectedRules = () => {
        const selectedNames = getSelectedRuleNames();
        if (selectedNames.length === 0) {
            return <Text style={styles.placeholderText}>Выберите правила...</Text>;
        }
        return (
            <View style={styles.selectedRulesContainer}>
                {selectedNames.map((name, index) => (
                    <React.Fragment key={index}>
                        <Text style={styles.selectedRuleText}>{name}</Text>
                        {index < selectedNames.length - 1 && (
                            <Text style={styles.ruleSeparator}> + </Text>
                        )}
                    </React.Fragment>
                ))}
            </View>
        );
    };

    const handleSave = async () => {
        const token = await AsyncStorage.getItem(
                'accessToken'
        );

        if (!token) {
            throw new Error('NOT_AUTHORIZED');
        }

        if (selectedRuleIds.length === 0) {
            Alert.alert('Ошибка', 'Выберите хотя бы одно правило');
            return;
        }
        if (!emailText.trim()) {
            Alert.alert('Ошибка', 'Введите условие для СМС');
            return;
        }

        // Валидация email полей, если выбрано правило №2
        if (isEmailRuleSelected) {
            if (!emailAddress.trim()) {
                Alert.alert('Ошибка', 'Введите email адрес');
                return;
            }
            if (!emailSubject.trim()) {
                Alert.alert('Ошибка', 'Введите тему письма');
                return;
            }
            if (!emailBody.trim()) {
                Alert.alert('Ошибка', 'Введите текст письма');
                return;
            }
        }


        if (isSmsRuleSelected) {
            if (!smsPhone.trim()) {
                Alert.alert(
                    'Ошибка',
                    'Введите номер телефона'
                );
                return;
            }

            if (!smsMessage.trim()) {
                Alert.alert(
                    'Ошибка',
                    'Введите текст SMS'
                );
                return;
            }
        }

        setIsSaving(true);
        try {
            // const userId = 1; // Временный user_id, замените на реальный

            if (isEditing) {
                // РЕЖИМ РЕДАКТИРОВАНИЯ
                const requestBody: any = {
                    rule_name_id: selectedRuleIds[0],
                    rule_condition: emailText.trim(),
                };
                
                if (isEmailRuleSelected) {
                    requestBody.email_address = emailAddress.trim();
                    requestBody.email_subject = emailSubject.trim();
                    requestBody.email_body = emailBody.trim();
                }

                if (isSmsRuleSelected) {
                    requestBody.sms_phone = smsPhone.trim();
                    requestBody.sms_text = smsMessage.trim();
                }

                const response = await fetch(
                    `http://89.111.169.247/api/mobileapp/email/saveEmailRule/${ruleId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            // Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(requestBody),
                    }
                );

                const result = await response.json();
                if (response.ok && result.success) {
                    navigation.goBack();
                } else {
                    Alert.alert('Ошибка', result.message || 'Не удалось обновить правило');
                }
            } else {
                // РЕЖИМ ДОБАВЛЕНИЯ
                for (const ruleTypeId of selectedRuleIds) {
                    const requestBody: any = {
                        email_id: emailId,
                        rule_name_id: ruleTypeId,
                        rule_condition: emailText.trim(),
                    };
                    
                    if (ruleTypeId === 2 && emailAddress.trim()) {
                        // requestBody.user_id = userId;
                        requestBody.email_address = emailAddress.trim();
                        requestBody.email_subject = emailSubject.trim();
                        requestBody.email_body = emailBody.trim();
                    }
                    if (ruleTypeId === 3 && smsPhone.trim()) {
                        // requestBody.user_id = userId;
                        requestBody.sms_phone = smsPhone.trim();
                        requestBody.sms_text = smsMessage.trim();
                    }

                    const response = await fetch('http://89.111.169.247/api/mobileapp/email/addEmailRule', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(requestBody),
                    });

                    const result = await response.json();
                    if (!response.ok || !result.success) {
                        Alert.alert('Ошибка', `Не удалось сохранить правило: ${result.message || 'Неизвестная ошибка'}`);
                        setIsSaving(false);
                        return;
                    }
                }

                navigation.goBack();
            }
        } catch (error) {
            console.error('Save rule error:', error);
            Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
        } finally {
            setIsSaving(false);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const renderModalContent = () => {
        if (isLoadingRules) {
            return (
                <View style={styles.modalLoadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.modalLoadingText}>Загрузка правил...</Text>
                </View>
            );
        }
        if (rulesError) {
            return (
                <View style={styles.modalErrorContainer}>
                    <Text style={styles.modalErrorText}>{rulesError}</Text>
                    <Pressable
                        style={styles.modalRetryButton}
                        onPress={() => {
                            setRulesError(null);
                            setIsLoadingRules(true);
                            fetch('http://89.111.169.247/api/mobileapp/phoneNumber/findAllNumbersRules')
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) setRules(data.data.map((r: any) => ({ id: Number(r.id), rule_name: r.rule_name })));
                                    else setRulesError('Ошибка данных');
                                })
                                .catch(() => setRulesError('Ошибка сети'))
                                .finally(() => setIsLoadingRules(false));
                        }}
                    >
                        <Text style={styles.modalRetryText}>Повторить</Text>
                    </Pressable>
                </View>
            );
        }
        return (
            <ScrollView style={styles.modalList} contentContainerStyle={styles.modalListContent}>
                {rules.map(rule => (
                    <Pressable
                        key={rule.id}
                        style={({ pressed }) => [
                            styles.ruleOption,
                            selectedRuleIds.includes(rule.id) && styles.selectedRuleOption,
                            pressed && styles.optionPressed,
                        ]}
                        onPress={() => toggleRule(rule.id)}
                    >
                        <Text
                            style={[
                                styles.ruleOptionText,
                                selectedRuleIds.includes(rule.id) && styles.selectedRuleOptionText,
                            ]}
                        >
                            {rule.rule_name}
                        </Text>
                        {selectedRuleIds.includes(rule.id) && (
                            <Text style={styles.selectedCheckmark}>✓</Text>
                        )}
                    </Pressable>
                ))}
            </ScrollView>
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable onPress={handleGoBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </Pressable>
                <Text style={styles.headerText}>
                    {isEditing ? 'Редактирование правила' : 'Настройка правила'}
                </Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                <View style={styles.numberInfoContainer}>
                    <View style={styles.numberInfoItem}>
                        <Text style={styles.numberInfoLabel}>Название email:</Text>
                        <Text style={styles.numberInfoText}>{emailName}</Text>
                    </View>
                    <View style={styles.numberInfoItem}>
                        <Text style={styles.numberInfoLabel}>Почтовый ящик:</Text>
                        <Text style={styles.numberInfoText}>{emailBoxAddress}</Text>
                    </View>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Название правила</Text>
                    <Pressable style={styles.ruleSelectorContainer} onPress={toggleDropdown}>
                        {renderSelectedRules()}
                        <Text style={showDropdown ? styles.dropdownIconUp : styles.dropdownIconDown}>
                            ▼
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Применить, если в письме содержится текст</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Введите текст для поиска в письме"
                        placeholderTextColor="#999999"
                        multiline
                        numberOfLines={4}
                        value={emailText}
                        onChangeText={setEmailText}
                        editable={!isSaving}
                    />
                </View>

                {/* Дополнительные поля для отправки email (показываются только при выборе правила №2) */}
                {showEmailFields && (
                    <View style={styles.emailSection}>
                        <Text style={styles.emailSectionTitle}>Настройка отправки email</Text>
                        
                        <View style={styles.inputSection}>
                            <Text style={styles.inputLabel}>Email адрес получателя</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@mail.com"
                                placeholderTextColor="#999999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={emailAddress}
                                onChangeText={setEmailAddress}
                                editable={!isSaving}
                            />
                        </View>

                        <View style={styles.inputSection}>
                            <Text style={styles.inputLabel}>Тема письма</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите тему письма"
                                placeholderTextColor="#999999"
                                value={emailSubject}
                                onChangeText={setEmailSubject}
                                editable={!isSaving}
                            />
                        </View>

                        <View style={styles.inputSection}>
                            <Text style={styles.inputLabel}>Текст письма</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Введите текст письма"
                                placeholderTextColor="#999999"
                                multiline
                                numberOfLines={6}
                                value={emailBody}
                                onChangeText={setEmailBody}
                                editable={!isSaving}
                            />
                        </View>
                    </View>
                )}


                {showSmsFields && (
                    <View style={styles.emailSection}>

                        <Text style={styles.emailSectionTitle}>
                            Настройка отправки SMS
                        </Text>

                        <View style={styles.inputSection}>
                            <Text style={styles.inputLabel}>
                                Номер телефона
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="+79991234567"
                                placeholderTextColor="#999999"
                                keyboardType="phone-pad"
                                value={smsPhone}
                                onChangeText={setSmsPhone}
                                editable={!isSaving}
                            />
                        </View>

                        <View style={styles.inputSection}>
                            <Text style={styles.inputLabel}>
                                Текст SMS
                            </Text>

                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Введите текст SMS"
                                placeholderTextColor="#999999"
                                multiline
                                numberOfLines={6}
                                value={smsMessage}
                                onChangeText={setSmsMessage}
                                editable={!isSaving}
                            />
                        </View>

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

                <View style={styles.bottomSpacing} />
            </ScrollView>

            <Modal
                visible={showDropdown}
                transparent
                animationType="slide"
                onRequestClose={() => setShowDropdown(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={[
                            styles.modalContent,
                            { paddingBottom: insets.bottom + 12 }
                        ]}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Выберите правила</Text>
                            <TouchableOpacity onPress={() => setShowDropdown(false)} style={styles.modalCloseButton}>
                                <Text style={styles.modalCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        {renderModalContent()}
                        <Pressable style={styles.modalDoneButton} onPress={() => setShowDropdown(false)}>
                            <Text style={styles.modalDoneText}>Готово</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
                <BottomBar />
            </View>
        </View>
    );
};

export default EmailRuleSetting;