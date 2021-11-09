import React, {useEffect, useState} from "react";

export default function MontyHall(props) {
    const [hallStates, setHallStates] = useState({
        doors: [],
        switch: null,
        hint: null,
        selected: null,
        reveal: false,
        wins: 0,
        losses: 0
    })
  
    function getResults() {
      setHallStates(prevState => ({
          ...prevState,
          switch: null,
          hint: null,
          reveal: true,
          wins: prevState.doors[prevState.selected] ? prevState.wins + 1 : prevState.wins,
          losses:  !prevState.doors[prevState.selected] ? prevState.losses + 1 : prevState.losses
      }));
    }
  
    function setDoors() {
        let result = Math.floor(Math.random() * Math.floor(3) + 1);
        let doors = [false, false, false];
        doors[result - 1] = true;
      
        setHallStates({
          ...hallStates,
          doors: doors,
          selected: null,
          reveal: false,
          hint: null,
          switch: null
        });
    }
  
    function onChooseDoor(selected) {
      if (hallStates.selected !== null) return;
      
      let switchOption;
      let hintOption;
      let doors = hallStates.doors;
      
      doors.forEach((door, index) => {
        if (!door && selected !== index) {
          hintOption = index;
        }
      });
      
      doors.forEach((door, index) => {
        if (selected !== index && hintOption !== index) {
          switchOption = index;
        }
      });
            
      setHallStates({
          ...hallStates,
        hint: hintOption,
        switch: switchOption,
        selected
      });
    }
    
    function switchDoor() {
      setHallStates({
        ...hallStates,
        selected: hallStates.switch
      });
      
      getResults();
    }
  
    useEffect(() => 
      setDoors()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
    
       return (
         <div className="container">
          <h1 className="title">
            Тицьни на двері, та виграй автомобіль!
          </h1>
          <div className="results">
            <div className="scorecard">
              <div>Перемоги: {hallStates.wins}</div>
              <div>Програші: {hallStates.losses}</div>
            </div>
           {hallStates.switch !== null && (
             <div className="buttons">
               <h3>Змінити вибір до двері #{hallStates.switch + 1}?</h3>
               <button onClick={() => switchDoor()}>Так</button>
               <button onClick={() => getResults()}>Ні</button>
             </div>
           )}
           {hallStates.reveal && (
             <div className="buttons">
               <h3>{hallStates.doors[hallStates.selected] ? 'Ви виграли! 😁' : 'Ти програв! 😭' }</h3>
               <button onClick={() => setDoors()}>Зіграти ще раз?</button>
             </div>
           )}
           </div>
          <div className="doors">
            {hallStates.doors.map((door, index) => {
              return (
                  <div 
                    className={`door door--${index+1} ${hallStates.selected === index && 'door--selected animated infinite pulse'}`}
                    onClick={() => onChooseDoor(index)}
                  >
                    {hallStates.reveal &&  
                      <div className="prize">
                        І це...
                        <div class="icon">{door ? 'Автомобіль! 🚘' : 'Коза! 🐐'}</div>
                      </div>}
                     {index === hallStates.hint &&  
                      <div className="hint">
                        Тут козочка!
                        <div className="icon">🐐</div>
                      </div>}
                  </div>
               )
            })}
          </div>
        </div>
      )
  }
  