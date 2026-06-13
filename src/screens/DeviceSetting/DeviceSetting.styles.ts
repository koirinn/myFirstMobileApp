import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    },

    // Секция с полями ввода
    inputSection: {
        marginBottom: 24,
    },

    // Метка поля ввода
    inputLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 6,
        marginTop: 12,
    },

    // Поле ввода
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

    // Заголовок "Правила"
    rulesTitle: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 12,
        marginTop: 8,
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

    buttonPressed: {
        opacity: 0.8,
    },

    bottomBarContainer: {
        backgroundColor: '#FFFFFF',
        height: 60,
    },

    // Плавающая кнопка "Добавить правило"
    floatingAddButton: {
        position: 'absolute',
        left: 16,
        right: 16,
        height: 50,
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 8,
        zIndex: 10,
    },

    floatingAddButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    floatingAddIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    // Отступ в ScrollView для плавающей кнопки
    floatingButtonSpacing: {
        height: 70,
    },

    // Демонстрационный контент (если нужно оставить)
    demoContent: {
        marginTop: 24,
        alignItems: 'center',
    },

    demoText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 16,
    },

    placeholder: {
        width: width - 32,
        height: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 12,
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








    // Добавьте эти стили в NumberSetting.styles.ts
    errorContainer: {
        backgroundColor: '#FFEBEE',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EF5350',
    },

    errorText: {
        color: '#D32F2F',
        fontSize: 14,
        textAlign: 'center',
    },

    buttonDisabled: {
        opacity: 0.6,
        backgroundColor: '#81C784', // Более светлый оттенок зеленого
    },



    emptyRulesText: {
        textAlign: 'center',
        color: '#999999',
        fontSize: 14,
        marginVertical: 20,
    },













    loadingRulesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    loadingRulesText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666666',
    },
});