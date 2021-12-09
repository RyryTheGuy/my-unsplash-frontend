import React from "react";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonPrimary: React.FC<ButtonProps> = ( props ) => {
  const { children, ...rest } = props;

  return (
    <>
      <button
        className={`py-3 px-5 bg-green-500 hover:bg-green-400 text-white rounded-lg shadow-md`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export { ButtonPrimary };