import React from "react";
import { useLocation } from "react-router-dom";
import { toTitleCase } from "../utilities";

const useTitle = (): void => {
  const location = useLocation();
  const title = location?.pathname
    ?.split("/")
    ?.at(1)
    ?.split("-")
    ?.join(" ") as string;

  React.useEffect(() => {
    const prevTitle = document.title;
    document.title = toTitleCase(title) || "Yasksha Prashna";

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useTitle;
