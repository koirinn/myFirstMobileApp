import AsyncStorage from '@react-native-async-storage/async-storage';

const WATCHED_NUMBERS_KEY = '@watched_numbers';

// Сохранить список отслеживаемых номеров
export const saveWatchedNumbers = async (numbers: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(WATCHED_NUMBERS_KEY, JSON.stringify(numbers));
    console.log('Сохранены номера для отслеживания:', numbers);
  } catch (error) {
    console.error('Ошибка сохранения номеров:', error);
  }
};

// Получить список отслеживаемых номеров
export const getWatchedNumbers = async (): Promise<string[]> => {
  try {
    const numbers = await AsyncStorage.getItem(WATCHED_NUMBERS_KEY);
    return numbers ? JSON.parse(numbers) : [];
  } catch (error) {
    console.error('Ошибка получения номеров:', error);
    return [];
  }
};

// Добавить номер в отслеживание
export const addWatchedNumber = async (number: string): Promise<void> => {
  try {
    const current = await getWatchedNumbers();
    if (!current.includes(number)) {
      const updated = [...current, number];
      await saveWatchedNumbers(updated);
    }
  } catch (error) {
    console.error('Ошибка добавления номера:', error);
  }
};

// Удалить номер из отслеживания
export const removeWatchedNumber = async (number: string): Promise<void> => {
  try {
    const current = await getWatchedNumbers();
    const updated = current.filter(n => n !== number);
    await saveWatchedNumbers(updated);
  } catch (error) {
    console.error('Ошибка удаления номера:', error);
  }
};

// Проверить, отслеживается ли номер
export const isNumberWatched = async (number: string): Promise<boolean> => {
  const numbers = await getWatchedNumbers();
  return numbers.includes(number);
};