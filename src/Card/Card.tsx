import { createEffect, JSX, mergeProps, PropsWithChildren } from "solid-js";
import classNames from "classnames";
import { MDCRipple } from "@material/ripple";
import "./Card.scss";

const Card = (props: PropsWithChildren) => {
  return <div class="mdc-card">{props.children}</div>;
};

Card.Content = (props: PropsWithChildren) => {
  return <div class="mdc-card__content">{props.children}</div>;
};

Card.PrimaryAction = (props: PropsWithChildren) => {
  let primaryActionElement: HTMLDivElement | undefined;

  createEffect(() => {
    if (primaryActionElement) new MDCRipple(primaryActionElement);
  });

  return (
    <div class="mdc-card__primary-action" tabindex="0">
      {props.children}
      <div class="mdc-card__ripple"></div>
    </div>
  );
};

export interface CardMediaProps {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  aspectRatio?: "square" | "16/9";
}

Card.Media = (props: PropsWithChildren<CardMediaProps>) => {
  const _props = mergeProps({ aspectRatio: "square" } as CardMediaProps, props);
  return (
    <div
      {...props.containerProps}
      class={classNames(
        {
          "mdc-card__media": true,
          "mdc-card__media--16-9": _props.aspectRatio === "16/9",
          "mdc-card__media--square": _props.aspectRatio === "square",
        },
        props.containerProps?.class,
        props.containerProps?.className
      )}
    >
      <div class="mdc-card__media-content">{props.children}</div>
    </div>
  );
};

export interface CardActionsProps {
  fullBleed?: boolean;
}

Card.Actions = (props: PropsWithChildren<CardActionsProps>) => {
  return (
    <div
      class={classNames({
        "mdc-card__actions": true,
        "mdc-card__actions--full-bleed": props.fullBleed,
      })}
    >
      {/* buttons with mdc-card__action class */}
      {props.children}
    </div>
  );
};

export { Card };
