import React from 'react';
import {browserHistory} from 'react-router';

// PhotoDetail replaces seachbar and child compoenets, react-router routes to /photos

const PhotoDetail = (props) => {

  var selectedPhoto = props.selectedPhoto;

  if (!selectedPhoto) {
    return <div>Loading..</div>
  }

  // onClick back renders other components without reloading and doing new ajax call

  return(
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="image">
          <img className="media-object" src={selectedPhoto.url_m} />
        </div>
        <div className="details">
          <button className="btn btn-info back-button" onClick={props.history.goBack}>Back to Photos</button>
          <div><h2>{selectedPhoto.title}</h2></div>
          <div>Owner: {selectedPhoto.ownername}</div>
          <div>Date take: {selectedPhoto.datetaken}</div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;
