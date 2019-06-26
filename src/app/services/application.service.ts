import { Injectable } from "@angular/core";
import { IApplication } from "../shared/application.interface";
import { HttpClient } from "@angular/common/http"
import { EnvironmentConfig } from "../shared/environment.config"

@Injectable()
export class ApplicationService {

    private apiURL: string

    constructor(private httpClient: HttpClient) {
        this.apiURL = EnvironmentConfig.getSettings().url
     }

    public async getApplications(status: string = undefined): Promise<IApplication[]> {
        try {
            let url = `${this.apiURL}/applications`
            if (status) {
                url += `?status=${status}`
            }
            const response = await this.httpClient.get(url).toPromise()
            const returnedApplications: IApplication[] = (<IApplication[]><unknown>response)
            // console.log(returnedApplications)
            return returnedApplications
        } catch {
            return []
        }
    }

    public async postApplication(application: IApplication): Promise<IApplication> {
        try {
            const response = await this.httpClient.post(`${this.apiURL}/applications`, application, { observe: 'response' }).toPromise()
            const returnedApplication: IApplication = (<IApplication><unknown>response.body)
            return returnedApplication
        } catch {
            return null
        }
    }

    public async updateApplicationStatus(data: [number, string]): Promise<IApplication> {

        // console.log(data)

        const response = await this.httpClient.put(`${this.apiURL}/applications/${data[1]}`, { id: data[1], status: data[0] }, { observe: 'response' }).toPromise()
        const returnedApplication: IApplication = (<IApplication><unknown>response.body)

        // console.log(returnedApplication)

        return returnedApplication
    }
}