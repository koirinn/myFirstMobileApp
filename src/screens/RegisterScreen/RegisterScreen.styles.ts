import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
    },

    header: {
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

    backButton: {
        position: 'absolute',
        left: 16,
        height: '100%',
        justifyContent: 'center',
    },

    backText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    scrollContent: {
        padding: 20,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },

    button: {
        backgroundColor: '#4CAF50',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});