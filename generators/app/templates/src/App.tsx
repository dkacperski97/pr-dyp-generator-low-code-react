import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
<%- helpers.getVariablesImports(site, site, pathToHooks) %>


const App: React.FC = (props = {}) => {
<%- helpers.getVariables(site, site) %>

  return (
    <Router>
        <Switch>
          {routes.map((r) => (
            <Route key={r.url} path={r.url}>
              {r.component}
            </Route>
          ))}
        </Switch>
    </Router>
  );
}

export default App;
