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
import Tab from './components/Tab';
import { Test } from './test';
import Drawer from './components/drawer';
import { Step } from './practice/Step';
import { StepProvider } from './practice/Step/stepProvider';
import StepIndicator from './practice/Step/StepIndicator';


function App() {
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const hello = () => {
    setOpen(true);
  }
  return (
    <>
      {/* <YouTube
        videoId='2IFDMvfJJHc'
      /> */}
      <Button
        onclick={hello}
        label='rw'
      />
      <StepProvider>
        <StepIndicator/>
        <Step />
      </StepProvider>
      {open &&
        <Drawer isOpen={open} onClose={() => setOpen(false)}>

          <h1>jcfajsd nasdghf </h1>
        </Drawer>

      }
    </>
  )
}

export default App
