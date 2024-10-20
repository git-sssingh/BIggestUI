import { theme, ThemeConfig } from "antd";
import { THEME_MODES } from "./root_app/constants";
import { AliasToken } from "antd/es/theme/internal";

export const themeSettings = (mode: any) => {
  const darkTheme: ThemeConfig = {
    token: {
      colorPrimary: "#222831",
    },
    algorithm: theme.darkAlgorithm,
  };

  const lightTheme: ThemeConfig = {
    token: {
      colorPrimary: "#055CB4",
    },
    algorithm: theme.defaultAlgorithm,
  };

  return mode === THEME_MODES.DARK ? darkTheme : lightTheme;
};
