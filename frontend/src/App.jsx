import { useState } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import homePage from './pages/homePage'
import chatPage from './pages/chatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Route path="/" component = {homePage} exact />
      <Route path="/chats" component = {chatPage} />
    </div>
  )
}

export default App
