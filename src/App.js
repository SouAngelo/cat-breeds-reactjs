import {useState, useEffect, useRef} from 'react'
import Header from './components/Header'
import api from './api'
import countryApi from './countryApi'
import './index.css'

function App() {

  const [theCats, setTheCats] = useState([])
  const [selectValue, setSelectValue] = useState('abys')
  const [results, setResults] = useState([])
  const [imageCat, setImageCat] = useState()
  const [country, setCountry] = useState()
  const [loading, setLoading] = useState(true)

  const carousel = useRef(null)


  // chamada da API

  useEffect(() => {
    async function loadSpotify(){
      const response = await api.get('/breeds',{
        params:{
          api_key: 'live_akkN8dUUeOZIBVWgyoqazfltWH2A7jakXELbHkRaemIxmyMKBrWJ2dv46wuPV1bn',
          language:'pt-BR',
        }
      })
      // console.log(response.data)
      setTheCats(response.data)
      setLoading(false)
    }

    loadSpotify()
  }, [selectValue])


  // chamada das imagens

  useEffect(()=> {
    async function getCat(cat = selectValue){
      const data = await api.get(`/breeds/${cat}`)
      const resp = await api.get(`/images/search?breed_ids=${cat}&limit=5`)
      
      setImageCat(resp.data)
      setResults(data.data)
     
    }

    getCat()
  }, [selectValue])

// Chamada das bandeiras

function lower(){
  const country_url = results.country_code
  return country_url?.toLowerCase()
}


useEffect(() => {
   async function countrys(countrySvg = lower()){
     const response = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${countrySvg}.svg`
     setCountry(response)
     
   }

   countrys()
}, [results])

  function backButton(e){
    e.preventDefault()
   
    carousel.current.scrollLeft -= carousel.current.offsetWidth
  }

  function nextButton(e){
    e.preventDefault()
   
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }

  if(loading){
    return(
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
  }

  return (
 <div className="App">
       
       <Header/>

    <div className='container'>  

       <div className='select'>
             <select
             value={selectValue}
             onChange={(e) => setSelectValue(e.target.value)}
             
             >
            {theCats.map((name) => <option value={name.id} key={name.id}> {name.name} </option>) }

          </select>
         
       </div>

       <div className='content'>
             <div>
                
             </div>
          
            <section className='container-carousel'>

               <section className='carousel' ref={carousel}>

                  <div className='images'> 
                       {imageCat?.map((image) => <img key={image.id} src={image.url}/>)}
                  </div>
                  <div className='arrows'>
                     <i className="fa-solid fa-angle-left" onClick={backButton}></i>
                     <i className="fa-solid fa-angle-right" onClick={nextButton}></i>
                 </div>
                </section>

                 <div className='infos'>
                       <div className='article'>
                         <div className='country-container'> 
                           <img src={country} className='country'/>
                           <p className='origin'>{results.origin}</p>
                         </div>

                           <h1 className='name'>{results.name}</h1>
                           <p className='description'>{results.description}</p>
                           <strong className='temperament'>{results.temperament}</strong>
                           <a href={results.wikipedia_url} className='wikipedia' target='_blank'>Wikipédia</a>
                           
                       </div>
                    
                  
             
           </div>
  
            </section>
              
          
         
        </div>    

  </div>

</div>
  );
}

export default App;
