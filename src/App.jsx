import { info } from 'sass'
import './App.css'
import Button from './components/Buttons'
import YouTube from 'react-youtube';
import { DashData } from './practice/Dash';
import { useNotification } from './components/Notifications';
import { useState } from 'react';
import { Modal } from './components/Modal';


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
      <Button label="Click Me" onClickHandle={hello} />
      {open &&
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
        />}
    </>
  )
}

export default App
