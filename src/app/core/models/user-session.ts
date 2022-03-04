export interface UserSession {
  id?: number;
  code?: string;
  name?: string;
  paternalSurname?: string;
  maternalSurname?: string;
  email?: string;
  photo?: string;
  roles?: Role[];
  token?: string;
}

interface Role {
  id: number;
  name: string;
}
