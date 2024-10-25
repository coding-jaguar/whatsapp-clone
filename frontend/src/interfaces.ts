export interface Message {
  fromUserId: number;
  toUserId: number;
  content: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Contact {
  id: string;
  name: string;
}
