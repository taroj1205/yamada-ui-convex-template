import type { UIStyle } from "@yamada-ui/react";

export const globalStyle: UIStyle = {
  "*, *::before, *::after": {
    borderColor: "border",
    borderStyle: "solid",
    borderWidth: "0",
    wordWrap: "break-word",
  },
  "*::placeholder, *[data-placeholder]": {
    color: "blackAlpha.600",
  },
  body: {
    bg: ["white", "black"],
    color: ["black", "white"],
    fontFamily: "body",
    lineHeight: "base",
    transitionDuration: "normal",
    transitionProperty: "background-color",
    textWrap: "pretty",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr auto",
    minH: { base: "100dvh", lg: "max(100dvh, 9xl)" },
    overflowX: "clip",
  },
  _dark: {
    "*::placeholder, *[data-placeholder]": {
      color: "whiteAlpha.400",
    },
  },
  main: {
    alignItems: "center",
    minH: { base: "3xl", lg: "lg" },
    my: "md",
  },
};
