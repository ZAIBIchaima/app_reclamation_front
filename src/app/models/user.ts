import { Role } from '../models/role';
export class User {
      idUser: number;
      login: string;
      password: string;
      roles: Role[];
}


