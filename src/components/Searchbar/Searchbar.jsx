import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarContainer,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [q, setQ] = useState(' ');

  const handleQuery = e => {
    setQ(e.currentTarget.value.toLowerCase());
  };

  const sendResult = e => {
    e.preventDefault();

    onSubmit(q);
  };

  return (
    <SearchBarContainer>
      <SearchForm onSubmit={sendResult}>
        <SearchButton type="submit">
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQuery}
        />
      </SearchForm>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
