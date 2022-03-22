import {
  createEffect,
  JSX,
  mergeProps,
  onCleanup,
  PropsWithChildren,
} from "solid-js";
import classNames from "classnames";
import { MDCRipple } from "@material/ripple";
import "./Button.scss";

export interface CommonButtonProps {
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  disabled?: boolean;
  buttonProps?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
}

export interface TextOutlinedButtonProps {
  variant?: "text" | "outlined";
}

export interface ContainedButtonProps {
  variant: "contained";
  elevated?: boolean;
}

export type ButtonProps = CommonButtonProps &
  (ContainedButtonProps | TextOutlinedButtonProps);

const Button = (_props: PropsWithChildren<ButtonProps>) => {
  const props = mergeProps({ variant: "text" } as ButtonProps, _props);
  let buttonElement: HTMLButtonElement | undefined;
  let buttonRipple: MDCRipple | undefined;

  createEffect(() => {
    if (buttonElement) {
      buttonRipple = new MDCRipple(buttonElement);
      buttonRipple.initialize();
    }
  });

  onCleanup(() => buttonRipple?.destroy());

  return (
    <div class={"mdc-touch-target-wrapper"}>
      <button
        {...{
          ...props.buttonProps,
          onclick: props.onClick || props.buttonProps?.onclick,
          onClick: props.onClick || props.buttonProps?.onClick,
        }}
        disabled={props.disabled}
        ref={(el) => (buttonElement = el)}
        class={classNames("mdc-button", "mdc-button--touch", {
          "mdc-button--outlined": props.variant === "outlined",
          "mdc-button--unelevated":
            props.variant === "contained" && !props.elevated,
          "mdc-button--raised": props.variant === "contained" && props.elevated,
        })}
      >
        <span class={"mdc-button__ripple"}></span>
        <span class={"mdc-button__touch"}></span>
        {props.leadingIcon && (
          <span class="mdc-button__icon">{props.leadingIcon}</span>
        )}
        <span class={"mdc-button__label"}>{props.children}</span>
        {props.trailingIcon && (
          <span class="mdc-button__icon">{props.trailingIcon}</span>
        )}
      </button>
    </div>
  );
};

export { Button };
