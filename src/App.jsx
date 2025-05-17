import { info } from 'sass'
import './App.css'
import Button from './components/Buttons'


function App() {
  const hello = () =>{
    console.log('clicked');
  }
  return (
    <>
   <Button 
      label={'hello'}
      style={'primary '}
      border={'none'}
      onClickHandle={hello}
   
   />
    </>
  )
}

export default App
