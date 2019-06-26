export class FormValidator {

    private static validFileExtensions: string[] = ['pdf', 'doc', 'docx']
    private static maxFileSize: number = 10 * 1024 * 1024; // 50 MB

    public static validateEmail(email: string): boolean {
        try {
            let regEx = /\S+@\S+\.\S+/
            return regEx.test(email)
        } catch {
            return false
        }
        
    }

    public static validateSalary(salary: string): boolean {
        try {
            return parseInt(salary) > 0
        } catch {
            return false
        }
        
    }

    // TODO: invalidar caso haja letras
    public static validatePhoneNumber(phoneNumber: string): boolean {
        try {
            phoneNumber = phoneNumber.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
            return (phoneNumber.length >= 10) && (phoneNumber.length <= 13)
        } catch {
            return false
        }
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
        } catch {
            return false
        }

    }

    public static validateText(text: string): boolean {
        try {
            return text.length > 3
        } catch {
            return false
        }
        
    }

    public static validateURL(url: string): boolean {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    public static validateEnglishLevel(level: string) {
        try {
            const result = parseInt(level) > 0
            return result
        } catch {
            return false
        }
        
    }

    public static validateFile(file: File): boolean {
        try {
            const extension = file.name.split('.').pop();
            return this.validFileExtensions.includes(extension) && file.size < this.maxFileSize;
        } catch {
            return false
        }
        
    }
}