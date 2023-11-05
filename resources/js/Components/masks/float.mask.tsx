import InputMask from "react-input-mask";

export const PhoneInputMask = (props: any) => {
  const { inputRef, ...other } = props;
  return (
    <InputMask
      {...other}
      mask={[
        "(",
        "+",
        /[3]/,
        /[5-8]/,
        /[1-9]/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      inputRef={inputRef}
      alwaysShowMask={true}
    />
  );
};

export const OddInputMask = (props: any) => {
  const { inputRef, ...other } = props;
  return <InputMask {...other} mask={"9.99"} inputRef={inputRef} alwaysShowMask={true} />;
};
