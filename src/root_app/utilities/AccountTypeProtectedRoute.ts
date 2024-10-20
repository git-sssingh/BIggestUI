// import { ReactElement, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ROUTES } from "../constants";
// import { RootState } from "../redux/store";
// import { getMenuList } from "./functions";
// import { IMenuItem } from "../types";

// const AccountTypeProtectedRoute = ({
//   children,
// }: {
//   children: ReactElement;
// }) => {
//   const { AccountType } = useSelector((state: RootState) => state.user);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const routesByAccountType: string[] = useMemo(() => {
//     const menuList: IMenuItem[] = getMenuList(AccountType);
//     return menuList.map((item) => item.route?.toLocaleLowerCase()) as string[];
//   }, [AccountType]);

//   useEffect(() => {
//     if (
//       !AccountType ||
//       !location.pathname?.toLowerCase().includes(AccountType.toLowerCase()) ||
//       routesByAccountType?.findIndex((route) =>
//         location.pathname?.toLowerCase().includes(route)
//       ) === -1
//     ) {
//       navigate(`/${ROUTES.login}`);
//     }
//   }, [navigate]);

//   return children;
// };

// export default AccountTypeProtectedRoute;
