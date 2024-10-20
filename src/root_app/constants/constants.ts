export const ROUTES = {
  home: "/",
  subscriptions: "/subscriptions",
  purchaseSubscription: "/purchase-subscription/:id",
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/",
  addQuestion: "/post-question",
  questions: "/questions",
  teamQuestions: "/team/:id/questions",
  question: "/questions/question/",
  saved: "/saved",
  portfolio: "/portfolio/",
  blogs: "/articles",
  addBlog: "/add-article",
  updateBlog: "/update-article/:id",
  blog: "/articles/article/",
  teams: "/teams",
  badges: "/badges",
  about: "/about-us",
  contact: "/contact-us",
  createTeam: "/teams/create-team",
  updateTeam: "/teams/team/:id/update",
  modifyTeamMembers: "/teams/team/:id/modify-members",
  termsOfUse: "/terms-of-use",
  privacyPolicy: "/privacy-policy",
  cookiesPolicy: "/cookies-policy",
  faq: "/faq",
  team: "/teams/team",
  createCompany: "/create-company",
  notFound: "/not-found",
  updateQuestion: "/update-question/:id",
  reportAnIssue: "/report-an-issue",
  renewSubscription: "/renew-subscription/:id",
  addSubscription: "/add-subscription",
};

export const drawerWidth = 240;

export const PAGE_SIZE = 20;

export const DIALOG_COLORS = {
  warning: "orange",
  info: "skyblue",
  success: "rgba(0, 128, 0, 0.5)",
  confirm: "#80808096",
  custom: "rgba(128, 0, 128, 0.5)",
  error: "tomato",
};

export const ACCOUNT_TYPES = {
  ADMIN: "Admin",
  DEPARTMENT_HEAD: "DepartmentHead",
  EMPLOYEE: "Employee",
  USER: "User",
  UNKNOWN: "Unknown",
};

export const DEPARTMENTS = {
  STORE: "Store",
  PROCUREMENT: "Procurement",
  MANAGEMENT: "Management",
};

export const TrueOrFalseOptions = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

export const AccountTypeOptions = [
  { label: "Admin", value: "1" },
  { label: "Department Head", value: "2" },
  { label: "Employee", value: "3" },
  { label: "User", value: "4" },
  { label: "Unknown", value: "5" },
];

export const ACCOUNT_TYPES_COLOR_CODING = {
  "1": "success",
  "2": "warning",
  "3": "success",
  "4": "info",
  "5": "default",
};

export const PriorityOptions = [
  { label: "High", value: "2" },
  { label: "Medium", value: "1" },
  { label: "Low", value: "0" },
];

export const SubscriptionTypes = [
  { label: "Demo", value: "7" },
  { label: "Monthly", value: "30" },
  { label: "Half Yearly", value: "180" },
  { label: "Yearly", value: "365" },
];

export const USER_ACTION_TYPE = {
  SAVE: "SAVE_USER",
  UPDATE: "UPDATE_USER",
};

export const LOADER_ACTION_TYPE = {
  START: "START_LOADER",
  STOP: "STOP_LOADER",
};

export const NOTIFICATION_ACTION_TYPE = {
  SHOW: "SHOW",
  HIDE: "HIDE",
};

export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
  ERROR: "error",
};

export const LOADER_TIMEOUT = 1000;

export const THEME_MODES = {
  DARK: "dark",
  LIGHT: "light",
};

export const CEditorTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

export const SUBSCRIPTION_CARDS_COLORS = ["#faad14", "#1677ff", "#52c41a"];

export const SUBSCRIPTION_CARD_AFTER_CLASS = [
  "price-holder-warning-container",
  "price-holder-info-container",
  "price-holder-success-container",
];

export const COOKIES_KEYS = {
  LOGIN: "U2FsdGVkX19yE/3WOv1EIEFIJOLvci5JEIO8pzzh4+97o+cnkYQZuTTz3tI3Zg5V",
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_DETAILS:
    "U2FsdGVkX1+X79c2JtTdqKjVgUZNoJOHFYWmckjMrq7t21xGN2Y7lAy1ZRt8JZ4o",
};

export const SUBSCRIPTION_RENEW_NOTIFICATION_DAYS = 10;

export const EDITOR_INITIAL_VALUE = `<p class="editor-paragraph"><br></p>`;

export const CALL_REFRESH_TOKEN_BEFORE = 10;
