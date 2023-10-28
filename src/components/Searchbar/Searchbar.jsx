import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarContainer,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    q: '',
  };
  handleQuery = e => {
    this.setState({
      q: e.currentTarget.value.toLowerCase(),
    });
  };

  sendResult = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <SearchBarContainer>
        <SearchForm onSubmit={this.sendResult}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeHolder="Search images and photos"
            onChange={this.handleQuery}
          />
        </SearchForm>
      </SearchBarContainer>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
