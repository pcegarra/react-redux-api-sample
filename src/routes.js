import React from 'react';
import {Router, IndexRoute,Route} from 'react-router';

import App from './components/app';
import PostsNew from './components/posts_new';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';



const Greeting = () => {
  return <div>Buenas!</div>
}

export default (

  <Router path="/" component={App}>
    <IndexRoute component={PostsIndex}/>
    <Route path="posts/new" component={PostsNew}/>
    <Route path="posts/:id" component={PostsShow}/>
  </Router>


);
