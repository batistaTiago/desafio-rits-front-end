import { Router, CanActivate, ActivatedRoute } from "@angular/router"
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { EnvironmentConfig } from "../shared/environment.config";
import { AuthCredentials } from "../shared/auth-credentials";
import { IAuthToken } from "../shared/auth-token.interface";

@Injectable()
export class AuthService implements CanActivate {

    private apiURL = EnvironmentConfig.getSettings().url
    private tokenRefreshRate: number = 10000
    private shouldRefreshToken: boolean = true

    constructor (private router: Router, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

    public canActivate(): boolean {
        if (AuthCredentials.getToken()) {
            return true
        }
        this.router.navigate(['/login'])
        return false
    }

    public scheduleTokenRefresh() {
        if (this.shouldRefreshToken) {
            setTimeout(
                () => {
                    this.refresh()                    
                }, this.tokenRefreshRate
            )
        } else {
            this.logout()
        }
    }

    public async authenticate(email: string, password: string): Promise<IAuthToken> {
        try {
            this.shouldRefreshToken = true
            const serverResponse: any = await this.httpClient.post(`${this.apiURL}/login`, { email, password }).toPromise()
            const token = {
                token: serverResponse.access_token, 
                tokenType: serverResponse.token_type,
                tokenDuration: serverResponse.expires_in
            }

            this.scheduleTokenRefresh()
            
            AuthCredentials.setToken(token)
            return token
        } catch (error) {
            return null
        }
    }

    private async refresh() {
        try {
            const url = `${this.apiURL}/refresh`
            const token = AuthCredentials.getToken().token
            const serverResponse: any = await this.httpClient.get(url, { headers: { 'Authorization': `bearer ${token}` }}).toPromise()
            
            const refreshedToken = {
                token: serverResponse.access_token, 
                tokenType: serverResponse.token_type,
                tokenDuration: serverResponse.expires_in
            }

            AuthCredentials.setToken(refreshedToken)
            this.scheduleTokenRefresh()

        } catch (error) {
            console.log(error)
        }
    }

    public async me() {
        try {
            const url = `${this.apiURL}/me`
            const token = AuthCredentials.getToken().token
            const response = await this.httpClient.get(url, { headers: { 'Authorization': `bearer ${token}` }}).toPromise()
            return response
        } catch (error) {
            console.log(error)
            this.router.navigate['/login']
        }
        
    }

    public logout() {
        try {
            const url = `${this.apiURL}/logout`
            const token = AuthCredentials.getToken().token
            this.router.navigate(['/'])
            AuthCredentials.forgetData()
            this.shouldRefreshToken = false
            this.httpClient.get(url, { headers: { 'Authorization': `bearer ${token}` }}).toPromise()
        } catch (error) {
            console.log(error)
        }
    }
}