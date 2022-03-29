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

export interface CommonTopAppBarProps {
  children: [JSX.Element, JSX.Element];
}

export interface RegularTopAppBarProps extends CommonTopAppBarProps {
  variant?: "regular";
  dense?: boolean;
  prominent?: boolean;
  fixed?: boolean;
}

export interface ShortTopAppBarProps extends CommonTopAppBarProps {
  variant: "short";
  collapsed?: boolean;
}

// discriminating union
export type TopAppBarProps = ShortTopAppBarProps | RegularTopAppBarProps;

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

export { TopAppBar };
