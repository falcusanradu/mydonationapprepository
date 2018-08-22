export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  type: USER_TYPE;
  company: Company;
}

export enum USER_TYPE {
  admin,
  company,
  normal,
}

export interface Company {
  idCompany: number;
  image: any;
  description: string;
  email: string;
  address: string;
  category: CategoryEnum;
  userCompany: User;
  name: string;
  contact?: string;
}

export enum CategoryEnum {
  other,
  IT,
  marketing,
}


export interface Notification {
  idNotification: number;
  message: string;
  read: Boolean;
  usernameTo: string;
  usernameFrom: string;
  notificationTime: any;
}
