import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./root_app/redux/store";
import { ConfigProvider } from "antd";
import { CNotification, CLoader } from "./root_app/components";
import Routes from "./routes";
import useTitle from "./root_app/hooks/useTitle";
import RememberMe from "./root_app/utilities/RememberMe";
import RefreshAccessTokenIfNecessary from "./root_app/utilities/RefreshAccessTokenIfNecessary";

const App = () => {
  const customeTheme = useSelector((state: RootState) => state.theme);
  useTitle();

  return (
    <ConfigProvider theme={customeTheme.theme}>
      <CNotification />
      <Suspense>
        <CLoader>
          <RememberMe>
            <RefreshAccessTokenIfNecessary>
              <Routes />
            </RefreshAccessTokenIfNecessary>
          </RememberMe>
        </CLoader>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
