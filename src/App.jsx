
import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useQuery } from './hooks/useQuery'
import debounce from 'just-debounce-it'

function App() {
  const [sort,setSort]=useState(false)
  const {query,setQuery,error}= useQuery()
  const {movies,getMovies,loading,errorfetch} = useMovies({query,sort})


  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(query) //pasamos el parametro 
  }

  const handleSort = ()=>{
    setSort(!sort)
  }

// useEffect(()=>{
// getMovies(query)
// },[query])

//para el debounce instalar npm install just-debounce-it -E pero aqui se crea en cada render
const debouncedGetMovies = useCallback(
  debounce(query=>{
getMovies(query)
},300)
,[getMovies])

  const handleChange = (event) => {
    const newQuery=event.target.value
    setQuery(newQuery)
    debouncedGetMovies(newQuery)
  }


  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input value={query} onChange={handleChange} name="query" type="text" placeholder='Avengers, Star Wars ...' />
        <button type='submit'>Buscar</button>
        <input type="checkbox" onChange={handleSort} checked={sort}/>
      </form>
      {errorfetch && <p style={{color:'red'}} className='error'>{errorfetch}</p>}
      {error && <p style={{color:'red'}} className='error'>{error}</p>}
      </header>
      <main>
        {loading && <p>Cargando...</p>}
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
/*
use ref 
import { useRef } from 'react'
 const inputRef = useRef()
  const handleSubmit = (event) => {
    event.preventDefault()
    const value = inputRef.current.value
    alert(value)
  }
<input ref={inputRef} type="text" placeholder='Avengers, Star Wars ...' />


con js 

si solo tenemos un input arriba esis tenemos mas de 1
const handleSubmit = (event) => {
    event.preventDefault()
    const fields= new window.FormData(event.target)
    const value = fields.get('query')
    alert(value)
  }


 const handleSubmit = (event) => {
    event.preventDefault()
    const {query}= Object.fromEntries(new window.FormData(event.target))
    alert(query)
  }

^
|

esto seria de forma descontrolada 



esto seria de forma controlada->
const[query,setQuery]= useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({query})
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input required value={query} onChange={handleChange} name="query" type="text" placeholder='Avengers, Star Wars ...' />
        <button type='submit'>Buscar</button>
      </form>
      </header>
      <main>
        <Movies movies={mapedMovies} />
      </main>
    </div>
  )

*/