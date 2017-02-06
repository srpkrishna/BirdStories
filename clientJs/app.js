import React, { Component } from 'react';
import GAuth from './secure/gAuth'
import FAuth from './secure/fAuth'
import Login from  './secure/login.js'
// import logo from './img/logo.svg';
          /*<img src={logo} className="App-logo" alt="logo" />*/
import styles from './css/app.css';
import { Link } from 'react-router';

class App extends Component {

  constructor(){
    super()
     this.state = {"showMenu":""};
     this.toggleMenu = this.toggleMenu.bind(this);
     this.hideMenu = this.hideMenu.bind(this);
     this.userStateListener = this.userStateListener.bind(this);
     this.googleLoadSuccess = this.googleLoadSuccess.bind(this);
     this.fbLoadSuccess = this.fbLoadSuccess.bind(this);

  }
  componentDidMount(){
    GAuth.init(this.userStateListener,this.googleLoadSuccess);
    FAuth.init(this.userStateListener,this.fbLoadSuccess);
  }

  toggleMenu() {
    this.setState((prevState, props) => {
        var state = prevState;
        state.showMenu = (prevState.showMenu === "") ? "show" : "";
        return state;
    })
  }

  hideMenu(){
    this.setState((prevState, props) => {
        var state = prevState;
        state.showMenu = "";
        return state;
    })
  }

  googleLoadSuccess(){
    this.setState((prevState, props) => {
        var state = prevState;
        state.gApi = GAuth;
        return state;
    })
  }

  fbLoadSuccess(){
    this.setState((prevState, props) => {
        var state = prevState;
        state.fbApi = FAuth;
        return state;
    })
  }

  userStateListener(isLoggedIn,user){
    this.setState((prevState, props) => {
        var state = prevState;

        /*ignoring the second login of fb/google. This case shouldnt come unless
          user has given access from both
        */
        if(isLoggedIn){
          if(!state.user)
            state.user = user;
        }else{
          state.user = undefined;
        }

        return state;
    })
  }

  //add user state to component
  changeComponentState(component){
    var userDetails = {};
    userDetails.email = this.state.user.email;
    userDetails.service = this.state.user.service;
    userDetails.token = this.state.user.token;

    var componentState = component.props.location.state;

    if(componentState){
      componentState.user = userDetails;
    }else{
      componentState = {}
      componentState.user = userDetails;
      component.props.location.state = componentState;
    }
  }

  render() {

    const menuClassName = "menu "+this.state.showMenu

    var tag = <Link to="/profile" activeClassName="active" ><i className="material-icons">perm_identity</i></Link>
    var component = this.props.children;
    var defaultProps = component.type.defaultProps

    if(this.state.user){
      var imgsrc = this.state.user.imageUrl
      var divStyle = {
            background: 'url(' + imgsrc + ') no-repeat center',
            width:'3rem',
            height:'3rem'
        }
      tag = <Link to="/profile"  activeClassName="active" style={divStyle}></Link>

      if(defaultProps && defaultProps.requireAuth){
        this.changeComponentState(component);
      }
    }else if(defaultProps && defaultProps.requireAuth){
        component = <Login google={this.state.gApi} fb={this.state.fbApi} />
    }

    return (
      <div className="App">
        <div className="App-header">
          <ul className="menuIcon" onClick={this.toggleMenu}>
            <li><a><i className="material-icons">menu</i></a></li>
          </ul>
          <ul className="social">
            <li>
              {tag}
            </li>
          </ul>
          <Link className="App-logo" to="/" onClick={this.hideMenu}>{window.getString("companyMain")}
            <span>{window.getString("companySub")}</span>
          </Link>

          <ul className={menuClassName} onClick={this.hideMenu}>
            <li className={menuClassName}>
              <Link to="/search" activeClassName="active" ><i className="material-icons">search</i>{window.getString("search")}</Link>
            </li>
            <li className={menuClassName}>
              <Link to="/write" activeClassName="active" ><i className="material-icons">create</i>{window.getString("write")}</Link>
            </li>
            <li className={menuClassName}>
              <Link to="/contact" activeClassName="active" ><i className="material-icons">phone</i>{window.getString("contactUs")}</Link>
            </li>
          </ul>
        </div>
        <div className="App-body">
        {component}
        </div>
        <div className="App-footer">
          <div className="about">
            <Link to="/about"> {window.getString("aboutus")}</Link>
          </div>

          <div className="rights">
            <p>
              {window.getString("copyright")}<br />{window.getString("rights")}
            </p>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
