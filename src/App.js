
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains")
  const [imageData, setImageData] = useState([]);

  useEffect(()=> {
    const data = {
      method: 'flickr.photos.search',
      api_key : 'a63840207a81309f0d8a0abf4e9445f5',
      text: searchText,
      per_page: 40,
      license:'4',
      extras: 'owner_name, license',
      format: 'json',
      nojsoncallback:1,
    }
    const parameters = new URLSearchParams(data);

    const url = `https://api.flickr.com/services/rest/?${parameters}`
  
    axios.get(url).then((res)=> {
      console.log(res.data);
      const arr = res.data.photos.photo.map((img)=> {
        return fetchFlickerImageUrl(img, 'q')
      })
      setImageData(arr);
    }).catch(()=> {

    }).finally(()=> {

    })
  },[searchText])

  const fetchFlickerImageUrl = (photo, size)=> {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`

    if(size) {
      //Configure image size
      url += `_${size}`;
    }
    url+=`.jpg`;
    return url;
  }


  return (
    <>
    <div className='container'>
      <h1>Snapshot</h1>
      <input type='search' className='search' placeholder='Search here...' onChange={(e)=> {searchData.current = e.target.value}} />
      <button className='btn' onClick={()=>{setSearchText(searchData.current)}}>Search</button>
      <section className='btn-container'>
        <button onClick={()=> {setSearchText("mountains")}}>Mountains</button>
        <button onClick={()=> {setSearchText("beaches")}}>Beaches</button>
        <button onClick={()=> {setSearchText("cat")}}>Cat</button>
        <button onClick={()=> {setSearchText("food")}}>Food</button>
      </section>

      <section className='image-container'>
        {imageData.map((imageurl, key)=> {
          return (
            <article>
              <img src={imageurl} key={key}/>
            </article>
          )
        })}
      </section>

    </div>
      
      
      
    </>
  );
}

export default App;
