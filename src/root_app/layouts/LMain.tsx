import { CFooter, CNavbar } from "../components";
import { Outlet } from "react-router-dom";
import { HOME_PAGE_MENUS } from "../utilities/menus";

const LMain = (): JSX.Element => {
  return (
    <div>
      <CNavbar menus={HOME_PAGE_MENUS} />
      <Outlet />
      <CFooter />
    </div>
  );
};

export default LMain;
