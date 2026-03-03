// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Pressable,
//     // Pressable - современная замена TouchableOpacity, даёт больше контроля над анимацией
// } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons'; // Импортируем библиотеку иконок

// // Определяем интерфейс для пропсов (свойств) компонента
// // TypeScript помогает избежать ошибок, показывая какие свойства обязательны
// interface BottomBarProps {
//     currentScreen: string; // Текущий активный экран
//     onTabPress: (screenName: string) => void; // Функция, которая вызывается при нажатии на вкладку
// }

// const BottomBar: React.FC<BottomBarProps> = ({ currentScreen, onTabPress }) => {
//     // Массив объектов с данными для каждой вкладки
//     // Такой подход упрощает добавление новых вкладок в будущем
//     const tabs = [
//         {
//             id: 'Home',
//             label: 'Главная',
//             iconOutline: 'home-outline', // Иконка для неактивного состояния
//             iconFilled: 'home', // Иконка для активного состояния
//         },
//         {
//             id: 'Settings',
//             label: 'Настройки',
//             iconOutline: 'settings-outline',
//             iconFilled: 'settings',
//         },
//         {
//             id: 'Profile',
//             label: 'Профиль',
//             iconOutline: 'person-outline',
//             iconFilled: 'person',
//         },
//     ];

//     return (
//         <View style={styles.container}>
//             {/* Проходим по массиву tabs и создаём кнопки */}
//             {tabs.map((tab) => {
//                 // Проверяем, активна ли текущая вкладка
//                 const isActive = currentScreen === tab.id;

//                 return (
//                     // Pressable - компонент для обработки нажатий
//                     // key - обязательное свойство для оптимизации работы React со списками
//                     <Pressable
//                         key={tab.id}
//                         style={styles.tabButton}
//                         onPress={() => {
//                             // Вызываем переданную функцию при нажатии
//                             onTabPress(tab.id);
//                         }}
//                         // android_ripple добавляет эффект волны на Android
//                         android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
//                     >
//                         {/* Иконка: выбираем заполненную или контурную в зависимости от состояния */}
//                         <Ionicons
//                             name={isActive ? tab.iconFilled : tab.iconOutline}
//                             size={24}
//                             // Цвет иконки зависит от активности
//                             color={isActive ? '#FFEB3B' : '#FFFFFF'}
//                         />
//                         {/* Текст под иконкой */}
//                         <Text
//                             style={[
//                                 styles.tabText,
//                                 // Если вкладка активна, применяем желтый цвет
//                                 isActive && styles.activeText,
//                             ]}
//                         >
//                             {tab.label}
//                         </Text>
//                     </Pressable>
//                 );
//             })}
//         </View>
//     );
// };

// // Создаем стили компонента
// const styles = StyleSheet.create({
//     // Основной контейнер
//     container: {
//         height: 60, // Высота 60px как в требованиях
//         backgroundColor: '#4CAF50', // Зеленый фон
//         flexDirection: 'row', // Располагаем элементы в строку
//         justifyContent: 'space-around', // Равномерное распределение
//         alignItems: 'center', // Выравнивание по центру по вертикали
//         position: 'absolute', // Абсолютное позиционирование
//         bottom: 0, // Прижимаем к низу экрана
//         left: 0,
//         right: 0,
//         // Тени для iOS
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         // Тень для Android
//         elevation: 8,
//     },

//     // Стиль для каждой кнопки
//     tabButton: {
//         flex: 1, // Каждая кнопка занимает равную ширину
//         alignItems: 'center', // Выравниваем иконку и текст по центру
//         justifyContent: 'center', // Вертикальное выравнивание по центру
//         paddingVertical: 8, // Внутренние отступы сверху и снизу
//     },

//     // Стиль для текста кнопки
//     tabText: {
//         fontSize: 12, // Размер текста
//         color: '#FFFFFF', // Белый цвет по умолчанию
//         marginTop: 4, // Отступ сверху от иконки
//         fontWeight: '500', // Полужирный шрифт
//     },

//     // Стиль для активного текста
//     activeText: {
//         color: '#FFEB3B', // Желтый цвет для активного состояния
//     },
// });

// export default BottomBar;







import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Добавляем хуки навигации
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'; // Убедитесь, что путь правильный
import Ionicons from '@expo/vector-icons/Ionicons';

// Создаем тип для навигации
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Убираем пропсы, так как будем использовать хуки
const BottomBar: React.FC = () => {
    // Получаем объект навигации
    const navigation = useNavigation<NavigationProp>();
    // Получаем текущий маршрут
    const route = useRoute();
    
    // Определяем текущий экран по имени маршрута
    const currentScreen = route.name;

    const handleTabPress = (screenName: keyof RootStackParamList) => {
        // Если уже на этом экране, ничего не делаем
        if (currentScreen === screenName) return;
        
        console.log(`Переход на ${screenName}`);
        // Навигация на нужный экран
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
        <View style={styles.container}>
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
        bottom: 0,
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