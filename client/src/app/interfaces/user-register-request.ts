export interface UserRegisterRequest {
    email: string,
    name: string,
    lastname: string,
    secondLastname: string | null,
    identificationNumber: number,
    password: string
}
