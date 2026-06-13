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

    inputSection: {
        marginBottom: 20,
    },

    inputLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 8,
    },

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

    selectedRulesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginRight: 24,
    },

    selectedRuleText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '500',
    },

    ruleSeparator: {
        fontSize: 14,
        color: '#666666',
        fontWeight: 'bold',
        marginHorizontal: 2,
    },

    placeholderText: {
        fontSize: 16,
        color: '#999999',
        flex: 1,
        paddingVertical: 2,
    },

    dropdownIconDown: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 8,
        transform: [{ rotate: '0deg' }],
        marginTop: 2,
    },

    dropdownIconUp: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 8,
        transform: [{ rotate: '180deg' }],
        marginTop: 2,
    },

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

    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },

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

    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    buttonPressed: {
        opacity: 0.8,
    },

    buttonDisabled: {
        opacity: 0.6,
        backgroundColor: '#81C784',
    },

    bottomBarContainer: {
        backgroundColor: '#FFFFFF',
        minHeight: 60,
    },

    bottomSpacing: {
        height: 140,
    },

    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },

    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: height * 0.8,
        marginTop: Platform.OS === 'ios' ? 44 : 0,
    },

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

    modalList: {
        maxHeight: height * 0.5,
    },

    modalListContent: {
        paddingBottom: 20,
    },

    ruleOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    selectedRuleOption: {
        backgroundColor: '#E8F5E8',
    },

    ruleOptionText: {
        fontSize: 16,
        color: '#333333',
        flex: 1,
    },

    selectedRuleOptionText: {
        color: '#4CAF50',
        fontWeight: '500',
    },

    selectedCheckmark: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginLeft: 10,
    },

    optionPressed: {
        backgroundColor: '#F5F5F5',
    },

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

    // Секция для email полей
    emailSection: {
        marginTop: 16,
        marginBottom: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },

    emailSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 16,
    },
});