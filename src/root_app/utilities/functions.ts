import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import parse from "html-react-parser";
import CryptoJS from "crypto-js";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const getDateInFormat = (date: string, format?: string) => {
  return dayjs(date).format(format ?? "YYYY-MM-DD HH:mm:ss");
};

export const decodeToken = <T>(data: string): T => {
  return jwtDecode<T>(data);
};

export const scrollToSection = (
  sectionId: string,
  setOpen?: (value: boolean) => void
) => {
  const sectionElement = document.getElementById(sectionId);
  const offset = 128;
  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - offset;
    sectionElement.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
    setOpen && setOpen(false);
  }
};

export const getArrayFromEnum = (enumObject: object) => {
  return Object.entries(enumObject).map(([label, value]) => ({ label, value }));
};

export const getStringFromObject = (object: object) => {
  return (
    object &&
    Object.entries(object)
      .map(
        ([key, value]) =>
          `${capitalizeFirstLetter(
            key.replace(/([a-z])([A-Z])/g, "$1 $2")
          )}: ${value}`
      )
      .join("\n")
  );
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getGreeting() {
  var currentHour = Number.parseInt(dayjs().format("HH"));

  if (currentHour >= 0 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour <= 15) {
    return "Good Afternoon";
  } else if (currentHour >= 16 && currentHour < 24) {
    return "Good Evening";
  } else {
    return "Hello";
  }
}

export function formatNumber(num: number): string {
  // Use the toLocaleString method to add suffixes to the number
  return num?.toLocaleString("en-US", {
    // add suffixes for thousands, millions, and billions
    // the maximum number of decimal places to use
    maximumFractionDigits: 2,
    // specify the abbreviations to use for the suffixes
    notation: "compact",
    compactDisplay: "short",
  });
}

export const getTemplateImage = (htmlString: string) => {
  if (!htmlString) {
    return undefined;
  }

  let imageTagStr = htmlString.match(/<img\s+[^>]*src="([^"]*)"[^>]*>/i);

  if (imageTagStr !== null && imageTagStr?.length > 0) {
    return imageTagStr[1];
  }

  return undefined;
};

export const getContentExceptImages = (htmlString: string) => {
  if (!htmlString) {
    return "";
  }

  htmlString = htmlString.replace(
    /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
    ""
  );
  const elements: any = parse(htmlString);

  return elements;
};

export const getHtmlContent = (htmlString: string) => {
  if (!htmlString) {
    return "";
  }

  const elements: any = parse(htmlString);

  return elements;
};

export const getTimeByAgo = (dateTime: string) => {
  return dayjs(dateTime).fromNow();
};

export const toTitleCase = (str: string) =>
  str.replace(
    /(^\w|\s\w)(\S*)/g,
    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
  );

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(
    text,
    process.env.REACT_APP_SECRET_KEY
  ).toString();
};

export const decrypt = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, process.env.REACT_APP_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
