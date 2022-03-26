import {
  createEffect,
  onCleanup,
  PropsWithChildren,
  JSX,
  splitProps,
} from "solid-js";
import { MDCRipple } from "@material/ripple";
import "./IconButton.scss";

interface IconButtonProps {
  aria?: {
    labelOn: string;
    labelOff: string;
  };
  buttonProps?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => void;
}

const IconButton = (props: PropsWithChildren<IconButtonProps>) => {
  const [local] = splitProps(props as PropsWithChildren<IconButtonProps>, [
    "buttonProps",
  ]);
  let buttonElement: HTMLButtonElement | undefined;
  let buttonRipple: MDCRipple | undefined;

  createEffect(() => {
    if (buttonElement) {
      buttonRipple = new MDCRipple(buttonElement);
      buttonRipple.initialize();
      buttonRipple.unbounded = true;
    }
  });

  onCleanup(() => buttonRipple?.destroy());

  return (
    <div class="mdc-touch-target-wrapper">
      <button
        {...{
          ...local.buttonProps,
          onclick: props.onClick || local.buttonProps?.onclick,
          onClick: props.onClick || local.buttonProps?.onClick,
        }}
        onClick={(e) => {
          props.onClick?.(e);
        }}
        class="mdc-icon-button mdc-icon-button--touch"
        ref={(el) => (buttonElement = el)}
        data-aria-label-on={props.aria?.labelOn}
        data-aria-label-off={props.aria?.labelOff}
      >
        <div class="mdc-icon-button__ripple"></div>
        <span class="mdc-icon-button__icon">{props.children}</span>
      </button>
    </div>
  );
};

export { IconButton };
