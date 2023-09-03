export interface BasicAuth {
  username: string;
  password: string;
}

export interface WriteArticle {
  title: string;
  content: string;
}

export interface ResponseBody {
  message: string;
  data: any;
}
