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

    smsItem: {
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

    itemContent: {
        flex: 1,
    },

    bankName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },

    phoneNumber: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },

    deleteButton: {
        padding: 8,
        marginLeft: 12,
    },

    deleteIcon: {
        fontSize: 20,
    },

    buttonPressed: {
        opacity: 0.8,
    },

    bottomBarContainer: {
        backgroundColor: '#FFFFFF',
        height: 60, // Фиксированная высота для BottomBar
    },

    // Плавающая кнопка "Добавить номер"
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
        height: 70, // Высота кнопки (50) + отступ (20)
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




















// Добавьте эти стили в SmsControl.styles.ts
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
},

loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4CAF50',
},

errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
},

errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 20,
},

retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
},

retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
},

emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
},

emptyText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 8,
},

emptySubText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
},

});