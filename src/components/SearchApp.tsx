import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import styles from './SearchBar.module.css';
import Toggle from './Toggle';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../models/user';
import User from './User';

export default function SearchApp(): JSX.Element {
  const [search, setSearch] = useState<string>('');

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({ queryKey: ['search'], queryFn: fetchUser });

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
    <div className={styles.searchApp}>
      <header className={styles.header}>
        <h1 className={styles.logo}>devfinder</h1>
        <Toggle />
      </header>
      <SearchBar setSearch={setSearch} error={error ? 'No results' : ''} />
      {isLoading && <h2>Loading...</h2>}
      {user && <User user={user} />}
    </div>
  );
}
