export interface BasicAuth {
  username: string;
  password: string;
}

export interface WriteArticle {
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  status: ArticleStatus;
}

export enum ArticleStatus {
  Public = "public",
  Draft = "draft"
}

export interface ResponseBody {
  message: string;
  data: any;
}

export interface WriteCategory {
  name: string;
}
