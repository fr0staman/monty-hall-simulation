import React from "react";

export default class MontyHall extends React.Component {
    state = {
      doors: [],
      switch: null,
      hint: null,
      selected: null,
      reveal: false,
      wins: 0,
      losses: 0
    }
  
    getResults() {
      this.setState(prevState => {
        return {
          switch: null,
          hint: null,
          reveal: true,
          wins: prevState.doors[prevState.selected] ? prevState.wins + 1 : prevState.wins,
          losses:  !prevState.doors[prevState.selected] ? prevState.losses + 1 : prevState.losses
        }
      });
    }
  
    setDoors() {
        let result = Math.floor(Math.random() * Math.floor(3) + 1);
        let doors = [false, false, false];
        doors[result - 1] = true;
      
        this.setState({
          doors,
          selected: null,
          reveal: false,
          hint: null,
          switch: null
        });
    }
  
    onChooseDoor(selected) {
      if (this.state.selected !== null) return;
      
      let switchOption;
      let hintOption;
      let doors = this.state.doors;
      
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
            
      this.setState({
        hint: hintOption,
        switch: switchOption,
        selected
      });
    }
    
    switchDoor() {
      this.setState({
        selected: this.state.switch
      });
      
      this.getResults();
    }
  
    componentDidMount() {
      this.setDoors();
    }
    
    render() {
       return (
         <div className="container">
          <h1 className="title">
            Тицьни на двері, та виграй автомобіль!
          </h1>
          <div className="results">
            <div className="scorecard">
              <div>Перемоги: {this.state.wins}</div>
              <div>Програші: {this.state.losses}</div>
            </div>
           {this.state.switch !== null && (
             <div className="buttons">
               <h3>Змінити вибір до двері #{this.state.switch + 1}?</h3>
               <button onClick={() => this.switchDoor()}>Так</button>
               <button onClick={() => this.getResults()}>Ні</button>
             </div>
           )}
           {this.state.reveal && (
             <div className="buttons">
               <h3>{this.state.doors[this.state.selected] ? 'Ви виграли! 😁' : 'Ти програв! 😭' }</h3>
               <button onClick={() => this.setDoors()}>Зіграти ще раз?</button>
             </div>
           )}
           </div>
          <div className="doors">
            {this.state.doors.map((door, index) => {
              return (
                  <div 
                    className={`door door--${index+1} ${this.state.selected === index && 'door--selected animated infinite pulse'}`}
                    onClick={() => this.onChooseDoor(index)}
                  >
                    {this.state.reveal &&  
                      <div className="prize">
                        І це...
                        <div class="icon">{door ? 'Автомобіль! 🚘' : 'Коза! 🐐'}</div>
                      </div>}
                     {index === this.state.hint &&  
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
  }
  