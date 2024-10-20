import { ISignIn } from "../interfaces/user";
import { decrypt, encrypt } from "../utilities";
import Cookies from "js-cookie";
import { COOKIES_KEYS } from "../constants";

export const setLoginCookie = (values: ISignIn) => {
  Cookies.set(COOKIES_KEYS.LOGIN, encrypt(JSON.stringify(values)), {
    expires: 2147483647,
  });
};

export const getLoginCookie = () => {
  const details = Cookies.get(COOKIES_KEYS.LOGIN);

  return details ? JSON.parse(decrypt(details)) : null;
};

export const removeLoginCookie = () => {
  Cookies.remove(COOKIES_KEYS.LOGIN);
};
