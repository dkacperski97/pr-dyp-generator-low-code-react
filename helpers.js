'use strict';


const u = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const getVariableName = (variable) => variable.name
const getVariableSetter = (variable) => `set${u(getVariableName(variable))}`
const getVariable = (variable) => `${getVariableName(variable)}, ${getVariableSetter(variable)}`

const getHookName = (variable) => `use${u(variable.name)}`
const getComponentName = (component) => u(component.name)

const getComponentImport = (c, path) => `const ${getComponentName(c)} = React.lazy(() => import("${path}components/${getComponentName(c)}"));\n`
const getComponentsImports = (site, item, path) =>
    item.children
        .map(child => site.components.find(c => c.id === child))
        .map((c) => getComponentImport(c, path) + getComponentsImports(site, c, path))
        .join("");
const getVariableImport = (v, path) => `import ${getHookName(v)} from "${path}hooks/${getHookName(v)}";\n`
const getVariablesImports = (site, item, path) =>
    (typeof item.name !== 'undefined' ? `import { SiteContext } from '../../${path}context/SiteContext';` : '') +
    item.variables.map((v) => getVariableImport(v, path)).join('')

const getComponents = (site, item) => {
    const getComponentProps = (c) => c.variables.filter(v => v.templateId === 'prop').map(hook => {
        const c = site.components.find((c) => c.variables.find((v) => v.id === hook.templateParameters.variable))
        const v = c.variables.find((v) => v.id === hook.templateParameters.variable)
        return `${getVariableName(v)}={${getVariableName(v)}} ${getVariableSetter(v)}={${getVariableSetter(v)}} `
    }).join("");
    const getComponentTag = (c) =>
        `<React.Suspense fallback={<div></div>}><${getComponentName(c)} ${getComponentProps(c)}>
            ${getComponents(site, c)}
        </${getComponentName(c)}></React.Suspense>\n`

    return item.children
        .map(child => site.components.find(c => c.id === child))
        .map(getComponentTag)
        .join("");
}
const getVariableInput = (item, index) => item.variables.slice(0, index).map(v => `${getVariable(v)}`).join(', ');
const getVariableInputWithoutContext = (item) => item.variables.filter(v => v.templateId !== 'siteContext').map(v => `${getVariable(v)}`).join(', ');
const getVariables = (site, item) => (typeof item.name !== 'undefined' ? 'const SiteContextValue = React.useContext(SiteContext);\n' : '') +
    item.variables.map((v, i) => `const [${getVariable(v)}] = ${getHookName(v)}(props, { ${getVariableInput(item, i)} });\n`).join('') +
    (typeof item.name !== 'undefined' ? `React.useEffect(() => {
        if (SiteContextValue !== null) {
            SiteContextValue.setComponents((prev: any) => ({
                ...prev,
                ["${getComponentName(item)}"]: { ${getVariableInputWithoutContext(item)} }
            }));
        }
    }, [SiteContextValue?.setComponents, ${getVariableInputWithoutContext(item)}])
    ${item.variables.filter(v => v.templateId === 'siteContext').length > 0 ? `
    if (${item.variables.filter(v => v.templateId === 'siteContext').map(v => `${getVariableName(v)} === undefined`).join(' || ')}) {
        return null;
    }`:``}\n` : '');
const getOption = (site, item, name) => {
    const v = item.variables.find(v => v.id === item.options[name])
    return v ? getVariableName(v) : 'undefined';
}
const getOptionSetter = (site, item, name) => {
    const v = item.variables.find(v => v.id === item.options[name])
    return v ? getVariableSetter(v) : 'console.log';
}
//------------------------------------------------------

// const isGlobalVariable = (name) => true;
// const isContainerVariable = (name) => true;
// const isLocalVariable = (name) => true;

// const getGlobalVariables = (config) => 
//     Object.keys(config).filter(isGlobalVariable).map(key => `const [${key}, set${u(key)}] = useContext(${u(key)}Context);\n`).join('')
// const getContainerVariables = (config) => {
//     const containerVariables = Object.keys(config).filter(isContainerVariable);
//     return containerVariables.length === 0 
//         ? '' 
//         : `const {` + containerVariables.map(key => `${key}, set${u(key)}`).join(', ') + `} = props;\n`;
// }
// const getLocalVariables = (config) => 
//     Object.keys(config).filter(isLocalVariable).map(key => `const [${key}, set${u(key)}] = useVariable${u(key)}();\n`).join('')


module.exports = {
    u,
    getVariableName,
    getVariableSetter,
    getVariable,
    getHookName,
    getComponentName,
    getComponentImport,
    getComponentsImports,
    getVariableImport,
    getVariablesImports,
    getComponents,
    getVariables,
    getOption,
    getOptionSetter,
}