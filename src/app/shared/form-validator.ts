import { isNumber } from 'util';

export class FormValidator {
    
    public static validateEmail(email: string) {
        console.log(email)
        let regEx = /\S+@\S+\.\S+/
        return regEx.test(email)
    }
    
    
    
    // TODO: invalidar caso haja letras
    public static validatePhoneNumber(phoneNumber: string) {
        if (phoneNumber) {
            phoneNumber = phoneNumber.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
            return (phoneNumber.length >= 10) && (phoneNumber.length <= 13)
        }
        return false
    }
    
    public static validateFullName(name: string) {
        const parts = name.split(' ')
        const isComposed = parts.length >= 2
        
        const validParts = parts.filter(
            (part) => {
                return part.length >= 2
            }
            )
            
            return (name && isComposed && (parts.length === validParts.length) &&  name.length > 6)
        }
        
        public static validateText(text: string) {
            return (text && text.length > 3)
        }
        
        public static validateURL(url: string) {
            try {
                new URL(url);
                return true;
            } catch (_) {
                return false;  
            }
        }
        
    }