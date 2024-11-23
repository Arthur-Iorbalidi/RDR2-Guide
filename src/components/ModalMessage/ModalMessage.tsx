import styles from './ModalMessage.module.scss';

interface IProps {
  text: string;
  className?: string;
  appearence?: 'success' | 'error' | 'normal';
}

const ModalMessage = ({ text, className, appearence }: IProps) => {
  const classNameSwitcher = () => {
    switch (appearence) {
      case 'success':
        return styles.succes;
      case 'error':
        return styles.error;
      case 'normal':
        return styles.normal;
      default:
        return styles.normal;
    }
  };

  return (
    <div
      className={`${styles.message} ${classNameSwitcher()} ${className ? className : ''}`}
    >
      {text}
    </div>
  );
};

export default ModalMessage;
