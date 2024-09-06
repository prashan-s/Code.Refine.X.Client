import { useState } from 'react';

function useLocalStorage(key: string, initialValue: any) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error retrieving localStorage key:", error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            // Save state
            setStoredValue(value);
            // Save to local storage
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage key:", error);
        }
    };

    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(null);
        } catch (error) {
            console.error("Error removing localStorage key:", error);
        }
    };

    return [storedValue, setValue, removeValue] as const;
}

export default useLocalStorage;
