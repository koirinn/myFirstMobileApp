import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SettingsScreen.styles';
import BottomBar from '../../components/BottomBar/BottomBar';

const SettingsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    const handleFunctionButtonPress = (buttonName: string) => {
        console.log(`Нажата кнопка: ${buttonName}`);
    };

    const functionButtons = [
        { id: 1, title: 'Настройка 1' },
        { id: 2, title: 'Настройка 2' },
        { id: 3, title: 'Настройка 3' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Настройки</Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
            >
                {functionButtons.map((button) => (
                    <Pressable
                        key={button.id}
                        style={({ pressed }) => [
                            styles.functionButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => handleFunctionButtonPress(button.title)}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
                    >
                        <View style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>{button.title}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default SettingsScreen;