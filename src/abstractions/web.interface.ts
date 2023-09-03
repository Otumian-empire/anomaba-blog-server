export interface BasicAuth {
  username: string;
  password: string;
}

export interface CreateArticle {
  title: string;
  content: string;
}

export interface ResponseBody {
  message: string;
  data: any;
}
