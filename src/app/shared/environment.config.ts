export class EnvironmentConfig {
    private static apiURL: string = 'http://localhost:3000/api'

    public static getSettings() {
        return {
            url: this.apiURL
        }
    }

}

// module.exports = EnvironmentConfig.getSettings()