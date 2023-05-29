export interface InitalUserData {
  email: string;
  name: string;
  tokenB: number;
  tokenP: number;
  plan: string;
  files: FileRef[];
}

export interface FileRef {
  name: string;
  fileId: string;
  date: string;
}
