'use strict';


const u = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const getVariableName = (variable) => variable.name
const getVariableSetter = (variable) => `set${u(getVariableName(variable))}`
const getVariable = (variable) => `${getVariableName(variable)}, ${getVariableSetter(variable)}`

const getHookName = (variable) => `use${u(variable.name)}`
const getComponentName = (component) => u(component.name)

const getComponentImport = (c, path) => `import ${getComponentName(c)} from "${path}components/${getComponentName(c)}";\n`
const getComponentsImports = (site, item) =>
    item.children
        .map(child => site.component.find(c => c.id === child))
        .map((c) => getComponentImport(c, './'))
        .join("");
const getVariableImport = (v, path) => `import ${getHookName(v)} from "${path}hooks/${getHookName(v)}";\n`
const getVariablesImports = (site, item) =>
    item.variables.map((v) => getVariableImport(v, './')).join('')

const getVariables = (site, item) => 
    item.variables.map(v => `const [${getVariable(v)}] = ${getHookName(v)}();\n`).join('')

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
    getVariables,
}