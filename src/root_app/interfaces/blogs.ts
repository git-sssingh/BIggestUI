export interface ICreateBlogRequest {
  title: string;
  description: string;
  tags: string;
}

export interface IBookMarkBlog {
  wikiId: string;
}

export interface IBlogResponse {
  title: string;
  description: string;
  createdDate: string;
  id: string;
  tags: string;
  upvotes: number;
  downvotes: number;
  author: IBlogAuthor;
  bookmarkId: string | null;
}

export interface IBlogAuthor {
  authorId: string;
  name: string;
  description: string | null;
  emailId: string;
  contactNumber: string | null;
  designation: string | null;
}

export interface IBookmarkedBlogResponse {
  id: string;
  bookmarkedWikiId: string;
  title: string;
  bookmarkedDate: string;
}

export interface IBlogsByAuthor {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  tags: string;
  upvotes: number;
  downvotes: number;
  bookmarks: number;
  companyName: string;
  companyEmailId: string;
  companyId: string;
}

export interface IUpdateBlogRequest extends ICreateBlogRequest {}

export interface IPostBlog extends ICreateBlogRequest {}

export interface IGetBlogById extends IBlogResponse {}

export interface IGetBlogsByCompanyId {
  blogs: IBlogResponse[];
}

export interface IGetBlogsBySearch {
  blogs: IBlogResponse[];
}

export interface IGetBlogsByTag {
  blogs: IBlogResponse[];
}

export interface IPostBookMarkBlog extends IBookMarkBlog {}

export interface IGetBookMarkedBlogs {
  bookmarkedWikis: IBookmarkedBlogResponse[];
}

export interface IGetBlogsByAuthor {
  blogs: IBlogsByAuthor[];
}

export interface IPutBlog extends IUpdateBlogRequest {}
