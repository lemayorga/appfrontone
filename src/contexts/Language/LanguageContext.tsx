import React,  { createContext, useContext } from "react";
import en from '@app/translations/en/traslation.json';
import es from '@app/translations/es/traslation.json';

export const dictionaryList = { en, es };
export const languageOptions = {
  en: 'English',
  es: 'Spanish',
};

const data : { [key: string]: any } = dictionaryList.en;

export const LanguageContext = createContext({
    userLanguage: process.env.REACT_APP_LANGUAGUE as string,
    userLanguageChange: (newLanguage:string) => console.warn('no Language provider'),
    dictionary:  data
});

export const TextTraslate: React.FC<{ tid: string }> = ({ tid }: { tid: string }): JSX.Element => {
  const languageContext = useContext(LanguageContext);
  return <>{languageContext.dictionary[tid] || tid}</>;
}

export const LabelTraslate = (tid: string) => {
  const languageContext = useContext(LanguageContext);

  if(!tid.includes('.')){
    return languageContext.dictionary[tid] || tid;
  }else {
    let repeticiones = tid.split('.');
    let key = ''; 
    let indice = 0; let objeto = {};

    while (indice < repeticiones.length)
    {
     
      key  = repeticiones[indice];
      if(indice == 0)  
        objeto = languageContext.dictionary[key] || tid;
      else
         objeto = objeto[key as keyof typeof objeto];
      
      indice++;
    }
    return objeto;
  }
}