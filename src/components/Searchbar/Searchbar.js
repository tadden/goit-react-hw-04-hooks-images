import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!query.trim()) return setQuery('');

    onSubmit(query.trim().toLowerCase());
    setQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button
          type='submit'
          className={s.searchFormButton}
          aria-label='Search images'
        >
          <ImSearch style={{ width: 22, height: 22 }} />
        </button>

        <input
          className={s.searchFormInput}
          type='text'
          name='searchQuery'
          value={query}
          autoComplete='off'
          autoFocus
          placeholder='Search images'
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

