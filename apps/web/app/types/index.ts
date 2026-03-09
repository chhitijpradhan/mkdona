
export interface User {
    id : string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string

}

export interface AuthResponse {
    token: string;
    user: any;
    error?: string | any[]; // Your backend sends 'error', not 'message'
}