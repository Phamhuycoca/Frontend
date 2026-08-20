import { Button, type ButtonProps } from 'antd';

type CommonButtonProps = ButtonProps & {
  title: string;
};

export const CommonButton = ({ title, ...rest }: CommonButtonProps) => {
  return <Button {...rest}>{title}</Button>;
};
