import { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationOn, Star } from '@mui/icons-material';
import axios from 'axios'
import { format } from 'timeago.js'
import './App.css'
import SignIn from './components/SignIn';
import Login from './components/Login';

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
  const [showLogIn, setShowLogIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [pins, setPins] = useState([])
  const [newpin, setNewPin] = useState(null)
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewport, setViewport] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4
  })
  const [showPopupId, setShowPopupId] = useState(null);
  const token = import.meta.env.VITE_MAPBOX;

  const handleMarkerClick = (id, lat, long) => {
    setShowPopupId(id);
    setViewport({
      longitude: long,
      latitude: lat
    })
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get('/api/pins');
        setPins(allPins.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPins();
  }, [])

  const handleAddClick = (e) => {
    e.originalEvent.preventDefault();
    // event.lngLat is an array: [longitude, latitude]
    console.log(e)
    const [long, lat] = [e.lngLat.lng, e.lngLat.lat];
    setNewPin({
      long,
      lat
    })
    console.log("Double clicked at: ", long, lat)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newpin.lat,
      long: newpin.long
    }

    try {
      const res = await axios.post('/api/pins', newPin)
      setPins([...pins, res.data]);
      setNewPin(null)
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogOut = ()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
  }
  return (
    <>
      <Map
        mapboxAccessToken={token}
        {...viewport}
        style={{ width: '100vw', height: '100vh', position: "relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(nextViewport) => setViewport(nextViewport)}
        onClick={() => setShowPopupId(null)}
        doubleClickZoom={false}
        onDblClick={
          handleAddClick
        }

      >
        {pins.map((p) => (
          <div key={p._id}>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offset={[0, (Number(viewport.zoom) || 4) * 3]}
              anchor="bottom"
              onClick={e => {
                // Prevent the map from also handling this click
                e.originalEvent.stopPropagation();
                handleMarkerClick(p._id, p.lat, p.long);
              }}>
              <div>
                <LocationOn
                  style={{
                    fontSize: (Number(viewport.zoom) || 4) * 10,
                    color: p.username === currentUser ? "purple" : "crimson",
                    cursor: "pointer"
                  }}
                />
              </div>
            </Marker>
            {p._id === showPopupId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                onClose={() => setShowPopupId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4>{p.title}</h4>
                  <label>Review</label>
                  <p className='desc'>{p.desc}</p>
                  <label>Rating</label>
                  <div className='stars'>
                    {Array(p.rating).fill(<Star className='star' />)}
                  </div>
                  <label>Information</label>
                  <span className='username'>Created by: <b>{p.username}</b></span>
                  <span className='date'>{format(p.createdAt)}</span>
                </div>
              </Popup>)}
          </div>
        )
        )}

        {newpin && (<Popup
          longitude={newpin.long}
          latitude={newpin.lat}
          anchor="left"
          onClose={() => setNewPin(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input type="text" placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)} />
              <label>Review</label>
              <textarea name="Review" id="" placeholder='Say something about this place' onChange={(e) => setDesc(e.target.value)} />
              <label>Rating</label>
              <select name="Rating" id="" onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className='submitbtn' type='submit'>Add a Pin</button>
            </form>
          </div>
          
        </Popup>)}

        {currentUser ? (<button className='btn logout' onClick={handleLogOut}>Logout</button>) : (<div className='btncontainer'>
          <button className='btn login' onClick={() => setShowLogIn(true)}>Login</button>
          <button className='btn signin' onClick={() => setShowSignIn(true)} >SignIn</button>
        </div>)}

        {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
        {showLogIn && <Login setShowLogIn={setShowLogIn} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
      </Map>

    </>
  )
}

export default App
