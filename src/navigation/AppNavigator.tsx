import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './types';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import SmsControl from '../screens/SmsControl/SmsControl';
import NumberSetting from '../screens/NumberSetting/NumberSetting';
import RuleSetting from '../screens/RuleSetting/RuleSetting';

// Создаем навигатор для работы со стеком экранов
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        // NavigationContainer - корневой компонент для навигации
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home" // Начальный экран
                screenOptions={{
                    headerShown: false, // Скрываем стандартный заголовок
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="SmsControl" component={SmsControl} />
                <Stack.Screen name="NumberSetting" component={NumberSetting} />
                <Stack.Screen name="RuleSetting" component={RuleSetting} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;