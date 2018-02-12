import React, { Component } from 'react';

class ScoreBoard extends Component {
  constructor() {
    super();
    this.state = {
      rolls: [],
      numOfTries: 0,
      score: 0,
      currentRoll: 0,
    };
  }
  componentDidMount() {
    this.createRolls();
  }
  sumOfBallsInFrame = () => {
    const returnValue =
      this.state.rolls[this.state.currentRoll] + this.state.rolls[this.state.currentRoll + 1];
    return returnValue;
  };
  spareBonus = () => this.state.rolls[this.state.currentRoll + 2];

  strikeBonus = () =>
    this.state.rolls[this.state.currentRoll + 1] + this.state.rolls[this.state.currentRoll + 2];

  isStrike = () => {
    const returnValue = this.state.rolls[this.state.currentRoll] === 10;
    return returnValue;
  };

  isSpare = () => {
    const returnValue =
      this.state.rolls[this.state.currentRoll] + this.state.rolls[this.state.currentRoll + 1] ===
      10;
    return returnValue;
  };
  calculateScore = (frameIndex = 0) => {
    if (frameIndex === 10) return;
    if (this.isStrike()) {
      this.setState(
        prevState => ({
          currentRoll: prevState.currentRoll + 1,
          score: prevState.score + 10 + this.strikeBonus(),
        }),
        () => this.calculateScore(frameIndex + 1),
      );
    } else if (this.isSpare()) {
      this.setState(
        prevState => ({
          currentRoll: prevState.currentRoll + 2,
          score: prevState.score + 10 + this.spareBonus(),
        }),
        () => this.calculateScore(frameIndex + 1),
      );
    } else {
      this.setState(
        prevState => ({
          currentRoll: prevState.currentRoll + 2,
          score: prevState.score + this.sumOfBallsInFrame(),
        }),
        () => this.calculateScore(frameIndex + 1),
      );
    }
  };
  createRolls = (rollsArray) => {
    this.setState({ rolls: [], score: 0, currentRoll: 0 });
    let newRolls;
    if (!rollsArray) {
      newRolls = Array(20)
        .fill(1)
        .map(() => Math.ceil(Math.random() * 10));
    } else newRolls = rollsArray;
    this.setState(
      prevState => ({
        rolls: newRolls,
        numOfTries: prevState.numOfTries + 1,
      }),
      () => this.calculateScore(),
    );
  };
  generateKey = (roll, index) => this.state.numOfTries + index + roll + Math.random() * 10;
  render() {
    return (
      <div className="scoreboard">
        <div style={{ display: 'block' }} className="buttons-row">
          <button onClick={() => this.createRolls()}>Roll Random!</button>
          <button onClick={() => this.createRolls(Array(20).fill(0))}>Roll zeroes!</button>
          <button onClick={() => this.createRolls(Array(20).fill(1))}>Roll ones!</button>
          <button onClick={() => this.createRolls([5, 5, 3, ...Array(17).fill(0)])}>
            Roll spare!
          </button>
          <button onClick={() => this.createRolls([10, 3, 4, ...Array(16).fill(0)])}>
            Roll Strike!
          </button>
          <button onClick={() => this.createRolls([...Array(12).fill(10)])}>Perfect rolls!</button>
        </div>
        <h2>Rolls:</h2>
        <span style={{ color: 'white' }}>
          [{this.state.rolls.map((roll, index) => {
            if (index !== 0) {
              return <span key={this.generateKey(roll, index)}>, {roll}</span>;
            }
            return <span key={this.generateKey(roll, index)}>{roll}</span>;
          })}]
        </span>
        <h1>Game Score = {this.state.score}</h1>
      </div>
    );
  }
}

export default ScoreBoard;
