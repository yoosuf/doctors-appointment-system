import React, { useEffect } from 'react';
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'


const Avatar = ({ imageUrl, userType , size }) => {
  const avatarSize = size || 'w-16 h-16';
  const fallbackImage = sidebarLogoUrl;


  let imgUrl;

  if (typeof imageUrl !== 'undefined') {
    imgUrl= baseUrl +imageUrl;
  } else {
    imgUrl= fallbackImage;

  }

  return (
    <img
      src={imgUrl}
      alt={`${userType} Avatar`}
      className={`rounded-full ${avatarSize}`}
    />
  );
};

export default Avatar;
