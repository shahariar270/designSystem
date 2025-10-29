import { info } from 'sass'
import './App.css'
import Button from './components/Buttons'
import YouTube from 'react-youtube';


function App() {
  const hello = () => {
    console.log('clicked');
  }
  return (
    <>
      <YouTube
        videoId='2IFDMvfJJHc'
      />
    </>
  )
}

export default App
