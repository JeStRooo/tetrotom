export interface IComment {
  id: number;
  likes: number;
  title: string;
  userName: string;
  nickName: string;
  avatar: string;
  userId: string;
}

export interface IPost {
  id: string;
  likes: number;
  title: string;
  userId: string;
  avatar: string;
  userName: string;
  nickName: string;
  comments: IComment[];
  liked: boolean;
}

export interface CreatePost extends Omit<IPost, 'id'> {}

export interface INews {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}