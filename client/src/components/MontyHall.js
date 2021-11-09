import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function MontyHall(props) {
  const [hallStates, setHallStates] = useState({
    doors: [],
    switch: null,
    hint: null,
    selected: null,
    reveal: false,
    winUnchanged: 0,
    winChanged: 0,
    status: 0
  });

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": 'GET, PUT, POST, DELETE, OPTIONS'
    }
  };

  async function increment() {
    if (hallStates.status && hallStates.doors[hallStates.selected]) {
      let stateStatus;
      if (hallStates.status === 2) {
        stateStatus = 1;
      } else {
        stateStatus = 0;
      }

      axios.post('http://localhost:9443/api/add', {...axiosConfig, status: stateStatus})
        .then((res) => {
          console.log("ADD RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    }
  }

  async function getResults() {
    await increment();

    axios.get('http://localhost:9443/api/statistic', axiosConfig)
      .then((res) => {
        setHallStates(prevState => ({
          ...prevState,
          switch: null,
          hint: null,
          reveal: true,
          winChanged: res.data.changed,
          winUnchanged: res.data.unchanged
        }));
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
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
      selected: hallStates.switch,
      status: 2
    });

    getResults();
  }

  useEffect(() =>
    setDoors(), []);
  useEffect(() =>
    getResults(), []);
  return (
    <div className="container">
      <h1 className="title">
        Тицьни на двері, та виграй автомобіль!
      </h1>
      <div className="results">
        <div className="scorecard">
          <div>Перемоги зі зміною: {hallStates.winChanged}</div>
          <div>Програші без зміни: {hallStates.winUnchanged}</div>
        </div>
        {hallStates.switch !== null && (
          <div className="buttons">
            <h3>Змінити вибір до двері #{hallStates.switch + 1}?</h3>
            <button onClick={() => switchDoor()}>Так</button>
            <button onClick={() => {
              setHallStates({
                ...hallStates,
                status: 1
              });
              getResults();
            }}>Ні
            </button>
          </div>
        )}
        {hallStates.status ? hallStates.reveal && (
          <div className="buttons">
            <h3>{hallStates.doors[hallStates.selected] ? 'Ви виграли! 😁' : 'Ти програв! 😭'}</h3>
            <button onClick={() => setDoors()}>Зіграти ще раз?</button>
          </div>
        ) : undefined}
      </div>
      <div className="doors">
        {hallStates.doors.map((door, index) => {
          return (
            <div
              className={`door door--${index + 1} ${hallStates.selected === index && 'door--selected animated infinite pulse'}`}
              onClick={() => onChooseDoor(index)}
            >
              {hallStates.status ? hallStates.reveal &&
                <div className="prize">
                  І це...
                  <div className="icon">{door ? 'Автомобіль! 🚘' : 'Коза! 🐐'}</div>
                </div> : undefined}
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
  