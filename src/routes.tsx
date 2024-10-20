import { useRoutes } from "react-router-dom";
import { ROUTES } from "./root_app/constants";
import { lazy } from "react";
import LoginProtectedRoute from "./root_app/utilities/LoginProtectedRoute";
import FetchSubscriptions from "./root_app/utilities/FetchSubscriptions";

// Layouts
const LMain = lazy(() => import("./root_app/layouts/LMain"));
const LBlogs = lazy(() => import("./root_app/layouts/LBlogs"));
const LQuestions = lazy(() => import("./root_app/layouts/LQuestions"));
const LPortfolio = lazy(() => import("./root_app/layouts/LPortfolio"));
const LUserActions = lazy(() => import("./root_app/layouts/LUserActions"));
const LAskQuestion = lazy(() => import("./root_app/layouts/LAskQuestion"));
const LTeams = lazy(() => import("./root_app/layouts/LTeams"));
const LPayment = lazy(() => import("./root_app/layouts/LPayment"));

// Pages
const PSignIn = lazy(() => import("./root_app/pages/PSignin"));
const PSignup = lazy(() => import("./root_app/pages/PSignup"));
const PForgotPassword = lazy(() => import("./root_app/pages/PForgotPassword"));
const PResetPassword = lazy(() => import("./root_app/pages/PResetPassword"));
const PPurchaseSubscription = lazy(
  () => import("./root_app/pages/PPurchaseSubscription")
);
const PBlogs = lazy(() => import("./root_app/pages/PBlogs"));
const PWriteBlog = lazy(() => import("./root_app/pages/PWriteBlog"));
const PAskQuestion = lazy(() => import("./root_app/pages/PAskQuestion"));
const PPortfolio = lazy(() => import("./root_app/pages/PPortfolio"));
const PQuestions = lazy(() => import("./root_app/pages/PQuestions"));
const PQuestion = lazy(() => import("./root_app/pages/PQuestion"));
const PBlog = lazy(() => import("./root_app/pages/PBlog"));
const PTeams = lazy(() => import("./root_app/pages/PTeams"));
const PCreateTeam = lazy(() => import("./root_app/pages/PCreateTeam"));
const PTeam = lazy(() => import("./root_app/pages/PTeam"));
const PUpdateTeam = lazy(() => import("./root_app/pages/PUpdateTeam"));
const PModifyTeamMembers = lazy(
  () => import("./root_app/pages/PModifyTeamMembers")
);
const PHome = lazy(() => import("./root_app/pages/PHome"));
const PCreateCompany = lazy(() => import("./root_app/pages/PCreateCompany"));
const PPrivacyPolicy = lazy(() => import("./root_app/pages/PPrivacyPolicy"));
const PTermsOfUse = lazy(() => import("./root_app/pages/PTermsOfUse"));
const PNotFound = lazy(() => import("./root_app/pages/PNotFound"));
const PUpdateQuestion = lazy(() => import("./root_app/pages/PUpdateQuestion"));
const PUpdateBlog = lazy(() => import("./root_app/pages/PUpdateBlog"));
const PReportAnIssue = lazy(() => import("./root_app/pages/PReportAnIssue"));
const PRenewSubscription = lazy(
  () => import("./root_app/pages/PRenewSubscription")
);
const PAddSubscription = lazy(
  () => import("./root_app/pages/PAddSubscription")
);

const Routes = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <LMain />,
      children: [
        {
          path: ROUTES.home,
          element: (
            <FetchSubscriptions>
              <PHome />
            </FetchSubscriptions>
          ),
        },
        {
          path: ROUTES.privacyPolicy,
          element: <PPrivacyPolicy />,
        },
        {
          path: ROUTES.termsOfUse,
          element: <PTermsOfUse />,
        },
        {
          path: ROUTES.addSubscription,
          element: <PAddSubscription />,
        },
      ],
    },
    {
      path: "/",
      element: <LUserActions />,
      children: [
        { path: ROUTES.signIn, element: <PSignIn /> },
        { path: ROUTES.signUp, element: <PSignup /> },
        { path: `${ROUTES.signUp}/:id`, element: <PSignup /> },
        { path: ROUTES.forgotPassword, element: <PForgotPassword /> },
        { path: `${ROUTES.resetPassword}*`, element: <PResetPassword /> },
      ],
    },
    {
      path: "/",

      element: (
        <FetchSubscriptions>
          <LPayment />
        </FetchSubscriptions>
      ),
      children: [
        {
          path: ROUTES.purchaseSubscription,
          element: <PPurchaseSubscription />,
        },
        { path: ROUTES.renewSubscription, element: <PRenewSubscription /> },
      ],
    },
    {
      path: "/",
      element: (
        <LoginProtectedRoute>
          <LAskQuestion />
        </LoginProtectedRoute>
      ),
      children: [
        { path: ROUTES.addQuestion, element: <PAskQuestion /> },
        {
          path: ROUTES.addBlog,
          element: <PWriteBlog />,
        },
        {
          path: ROUTES.updateQuestion,
          element: <PUpdateQuestion />,
        },
        {
          path: ROUTES.updateBlog,
          element: <PUpdateBlog />,
        },
        {
          path: ROUTES.createCompany,
          element: <PCreateCompany />,
        },
        {
          path: ROUTES.reportAnIssue,
          element: <PReportAnIssue />,
        },
      ],
    },
    {
      path: `${ROUTES.portfolio}:id`,
      element: (
        <LoginProtectedRoute>
          <LPortfolio />
        </LoginProtectedRoute>
      ),
      children: [{ path: "", element: <PPortfolio /> }],
    },
    {
      path: ROUTES.questions,
      element: (
        <LoginProtectedRoute>
          <LQuestions />
        </LoginProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <PQuestions />,
        },
      ],
    },
    {
      path: ROUTES.teamQuestions,
      element: (
        <LoginProtectedRoute>
          <LQuestions />
        </LoginProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <PQuestions />,
        },
      ],
    },
    {
      path: `${ROUTES.question}:id`,
      element: (
        <LoginProtectedRoute>
          <PQuestion />
        </LoginProtectedRoute>
      ),
    },
    {
      path: ROUTES.blogs,
      element: (
        <LoginProtectedRoute>
          <LBlogs />
        </LoginProtectedRoute>
      ),
      children: [{ path: "", element: <PBlogs /> }],
    },
    {
      path: `${ROUTES.blog}:id`,
      element: (
        <LoginProtectedRoute>
          <PBlog />
        </LoginProtectedRoute>
      ),
    },
    {
      path: ROUTES.teams,
      element: (
        <LoginProtectedRoute>
          <LTeams />
        </LoginProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <LoginProtectedRoute>
              <PTeams />
            </LoginProtectedRoute>
          ),
        },
        {
          path: ROUTES.createTeam,
          element: <PCreateTeam />,
        },
        {
          path: `${ROUTES.team}/:id`,
          element: <PTeam />,
        },
        {
          path: ROUTES.updateTeam,
          element: <PUpdateTeam />,
        },
        {
          path: ROUTES.modifyTeamMembers,
          element: <PModifyTeamMembers />,
        },
      ],
    },
    {
      path: "*",
      element: <LMain />,
      children: [{ path: "*", element: <PNotFound /> }],
    },
  ]);

  return elements;
};

export default Routes;
