import type { ComponentStyle } from "@yamada-ui/react";

export const Collapse: ComponentStyle<"Collapse"> = {
  baseStyle: {
    w: "100%",
  },
  defaultProps: {
    animationOpacity: true,
    endingHeight: "auto",
    startingHeight: 0,
  },
};
