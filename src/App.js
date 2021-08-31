import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import Loading from "./Loading";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);

  const fetchImages = async () => {
    setLoading(true)
    let url;
    const urlPage = `&page=${page}`;
    const query = `&query=${value}`;
    if(value){
      url = `${searchUrl}${clientID}${urlPage}${query}`;
      
    }
    else{
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      
      
      const response = await fetch(url);
      const images = await response.json();
      
      setPhotos((oldPhotos)=>{
        if(value && page === 1){
          return images.results
        }
        else if(value){
          return [...oldPhotos,...images.results]
        }
        else{
          return [...oldPhotos,...images]
        } 
      });
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  
  useEffect(() => {
    // eslint-disable-next-line
    const event = window.addEventListener('scroll', () => {
      if (
        !loading && ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 10))
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener('scroll', event);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1)
    
  };
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <Loading/>}
      </section>
    </main>
  );
}

export default App;
