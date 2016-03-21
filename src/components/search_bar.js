import React, {Component} from 'react';
import PhotoList from './photo_list';

// searchbar component renders input and sort fields as well as the PhotoList component

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      sortBy: "0"
    };
  }

  render() {
    return (
      <div>
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
          &nbsp;
          <select value={this.state.sortBy} onChange={event => this.setState({sortBy: event.target.value})}>
            <option value="0" >Recent First</option>
            <option value="1" >Oldest First</option>
          </select>
      </div>
      <div className="photolist">
      <PhotoList photos={this.props.photos} onPhotoSelect={this.props.onPhotoSelect} sortBy={this.state.sortBy}/>
      </div>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
