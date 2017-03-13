'use strict';
import React, { Component } from 'react';
import styles from '../../css/comments.css';
import CommentBox from './CommentBox';


class View extends Component {


  constructor(props){
    super(props)
    this.state = {index:-1}
    this.reply = this.reply.bind(this);
  }

  reply(index){
    this.setState({index:index})
  }

  render(){

    var that = this;
    var commentDivs = this.props.comments.map(function(comment,i) {
      var tag = ""
      if(i != that.state.index || !comment.userEmail)
        tag = <button type="button"  onClick={() => that.reply(i)}>{window.getString("commentReply")}</button>
      else{
        tag = <CommentBox publishComment={that.props.publishComment} title={window.getString("commentReply")} replyTo={comment.userEmail} mention={comment.userName}/>
      }

      var userName = comment.userName

      if(!userName){
        userName = window.getString("anonymous")
      }
      userName = userName+":"

      return(<li key={i} className="comment">
        <div className="userName">{userName}</div>
        <div className="text">{comment.text}</div>
        {tag}
      </li>)
    })

    return(
      <ul className="comments">
        <div className="title">{window.getString("comments")}</div>
        {commentDivs}
      </ul>
    )
  }
}

export default View;
