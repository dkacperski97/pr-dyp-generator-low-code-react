import React from 'react';
<%- site.components.map(c => helpers.getComponentName(c)).map(name => `export const ${name} = React.lazy(() => import('./${name}'));`).join('\n') %>
