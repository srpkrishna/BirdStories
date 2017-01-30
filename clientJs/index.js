import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute , browserHistory } from 'react-router';
import Styles from './css/index.css'
import App from './app';
import About from './about';
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
      <Route path="about" component={About}/>
      <Route path="author" component={Author}>
        <Route path="/author/:authorId" component={Author}/>
      </Route>
    </Route>
    <Route path="*" component={Stories}/>
  </Router>),
  document.getElementById('root')
);
