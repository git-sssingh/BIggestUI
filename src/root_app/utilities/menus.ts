import { MenuProps } from "antd";
import { ROUTES } from "../constants";
import { IMenuItem } from "../types";

export const NAV_BAR_MENUS: IMenuItem[] = [
  {
    route: ROUTES.blogs,
    literal: "Articles",
    key: "articles",
  },
  {
    route: ROUTES.questions,
    literal: "Questions",
    key: "questions",
  },
];

export const HOME_PAGE_MENUS: IMenuItem[] = [
  {
    route: ROUTES.about,
    literal: "About us",
    key: "aboutus",
  },
  {
    route: ROUTES.subscriptions,
    literal: "Pricing",
    key: "pricing",
  },
  {
    route: ROUTES.blogs,
    literal: "Articles",
    key: "articles",
  },
  {
    route: ROUTES.questions,
    literal: "Questions",
    key: "questions",
  },
];

export const FOOTER_MENUS: IMenuItem[] = [
  {
    route: ROUTES.home,
    literal: "Home",
    key: "home",
  },
  {
    route: ROUTES.about,
    literal: "About us",
    key: "aboutus",
  },
  {
    route: ROUTES.contact,
    literal: "Contact Us",
    key: "contactus",
  },
  {
    route: ROUTES.termsOfUse,
    literal: "Terms of Use",
    key: "termsofuse",
  },
  {
    route: ROUTES.privacyPolicy,
    literal: "Privacy Policy",
    key: "privacypolicy",
  },
  {
    route: ROUTES.faq,
    literal: "FAQs",
    key: "faqs",
  },
  {
    route: ROUTES.reportAnIssue,
    literal: "Report an Issue",
    key: "reportAnIssue",
  },
  {
    route: ROUTES.addSubscription,
    literal: "Create Subscription",
    key: "createSubscription",
  },
];
