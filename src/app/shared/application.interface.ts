export interface IApplication {
    nomeCompleto: string
    email: string
    telefone: string
    linkedinURL: string
    githubURL: string
    nivelIngles: number
    pretensaoSalarial: number
    curriculo: File

    id?: number
    status?: string
}