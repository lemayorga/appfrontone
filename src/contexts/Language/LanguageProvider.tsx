import  React, { useState } from "react";
import { dictionaryList, LanguageContext } from "@app/contexts/Language/LanguageContext";

export const LanguageProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState(window.localStorage.getItem('rcml-lang') || process.env.REACT_APP_LANGUAGUE as string);
  const provider = {
    userLanguage,
    dictionary:  dictionaryList[userLanguage  as keyof typeof dictionaryList],
    userLanguageChange: (newLanguage:string) => {
      const defaultLanguage = userLanguage;
      setUserLanguage(newLanguage || defaultLanguage);
      window.localStorage.setItem('rcml-lang', newLanguage);
    }
  };

  return(
    <LanguageContext.Provider value={provider}>
     {children}
    </LanguageContext.Provider>
  ) 
};




