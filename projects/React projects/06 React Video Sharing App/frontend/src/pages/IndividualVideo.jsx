import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import IndividualVideoContent from "../components/IndividualVideoContent"

const IndividualVideo = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="flex">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className={`flex-7`}>
        <IndividualVideoContent/>
      </div>
    </div>
  )
}

export default IndividualVideo



