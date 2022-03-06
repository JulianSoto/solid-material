import { createEffect, JSX } from "solid-js";
import classNames from "classnames";
import { MDCCheckbox } from "@material/checkbox";
import styles from "./Checkbox.scss";

export interface CheckboxProps {
  indeterminate?: boolean;
}

const Checkbox = (
  props: JSX.InputHTMLAttributes<HTMLInputElement> & CheckboxProps
) => {
  let checkboxElement: HTMLDivElement | undefined;
  let checkbox: MDCCheckbox | undefined;

  createEffect(() => {
    if (checkboxElement) {
      checkbox = new MDCCheckbox(checkboxElement);
    }
  });

  createEffect(() => {
    if (checkbox) {
      checkbox.indeterminate = props.indeterminate || false;
    }
  });

  return (
    <div class={styles["mdc-touch-target-wrapper"]}>
      <div
        class={classNames(
          styles["mdc-checkbox"],
          styles["mdc-checkbox--touch"],
          { [styles["mdc-checkbox--disabled"]]: props.disabled }
        )}
        ref={(el) => (checkboxElement = el)}
      >
        <input
          {...props}
          type="checkbox"
          className={undefined}
          class={classNames(
            props.class,
            props.className,
            styles["mdc-checkbox__native-control"],
            "mdc-checkbox__native-control"
          )}
          data-indeterminate={props.indeterminate}
        />
        <div class={styles["mdc-checkbox__background"]}>
          <svg class={styles["mdc-checkbox__checkmark"]} viewBox="0 0 24 24">
            <path
              class={styles["mdc-checkbox__checkmark-path"]}
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
          <div class={styles["mdc-checkbox__mixedmark"]}></div>
        </div>
        <div class={styles["mdc-checkbox__ripple"]}></div>
      </div>
    </div>
  );
};

export { Checkbox };
