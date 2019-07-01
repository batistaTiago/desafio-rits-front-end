export interface IApplication {
    nomeCompleto: string
    email: string
    telefone: string
    linkedinURL: string
    githubURL: string
    nivelIngles: number
    pretensaoSalarial: number
    curriculo: File
    coverLetter?: string

    id?: number
    status?: string
    

    english_level?: any
    application_status?: any

}