import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET_KEY;

export const setSecureItem = (key, value) => {
    try {
        const encryptedValue = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            SECRET_KEY
        ).toString();

        localStorage.setItem(key, encryptedValue);

    } catch (error) {
        console.error("Secure storage save error:", error);
    }
};


export const getSecureItem = (key) => {
    try {
        const encryptedValue = localStorage.getItem(key);

        if (!encryptedValue) {
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(
            encryptedValue,
            SECRET_KEY
        );

        const decryptedValue = bytes.toString(
            CryptoJS.enc.Utf8
        );

        if (!decryptedValue) {
            return null;
        }

        return JSON.parse(decryptedValue);

    } catch (error) {
        console.error("Secure storage read error:", error);

        return null;
    }
};


export const removeSecureItem = (key) => {
    localStorage.removeItem(key);
};