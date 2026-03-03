// import React from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Pressable,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { styles } from './HomeScreen.styles';
// import BottomBar from '../../components/BottomBar/BottomBar';

// const HomeScreen: React.FC = () => {
//     const insets = useSafeAreaInsets();

//     const handleFunctionButtonPress = (buttonName: string) => {
//         console.log(`Нажата кнопка: ${buttonName}`);
//     };

//     const functionButtons = [
//         { id: 1, title: 'Контроль СМС' },
//         { id: 2, title: 'Контроль E-MAIL' },
//         { id: 3, title: 'Фоновые задачи' },
//     ];

//     return (
//         <View style={[styles.container, { paddingTop: insets.top }]}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>SaveMyTime</Text>
//             </View>

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

//             {/* Просто рендерим BottomBar без пропсов */}
//             <View style={{ paddingBottom: insets.bottom }}>
//                 <BottomBar />
//             </View>
//         </View>
//     );
// };

// export default HomeScreen;




import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Добавляем хук навигации
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'; // Убедитесь, что путь правильный
import { styles } from './HomeScreen.styles';
import BottomBar from '../../components/BottomBar/BottomBar';

// Создаем тип для навигации
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>(); // Инициализируем навигацию

    const handleFunctionButtonPress = (buttonName: string) => {
        console.log(`Нажата кнопка: ${buttonName}`);
        
        // Обрабатываем нажатие на кнопку "Контроль СМС"
        if (buttonName === 'Контроль СМС') {
            console.log('Переход на экран контроля СМС');
            navigation.navigate('SmsControl'); // Навигация на экран SmsControl
        }
        // Обрабатываем другие кнопки по необходимости
        else if (buttonName === 'Контроль E-MAIL') {
            console.log('Переход на экран контроля E-MAIL (не реализован)');
        }
        else if (buttonName === 'Фоновые задачи') {
            console.log('Переход на экран фоновых задач (не реализован)');
        }
    };

    const functionButtons = [
        { id: 1, title: 'Контроль СМС' },
        { id: 2, title: 'Контроль E-MAIL' },
        { id: 3, title: 'Фоновые задачи' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>SaveMyTime</Text>
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
                        Проблема с камерой и статус-баром решена!
                    </Text>
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                    <View style={styles.placeholder} />
                </View>
            </ScrollView>

            {/* BottomBar теперь не нуждается в пропсах */}
            <View style={{ paddingBottom: insets.bottom }}>
                <BottomBar />
            </View>
        </View>
    );
};

export default HomeScreen;