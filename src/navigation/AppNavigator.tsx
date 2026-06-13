import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './types';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import SmsControl from '../screens/SmsControl/SmsControl';
import EmailControl from '../screens/EmailControl/EmailControl'
import BackScreen from '../screens/BackScreen/BackScreen';
import DeviceSetting from '../screens/DeviceSetting/DeviceSetting';
import NumberSetting from '../screens/NumberSetting/NumberSetting';
import EmailSetting from '../screens/EmailSetting/EmailSetting';
import RuleSetting from '../screens/RuleSetting/RuleSetting';
import EmailRuleSetting from '../screens/EmailRuleSetting/EmailRuleSetting';
import DeviceRuleSetting from '../screens/DeviceRuleSetting/DeviceRuleSetting';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

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
                <Stack.Screen name="EmailControl" component={EmailControl} />
                <Stack.Screen name="NumberSetting" component={NumberSetting} />
                <Stack.Screen name="EmailSetting" component={EmailSetting} />
                <Stack.Screen name="RuleSetting" component={RuleSetting} />
                <Stack.Screen name="EmailRuleSetting" component={EmailRuleSetting} />
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="BackScreen" component={BackScreen}/>
                <Stack.Screen name="DeviceSetting" component={DeviceSetting}/>
                <Stack.Screen name="DeviceRuleSetting" component={DeviceRuleSetting}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;