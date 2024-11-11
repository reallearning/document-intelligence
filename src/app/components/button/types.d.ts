import { LinkProps } from "next/link";
import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

export type ButtonSizes = "xxs" | "xs" | "md" | "lg";

export type ButtonColors =
  | "primary-default"
  | "primary-error"
  | "secondary-default"
  | "hyperlink-default";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    LinkProps {
  children?: ReactNode;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  size?: ButtonSizes;
  color?: ButtonColors;
  componentAs?: ElementType;
  href?: string;
  disableTextWrapper?: boolean;
}
