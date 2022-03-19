import { MDCDrawer } from "@material/drawer";
import classNames from "classnames";
import { createEffect, mergeProps, PropsWithChildren } from "solid-js";
import "./Drawer.scss";

interface DrawerProps {
  title?: string;
  subtitle?: string;
  type?: "standard" | "modal";
  open: boolean;
  onClose?: () => void;
}

const Drawer = (_props: PropsWithChildren<DrawerProps>) => {
  const props = mergeProps({ type: "standard" } as DrawerProps, _props);
  let drawerElement: HTMLElement | undefined;
  let drawer: MDCDrawer | undefined;

  createEffect(() => {
    if (drawerElement) {
      drawer = new MDCDrawer(drawerElement);
    }
  });

  createEffect(() => {
    if (drawer) {
      drawer.listen("MDCDrawer:closed", () => props.onClose?.());
    }
  });

  createEffect(() => {
    if (drawer) {
      drawer.open = props.open;
    }
  });

  return (
    <>
      <aside
        class={classNames({
          "mdc-drawer": true,
          "mdc-drawer--modal": props.type === "modal",
        })}
        ref={(el) => (drawerElement = el)}
      >
        {props.title && (
          <div class="mdc-drawer__header">
            <h3 class="mdc-drawer__title">{props.title}</h3>
            {props.subtitle && (
              <h6 class="mdc-drawer__subtitle">{props.subtitle}</h6>
            )}
          </div>
        )}
        <div class="mdc-drawer__content">{props.children}</div>
      </aside>
      {props.type === "modal" && <div class="mdc-drawer-scrim"></div>}
    </>
  );
};

export { Drawer };
