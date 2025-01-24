import { useState } from 'react';

function useSessionStorage(key: string, initialValue: any) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error retrieving sessionStorage key:", error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            // Save state
            setStoredValue(value);
            // Save to session storage
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting sessionStorage key:", error);
        }
    };

    const removeValue = () => {
        try {
            sessionStorage.removeItem(key);
            setStoredValue(null);
        } catch (error) {
            console.error("Error removing sessionStorage key:", error);
        }
    };

    return [storedValue, setValue, removeValue] as const;
}

export default useSessionStorage;
