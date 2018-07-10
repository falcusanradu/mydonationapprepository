export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  type: USER_TYPE;
  notifications: Notification[];
  companies: Company [];
}

export enum USER_TYPE {
  ADMIN = 'admin',
  RIGHT1 = 'right1',
  MINIMUM = 'minimum',
}

export interface Company {
  idCompany: number;
  image: string;
  description: string;
  email: string;
  address: string;
  category: string;
  usersCompany: User[];
}

export interface Notification {
  idNotification: number;
  idUser: number;
  read: Boolean;
  usersNotification: User[];

}
