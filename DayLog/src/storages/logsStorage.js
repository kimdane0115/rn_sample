import AsyncStorage from "@react-native-community/async-storage";

const key = 'logs';

const logsStorage = {
    async get() {
        try {
            const raw = await AsyncStorage.getItem(key);
            const parsed = JSON.parse(raw);
            console.log('get Item');
            return parsed;
        } catch (e) {
            throw new Error('Failed to load logs');
        }
    },
    async set(data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
            console.log('set Item');
        } catch (e) {
            throw new Error('Failed to save logs');
        }
    },
};

export default logsStorage;