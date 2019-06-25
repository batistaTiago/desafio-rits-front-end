export class FormValidator {

    public static validateEmail(email: string): boolean {
        let regEx = /\S+@\S+\.\S+/
        return regEx.test(email)
    }

    // TODO: invalidar caso haja letras
    public static validatePhoneNumber(phoneNumber: string): boolean {
        if (phoneNumber) {
            phoneNumber = phoneNumber.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
            return (phoneNumber.length >= 10) && (phoneNumber.length <= 13)
        }
        return false
    }

    public static validateFullName(name: string): boolean {
        try {
            const parts = name.split(' ')
            const isComposed = parts.length >= 2

            const validParts = parts.filter(
                (part) => {
                    return part.length >= 2
                }
            )

            return (isComposed && (parts.length === validParts.length) && name.length > 6)
        } catch (_) {
            return false
        }

    }

    public static validateText(text: string): boolean {
        return (text && text.length > 3)
    }

    public static validateURL(url: string): boolean {
        try {
            new URL(url)
            return true
        } catch (_) {
            return false
        }
    }

    public static validateEnglishLevel(level: string) {
        const result = parseInt(level) > 0
        return result
    }
}