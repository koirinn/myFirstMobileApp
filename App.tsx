import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        // SafeAreaProvider обеспечивает корректную работу SafeAreaView
        <SafeAreaProvider>
            {/* Статус бар с зеленым фоном */}
            <StatusBar style="light" backgroundColor="#4CAF50" />
            {/* Наш основной навигатор */}
            <AppNavigator />
        </SafeAreaProvider>
    );
}