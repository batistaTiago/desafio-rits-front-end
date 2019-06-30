import { Injectable } from "@angular/core";
import { IApplication } from "../shared/application.interface";
import { HttpClient } from "@angular/common/http"
import { EnvironmentConfig } from "../shared/environment.config"
import { AuthToken } from "../shared/auth-token";

@Injectable()
export class ApplicationService {
    
    private apiURL: string = EnvironmentConfig.getSettings().url
    
    constructor(private httpClient: HttpClient) {
    }
    
    public async getApplications(status: string = undefined): Promise<IApplication[]> {
        try {
            let url = `${this.apiURL}/applications`
            if (status) {
                url += `?status=${status}`
            }

            const token = AuthToken.getToken().token

            const response = await this.httpClient.get(url, { headers: { 'Authorization': `bearer ${token}` }}).toPromise()
            const returnedApplications: IApplication[] = (<IApplication[]><unknown>response)
            return returnedApplications
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
    public async postApplication(application: FormData): Promise<IApplication> {
        try {
            const response = await this.httpClient.post(`${this.apiURL}/applications`, application, { observe: 'response' }).toPromise()
            const returnedApplication: IApplication = (<IApplication><unknown>response.body)
            return returnedApplication
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
    public async updateApplicationStatus(data: { id, status }): Promise<IApplication> {

        const { id, status } = data

        try {
            const response = await this.httpClient.put(`${this.apiURL}/applications/${id}`, { status: status }, { observe: 'response' }).toPromise()
            const returnedApplication: IApplication = (<IApplication><unknown>response.body)
            return returnedApplication
        } catch (error) {
            console.log(error)
            return null
        }
        
    }
}