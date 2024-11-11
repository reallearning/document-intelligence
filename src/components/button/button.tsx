import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  RefAttributes,
} from "react";
import { tv } from "tailwind-variants";
import { ButtonProps } from ".";
import { center } from "@/lib/utils";

const classes = {
  icons: "align-bottom inline-flex",
  default: "inline-flex",
  error:
    "border-red-500 bg-red-500/30 text-red-500 hover:bg-red-500/30 hover:border-red-500 focus-visible:ring-red-500 focus-visible:bg-red-500/30 focus-visible:border-red-500",
  hyperlink:
    "text-secondary border-text-secondary hover:text-morrie-primary hover:border-border-bold focus-visible:text-morrie-primary focus-visible:border-text-primary focus-visible:border-b-2",
};

const styles = tv({
  base: "rounded-lg font-medium focus:outline-none",
  variants: {
    color: {
      "primary-default": `${classes.default} border bg-button-primary-bg text-button-primary-text border-button-primary-bg
        hover:bg-button-primary-bg-hover
        hover:border-button-primary-bg-hover
        focus-visible:ring-button-secondary-focus-border focus-visible:bg-button-primary-bg-hover focus-visible:border-button-secondary-focus-border`,
      "primary-error": `bg-red-500/30 ${classes.error}`,
      "secondary-default": `${classes.default} border bg-transparent border-morrie-primary text-morrie-primary`,
      "hyperlink-default": `text-secondary border-text-secondary hover:text-morrie-primary hover:border-border-bold focus-visible:text-morrie-primary focus-visible:border-text-primary focus-visible:border-b-2 ${classes.hyperlink}`,
    },
    disabled: {
      true: "border-transparent cursor-not-allowed",
    },
    size: {
      xxs: "py-1 px-2  space-x-2",
      xs: "py-1 px-2 space-x-1",
      md: "py-2 px-4  space-x-2",
      lg: "py-4 px-6 space-x-2",
    },
  },
  compoundVariants: [
    {
      color: ["primary-default"],
      disabled: false,
      class: "bg-morrie-primary",
    },
    {
      color: ["primary-error"],
      disabled: true,
      class: "bg-red-500 hover:bg-red-500/30 hover:border-transparent",
    },
    {
      color: ["secondary-default"],
      disabled: true,
      class:
        "text-secondary bg-transparent border-morrie-secondary hover:bg-transparent hover:shadow-none",
    },
    {
      color: "hyperlink-default",
      disabled: true,
      class: `${classes.hyperlink} text-secondary bg-inherit border-text-disabled hover:bg-inherit`,
    },
  ],
});

export const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    children,
    color,
    startIcon,
    endIcon,
    className,
    size = "xs",
    type = "button",
    disabled = false,
    componentAs: Component,
    href,
    disableTextWrapper = false,
    ...rest
  },
  ref
) => {
  const BaseComponent = Component || (href ? "a" : "button");

  return (
    <BaseComponent
      ref={ref}
      href={href}
      type={href ? undefined : type}
      disabled={disabled}
      className={center(styles({ size, color, disabled }), className)}
      {...rest}
    >
      {startIcon && (
        <span className={`${classes.icons}`} data-testid="button-start-icon">
          {startIcon}
        </span>
      )}
      {children && disableTextWrapper ? children : <span>{children}</span>}
      {endIcon && (
        <span className={`${classes.icons}`} data-testid="button-end-icon">
          {endIcon}
        </span>
      )}
    </BaseComponent>
  );
};

export const Button: ForwardRefExoticComponent<
  Omit<ButtonProps, "ref"> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ButtonProps>(ButtonComponent);

Button.displayName = "Button";
