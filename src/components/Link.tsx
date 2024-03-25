import styles from './Link.module.css';
import { PropsWithChildren, useContext } from 'react';
import { AppContext } from '../App';
type Props = {
  url?: string;
  unavailable?: boolean;
};

export default function Link({
  url = '#',
  unavailable = false,
  children,
}: PropsWithChildren<Props>): JSX.Element {
  const { mode } = useContext(AppContext);
  return (
    <a
      href={url}
      target='_blank'
      className={
        styles.link +
        ' ' +
        styles[mode.toString()] +
        ' ' +
        (unavailable ? styles.unavailable : '')
      }
    >
      {children}
    </a>
  );
}
