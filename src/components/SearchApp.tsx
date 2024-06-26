import { useContext, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import styles from './SearchApp.module.css';
import Toggle from './Toggle';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../models/user';
import User from './User';
import { AppContext } from '../App';

export default function SearchApp(): JSX.Element {
  const [search, setSearch] = useState<string>('');

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({ queryKey: ['search'], queryFn: fetchUser });

  const { mode } = useContext(AppContext);

  async function fetchUser(): Promise<IUser | null> {
    if (!search) return null;

    const res = await fetch(` https://api.github.com/users/${search}`);

    if (!res.ok) throw new Error((await res.json()).message);

    return await res.json();
  }

  useEffect(() => {
    if (search) queryClient.invalidateQueries({ queryKey: ['search'] });
  }, [search]);

  return (
    <div className={styles.searchApp + ' ' + styles[mode.toString()]}>
      <header className={styles.header}>
        <div className={styles.header_top}>
          <h1 className={styles.logo}>devfinder</h1>
          <Toggle />
        </div>
        <SearchBar setSearch={setSearch} error={error ? 'No results' : ''} />
      </header>
      <main className={styles.main}>
        {isLoading && <h2>Loading...</h2>}
        {user && <User user={user} />}
      </main>
    </div>
  );
}
