export interface UserSession {
  id: number;
  code: string;
  completeName: string;
  email: string;
  photo: string;
  roles: Role[];
  token?: string;
}

interface Role {
  id: number;
  name: string;
}
