export interface AuthResponse {
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
        data: any;
    };
}

export interface AuthResponseError {
    body: {
        error: string;
    };
}

export interface User {
    _id: string;
    nombre: string;
    aPaterno: string;
    aMaterno: string;
    nombreUsuario: string;
    correo: string;

}

export interface AccessTokenResponse{
    statusCode: number,
    body: {
        accessToken: string;
    };
    error?: string;
    
}


export interface Transaction {
    id: string;  
    description: string;
    amount: number;
    user: string
  }
  
  export interface State {
    transactions: Transaction[];
  }
  
  export type Action =
    | { type: "ADD_TRANSACTION"; payload: Transaction }
    | { type: "DELETE_TRANSACTION"; payload: string };  
  