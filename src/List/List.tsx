import { createEffect, For, JSX, onCleanup, splitProps } from "solid-js";
import { MDCList } from "@material/list";
import { MDCRipple } from "@material/ripple";
import "./List.scss";

export interface ListItem {
  text: string;
  onClick?: JSX.EventHandlerUnion<HTMLLIElement, MouseEvent>;
  itemProps?: JSX.HTMLAttributes<HTMLLIElement>;
}

interface ListProps {
  items: ListItem[];
  listProps?: JSX.HTMLAttributes<HTMLUListElement>;
}

const Item = (props: ListItem) => {
  const [local] = splitProps(props, ["itemProps"]);
  let itemElement: HTMLLIElement | undefined;
  let itemRipple: MDCRipple | undefined;

  createEffect(() => {
    if (itemElement) {
      itemRipple = new MDCRipple(itemElement);
    }
  });

  onCleanup(() => {
    itemRipple?.destroy();
  });

  return (
    <li
      {...{
        ...local.itemProps,
        onclick: props.onClick || local.itemProps?.onclick,
        onClick: props.onClick || local.itemProps?.onClick,
      }}
      ref={(el) => (itemElement = el)}
      class="mdc-deprecated-list-item"
    >
      <span class="mdc-deprecated-list-item__ripple"></span>
      <span class="mdc-deprecated-list-item__text">{props.text}</span>
    </li>
  );
};

const List = (props: ListProps) => {
  let listElement: HTMLUListElement | undefined;
  let list: MDCList | undefined;

  createEffect(() => {
    if (listElement) {
      list = new MDCList(listElement);
    }
  });

  return (
    <ul
      {...props.listProps}
      class="mdc-deprecated-list"
      ref={(el) => (listElement = el)}
    >
      <For each={props.items}>{(item) => <Item {...item} />}</For>
    </ul>
  );
};

const Divider = () => {
  return <hr class="mdc-deprecated-list-divider" />;
};

export { List, Divider };
