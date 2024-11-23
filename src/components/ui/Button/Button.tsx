import styles from './Button.module.scss';

interface IProps {
  value: string;
  type?: 'reset' | 'submit' | 'button';
  appearence?: 'danger' | 'normal';
  className?: string;
  onClick?: (val?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  value,
  type = 'button',
  className,
  onClick,
  appearence = 'normal',
}: IProps) => {
  const classNameSwitcher = () => {
    switch (appearence) {
      case 'danger':
        return styles.danger;
      case 'normal':
        return styles.normal;
      default:
        return styles.normal;
    }
  };

  const handleBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={`${styles.btn} ${classNameSwitcher()} ${className ? className : ''}`}
      onClick={handleBtnClick}
    >
      {value}
    </button>
  );
};

export default Button;
