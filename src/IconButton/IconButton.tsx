import {
  createEffect,
  createSignal,
  onCleanup,
  PropsWithChildren,
} from "solid-js";
import { MDCRipple } from "@material/ripple";
import classNames from "classnames";
import "./IconButton.scss";

interface IconButtonProps {
  aria?: {
    labelOn: string;
    labelOff: string;
    label?: string;
  };
  onClick?: (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => void;
}

const IconButton = (props: PropsWithChildren<IconButtonProps>) => {
  let buttonElement: HTMLButtonElement;
  const [buttonRipple, setButtonRipple] = createSignal<MDCRipple>();
  const [isNavIcon, setIsNavIcon] = createSignal(false);

  createEffect(() => {
    const ripple = new MDCRipple(buttonElement);
    ripple.initialize();
    ripple.unbounded = true;
    setButtonRipple(ripple);
    setIsNavIcon(Boolean(buttonElement.closest(".mdc-top-app-bar")));
  });

  onCleanup(() => buttonRipple()?.destroy());

  return (
    <div class="mdc-touch-target-wrapper">
      <button
        onClick={(e) => {
          props.onClick?.(e);
        }}
        class={classNames({
          "mdc-icon-button": true,
          "mdc-icon-button--touch": true,
          "mdc-top-app-bar__navigation-icon": isNavIcon(),
        })}
        ref={(el) => (buttonElement = el)}
        aria-label={props.aria?.label}
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
