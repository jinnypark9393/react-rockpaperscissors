import { useState } from "react";
import "./App.css";
import Box from "./component/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandBackFist,
  faHandScissors,
  faHand,
} from "@fortawesome/free-solid-svg-icons";

// 1. 박스 2개 그리기 (타이틀, 사진, 결과)
// 2. 가위, 바위, 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임(State 활용)
// 4. 컴퓨터는 랜덤하게 아이템 선택이 됨
// 5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패에 따라 테두리색 변경: 이기면 초록, 지면 빨강, 비기면 검정

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

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState(""); // 초기값은 빈 string
  const [computerResult, setComputerResult] = useState(""); // 초기값은 빈 string
  const play = (userChoice) => {
    // state를 변경하기 위해서는 set함수를 사용해야함
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice(); // randomChoice 함수를 이용해 선택
    // console.log("선택됨", userChoice)
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice)); // 승패를 판단하는 함수
    let userResult = judgement(choice[userChoice], computerChoice)
    setComputerResult(computerJudgement(userResult))
  };

  const judgement = (user, computer) => {
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

  const computerJudgement = (userResult) => {
    console.log(userResult)
    if (userResult === "tie") {
      return "tie"
    } else if (userResult === "win") {
      return "lose"
    } else if (userResult === "lose") {
      return "win"
    }
  }

  const randomChoice = () => {
    let itemArray = Object.keys(choice); // 객체(choice)의 키 값만 추출해 array로 만들어주는 함수
    console.log("itemarray: ", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    // console.log("randomvalue: ", randomItem)
    // console.log("final item: ", final)
    return choice[final];
  };
  return (
    <div className="main">
      <div className="container">
        <div className="title-area">
          가위바위보 게임
        </div>
        <div className="play-area">
          <Box title="user" item={userSelect} result={result} />
          <Box title="computer" item={computerSelect} result={computerResult} />
        </div>
        <div className="play-area">
          {/* UI를 그릴 때 함수를 실행해버림 -> 콜백함수 형태로 적어줘야함 */}
          <button className="button-item" onClick={() => play("scissors")}>
            <FontAwesomeIcon icon={faHandScissors} />
          </button>
          <button className="button-item" onClick={() => play("rock")}>
            <FontAwesomeIcon icon={faHandBackFist} />
          </button>
          <button className="button-item" onClick={() => play("paper")}>
            <FontAwesomeIcon icon={faHand} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
