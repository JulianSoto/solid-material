import { MDCMenu } from "@material/menu";
import { createEffect, createMemo, PropsWithChildren } from "solid-js";
import { List } from "../List";
import { ListItem } from "../List";
import "./Menu.scss";

export interface MenuProps {
  items: ListItem[];
  openSetter?: (setOpen: () => void) => void;
}

const Menu = (props: PropsWithChildren<MenuProps>) => {
  let menuElement: HTMLDivElement | undefined;
  let menu: MDCMenu | undefined;
  const itemsWithRoleProp = createMemo<ListItem[]>(() =>
    props.items.map((item) => ({
      ...item,
      itemProps: { ...(item.itemProps || {}), role: "menuitem" },
    }))
  );

  createEffect(() => {
    if (menuElement) {
      menu = new MDCMenu(menuElement);
    }
  });

  createEffect(() => {
    if (props.openSetter) {
      props.openSetter(() => {
        if (menu) menu.open = true;
      });
    }
  });

  return (
    <div class="mdc-menu-surface--anchor">
      {props.children}
      <div class="mdc-menu mdc-menu-surface" ref={(el) => (menuElement = el)}>
        <List
          items={itemsWithRoleProp()}
          listProps={{
            role: "menu",
            "aria-hidden": "true",
            "aria-orientation": "vertical",
            tabindex: "-1",
          }}
        />
      </div>
    </div>
  );
};

export { Menu };
