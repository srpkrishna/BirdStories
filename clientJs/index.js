import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute , browserHistory } from 'react-router';
import Styles from './css/index.css'
import App from './app';
import About from './about';
import Contact from './contact';
import Write from './write';
import WritersInfo from './writersInfo';
import Profile from './profile/profile';
import Author from './author/author';
import NoMatch from './noMatch';
import Stories from './stories/stories';
import Series from './series/series';
import Home from './home/home';
import Search from './search/search';
import Launch from './launch';
import Competition from './competition';
import TooManyReqs from './tooManyReqs';
import Policy from './policy';


ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="stories" component={Stories}>
        <Route path="/stories/story" component={Stories}/>
      </Route>
      <Route path="seriesList" component={Series}>
        <Route path="/seriesList/series" component={Series}/>
      </Route>
      <Route path="search" component={Search}/>
      <Router path="author">
        <Route path="/author/:authorId" component={Author}/>
        <Route path="*" component={NoMatch}/>
      </Router>
      <Route path="profile" component={Profile} requireAuth={true}/>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
      <Route path="write" component={Write} requireAuth={true} />
      <Route path="writersInfo" component={WritersInfo} requireAuth={true} />
      <Route path="competition" component={Competition} />
      <Route path="tooManyReqs" component={TooManyReqs} />
      <Route path="policy" component={Policy} />
      <Route path="*" component={Stories}/>
    </Route>
  </Router>),
  document.getElementById('root')
);
