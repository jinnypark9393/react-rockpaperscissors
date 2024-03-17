import React from 'react'

// 선언한 컴포넌트와 export하는 컴포넌트 이름이 다르면 안됨
// 컴포넌트는 항상 대문자로 시작
const Box = (props) => {
    let result;
    console.log("props: ", props)
  return (
    <div className='box'>
        <h1 className='box-title'>{props.title}</h1>
        <img className='item-img' src={props.item && props.item.img} />
        <h2 className={`result-area ${props.result}`}>{props.result}</h2>
    </div>
  )
}

export default Box