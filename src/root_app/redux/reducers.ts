import authSlice from "./slices/authSlice";
import loaderSlice from "./slices/loaderSlice";
import notificationSlice from "./slices/notificationSlice";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";
import questionsByTagSearchSlice from "./slices/questionsByTagSearchSlice";
import blogsByTagSearchSlice from "./slices/blogsByTagSearchSlice";
import subscriptionSlice from "./slices/subscriptionsSlice";

export const REDUCERS = {
  loader: loaderSlice,
  notification: notificationSlice,
  auth: authSlice,
  user: userSlice,
  theme: themeSlice,
  questionsByTagSearch: questionsByTagSearchSlice,
  blogsByTagSearch: blogsByTagSearchSlice,
  subscriptions: subscriptionSlice,
};
