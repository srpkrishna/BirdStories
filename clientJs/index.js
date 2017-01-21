import React from 'react';
import ReactDOM from 'react-dom';
import styles from './css/index.css';
import { Router, Route, IndexRoute , browserHistory } from 'react-router';
import App from './app';
import About from './about';
import Author from './author';
import NoMatch from './noMatch';
import Stories from './stories/stories';

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Stories}/>
      <Route path="about" component={About}/>
      <Route path="author" component={Author}>
        <Route path="/author/:authorId" component={Author}/>
      </Route>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>),
  document.getElementById('root')
);
