export interface PageMeta {
  title: string;
  description?: string;
}

export interface ContentPage {
  slug: string;
  lang: string;
  meta: PageMeta;
  body: string;
}

export interface BlogPostMeta {
  title: string;
  description?: string;
  excerpt?: string;
  date?: string;
}

export interface BlogPost {
  slug: string;
  lang: string;
  meta: BlogPostMeta;
  body: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
}

