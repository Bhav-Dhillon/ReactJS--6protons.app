import { useState} from 'react'
import HomePage from './components/HomePage'
import Lesson1 from './components/Lesson1'
import Lesson2 from './components/Lesson2'
import Lesson3 from './components/Lesson3'

export default function App() {

  const [page, setPage] = useState('home');
  const [cameraRotate, setCameraRotate] = useState(false);

  function handleClick() 
  {
    setCameraRotate(!cameraRotate)
  }

  function handlePage(id)
  {
    setPage(`${id}`)
  }

  if(page === 'home')
  {
    return (<HomePage setPage={handlePage} setCameraRotate={handleClick} cameraRotate={cameraRotate} />);
  }

  else if(page === 'lesson1')
  {
    return (<Lesson1 setPage={handlePage} setCameraRotate={handleClick}/>)
  }
  else if(page === 'lesson2')
  {
    return (<Lesson2 />)
  }
  else if(page === 'lesson3')
  {
    return (<Lesson3 />)
  }
  else return <h1>Not yet</h1>
}
