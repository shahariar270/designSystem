import { info } from 'sass'
import './App.css'
import Button from './components/Buttons'
import YouTube from 'react-youtube';
import { DashData } from './practice/Dash';
import { useNotification } from './components/Notifications';


function App() {
  const {showNotification} = useNotification();
  const hello = () => {
    showNotification({ type: 'success', message: 'Button Clicked Successfully' })
  }
  return (
    <>
      {/* <YouTube
        videoId='2IFDMvfJJHc'
      /> */}
      <DashData/>
      <Button text="Click Me" onClickHandle={hello} />
    </>
  )
}

export default App
