import { Orden } from "./Product";


export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  date_joined: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  ordenes: Orden[];
}
