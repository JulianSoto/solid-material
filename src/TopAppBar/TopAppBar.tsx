import {
  createEffect,
  createSignal,
  For,
  JSX,
  mergeProps,
  onCleanup,
  PropsWithChildren,
} from "solid-js";
import classNames from "classnames";
import "./TopAppBar.scss";
import { MDCTopAppBar } from "@material/top-app-bar";
import { Dynamic } from "solid-js/web";

export interface CommonTopAppBarProps {
  children: [JSX.Element, JSX.Element];
}

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
export type TopAppBarProps = (ShortTopAppBarProps | RegularTopAppBarProps) &
  CommonTopAppBarProps;

const TopAppBar = (_props: TopAppBarProps) => {
  const props = mergeProps({ variant: "regular" }, _props);
  let topAppBarElement: HTMLElement;
  const [topAppBar, setTopAppBar] = createSignal<MDCTopAppBar>();

  createEffect(() => {
    // Instantiation
    const _topAppBar = new MDCTopAppBar(topAppBarElement);
    _topAppBar.initialize();
    setTopAppBar(_topAppBar);
  });

  onCleanup(() => topAppBar()?.destroy());

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
      <div class={"mdc-top-app-bar__row"}>
        <For each={props.children}>
          {(section, index) => (
            <section
              class={classNames({
                "mdc-top-app-bar__section": true,
                "mdc-top-app-bar__section--align-start": index() === 0,
                "mdc-top-app-bar__section--align-end": index() === 1,
              })}
            >
              {section}
            </section>
          )}
        </For>
      </div>
    </header>
  );
};

TopAppBar.Title = (props: PropsWithChildren<{}>) => {
  return <span class={"mdc-top-app-bar__title"}>{props.children}</span>;
};

type TopAppBarAdjustProps = (
  | {
      variant?: "regular";
      dense?: boolean;
      prominent?: boolean;
    }
  | { variant: "short" }
) & { element?: keyof HTMLElementTagNameMap };

const TopAppBarAdjust = (props: PropsWithChildren<TopAppBarAdjustProps>) => {
  const local = mergeProps({ variant: "regular" }, props);

  return (
    <Dynamic
      component={local.element || "div"}
      class={classNames({
        "mdc-top-app-bar--fixed-adjust":
          local.variant === "regular" && !local.prominent && !local.dense,
        "mdc-top-app-bar--short-fixed-adjust": local.variant === "short",
        "mdc-top-app-bar--prominent-fixed-adjust":
          local.variant === "regular" && local.prominent && !local.dense,
        "mdc-top-app-bar--dense-fixed-adjust":
          local.variant === "regular" && local.dense && !local.prominent,
        "mdc-top-app-bar--dense-prominent-fixed-adjust":
          local.variant === "regular" && local.prominent && local.dense,
      })}
    >
      {local.children}
    </Dynamic>
  );
};

export { TopAppBar, TopAppBarAdjust };
