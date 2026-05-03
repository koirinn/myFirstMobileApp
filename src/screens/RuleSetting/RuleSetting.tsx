// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Pressable,
//     TextInput,
//     Modal,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     ActivityIndicator,
//     Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../navigation/types';
// import { styles } from './RuleSetting.styles';
// import BottomBar from '../../components/BottomBar/BottomBar';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
// type RouteProps = {
//     key: string;
//     name: string;
//     params: {
//         phoneNumberId: number;
//         numberName: string;
//         phoneNumber: string;
//         ruleId?: number;          // ID записи в phone_rules (для PUT)
//         ruleName?: string;        // для информации
//         ruleCondition?: string;   // текущее условие
//         ruleNameId?: number;      // ID типа правила (для предвыбора)
//     };
// };

// interface Rule {
//     id: number;
//     rule_name: string;
// }

// const RuleSetting: React.FC = () => {
//     const insets = useSafeAreaInsets();
//     const navigation = useNavigation<NavigationProp>();
//     const route = useRoute<RouteProps>();

//     const { phoneNumberId, numberName, phoneNumber, ruleId, ruleCondition, ruleNameId } = route.params;

//     const [smsText, setSmsText] = useState('');
//     const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [rules, setRules] = useState<Rule[]>([]);
//     const [isLoadingRules, setIsLoadingRules] = useState(true);
//     const [rulesError, setRulesError] = useState<string | null>(null);
//     const [isSaving, setIsSaving] = useState(false);

//     const isEditing = ruleId !== undefined;

//     // Предзаполняем поле условия, если редактируем
//     useEffect(() => {
//         if (isEditing && ruleCondition) {
//             setSmsText(ruleCondition);
//         }
//     }, [isEditing, ruleCondition]);

//     // Устанавливаем выбранное правило сразу из параметров (если есть ruleNameId)
//     useEffect(() => {
//         if (isEditing && ruleNameId) {
//             setSelectedRuleIds([ruleNameId]);
//         }
//     }, [isEditing, ruleNameId]);

//     // Загружаем список всех доступных правил
//     useEffect(() => {
//         const fetchRules = async () => {
//             try {
//                 setIsLoadingRules(true);
//                 setRulesError(null);
//                 const response = await fetch(
//                     'http://89.111.169.247/api/mobileapp/phoneNumber/findAllNumbersRules',
//                     {
//                         method: 'GET',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Accept': 'application/json',
//                         },
//                     }
//                 );

//                 if (response.ok && response.status === 200) {
//                     const data = await response.json();
//                     if (data.success && Array.isArray(data.data)) {
//                         setRules(data.data);
//                     } else {
//                         setRulesError('Некорректный формат данных');
//                     }
//                 } else if (response.status >= 400 && response.status < 500) {
//                     setRulesError('Ошибка загрузки правил');
//                 } else {
//                     setRulesError('Ошибка сервера');
//                 }
//             } catch (error) {
//                 console.error('Fetch rules error:', error);
//                 setRulesError('Не удалось загрузить правила');
//             } finally {
//                 setIsLoadingRules(false);
//             }
//         };
//         fetchRules();
//     }, []);

//     const toggleRule = (ruleId: number) => {
//         if (isEditing) {
//             // В режиме редактирования разрешаем выбрать только одно правило
//             setSelectedRuleIds([ruleId]);
//         } else {
//             setSelectedRuleIds(prev =>
//                 prev.includes(ruleId)
//                     ? prev.filter(id => id !== ruleId)
//                     : [...prev, ruleId]
//             );
//         }
//     };

//     const getSelectedRuleNames = () => {
//         return rules
//             .filter(rule => selectedRuleIds.includes(rule.id))
//             .map(rule => rule.rule_name);
//     };

//     const renderSelectedRules = () => {
//         const selectedNames = getSelectedRuleNames();
//         if (selectedNames.length === 0) {
//             return <Text style={styles.placeholderText}>Выберите правила...</Text>;
//         }
//         return (
//             <View style={styles.selectedRulesContainer}>
//                 {selectedNames.map((name, index) => (
//                     <React.Fragment key={index}>
//                         <Text style={styles.selectedRuleText}>{name}</Text>
//                         {index < selectedNames.length - 1 && (
//                             <Text style={styles.ruleSeparator}> + </Text>
//                         )}
//                     </React.Fragment>
//                 ))}
//             </View>
//         );
//     };

//     const handleSave = async () => {
//         if (selectedRuleIds.length === 0) {
//             Alert.alert('Ошибка', 'Выберите хотя бы одно правило');
//             return;
//         }
//         if (!smsText.trim()) {
//             Alert.alert('Ошибка', 'Введите условие для СМС');
//             return;
//         }

//         setIsSaving(true);
//         try {
//             if (isEditing) {
//                 // РЕЖИМ РЕДАКТИРОВАНИЯ – PUT /saveRule/:id
//                 const response = await fetch(
//                     `http://89.111.169.247/api/mobileapp/phoneNumber/saveRule/${ruleId}`,
//                     {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Accept': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             rule_name_id: selectedRuleIds[0],
//                             rule_condition: smsText.trim(),
//                         }),
//                     }
//                 );

//                 const result = await response.json();
//                 if (response.ok && result.success) {
//                     navigation.goBack();
//                 } else {
//                     Alert.alert('Ошибка', result.message || 'Не удалось обновить правило');
//                 }
//             } else {
//                 // РЕЖИМ ДОБАВЛЕНИЯ – POST /addRule для каждого выбранного правила
//                 const promises = selectedRuleIds.map(ruleId =>
//                     fetch('http://89.111.169.247/api/mobileapp/phoneNumber/addRule', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Accept': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             phone_number_id: phoneNumberId,
//                             rule_name_id: ruleId,
//                             rule_condition: smsText.trim(),
//                         }),
//                     }).then(res => res.json())
//                 );

//                 const results = await Promise.all(promises);
//                 const allSuccess = results.every(r => r.success);

//                 if (allSuccess) {
//                     navigation.goBack();
//                 } else {
//                     Alert.alert('Ошибка', 'Не удалось сохранить некоторые правила');
//                 }
//             }
//         } catch (error) {
//             console.error('Save rule error:', error);
//             Alert.alert('Ошибка', 'Не удалось соединиться с сервером');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleGoBack = () => {
//         navigation.goBack();
//     };

//     const toggleDropdown = () => setShowDropdown(!showDropdown);

//     const renderModalContent = () => {
//         if (isLoadingRules) {
//             return (
//                 <View style={styles.modalLoadingContainer}>
//                     <ActivityIndicator size="large" color="#4CAF50" />
//                     <Text style={styles.modalLoadingText}>Загрузка правил...</Text>
//                 </View>
//             );
//         }
//         if (rulesError) {
//             return (
//                 <View style={styles.modalErrorContainer}>
//                     <Text style={styles.modalErrorText}>{rulesError}</Text>
//                     <Pressable
//                         style={styles.modalRetryButton}
//                         onPress={() => {
//                             setRulesError(null);
//                             setIsLoadingRules(true);
//                             fetch('http://89.111.169.247/api/mobileapp/phoneNumber/findAllNumbersRules')
//                                 .then(res => res.json())
//                                 .then(data => {
//                                     if (data.success) setRules(data.data);
//                                     else setRulesError('Ошибка данных');
//                                 })
//                                 .catch(() => setRulesError('Ошибка сети'))
//                                 .finally(() => setIsLoadingRules(false));
//                         }}
//                     >
//                         <Text style={styles.modalRetryText}>Повторить</Text>
//                     </Pressable>
//                 </View>
//             );
//         }
//         return (
//             <ScrollView style={styles.modalList} contentContainerStyle={styles.modalListContent}>
//                 {rules.map(rule => (
//                     <Pressable
//                         key={rule.id}
//                         style={({ pressed }) => [
//                             styles.ruleOption,
//                             selectedRuleIds.includes(rule.id) && styles.selectedRuleOption,
//                             pressed && styles.optionPressed,
//                         ]}
//                         onPress={() => toggleRule(rule.id)}
//                     >
//                         <Text
//                             style={[
//                                 styles.ruleOptionText,
//                                 selectedRuleIds.includes(rule.id) && styles.selectedRuleOptionText,
//                             ]}
//                         >
//                             {rule.rule_name}
//                         </Text>
//                         {selectedRuleIds.includes(rule.id) && (
//                             <Text style={styles.selectedCheckmark}>✓</Text>
//                         )}
//                     </Pressable>
//                 ))}
//             </ScrollView>
//         );
//     };

//     return (
//         <View style={[styles.container, { paddingTop: insets.top }]}>
//             <View style={styles.header}>
//                 <Pressable onPress={handleGoBack} style={styles.backButton}>
//                     <Text style={styles.backButtonText}>←</Text>
//                 </Pressable>
//                 <Text style={styles.headerText}>
//                     {isEditing ? 'Редактирование правила' : 'Настройка правила'}
//                 </Text>
//             </View>

//             <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
//                 <View style={styles.numberInfoContainer}>
//                     <View style={styles.numberInfoItem}>
//                         <Text style={styles.numberInfoLabel}>Название номера:</Text>
//                         <Text style={styles.numberInfoText}>{numberName}</Text>
//                     </View>
//                     <View style={styles.numberInfoItem}>
//                         <Text style={styles.numberInfoLabel}>Номер телефона:</Text>
//                         <Text style={styles.numberInfoText}>{phoneNumber}</Text>
//                     </View>
//                 </View>

//                 <View style={styles.inputSection}>
//                     <Text style={styles.inputLabel}>Название правила</Text>
//                     <Pressable style={styles.ruleSelectorContainer} onPress={toggleDropdown}>
//                         {renderSelectedRules()}
//                         <Text style={showDropdown ? styles.dropdownIconUp : styles.dropdownIconDown}>
//                             ▼
//                         </Text>
//                     </Pressable>
//                 </View>

//                 <View style={styles.inputSection}>
//                     <Text style={styles.inputLabel}>Применить, если в СМС содержится текст</Text>
//                     <TextInput
//                         style={[styles.input, styles.textArea]}
//                         placeholder="Введите текст для поиска в СМС"
//                         placeholderTextColor="#999999"
//                         multiline
//                         numberOfLines={4}
//                         value={smsText}
//                         onChangeText={setSmsText}
//                         editable={!isSaving}
//                     />
//                 </View>

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

//                 <View style={styles.bottomSpacing} />
//             </ScrollView>

//             <Modal
//                 visible={showDropdown}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={() => setShowDropdown(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
//                         <View style={styles.modalOverlay} />
//                     </TouchableWithoutFeedback>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHeader}>
//                             <Text style={styles.modalTitle}>Выберите правила</Text>
//                             <TouchableOpacity onPress={() => setShowDropdown(false)} style={styles.modalCloseButton}>
//                                 <Text style={styles.modalCloseText}>✕</Text>
//                             </TouchableOpacity>
//                         </View>
//                         {renderModalContent()}
//                         <Pressable style={styles.modalDoneButton} onPress={() => setShowDropdown(false)}>
//                             <Text style={styles.modalDoneText}>Готово</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//             </Modal>

//             <View style={[styles.bottomBarContainer, { paddingBottom: insets.bottom }]}>
//                 <BottomBar />
//             </View>
//         </View>
//     );
// };

// export default RuleSetting;




















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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './RuleSetting.styles';
import BottomBar from '../../components/BottomBar/BottomBar';
import ApiServise from '../../services/ApiServise';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = {
    key: string;
    name: string;
    params: {
        phoneNumberId: number;
        numberName: string;
        phoneNumber: string;
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

const RuleSetting: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();

    const { phoneNumberId, numberName, phoneNumber, ruleId, ruleCondition, ruleNameId } = route.params;

    console.log('RuleSetting params:', route.params);

    const [smsText, setSmsText] = useState('');
    const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [rules, setRules] = useState<Rule[]>([]);
    const [isLoadingRules, setIsLoadingRules] = useState(true);
    const [rulesError, setRulesError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const isEditing = ruleId !== undefined;

    // Предзаполняем поле условия
    useEffect(() => {
        if (isEditing && ruleCondition) {
            setSmsText(ruleCondition);
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
                    // Приводим id к числу
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

    // Логирование для отладки
    useEffect(() => {
        if (rules.length > 0) {
            console.log('Rules loaded:', rules.map(r => r.id));
            console.log('Selected rule IDs:', selectedRuleIds);
            if (selectedRuleIds.length > 0) {
                const found = rules.find(r => r.id === selectedRuleIds[0]);
                console.log('Found rule by selected ID:', found);
            }
        }
    }, [rules, selectedRuleIds]);

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
        if (selectedRuleIds.length === 0) {
            Alert.alert('Ошибка', 'Выберите хотя бы одно правило');
            return;
        }
        if (!smsText.trim()) {
            Alert.alert('Ошибка', 'Введите условие для СМС');
            return;
        }

        setIsSaving(true);
        try {
            if (isEditing) {
                // РЕЖИМ РЕДАКТИРОВАНИЯ
                const response = await fetch(
                    `http://89.111.169.247/api/mobileapp/phoneNumber/saveRule/${ruleId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            rule_name_id: selectedRuleIds[0],
                            rule_condition: smsText.trim(),
                        }),
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
                const promises = selectedRuleIds.map(ruleId =>
                    fetch('http://89.111.169.247/api/mobileapp/phoneNumber/addRule', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            phone_number_id: phoneNumberId,
                            rule_name_id: ruleId,
                            rule_condition: smsText.trim(),
                        }),
                    }).then(res => res.json())
                );

                const results = await Promise.all(promises);
                const allSuccess = results.every(r => r.success);

                if (allSuccess) {
                    navigation.goBack();
                } else {
                    Alert.alert('Ошибка', 'Не удалось сохранить некоторые правила');
                }
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
                        <Text style={styles.numberInfoLabel}>Название номера:</Text>
                        <Text style={styles.numberInfoText}>{numberName}</Text>
                    </View>
                    <View style={styles.numberInfoItem}>
                        <Text style={styles.numberInfoLabel}>Номер телефона:</Text>
                        <Text style={styles.numberInfoText}>{phoneNumber}</Text>
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
                    <Text style={styles.inputLabel}>Применить, если в СМС содержится текст</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Введите текст для поиска в СМС"
                        placeholderTextColor="#999999"
                        multiline
                        numberOfLines={4}
                        value={smsText}
                        onChangeText={setSmsText}
                        editable={!isSaving}
                    />
                </View>

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
                    <View style={styles.modalContent}>
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

export default RuleSetting;