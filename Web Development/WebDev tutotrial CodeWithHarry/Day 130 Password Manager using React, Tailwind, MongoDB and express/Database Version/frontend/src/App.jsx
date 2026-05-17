import Navbar from './components/navbar/Navbar'
import Manager from './components/manager/Manager'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <div className=''>
      <Manager/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
