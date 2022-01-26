import React, { useState, createContext } from "react";

interface ISiteContext {
  components: any,
  setComponents: React.Dispatch<React.SetStateAction<any>>
  init: (componentName: string, variableName: string, value: any) => void,
};
export const SiteContext = createContext<ISiteContext | null>(null);

export const SiteProvider: React.FC = ({ children }) => {
  const [components, setComponents] = useState<any>({});
  const init = (componentName: string, variableName: string, value: any) => {
    if (components[componentName] === undefined || components[componentName][variableName] === undefined) {
      setComponents((prev: any) => ({
        ...prev,
        [componentName]: {
          ...(prev[componentName] || {}),
          [variableName]: value
        }
      }))
    }
  }
  const data = { components, setComponents, init };
  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
};
