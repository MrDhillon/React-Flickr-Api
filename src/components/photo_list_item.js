import React from 'react';
import {Link} from 'react-router';

// PhotoListItem on click passes the onPhotoSelect function up parent compoenents

const PhotoListItem = ({photo,onPhotoSelect}) => {

  const thumbUrl = photo.url_q;

  return(
    <div onClick={() => onPhotoSelect(photo) } className="col-md-4 col-xs-6 thumb">
      <div className="photo-item">
        <Link to="/photo">
          <img className="media-object" src={thumbUrl} alt="" />
        </Link>
        <span>{photo.title}</span>
      </div>
    </div>
  );
}

export default PhotoListItem;
