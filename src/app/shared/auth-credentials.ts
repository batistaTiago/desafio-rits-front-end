import { IUser } from "./user.interface";
import { IAuthToken } from "./auth-token.interface";

export class AuthCredentials {
    private static tokenData: IAuthToken
    private static userData: IUser



    public static setUser(user: IUser): void {
        this.userData = user
        this.storeUser()
    }

    private static storeUser() {
        if (this.userData) {
            sessionStorage.setItem('user', this.userData.name)
        } else {
            throw 'User não setado'
        }
    }

    public static getUser(): IUser {

        if (!this.userData) {
            const user = sessionStorage.getItem('user')
            if (user) {
                this.setUser({ name: user })
            }
        }

        return this.userData
    }

    private static forgetUser() {
        sessionStorage.removeItem('user')
        this.userData = undefined
    }


    public static setToken(token: IAuthToken): void {
        this.tokenData = token
        this.storeToken()
    }

    private static storeToken() {
        if (this.tokenData) {
            sessionStorage.setItem('token', this.tokenData.token)
            sessionStorage.setItem('tokenType', this.tokenData.tokenType)
            sessionStorage.setItem('tokenDuration', String(this.tokenData.tokenDuration))
        } else {
            throw 'Token não setado'
        }
    }

    public static getToken(): IAuthToken {
        if (!this.tokenData) {
            const token = sessionStorage.getItem('token')
            const tokenType = sessionStorage.getItem('tokenType')
            const tokenDuration = Number(sessionStorage.getItem('tokenDuration'))
            if (token && tokenType) {
                this.setToken({ token, tokenType, tokenDuration })
            }
        }
        return this.tokenData
    }

    private static forgetToken() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('tokenType')
        this.tokenData = undefined
    }

    public static forgetData() {
        this.forgetToken()
        this.forgetUser()
    }

}