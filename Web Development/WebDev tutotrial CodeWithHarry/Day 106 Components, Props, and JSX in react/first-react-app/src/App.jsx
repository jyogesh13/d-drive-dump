// Entry point for the React application

// import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card"

function App() {

  return (
    <>
     <Navbar/>
     <main>
      <div className="cards">
        <Card url="https://images.pexels.com/photos/31527881/pexels-photo-31527881/free-photo-of-dramatic-black-and-white-coastal-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" title="First" description="this is the description of first card"/>
        <Card/>
        <Card/>
        <Card/>

      </div>
     </main>
     <Footer/>
    </>
  )
}

export default App
