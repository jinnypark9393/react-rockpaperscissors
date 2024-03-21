import React, { Component } from 'react'

export default class BoxClass extends Component {
  render() {
    return (
      <div className='box'>
        <h1 className='box-title'>{this.props.title}</h1>
        <img className='item-img' src={this.props.item && this.props.item.img} />
        <h2 className={`result-area ${this.props.result}`}>{this.props.result}</h2>
      </div>
    )
  }
}
