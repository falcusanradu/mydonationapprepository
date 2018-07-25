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
  COMPANY,
  MINIMUM,
}

export interface Company {
  idCompany: number;
  image: any;
  description: string;
  email: string;
  address: string;
  category: CategoryEnum;
  usersCompany: User[];
  name: string;
}

export enum CategoryEnum {
  other,
  IT,
  marketing,
}


export interface Notification {
  idNotification: number;
  idUser: number;
  read: Boolean;
  usersNotification: User[];

}
