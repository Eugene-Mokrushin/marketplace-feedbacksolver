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

export interface TemplateItem {
  articleWB?: string;
  brand?: string;
  rating?: string;
  response?: string[];
  triggers?: string[];
  blacklistResponse?: string;
  recommendation?: string[];
}

export interface WbRunBasicConfig {
  confirmation: boolean;
  autofill: boolean;
  paginate: boolean;
  onlyTop: boolean;
  personalizes?: boolean;
}
