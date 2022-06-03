import { useState} from 'react'
import HomePage from './components/HomePage'
import Lesson1 from './components/Lesson1'

export default function App() {

  const [page, setPage] = useState('home');

  function handlePage(id)
  {
    setPage(`lesson${id}`)
  }

  if(page === 'home')
  {
    return (<HomePage setPage={handlePage}/>);
  }

  else if(page === 'lesson1')
  {
    return (<Lesson1 />)
  }
  else if(page === 'lesson2')
  {
    return (<h1>Lesson 2</h1>)
  }
  else if(page === 'lesson3')
  {
    return (<h1>Lesson 3</h1>)
  }
  else return <h1>Not yet</h1>
}
