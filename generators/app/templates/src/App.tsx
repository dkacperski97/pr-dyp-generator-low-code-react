import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import { ApolloProvider } from '@apollo/client/react';
<%- helpers.getVariablesImports(site, site, pathToHooks) %>


const App: React.FC = (props = {}) => {
<%- helpers.getVariables(site, site) %>

  return (
    <ApolloProvider client={client}>
      <SiteProvider>
        <Router>
            <Switch>
              {routes.map((r) => (
                <Route key={r.url} path={r.url}>
                  <React.Suspense fallback="">
                    {r.component}
                  </React.Suspense>
                </Route>
              ))}
            </Switch>
        </Router>
      </SiteProvider>
    </ApolloProvider>
  );
}

export default App;
