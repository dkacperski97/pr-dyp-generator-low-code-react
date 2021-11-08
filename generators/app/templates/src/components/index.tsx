import React from 'react';
const Pages: {[key: string]: React.LazyExoticComponent<React.ComponentType>} = {
<%- site.components.map(c => helpers.getComponentName(c)).filter(name => name[0] === 'P').map(name => `"${name}": React.lazy<React.ComponentType>(() => import('./${name}')),`).join('\n') %>
};

type PageViewerProps = {
    name: string;
};
const PageViewer: React.FC<PageViewerProps> = ({ name }) => {
    const Page = Pages[name];
    return Page ? (
        <React.Suspense fallback="">
            <Page />
        </React.Suspense>
    ) : null;
}

export default PageViewer;