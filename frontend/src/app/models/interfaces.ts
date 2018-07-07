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
  ADMIN,
  RIGHT1,
  MINIMUM,
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