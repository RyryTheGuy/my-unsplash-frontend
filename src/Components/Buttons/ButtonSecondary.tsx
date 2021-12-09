import React from "react";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonSecondary: React.FC<ButtonProps> = ( props ) => {
  const { children, ...rest } = props;

  return (
    <>
      <button
        className={`py-3 px-5 bg-red-500 hover:bg-red-400 text-white rounded-lg shadow-md`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export { ButtonSecondary };