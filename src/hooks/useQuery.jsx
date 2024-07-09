import {useState,useEffect, useRef} from 'react'
export function useQuery(){
    const[query,setQuery]= useState('')
    const [error,setError]=useState(null)
    const firtsRender=useRef(true)
    useEffect(()=>{
      if(firtsRender.current){
        firtsRender.current = query === '' 
        return
      }
      if(query===' '){
        setError('no se puede realizar una busqueda vacia')
        return
      }
      if(query.length<3){
        setError('por favor escribe al menos 3 caracteres')
        return
      }
      if(query.match(/@[a-z0-9]/)){
        setError('no se permiten caracteres especiales')
        return
      }
      if(query.match(/^[0-9]+(\.[0-9]+)?$/)){
        setError('no se permiten numeros decimales')
        return
      }
  
      setError(null)
      
    },[query])
  
    return {query,setQuery,error}
  }