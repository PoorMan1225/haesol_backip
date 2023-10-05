import loadable from '@loadable/component';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import useSWR from 'swr';
import useFetcher from '@utils/useFetcher';

const Workspace = loadable(() => import('@layouts/Workspace'));
const LogIn = loadable(() => import('@layouts/Login'));
const App = () => {
  const { fetcher } = useFetcher();
  const { data, error, mutate } = useSWR('/api/auth/signIn-token', fetcher);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={LogIn} />
      {/* <Route path="/signup" component={SignUp} /> */}
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
