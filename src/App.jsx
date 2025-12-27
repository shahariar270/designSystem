import { info } from 'sass'
import './App.css'
import Button from './components/Buttons'
import YouTube from 'react-youtube';
import { DashData } from './practice/Dash';
import { useNotification } from './components/Notifications';
import { useState } from 'react';
import { Modal } from './components/Modal';
import { Popover } from './components/Popover';
import { Loading } from './components/Loading';


function App() {
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const hello = () => {
    setOpen(true);
    showNotification({ type: 'success', message: 'Open modal successfully' })
  }
  return (
    <>
      {/* <YouTube
        videoId='2IFDMvfJJHc'
      /> */}
      <DashData />
      <Button label="Click Me" onclick={hello} variant={'transparent'} border={'primary'} />
      {open &&
        <>
         
            <Loading />
        </>
      }
      <Popover label={'rearer'}>
        <div>
          <h4>John Doe</h4>
          <p>Email: john@example.com</p>
        </div>
      </Popover>

    </>
  )
}

export default App
