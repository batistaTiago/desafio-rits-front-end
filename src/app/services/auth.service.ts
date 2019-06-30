import { Router, CanActivate } from "@angular/router"
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { EnvironmentConfig } from "../shared/environment.config";
import { IAuthToken, AuthToken } from "../shared/auth-token";

@Injectable()
export class AuthService implements CanActivate {

    private apiURL = EnvironmentConfig.getSettings().url

    constructor (private router: Router, private httpClient: HttpClient) { }

    public canActivate(): boolean {
        if (AuthToken.getToken()) {
            return true
        }
        this.router.navigate(['/login'])
        return false
    }

    public async authenticate(email: string, password: string): Promise<IAuthToken> {
        try {
            const serverResponse: any = await this.httpClient.post(`${this.apiURL}/login`, { email, password }).toPromise()
            const token = AuthToken.setToken({ 
                token: serverResponse.access_token, 
                tokenType: serverResponse.token_type, 
                tokenDuration: serverResponse.expires_in 
            })
            this.router.navigate(['/admin'])
            return token
        } catch (error) {
            return null
        }
    }

    public async me() {
        const url = `${this.apiURL}/me`
        const token = AuthToken.getToken().token
        const response = await this.httpClient.get(url, { headers: { 'Authorization': `bearer ${token}` }}).toPromise()
        return response
    }

    public async logout() {
        try {
            const url = `${this.apiURL}/logout`
            const token = AuthToken.getToken().token
            this.router.navigate(['/'])
            const response = await this.httpClient.get(url, { headers: { 'Authorization': `bearer ${token}` }}).toPromise()
            AuthToken.forgetToken()
            return response
        } catch (error) {
            console.log(error)
        }
    }

}