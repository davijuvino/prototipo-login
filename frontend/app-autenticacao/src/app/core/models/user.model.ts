export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  bio?: string;
  createdAt: Date;
  updatedAt?: Date;
}