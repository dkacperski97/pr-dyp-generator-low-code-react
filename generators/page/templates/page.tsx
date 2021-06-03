<%
const getComponentTag = (id) => id.charAt(0).toUpperCase() + id.slice(1);
const createJsx = (layout, id) => {
    const component = layout.find(c => c.id === id);
    if (!component) {
        console.log('empty')
        return '';
    }
    const childrenString = component.children.map(child => createJsx(layout, child)).join('\n');
    const tag = getComponentTag(component.componentId);
    console.log('tag',tag)
    return `<${tag}>\n${childrenString}</${tag}>\n`;
}
const mainId = page.layout.find(c => c.componentId === 'main').id;
%>
import React from 'react';
<%- page.layout.map(c => c.componentId).map(id => `import ${getComponentTag(id)} from '../components/${id}';`).join('\n') %>

const <%- page.uniqueName.replace(/\s/g, "") %>: React.FC = () => {
	return (
        <%- createJsx(page.layout, mainId) %>
	)
}

export default <%- page.uniqueName.replace(/\s/g, "") %>;