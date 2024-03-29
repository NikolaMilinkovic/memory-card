import { useState, useEffect } from "react";
import React from "react"
import { v4 as uuid } from "uuid";

export default function Cards() {
  const [cardData, setCardData] = useState([]);
  const [pickedCard, setPickedCard] = useState([])
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const pokemonNames = ["bulbasaur", "pikachu", "vulpix", "jigglypuff", "eevee", "togepi", "mudkip", "pachirisu", "sylveon", "alcremie", "woobat", "drifloon"];

  // Fetch all the images/names for pokemons
  useEffect(() => {
    const fetchData = async () => {
      try{
        const dataHolder = [];
        await Promise.all(
          pokemonNames.map(async name => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if(!response.ok){
              throw new Error ("Data fetching failed");
            }
            const data = await response.json();
            dataHolder.push({
              name: data.species.name,
              imgUrl: data.sprites.front_shiny
            });
          })
        )
        setCardData(dataHolder);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }  
    fetchData();

  }, []);

  function onCardClick(event){
    // Check for player lose
    if(pickedCard.includes(event.target.name)){
      alert(`You already picked that card, game over! \nScore: ${score}`);
      setScore(0);
      setPickedCard([]);
      return;
    }

    // Update score
    setScore(score => score + 1);
    if(score >= topScore) {
      setTopScore(score + 1);
    }

    setPickedCard(prev => [...prev, event.target.name])
    if(pickedCard.length === pokemonNames.length-1){
      alert("Congratulations! All cards found! \nNow do it again!")
      setPickedCard([]);
    }
  }

  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = temp;
    }
    return newArr;
  }
  

  return (
    <>
      <div className="score-container">
        <div>
          <p>
          Your score: 
          </p>
          <p className="score">
            {score}
          </p>
        </div>
        <div>
          <p>
          Highscore: 
          </p>
          <p className="score">
            {topScore}
          </p>
        </div>
      </div>
      <div id="cards-container">
        {shuffleArray(cardData).map((card) => {
          return (
            <button key={uuid()} name={card.name} onClick={(event) => onCardClick(event)}>
              <div className="card" key={uuid()} name={card.name}>
                <h2 name={card.name}>{card.name}</h2>
                <img src={card.imgUrl} alt={`Picture of ${card.name}`} name={card.name}/>
              </div>  
            </button>
          )
        })}
      </div>
    </>
  );
}