import React, { CSSProperties, useContext } from "react";
import { LanguageContext, languageOptions } from "@app/contexts/Language/LanguageContext";


const LanguageSelector: React.FC<{ style?: CSSProperties}> = ({style}:{ style?: CSSProperties}) =>{
    const { userLanguage, userLanguageChange } = useContext(LanguageContext);
    const handleLanguageChange = (e:React.ChangeEvent<HTMLSelectElement>) => userLanguageChange(e.target.value);
    return (
      <select
        onChange={handleLanguageChange}
        value={userLanguage}
        style={style}
      >
        {Object.entries(languageOptions).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
    );
  };

  export default LanguageSelector;

