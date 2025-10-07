import { info } from 'sass'
import './App.css'
import Button from './components/Buttons'


function App() {
  const hello = () => {
    console.log('clicked');
  }
  return (
    <>
      <p className="st-text-xl st-text-bold st-text-primary st-text-center">dsfa</p>
      <span className="st-text-sm st-text-muted st-text-uppercase" >ji</span>
      <h1 className="st-text-4xl st-text-bold st-text-tracking-wide">dsaf</h1>
    </>
  )
}

export default App
