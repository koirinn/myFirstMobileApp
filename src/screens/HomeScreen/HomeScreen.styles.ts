// import { StyleSheet, Dimensions } from 'react-native';

// // Получаем размеры экрана для адаптивного дизайна
// const { width } = Dimensions.get('window');

// export const styles = StyleSheet.create({
//     // УДАЛЕНО: стиль safeArea больше не нужен
//     // safeArea: {
//     //   flex: 1,
//     //   backgroundColor: '#4CAF50',
//     // },

//     // ОБНОВЛЕНО: Убран flex:1 и фон. Фон теперь задается инлайн.
//     container: {
//         flex: 1,
//         backgroundColor: '#4CAF50', // Зеленый фон для области статус-бара
//     },

//     // Верхний заголовок (Header)
//     header: {
//         height: 60, // Высота 60px как в требованиях
//         backgroundColor: '#4CAF50', // Зеленый фон
//         justifyContent: 'center', // Выравнивание по вертикали
//         alignItems: 'center', // Выравнивание по горизонтали
//     },

//     // Текст заголовка
//     headerText: {
//         fontSize: 20,
//         fontWeight: 'bold', // Жирный шрифт
//         color: '#FFFFFF', // Белый цвет
//     },

//     // Основной контент (занимает всё доступное пространство)
//     content: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },

//     // Контейнер для содержимого ScrollView
//     scrollContent: {
//         paddingVertical: 16, // Вертикальные отступы 16px
//         paddingHorizontal: 16, // Горизонтальные отступы
//     },

//     // Функциональная кнопка
//     functionButton: {
//         flexDirection: 'row', // Располагаем иконку и текст в строку
//         alignItems: 'center', // Выравниваем по центру по вертикали
//         backgroundColor: '#FFFFFF', // Белый фон
//         paddingHorizontal: 16, // Горизонтальные отступы 16px
//         paddingVertical: 12, // Вертикальные отступы 12px
//         borderRadius: 12, // Закругление углов
//         marginBottom: 12, // Отступ снизу между кнопками

//         // Тень для iOS
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,

//         // Тень для Android
//         elevation: 2,
//     },

//     // Эффект при нажатии на кнопку (для iOS)
//     buttonPressed: {
//         opacity: 0.8, // Небольшая прозрачность
//     },

//     // Круглая иконка-заглушка
//     buttonIcon: {
//         width: 50,
//         height: 50,
//         borderRadius: 25, // Делаем круг (половина ширины/высоты)
//         backgroundColor: '#E0E0E0', // Серый фон
//     },

//     // Текст функциональной кнопки
//     buttonText: {
//         marginLeft: 12, // Отступ слева от иконки
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#000000', // Черный цвет
//     },

//     // Демонстрационный контент для скролла
//     demoContent: {
//         marginTop: 24,
//         alignItems: 'center',
//     },

//     demoText: {
//         fontSize: 14,
//         color: '#666666',
//         marginBottom: 16,
//     },

//     placeholder: {
//         width: width - 32, // Ширина минус отступы
//         height: 100,
//         backgroundColor: '#F5F5F5',
//         borderRadius: 8,
//         marginBottom: 12,
//     },
// });




import { StyleSheet, Dimensions } from 'react-native';

// Получаем размеры экрана для адаптивного дизайна
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    // УДАЛЕНО: стиль safeArea больше не нужен
    // safeArea: {
    //   flex: 1,
    //   backgroundColor: '#4CAF50',
    // },

    // ОБНОВЛЕНО: Убран flex:1 и фон. Фон теперь задается инлайн.
    container: {
        flex: 1,
        backgroundColor: '#4CAF50', // Зеленый фон для области статус-бара
    },

    // Верхний заголовок (Header)
    header: {
        height: 60, // Высота 60px как в требованиях
        backgroundColor: '#4CAF50', // Зеленый фон
        justifyContent: 'center', // Выравнивание по вертикали
        alignItems: 'center', // Выравнивание по горизонтали
    },

    // Текст заголовка
    headerText: {
        fontSize: 20,
        fontWeight: 'bold', // Жирный шрифт
        color: '#FFFFFF', // Белый цвет
    },

    // Основной контент (занимает всё доступное пространство)
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // Контейнер для содержимого ScrollView
    scrollContent: {
        paddingVertical: 16, // Вертикальные отступы 16px
        paddingHorizontal: 16, // Горизонтальные отступы
    },

    // Функциональная кнопка
    functionButton: {
        flexDirection: 'row', // Располагаем иконку и текст в строку
        alignItems: 'center', // Выравниваем по центру по вертикали
        backgroundColor: '#FFFFFF', // Белый фон
        paddingHorizontal: 16, // Горизонтальные отступы 16px
        paddingVertical: 12, // Вертикальные отступы 12px
        borderRadius: 12, // Закругление углов
        marginBottom: 12, // Отступ снизу между кнопками

        // Тень для iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Тень для Android
        elevation: 2,
    },

    // Эффект при нажатии на кнопку (для iOS)
    buttonPressed: {
        opacity: 0.8, // Небольшая прозрачность
    },

    // Круглая иконка-заглушка
    buttonIcon: {
        width: 50,
        height: 50,
        borderRadius: 25, // Делаем круг (половина ширины/высоты)
        backgroundColor: '#E0E0E0', // Серый фон
    },

    // Текст функциональной кнопки
    buttonText: {
        marginLeft: 12, // Отступ слева от иконки
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000', // Черный цвет
    },

    // Демонстрационный контент для скролла
    demoContent: {
        marginTop: 24,
        alignItems: 'center',
    },

    demoText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 16,
    },

    placeholder: {
        width: width - 32, // Ширина минус отступы
        height: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 12,
    },
});