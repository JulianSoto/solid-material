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
  const [isActionItem, setIsActionItem] = createSignal(false);

  createEffect(() => {
    const ripple = new MDCRipple(buttonElement);
    ripple.initialize();
    ripple.unbounded = true;
    setButtonRipple(ripple);
    // true if button is inside top app bar section
    setIsNavIcon(
      Boolean(
        buttonElement.closest(
          ".mdc-top-app-bar .mdc-top-app-bar__section.mdc-top-app-bar__section--align-start"
        )
      )
    );
    setIsActionItem(
      Boolean(
        buttonElement.closest(
          ".mdc-top-app-bar .mdc-top-app-bar__section.mdc-top-app-bar__section--align-end"
        )
      )
    );
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
          "mdc-top-app-bar__action-item": isActionItem(),
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
