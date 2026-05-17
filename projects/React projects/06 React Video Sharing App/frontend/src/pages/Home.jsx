import Sidebar from '../components/Sidebar'
import Videos from '../components/Videos'

const Home = ({type}) => {
  return (
    <div className='flex gap-2'>
      <Sidebar/>
      <Videos type={type}/>
    </div>
  )
}

export default Home
