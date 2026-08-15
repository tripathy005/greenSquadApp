import CryptoJS from 'crypto-js'

const SECRET_KEY = 'GreenSquad_User_Data_2026'


export const encryptData = (data) => {

    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        SECRET_KEY
    ).toString()

    return encryptedData
}


export const decryptData = (encryptedData) => {

    if (!encryptedData) {
        return null
    }

    try {

        const bytes = CryptoJS.AES.decrypt(
            encryptedData,
            SECRET_KEY
        )

        const decryptedData = bytes.toString(
            CryptoJS.enc.Utf8
        )

        return JSON.parse(decryptedData)

    } catch (error) {

        console.error('Unable to decrypt user data')

        return null
    }
}