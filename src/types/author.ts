export interface Author {
  authorname?: string;
  avatar?: string;
}

export interface User {
  userId: number;

  username?: string;
  password?: string;
  email?: string;

  fullName?: string;
}
