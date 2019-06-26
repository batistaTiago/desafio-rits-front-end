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

    public getApplications() {

    }

    public async postApplication(application: IApplication) {
        console.log(application)
        console.log(typeof(application))
        console.log(await this.httpClient.post(`${this.apiURL}/applications`, application, { observe: 'response' }).toPromise())
    }
}