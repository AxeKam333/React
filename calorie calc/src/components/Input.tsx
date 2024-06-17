import React from "react";
interface InputGroupProps extends React.ComponentPropsWithoutRef<"input"> {
  validation: Boolean | undefined;
}

export const Input = ({ validation, ...rest }: InputGroupProps) => {
  let inputClass = "valid";
  if (!validation) {
    inputClass = "alert";
  }
  return <input className={inputClass} {...rest}></input>;
};
