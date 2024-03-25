import styles from './SearchBar.module.css';
import icon from '../assets/img/icon-search.svg';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

export default function SearchBar({
  search,
  error,
}: {
  search: Dispatch<SetStateAction<string>>;
  error?: string;
}): JSX.Element {
  const [name, setName] = useState<string>('');

  function handleInputChange(e: React.ChangeEvent): void {
    setName((e.target as HTMLInputElement).value);
  }

  function handleFormSubmit(e: FormEvent): void {
    e.preventDefault();

    search(name);
  }

  return (
    <form className={styles.searchBar} onSubmit={handleFormSubmit}>
      <img src={icon} alt='Search icon' className={styles.icon} />
      <div className={styles.inputWrapper}>
        <input
          type='text'
          name='name'
          maxLength={32}
          className={styles.input}
          placeholder='Search GitHub username...'
          value={name}
          onChange={handleInputChange}
        />
        <p className={styles.error}>{error}</p>
      </div>
      <button className={styles.btn}>Search</button>
    </form>
  );
}
