import React, { Component } from 'react'
import './App.css'
import BoxClass from './component/BoxClass'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandBackFist,
  faHandScissors,
  faHand,
} from "@fortawesome/free-solid-svg-icons";

const choice = {
  rock: {
    name: "rock",
    img: "https://media.istockphoto.com/id/946132558/photo/rock-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=auylx6FWZHedSbpIm5bVmR4VwRHgWeIHbxUdLt-xd14=",
  },
  scissors: {
    name: "scissors",
    img: "https://t4.ftcdn.net/jpg/02/55/26/63/360_F_255266320_plc5wjJmfpqqKLh0WnJyLmjc6jFE9vfo.jpg",
  },
  paper: {
    name: "paper",
    img: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg",
  },
};

export default class AppClass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: '',
      computerResult: '',
    }
  }

  play = (userChoice) => {
    let computerChoice = this.randomChoice();
    let userResult = this.judgement(choice[userChoice], computerChoice); // 승패를 판단하는 함수
    this.setState({
      userSelect: choice[userChoice],
      computerSelect: computerChoice,
      result: userResult,
      computerResult: this.computerJudgement(userResult),
    })
  }

  randomChoice = () => {
    let itemArray = Object.keys(choice); // 객체(choice)의 키 값만 추출해 array로 만들어주는 함수
    console.log("itemarray: ", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    // console.log("randomvalue: ", randomItem)
    // console.log("final item: ", final)
    return choice[final];
  };

  judgement = (user, computer) => {
    // 매개변수 2개 이름 결정
    console.log("user: ", user, "computer: ", computer);
    // user == computer: Tie
    // user == rock, computer == scissors: user win
    // user == rock, computer == paper: user lose
    // user == scissors, computer == paper: user win
    // user == scissors, computer == rock: user lose
    // user == paper, computer == rock: user win
    // user == paper, computer == scissors: user lose
    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "rock")
      return computer.name === "scissors" ? "win" : "lose";
    else if (user.name === "scissors")
      return computer.name === "paper" ? "win" : "lose";
    else if (user.name === "paper")
      return computer.name === "rock" ? "win" : "lose";
  };

  computerJudgement = (result) => {
    console.log(result)
    if (result === "tie") {
      return "tie"
    } else if (result === "win") {
      return "lose"
    } else if (result === "lose") {
      return "win"
    }
  }

  render() {
    return (
      <div className="main">
      <div className="container">
        <div className="title-area">
          가위바위보 게임
        </div>
        <div className="play-area">
          <BoxClass title="user" item={this.state.userSelect} result={this.state.result} />
          <BoxClass title="computer" item={this.state.computerSelect} result={this.state.computerResult} />
        </div>
        <div className="play-area">
          {/* UI를 그릴 때 함수를 실행해버림 -> 콜백함수 형태로 적어줘야함 */}
          <button className="button-item" onClick={() => this.play("scissors")}>
            <FontAwesomeIcon icon={faHandScissors} />
          </button>
          <button className="button-item" onClick={() => this.play("rock")}>
            <FontAwesomeIcon icon={faHandBackFist} />
          </button>
          <button className="button-item" onClick={() => this.play("paper")}>
            <FontAwesomeIcon icon={faHand} />
          </button>
        </div>
      </div>
    </div>
    )
  }
}
