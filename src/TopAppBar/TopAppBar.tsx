import {
  createEffect,
  mergeProps,
  onCleanup,
  PropsWithChildren,
} from "solid-js";
import classNames from "classnames";
import "./TopAppBar.scss";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCRipple } from "@material/ripple";

export interface RegularTopAppBarProps {
  variant?: "regular";
  dense?: boolean;
  prominent?: boolean;
  fixed?: boolean;
}

export interface ShortTopAppBarProps {
  variant: "short";
  collapsed?: boolean;
}

// discriminating union
export type TopAppBarProps = ShortTopAppBarProps | RegularTopAppBarProps;

const TopAppBar = (_props: PropsWithChildren<TopAppBarProps>) => {
  const props = mergeProps({ variant: "regular" }, _props);
  let topAppBarElement: HTMLElement | undefined;
  let topAppBar: MDCTopAppBar | undefined;

  createEffect(() => {
    if (topAppBarElement) {
      // Instantiation
      topAppBar = new MDCTopAppBar(topAppBarElement);
      topAppBar.initialize();
    }
  });

  onCleanup(() => topAppBar?.destroy());

  return (
    <header
      class={classNames({
        "mdc-top-app-bar": true,
        "mdc-top-app-bar--dense": props.variant === "regular" && props.dense,
        "mdc-top-app-bar--fixed": props.variant === "regular" && props.fixed,
        "mdc-top-app-bar--prominent":
          props.variant === "regular" && props.prominent,
        "mdc-top-app-bar--short": props.variant === "short",
        "mdc-top-app-bar--short-collapsed":
          props.variant === "short" && props.collapsed,
      })}
      ref={(el) => (topAppBarElement = el)}
    >
      <div class={"mdc-top-app-bar__row"}>{props.children}</div>
    </header>
  );
};

TopAppBar.ActionItem = (props: PropsWithChildren<{}>) => {
  let actionItemElement: HTMLSpanElement | undefined;
  let iconButtonRipple: MDCRipple | undefined;

  createEffect(() => {
    if (actionItemElement) {
      iconButtonRipple = new MDCRipple(actionItemElement);
      iconButtonRipple.unbounded = true;
      iconButtonRipple.initialize();
    }
  });

  onCleanup(() => iconButtonRipple?.destroy());

  return (
    <span
      ref={(el) => (actionItemElement = el)}
      class={classNames("mdc-top-app-bar__action-item", "mdc-icon-button")}
    >
      {props.children}
    </span>
  );
};

TopAppBar.NavigationIcon = (props: PropsWithChildren<{}>) => {
  let navigationIconElement: HTMLSpanElement | undefined;
  let iconButtonRipple: MDCRipple | undefined;

  createEffect(() => {
    if (navigationIconElement) {
      iconButtonRipple = new MDCRipple(navigationIconElement);
      iconButtonRipple.unbounded = true;
      iconButtonRipple.initialize();
    }
  });

  onCleanup(() => iconButtonRipple?.destroy());

  return (
    <span
      ref={(el) => (navigationIconElement = el)}
      class={classNames("mdc-top-app-bar__navigation-icon", "mdc-icon-button")}
    >
      {props.children}
    </span>
  );
};

export interface TopAppBarSectionProps {
  align: "start" | "end";
}

TopAppBar.Section = (props: PropsWithChildren<TopAppBarSectionProps>) => {
  return (
    <section
      class={classNames({
        "mdc-top-app-bar__section": true,
        "mdc-top-app-bar__section--align-start": props.align === "start",
        "mdc-top-app-bar__section--align-end": props.align === "end",
      })}
    >
      {props.children}
    </section>
  );
};

TopAppBar.Title = (props: PropsWithChildren<{}>) => {
  return <span class={"mdc-top-app-bar__title"}>{props.children}</span>;
};

export { TopAppBar };
