import { IPost } from '@/modules/Main/models';

export interface RegistrationModel {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IUser {
  createdAt: string,
  userName: string,
  avatar: string,
  nickName: string,
  posts: IPost[],
  likes: IPost[],
  password: string,
  email: string,
  userId: string,
  id: string,
  colorProfile: string,
  birthday: string,
}

export interface CreateUser extends Omit<IUser, 'createdAt' | 'posts' | 'id' | 'userId' | 'colorProfile' | 'likes'> {}

export interface LoginModel extends Pick<RegistrationModel, 'email' | 'password'> {}