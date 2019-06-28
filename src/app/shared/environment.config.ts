export class EnvironmentConfig {
    private static apiURL: string = 'http://localhost:3000/api'
    private static baseURL: string = 'http://localhost:3000'

    public static getSettings() {
        return {
            url: this.apiURL,
            baseURL: this.baseURL
        }
    }

}