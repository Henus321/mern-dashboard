import { useEffect, useState } from "react";
import useMediaQuery from "use-media-antd-query";

export const useLayoutInfo = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [smallScreen, setSmallScreen] = useState(true);

  const size = useMediaQuery();

  useEffect(() => {
    setMenuCollapsed(["xs", "sm", "md", "lg"].includes(size));
    setSmallScreen(["xs", "sm", "md"].includes(size));
  }, [size]);

  return { menuCollapsed, smallScreen };
};
