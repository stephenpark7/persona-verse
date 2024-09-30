import { type FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { ButtonProps } from '@types';
import { buttonProps } from '@schemas';

export const Button: FC<ButtonProps> = ({
  name,
  type = 'button',
  onClick,
  children,
  overrideCSS,
  width,
  height,
  link,
}): React.JSX.Element => {
  buttonProps.parse({
    name,
    type,
    onClick,
    children,
    overrideCSS,
    width,
    height,
    link,
  });

  let element = (
    <button
      name={name}
      className={`border border-black rounded bg-white ${height ?? 'h-10'} ${width ?? 'w-24'} text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200 ${overrideCSS}`}
      data-testid={`${name}-button`}
      onClick={(e: FormEvent) => onClick && onClick(e)}
      type={type}
    >
      {children}
    </button>
  );

  if (link) {
    element = <Link to={link}>{element}</Link>;
  }

  return element;
};
