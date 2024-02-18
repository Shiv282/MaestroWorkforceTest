import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonUsage from './Components/demo'
import ButtonAppBar from './Components/AppBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ButtonAppBar></ButtonAppBar>
      
    </>
  )
}

export default App
