const API_KEY ='3ed555b'

export const searchMovies = async ({query})=>
    {
        if(query==='') return null

    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const json= await response.json()
        const movies = json.Search
        
        return movies?.map((movie)=>{
            return {
                title:movie.Title,
                year:movie.Year,
                poster:movie.Poster,
                id:movie.imdbID
            }
        })
    }catch(error){
        throw new Error('Error fetching movies',error)  
    }
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