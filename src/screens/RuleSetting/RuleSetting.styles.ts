import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
    },

    backButton: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        zIndex: 1,
    },

    backButtonText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    header: {
        position: 'relative',
        height: 60,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    scrollContent: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingBottom: 100,
    },

    // Контейнер информации о номере
    numberInfoContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },

    numberInfoItem: {
        marginBottom: 12,
    },

    numberInfoLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 4,
    },

    numberInfoText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
    },

    // Заголовок "Установленные правила"
    existingRulesTitle: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 12,
    },

    // Заголовок "Новое правило"
    newRuleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 24,
        marginBottom: 16,
    },

    // Элемент списка правил
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    // Содержимое элемента (текст)
    itemContent: {
        flex: 1,
    },

    // Название правила (основной текст)
    ruleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },

    // Описание правила (вторичный текст)
    ruleDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },

    // Кнопка удаления
    deleteButton: {
        padding: 8,
        marginLeft: 12,
    },

    // Иконка мусорного ведра
    deleteIcon: {
        fontSize: 20,
    },

    // Секция с полями ввода
    inputSection: {
        marginBottom: 20,
    },

    // Метка поля ввода
    inputLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 8,
    },

    // Контейнер для выбора правил (выпадающий список)
    ruleSelectorContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        minHeight: 50,
    },

    // Контейнер для выбранных правил с переносами
    selectedRulesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginRight: 24, // Место для стрелочки
    },

    // Текст выбранного правила
    selectedRuleText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '500',
    },

    // Разделитель между правилами
    ruleSeparator: {
        fontSize: 14,
        color: '#666666',
        fontWeight: 'bold',
        marginHorizontal: 2,
    },

    // Текст placeholder
    placeholderText: {
        fontSize: 16,
        color: '#999999',
        flex: 1,
        paddingVertical: 2,
    },

    // Иконка выпадающего списка (вниз)
    dropdownIconDown: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 8,
        transform: [{ rotate: '0deg' }],
        marginTop: 2,
    },

    // Иконка выпадающего списка (вверх)
    dropdownIconUp: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 8,
        transform: [{ rotate: '180deg' }],
        marginTop: 2,
    },

    // Контейнер модального окна
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },

    // Полупрозрачный оверлей
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    // Контент модального окна
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: height * 0.8,
        marginTop: Platform.OS === 'ios' ? 44 : 0,
    },

    // Заголовок модального окна
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    modalCloseButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalCloseText: {
        fontSize: 20,
        color: '#666666',
    },

    // Список в модальном окне
    modalList: {
        maxHeight: height * 0.5,
    },

    modalListContent: {
        paddingBottom: 20,
    },

    // Опция правила в модальном окне
    ruleOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    // Выбранная опция правила
    selectedRuleOption: {
        backgroundColor: '#E8F5E8',
    },

    // Текст опции правила
    ruleOptionText: {
        fontSize: 16,
        color: '#333333',
        flex: 1,
    },

    // Текст выбранной опции правила
    selectedRuleOptionText: {
        color: '#4CAF50',
        fontWeight: '500',
    },

    // Галочка выбранной опции
    selectedCheckmark: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginLeft: 10,
    },

    // Эффект при нажатии на опцию
    optionPressed: {
        backgroundColor: '#F5F5F5',
    },

    // Кнопка "Готово" в модальном окне
    modalDoneButton: {
        padding: 16,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },

    modalDoneText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    // Поле ввода для текста
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },

    // Многострочное текстовое поле
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },

    // Кнопка "Сохранить"
    saveButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    // Текст кнопки "Сохранить"
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    buttonPressed: {
        opacity: 0.8,
    },

    bottomBarContainer: {
        backgroundColor: '#FFFFFF',
        height: 60,
    },

    // Отступ для нижнего таббара
    bottomSpacing: {
        height: 100,
    },












    // Добавить после существующих стилей

    modalLoadingContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
    },

    modalLoadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666666',
    },

    modalErrorContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
    },

    modalErrorText: {
        fontSize: 14,
        color: '#F44336',
        textAlign: 'center',
        marginBottom: 10,
    },

    modalRetryButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },

    modalRetryText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },


    buttonDisabled: {
        opacity: 0.6,
        backgroundColor: '#81C784', // Более светлый оттенок зеленого
    },
});