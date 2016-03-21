import React from 'react';
import PhotoListItem from './photo_list_item';

// photolist maps photos to PhotoListItem component, it also sorts before the map
// photolist does not need to track state so it is a dump component

const PhotoList = (props) => {

  var photos = props.photos;

  const sortASC = function(photos){
    photos.sort(function(a,b){
       return b.datetaken < a.datetaken
    });
  };

  const sortDEC = function(photos){
    photos.sort(function(a,b){
       return b.datetaken > a.datetaken
    });
  };

  if (props.sortBy === "0"){
    sortDEC(photos);
  }
  else if (props.sortBy === "1") {
    sortASC(photos);
  }


  const photoItems = photos.map((photo) => {
    return (
      <PhotoListItem
        onPhotoSelect={props.onPhotoSelect}
        photo={photo}
        key={photo.id}/>
    );
  });

  return (
      <div className="centered">
        {photoItems}
      </div>
  );
}

export default PhotoList;
