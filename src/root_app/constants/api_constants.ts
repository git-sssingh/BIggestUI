export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const BASE_URL = process.env.REACT_APP_PROXY_URL;

export const API_URLS = {
  // Answers
  POST_ANSWER: `${BASE_URL}/Answer`,
  DELETE_ANSWER_BY_ID: `${BASE_URL}/Answer/`,
  PUT_ANSWER_VOTE: `${BASE_URL}/Answer/Vote/`,
  PUT_ACCEPT_ANSWER: `${BASE_URL}/Answer/AcceptAnswer/`,

  // Questions
  POST_QUESTION: `${BASE_URL}/Question`,
  GET_QUESTION_BY_ID: `${BASE_URL}/Question/`,
  GET_QUESTIONS_BY_COMPANY_ID: `${BASE_URL}/Question/Company/`,
  GET_QUESTIONS_BY_TEAM: `${BASE_URL}/Question/Team/`,
  GET_QUESTIONS_BY_AUTHOR: `${BASE_URL}/Question/Author/`,
  DELETE_QUESTION_BY_ID: `${BASE_URL}/Question/`,
  POST_QUESTION_BOOKMARK: `${BASE_URL}/Question/Bookmark`,
  DELETE_QUESTION_BOOKMARK: `${BASE_URL}/Question/Bookmark/`,
  GET_BOOKMARKED_QUESTIONS: `${BASE_URL}/Question/Bookmarks`,
  POST_QUESTION_UPVOTE_BY_ID: `${BASE_URL}/Question/Upvote/`,
  POST_QUESTION_DOWNVOTE_BY_ID: `${BASE_URL}/Question/Downvote/`,
  GET_QUESTIONS_BY_SEARCH: `${BASE_URL}/Question/Search/q/`,
  GET_QUESTION_TAGS: `${BASE_URL}/Question/tags`,
  POST_QUESTIONS_BY_TAGS: `${BASE_URL}/Question/tag/pageNumber/`,
  PUT_QUESTION_BY_ID: `${BASE_URL}/Question/QuestionId/`,

  // Dashboard
  GET_REPORT: `${BASE_URL}/Dashboard/GetCounts`,

  // Blogs
  POST_BLOG: `${BASE_URL}/Wiki`,
  GET_BLOG_BY_ID: `${BASE_URL}/Wiki/Id`,
  GET_BLOGS_BY_COMPANY_ID: `${BASE_URL}/Wiki/Company/`,
  GET_BLOGS_BY_SEARCH: `${BASE_URL}/Wiki/search/`,
  GET_BLOGS_BY_TAG: `${BASE_URL}/Wiki/Tag/`,
  DELETE_BLOG_BY_ID: `${BASE_URL}/Wiki/`,
  PUT_BLOG_BY_ID: `${BASE_URL}/Wiki/`,
  POST_BOOKMARK_BLOG: `${BASE_URL}/Wiki/Bookmark`,
  DELETE_BOOKMARK_BLOG: `${BASE_URL}/Wiki/Bookmark/`,
  GET_BOOKMARKED_BLOGS: `${BASE_URL}/Wiki/Bookmarks`,
  POST_BLOG_UPVOTE_BY_ID: `${BASE_URL}/Wiki/Upvote/`,
  POST_BLOG_DOWNVOTE_BY_ID: `${BASE_URL}/Wiki/Downvote/`,
  GET_BLOGS_BY_AUTHOR: `${BASE_URL}/Wiki/Author/`,
  GET_BLOG_TAGS: `${BASE_URL}/Wiki/tags`,
  POST_BLOGS_BY_TAGS: `${BASE_URL}/Wiki/tag/pageNumber/`,

  // File
  POST_FILE: `${BASE_URL}/File/image`,

  // User
  POST_LOGIN: `${BASE_URL}/User/SignIn`,
  POST_SIGNUP: `${BASE_URL}/User`,
  GET_COMPANY_USERS: `${BASE_URL}/User/Company/`,
  GET_USER_BY_ID: `${BASE_URL}/User/`,
  POST_FORGOT_PASSWORD: `${BASE_URL}/User/ForgotPassword`,
  PUT_RESET_PASSWORD: `${BASE_URL}/User/ResetPassword/`,
  GET_USER_TEAMS: `${BASE_URL}/User/Team/`,
  PUT_USER_PROFILE_PIC: `${BASE_URL}/User/UpdateProfilePic`,
  PUT_USER_PROFILE: `${BASE_URL}/User/UpdateUser`,
  GET_USER_ACTIVITY_COUNT: `${BASE_URL}/User/UserActivityCount/`,
  GET_USERS_BY_TEAM: `${BASE_URL}/User/Team/`,
  POST_REFRESH_TOKEN: `${BASE_URL}/User/RefreshToken`,

  // Company
  POST_COMPANY: `${BASE_URL}/Company`,
  GET_COMPANY_BY_ID: `${BASE_URL}/Company/`,
  GET_COMPANIES: `${BASE_URL}/Companies`,
  GET_COMPANY_SUBSCRIPTIONS_BY_COMPANY_ID: `${BASE_URL}/Company/Subscriptions/`,

  // Subscriptions
  GET_SUBSCRIPTION_BY_ID: `${BASE_URL}/Subscription/`,
  GET_SUBSCRIPTIONS: `${BASE_URL}/Subscription/Subscriptions`,
  POST_SUBSCRIPTION: `${BASE_URL}/Subscription`,
  PUT_SUBSCRIPTION_BY_ID: `${BASE_URL}/Subscription/`,

  // Team
  POST_TEAM: `${BASE_URL}/Team`,
  GET_TEAM_BY_ID: `${BASE_URL}/Team/`,
  GET_COMPANY_TEAMS: `${BASE_URL}/Team/Teams`,
  PUT_TEAM_BY_ID: `${BASE_URL}/Team/`,
  PUT_ASSIGNED_USERS_BY_ID: `${BASE_URL}/Team/AssignUserToTeam/`,

  // Issues
  GET_ISSUES: `${BASE_URL}/Issue`,
  GET_ISSUE_BY_ID: `${BASE_URL}/Issue/`,
  POST_ISSUE: `${BASE_URL}/Issue`,
};
