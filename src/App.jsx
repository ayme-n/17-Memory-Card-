
import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './Card'

function App() {

  const pokemonNames = [
  "Pikachu",
  "Charizard",
  "Bulbasaur",
  "Squirtle",
  "Eevee",
  "Gengar",
  "Lucario",
  "Snorlax",
  "Mewtwo",
  "Jigglypuff",
  "Garchomp",
  "Togekiss"
];



  const [link,Setlink] = useState([])
  const [score,setScore] = useState(0)
  const [BestScore,SetBestScore] = useState(0)
  const [clicked,Setclicked] = useState([]) //hold clicked pokemons

  let  i = 0
  let done = false

  async function GetData() {

    

      pokemonNames.forEach(async name => {


        const respone = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const data = await respone.json()

        const newImageUrl = data.sprites.other["official-artwork"].front_default

        Setlink(prev =>{
          return [...prev,newImageUrl]
        })
        
        i++

        
      });

   
    
  }

  function shuffle(array) {
  const arr = [...array]; // make a copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

  useEffect(()=>{
    if(done==false){
      GetData();
      done=true
    }
  },[])


  return (
    <div>

      <div className='score'>
          <p>Score : {score}</p>
          <p>Best Score : {BestScore} </p>
      </div>

    
      

      <div className='header'>
        <h1>Memory Card</h1>
        <p>dont click the same pokemon twice ! </p>
        
      </div>

    <div className='container'>

          {link.map((url)=>{
          return(

            <div className="card" key={url}  onClick={()=>{
              Setlink(shuffle(link))
            

              if(!clicked.includes(url)){
                setScore(score+1)
                Setclicked((prev)=>{
                return [...prev,url]
              })
              }
              else{

                if(score>BestScore){
                  SetBestScore(score)
                }

                setScore(0)
                Setclicked([])

              
              }

              }}>
           
              <Card src={url} ></Card>

            </div>
          )

        })

        
        
        }
      
    </div>


    

      

    </div>

  )
}

export default App
