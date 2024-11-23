import styles from './Message.module.scss';

interface IProps {
  message: string;
}

const Message = ({ message }: IProps) => {
  return <div className={styles.message}>{message}</div>;
};

export default Message;
