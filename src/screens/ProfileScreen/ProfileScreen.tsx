// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Pressable,
//     // Убираем стандартный SafeAreaView
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Импортируем хук
// import { styles } from './ProfileScreen.styles';
// import BottomBar from '../../components/BottomBar/BottomBar';

// const ProfileScreen: React.FC = () => {
//     const [currentScreen, setCurrentScreen] = useState<string>('Profile');
//     // Хук useSafeAreaInsets возвращает объект с отступами (top, right, bottom, left)
//     // Эти значения автоматически рассчитываются для камеры, статус-бара и т.д.
//     const insets = useSafeAreaInsets();

//     const handleFunctionButtonPress = (buttonName: string) => {
//         console.log(`Нажата кнопка: ${buttonName}`);
//     };

//     const handleTabPress = (tabName: string) => {
//         console.log(`Переход на ${tabName}`);
//         setCurrentScreen(tabName);
//     };

//     const functionButtons = [
//         { id: 1, title: 'Настройка профиля 1' },
//         { id: 2, title: 'Настройка профиля 2' },
//         { id: 3, title: 'Настройка профиля 3' },
//     ];

//     return (
//         // 1. Главный контейнер задает цвет фона для статус-бара
//         <View style={[styles.container, { paddingTop: insets.top }]}>
//             {/* 2. Заголовок теперь смещен вниз на величину insets.top */}
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Профиль</Text>
//             </View>

//             {/* 3. Основной контент */}
//             <ScrollView
//                 style={styles.content}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 {functionButtons.map((button) => (
//                     <Pressable
//                         key={button.id}
//                         style={({ pressed }) => [
//                             styles.functionButton,
//                             pressed && styles.buttonPressed,
//                         ]}
//                         onPress={() => handleFunctionButtonPress(button.title)}
//                         android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
//                     >
//                         <View style={styles.buttonIcon} />
//                         <Text style={styles.buttonText}>{button.title}</Text>
//                     </Pressable>
//                 ))}
//                 <View style={styles.demoContent}>
//                     <Text style={styles.demoText}>
//                         Проблема с камерой и статус-баром решена!
//                     </Text>
//                     <View style={styles.placeholder} />
//                     <View style={styles.placeholder} />
//                     <View style={styles.placeholder} />
//                     <View style={styles.placeholder} />
//                     <View style={styles.placeholder} />
//                     <View style={styles.placeholder} />
//                 </View>
//             </ScrollView>

//             {/* 4. Нижняя навигация. Добавляем отступ снизу, если нужно */}
//             <View style={{ paddingBottom: insets.bottom }}>
//                 <BottomBar
//                     currentScreen={currentScreen}
//                     onTabPress={handleTabPress}
//                 />
//             </View>
//         </View>
//     );
// };

// export default ProfileScreen;






import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ProfileScreen.styles';
import BottomBar from '../../components/BottomBar/BottomBar';

const ProfileScreen: React.FC = () => {
    const insets = useSafeAreaInsets();

    const handleFunctionButtonPress = (buttonName: string) => {
        console.log(`Нажата кнопка: ${buttonName}`);
    };

    const functionButtons = [
        { id: 1, title: 'Настройка профиля 1' },
        { id: 2, title: 'Настройка профиля 2' },
        { id: 3, title: 'Настройка профиля 3' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Профиль</Text>
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
                <View style={styles.demoContent}>
                    <Text style={styles.demoText}>
                        Экран профиля
                    </Text>
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                </View>
            </ScrollView>

            {/* Просто рендерим BottomBar без пропсов */}
            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default ProfileScreen;