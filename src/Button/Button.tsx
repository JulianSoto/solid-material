import {
  createEffect,
  mergeProps,
  onCleanup,
  PropsWithChildren,
} from "solid-js";
import classNames from "classnames";
import { MDCRipple } from "@material/ripple";
import styles from "./Button.scss";

export interface CommonButtonProps {
  disabled?: boolean;
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
    <div class={styles["mdc-touch-target-wrapper"]}>
      <button
        disabled={props.disabled}
        ref={(el) => (buttonElement = el)}
        class={classNames(styles["mdc-button"], styles["mdc-button--touch"], {
          [styles["mdc-button--outlined"]]: props.variant === "outlined",
          [styles["mdc-button--unelevated"]]:
            props.variant === "contained" && !props.elevated,
          [styles["mdc-button--raised"]]:
            props.variant === "contained" && props.elevated,
        })}
      >
        <span class={styles["mdc-button__ripple"]}></span>
        <span class={styles["mdc-button__touch"]}></span>
        <span class={styles["mdc-button__label"]}>{props.children}</span>
      </button>
    </div>
  );
};

export { Button };
