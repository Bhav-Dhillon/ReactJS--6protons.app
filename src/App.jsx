import { useState} from 'react'
import HomePage from './components/HomePage'

export default function App() {

  const [page, setPage] = useState('home');

  function handlePage()
  {
    setPage('lesson')
  }

  if(page === 'home')
  {
    return (<HomePage setPage={handlePage}/>);
  }

  else if(page === 'lesson')
  {
    return (<h1>WooHoo Refactor complete!</h1>)
  }
}
