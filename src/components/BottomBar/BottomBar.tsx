import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomBar: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const insets = useSafeAreaInsets();

    const currentScreen = route.name;

    const handleTabPress = (screenName: keyof RootStackParamList) => {
        if (currentScreen === screenName) return;

        console.log(`Переход на ${screenName}`);
        navigation.navigate(screenName);
    };

    const tabs = [
        {
            id: 'Home',
            label: 'Главная',
            iconOutline: 'home-outline',
            iconFilled: 'home',
        },
        {
            id: 'Settings',
            label: 'Настройки',
            iconOutline: 'settings-outline',
            iconFilled: 'settings',
        },
        {
            id: 'Profile',
            label: 'Профиль',
            iconOutline: 'person-outline',
            iconFilled: 'person',
        },
    ];

    return (
        <View
            style={[
                styles.container,
                {
                    bottom: insets.bottom,
                },
            ]}
        >
            {tabs.map((tab) => {
                const isActive = currentScreen === tab.id;

                return (
                    <Pressable
                        key={tab.id}
                        style={styles.tabButton}
                        onPress={() => handleTabPress(tab.id as keyof RootStackParamList)}
                        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
                    >
                        <Ionicons
                            name={isActive ? tab.iconFilled : tab.iconOutline}
                            size={24}
                            color={isActive ? '#FFEB3B' : '#FFFFFF'}
                        />
                        <Text
                            style={[
                                styles.tabText,
                                isActive && styles.activeText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },

    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },

    tabText: {
        fontSize: 12,
        color: '#FFFFFF',
        marginTop: 4,
        fontWeight: '500',
    },

    activeText: {
        color: '#FFEB3B',
    },
});

export default BottomBar;