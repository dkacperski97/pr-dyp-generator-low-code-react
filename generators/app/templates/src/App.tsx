<%
const getPageUrl = (page) => page.uniqueName.toLowerCase().replace(/\s/g, "-")
const getPageName = (page) => page.uniqueName.replace(/\s/g, "")
%>
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
<%- pages.map(page => `import ${getPageName(page)} from './pages/${getPageName(page)}';`).join('\n') %>

const App: React.FC = () => {
  return (
    <Router>
        <Switch>
<% pages.forEach(page => { %>
            <Route path="/<%= getPageUrl(page) %>">
                <<%= getPageName(page) %> />
            </Route>
<% }) %>
        </Switch>
    </Router>
  );
}

export default App;
