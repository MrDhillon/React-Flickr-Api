import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import {getJSON} from "jquery";
import SearchBar from './components/search_bar';
import PhotoList from './components/photo_list';
import PhotoDetail from './components/photo_detail';

// flickr api search api and key needed for ajax call
const API_KEY= '1b4e5b0203fab0d5731afe68f0a543e1';
const flickerAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&&extras=url_m%2Curl_q%2C+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias&jsoncallback=?";


// App is root component, it manages state for photos and selectedPhoto
// kicks off ajax call on new serach term
class App extends Component {
  constructor(props){
      super(props)
      this.state = {photos: [], selectedPhoto: null};
      this.photoSearch('boba fett');
  }

  photoSearch(term) {
    getJSON(flickerAPI, {
      api_key: API_KEY,
      text: term ? term : "boba fett",
      tag_mode: "any",
      per_page: "10",
      format: "json"
    }).success((data) => {
      this.setState({photos: data.photos.photo});
    }).error((err) => {
      console.log(err);
    });
  }

  render(){

    // debounce to limit automatic searchs to every 3 seconds
    const photoSearch = _.debounce((term) => {this.photoSearch(term)},300);

    return (
      <div>
        {/*how to pass props to child routes*/}
        {React.cloneElement(this.props.children,{
          photos: this.state.photos,
          selectedPhoto: this.state.selectedPhoto,
          onPhotoSelect: (selectedPhoto) => {this.setState({selectedPhoto})},
          onSearchTermChange: photoSearch
        })}
      </div>
    );
  }
}


// React router App is root path and the index component is the searchbar
// (should rename to just search?)
// App is top level compoenent becuase it manages important state data
// Redux would be much better since  the data would be application level instead of component level
// Would prevent a lot of function and obeject passing up parent compoenents
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute components={SearchBar}></IndexRoute>
      <Route path="photo" component={PhotoDetail} >
      </Route>
    </Route>
  </Router>
), document.querySelector('.container'));
