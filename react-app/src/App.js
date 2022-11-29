import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SeeTheSubsComponent from './components/Subranddits/HomePage';
import SeeSubrandditDetailsComponent from './components/Subranddits/SubDetails';
import SeeThePostsComponent from './components/Posts/PostDetails';
import PostCardComponent from './components/Posts/PostCard';
import CreateSubRandditComponent from './components/Subranddits/CreateSub';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="global">
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SeeTheSubsComponent />
          {/* <SeeThePostsComponent/> */}
        </Route>
        <Route path="/subranddits/:subrandditId" exact={true}>
            <SeeSubrandditDetailsComponent/>
        </Route>
        <Route path="/subranddits/:subrandditId/posts/:postId" exact={true}>
            <PostCardComponent/>
        </Route>
      </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
