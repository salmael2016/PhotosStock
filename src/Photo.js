import React from 'react'

const Photo = ({id,likes,user,urls}) => {
  const {name,portfolio_url,profile_image:{medium}} = user;
  const {regular,full,thumb}=urls 
  return <article className="photo">
    <img src={regular} />
    <div className="photo-info">
      <div>
      <h4 >{name}</h4>
      <p>{likes} likes</p>
      </div>
      <a href={portfolio_url}><img src={medium} alt={name} className="user-img" /></a>
    </div>
    
  </article>
}

export default Photo
