import { createMemo } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { Dynamic } from "solid-js/web";
import "./Typography.scss";

export const variantMapping = {
  headline1: "h1",
  headline2: "h2",
  headline3: "h3",
  headline4: "h4",
  headline5: "h5",
  headline6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  button: "span",
  overline: "span",
} as const;

interface TypographyProps {
  children: string;
  variant: keyof typeof variantMapping;
  element?: keyof HTMLElementTagNameMap;
  style?: JSX.HTMLAttributes<HTMLElement>["style"];
  classList?: JSX.HTMLAttributes<HTMLElement>["classList"];
}

const Typography = (props: TypographyProps) => {
  const classList = createMemo(() => ({
    [`mdc-typography--${props.variant}`]: true,
  }));

  return (
    <Dynamic
      component={props.element || variantMapping[props.variant]}
      class={`mdc-typography--${props.variant}`}
      classList={{ ...classList(), ...props.classList }}
      style={props.style}
    >
      {props.children}
    </Dynamic>
  );
};

export { Typography };
