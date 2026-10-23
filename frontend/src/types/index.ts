export interface NotesType {
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

export interface ResponseType<T> {
  message: string;
  data: T[];
}
