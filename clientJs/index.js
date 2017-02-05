import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute , browserHistory } from 'react-router';
import Styles from './css/index.css'
import App from './app';
import About from './about';
import Contact from './contact';
import Write from './write';
import Profile from './profile/profile';
import Author from './author/author';
import NoMatch from './noMatch';
import Stories from './stories/stories';
import Search from './search/search';


ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Stories}/>
      <Route path="stories" component={Stories}>
        <Route path="/stories/story" component={Stories}/>
      </Route>
      <Route path="search" component={Search}/>
      <Router path="author">
        <Route path="/author/:authorId" component={Author}/>
        <Route path="*" component={NoMatch}/>
      </Router>
      <Route path="profile" component={Profile} requireAuth={true}/>
      <Route path="about" component={About}/>
      <Route path="contact" component={About}/>
      <Route path="write" component={Write} requireAuth={true} />
      <Route path="*" component={Stories}/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>),
  document.getElementById('root')
);
