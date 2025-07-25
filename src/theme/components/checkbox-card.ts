import type { ComponentMultiStyle } from "@yamada-ui/react";
import { mergeMultiStyle } from "@yamada-ui/react";
import { Checkbox } from "./checkbox";
import { RadioCard } from "./radio-card";

export const CheckboxCard: ComponentMultiStyle<"CheckboxCard"> =
  mergeMultiStyle(Checkbox, RadioCard, {
    baseStyle: ({ colorScheme: c = "primary" }) => ({
      icon: {
        border: "2px solid",
        borderColor: "inherit",
        color: ["white", "black"],
        display: "inline-block",
        position: "relative",
        transitionDuration: "normal",
        transitionProperty: "box-shadow",
        userSelect: "none",
        _checked: {
          bg: [`${c}.500`, `${c}.600`],
          borderColor: [`${c}.500`, `${c}.600`],
          color: ["white", "black"],

          _disabled: {
            bg: ["blackAlpha.400", "whiteAlpha.300"],
            borderColor: ["transparent", "transparent"],
          },
          _readOnly: {
            bg: [`${c}.500`, `${c}.600`],
            borderColor: [`${c}.500`, `${c}.600`],
          },
        },
        _disabled: {
          bg: ["blackAlpha.200", "whiteAlpha.100"],
          borderColor: ["transparent", "transparent"],
        },
        _invalid: {
          borderColor: ["danger.500", "danger.400"],
          _focusVisible: {
            borderColor: "inherit",
            _checked: {
              borderColor: [`${c}.500`, `${c}.600`],
            },
          },
        },
      },
    }),

    sizes: {
      sm: {
        icon: { boxSize: "4", fontSize: "2xs", rounded: "base" },
      },
      md: {
        icon: { boxSize: "5", fontSize: "xs", rounded: "base" },
      },
      lg: {
        icon: { boxSize: "6", fontSize: "sm", rounded: "base" },
      },
    },
  })({ omit: ["icon"] });
