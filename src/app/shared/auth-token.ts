export interface IAuthToken {
    token: string
    tokenType: string
    tokenDuration: number
}

export class AuthToken {
    private static tokenData: IAuthToken

    public static setToken(token: IAuthToken) {
        this.tokenData = token
        return token
    }

    public static storeToken() {
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

            if (token && tokenType && tokenDuration) {
                this.setToken({ token, tokenType, tokenDuration })
            }
        }
        return this.tokenData
    }

    public static forgetToken() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('tokenType')
        sessionStorage.removeItem('tokenDuration')
        this.tokenData = undefined
    }

}