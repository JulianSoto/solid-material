import {
  createEffect,
  createMemo,
  JSX,
  mergeProps,
  PropsWithChildren,
} from "solid-js";
import classNames from "classnames";
import { customAlphabet } from "nanoid";
import { MDCTextField } from "@material/textfield";
import "./TextField.scss";

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  7
);

interface InputTextFieldProps {
  element?: "input";
  label?: string;
  helperText?: string;
  prefix?: string;
  inputPrefix?: JSX.Element;
  inputSuffix?: JSX.Element;
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
}

interface TextareaTextFieldProps {
  element?: "textarea";
  resizable?: boolean;
  counterInside?: boolean;
  textareaProps?: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

type TextFieldProps = {
  variant?: "filled" | "outlined";
  hideCounter?: boolean;
} & (InputTextFieldProps | TextareaTextFieldProps);

const TextFieldLabel = (props: { label: string; id?: string }) => {
  return (
    <span class="mdc-floating-label" id={props.id}>
      {props.label}
    </span>
  );
};

const TextareaResizer = (props: PropsWithChildren<{ resizable: boolean }>) => {
  return (
    <>
      {props.resizable ? (
        <span class="mdc-text-field__resizer">{props.children}</span>
      ) : (
        props.children
      )}
    </>
  );
};

const TextField = (_props: TextFieldProps) => {
  const props = mergeProps(
    { variant: "filled", element: "input", value: "" } as TextFieldProps,
    _props
  );
  const helperTextId = nanoid();
  const labelId = nanoid();
  let textFieldElement: HTMLLabelElement | undefined;
  let textField: MDCTextField | undefined;

  const showOutsideCounter = createMemo(() => {
    if (props.element === "textarea" && props.counterInside) return false;
    const inputHasMaxLengthProp =
      props.element === "input" &&
      (props.inputProps?.maxLength || props.inputProps?.maxlength);
    const textareaHasMaxLengthProp =
      props.element === "textarea" &&
      (props.textareaProps?.maxLength || props.textareaProps?.maxlength);
    if (
      (inputHasMaxLengthProp || textareaHasMaxLengthProp) &&
      !props.hideCounter
    )
      return true;
    return false;
  });

  createEffect(() => {
    if (textFieldElement) {
      textField = new MDCTextField(textFieldElement);
    }
  });

  return (
    <>
      <label
        class={classNames("mdc-text-field", {
          "mdc-text-field--filled": props.variant === "filled",
          "mdc-text-field--outlined": props.variant === "outlined",
          "mdc-text-field--textarea": props.element === "textarea",
          "mdc-text-field--no-label":
            props.element === "textarea" ||
            (props.element === "input" && !props.label),
          "mdc-text-field--disabled":
            (props.element === "textarea" && props.textareaProps?.disabled) ||
            (props.element === "input" && props.inputProps?.disabled),
          "mdc-text-field--with-internal-counter":
            props.element === "textarea" && props.counterInside,
        })}
        ref={(el) => (textFieldElement = el)}
      >
        {props.variant === "filled" && <span class="mdc-text-field__ripple" />}
        {props.variant === "outlined" ? (
          <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            {props.element === "input" && props.label && (
              <span class="mdc-notched-outline__notch">
                <TextFieldLabel label={props.label} id={labelId} />
              </span>
            )}
            <span class="mdc-notched-outline__trailing"></span>
          </span>
        ) : (
          props.element === "input" &&
          props.label && <TextFieldLabel label={props.label} id={labelId} />
        )}
        {props.element === "input" && (
          // input element
          <>
            {props.inputPrefix && (
              <span class="mdc-text-field__affix mdc-text-field__affix--prefix">
                {props.inputPrefix}
              </span>
            )}
            <input
              {...props.inputProps}
              class="mdc-text-field__input"
              type="text"
              value={props.inputProps?.value}
              aria-labelledby={classNames(
                { [labelId]: props.label },
                props.inputProps?.["aria-labelledby"]
              )}
              aria-controls={classNames(
                { [helperTextId]: props.helperText },
                props.inputProps?.["aria-controls"]
              )}
              aria-describedby={classNames(
                { [helperTextId]: props.helperText },
                props.inputProps?.["aria-describedby"]
              )}
            />
            {props.inputSuffix && (
              <span class="mdc-text-field__affix mdc-text-field__affix--suffix">
                {props.inputSuffix}
              </span>
            )}
          </>
        )}
        {props.element === "textarea" && (
          // textarea element
          <TextareaResizer resizable={props.resizable || false}>
            <textarea {...props.textareaProps} class="mdc-text-field__input" />
            {!props.hideCounter && props.counterInside && (
              <span class="mdc-text-field-character-counter" />
            )}
          </TextareaResizer>
        )}
        {props.variant === "filled" && <span class="mdc-line-ripple" />}
      </label>

      {(showOutsideCounter() ||
        (props.element === "input" && props.helperText)) && (
        <div class="mdc-text-field-helper-line">
          {props.element === "input" && props.helperText && (
            <div
              class="mdc-text-field-helper-text"
              id={helperTextId}
              aria-hidden="true"
            >
              {props.helperText}
            </div>
          )}
          {showOutsideCounter() && (
            <div class="mdc-text-field-character-counter" />
          )}
        </div>
      )}
    </>
  );
};

export { TextField, TextFieldProps };
