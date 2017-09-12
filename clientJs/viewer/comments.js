'use strict';
import React, { Component } from 'react';
import styles from '../css/comments.css';
import CommentBox from './CommentBox';


class View extends Component {


  constructor(props){
    super(props)
    this.state = {index:-1}
    this.reply = this.reply.bind(this);
    this.replySuccess = this.replySuccess.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.state = {index:-1}
  }

  reply(index){
    this.setState((prevState, props) => {
        var state = prevState;
        state.index =  index;
        state.msg = undefined;
        return state;
    })
  }

  replySuccess(){
    this.setState((prevState, props) => {
        var state = prevState;
        state.index =  state.index + 1;
        state.msg = window.getString('postSuccess')
        return state;
    })

  }

  render(){

    var that = this;
    var commentDivs = this.props.comments.map(function(comment,i) {
      var tag = ""
      var msg = ""

      if(i === that.state.index && that.state.msg){
        msg =  <div className="msg">{that.state.msg}</div>
        tag = <button type="button"  onClick={() => that.reply(i)}>{window.getString("commentReply")}</button>
      }else if(i != that.state.index)
        tag = <button type="button"  onClick={() => that.reply(i)}>{window.getString("commentReply")}</button>
      else{
        tag = <CommentBox replySuccess={that.replySuccess} publishComment={that.props.publishComment} title={window.getString("commentReply")} replyTo={comment.userEmail} mention={comment.userName}/>
      }

      var userName = comment.userName

      if(!userName){
        userName = window.getString("anonymous")
      }
      userName = userName+":"

      return(<li key={i} className="comment">
        <div className="userName">{userName}</div>
        <div className="text">{comment.text}</div>
        {msg}
        {tag}
      </li>)
    })

    var moreTag = ""
    if(this.props.comments.length >0  && this.props.comments.length%5 == 0 ){
          moreTag = <li className="moreComments"><button onClick={this.props.showMoreComments} type="button">{window.getString("more")}</button></li>
    }

    return(
      <ul className="comments">
        <div className="title">{window.getString("comments")}</div>
        {commentDivs}
        {moreTag}
      </ul>
    )
  }
}

export default View;
