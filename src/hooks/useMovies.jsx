import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

//let prevQuery=''  <- esto no porque seria el mismo valor para todos los componentes

export function useMovies({query, sort}){
  const [movies,setMovies]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const  prevQuery=useRef(query)
  
  //callback solo se usa para funciones 
  const getMovies=useCallback(
    async (query)=>{
     if(prevQuery.current===query) return
   try{
     setLoading(true)
     setError(null)
     prevQuery.current=query
     const newMovies= await searchMovies({query})
     setMovies(newMovies)
   }catch(error){
     setError(error.message)
   }finally{
     setLoading(false)
   }
 
 }
 , [])

 //Usememeo para cualquier cosa
//   const getMovies=useMemo(()=>{
//    return async (query)=>{
//     if(prevQuery.current===query) return
//   try{
//     setLoading(true)
//     setError(null)
//     prevQuery.current=query
//     const newMovies= await searchMovies({query})
//     setMovies(newMovies)
//   }catch(error){
//     setError(error.message)
//   }finally{
//     setLoading(false)
//   }

// }
// },[]) //al pasarle query por paramtro en el async y dejar vacia la lista solo se genra una vez la funcion y despues al llamarla podemos insertar el query
  
const sortedMovies = useMemo(() => {
  return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies;
}, [sort, movies]);

  return {movies:sortedMovies,getMovies,loading,errorfetch:error}
}


 //import apiResponse from '../Mocks/apiResponse.json'
    //import apiResponseNone from '../Mocks/apiResponseNone.json'
    // const getMovies=()=>{
  //   if(query){
  //     //setResponseMovies(apiResponse)
  //     fetch(`http://www.omdbapi.com/?apikey=3ed555b&s=${query}`)
  //     .then(response => response.json())
  //     .then(json=>{setResponseMovies(json)})
  //   }else{
  //     setResponseMovies(apiResponseNone)
  //   }
  // }