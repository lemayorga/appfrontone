import { ConstantsActionType } from "@app/types/Constants";
import { ActionType, GlobalContextType, GlobalState } from "@app/types/customers/GlobalContext";
import Rol from "@app/types/modelsapis/seguridad/rol";
import React, { createContext, ReactElement, ReactNode, useReducer } from "react";


export const initialRolState: GlobalState<Rol> = {
    model: null,
    data: [],
    error: false,
    loading: false,
};

const rolReducer = (prevState: GlobalState<Rol>, action: ActionType): any => {
    switch (action.type) {
        case ConstantsActionType.GET_DATA_ALL:
          return {
            ...prevState,
            data: action.payload,
          };
        case ConstantsActionType.ADD:
          return {
            ...prevState,
            data: [...prevState.data, action.payload]
          };
        case ConstantsActionType.UPDATE:
          const updatedReg = action.payload;
          const updatedData = prevState.data.map((reg) => {
              if (reg.cod_rol === updatedReg.cod_rol) {
                return updatedReg;
              }
              return reg;
            });

            return {
              ...prevState,
              data: updatedData
            };
        case ConstantsActionType.DELETE:
          return {
            ...prevState,
            data: prevState.data.filter((reg) => reg.cod_rol !== action.payload)
          };
        case ConstantsActionType.SET_MODEL:
          return {
            ...prevState,
            model: action.payload,
          };
        case ConstantsActionType.SET_TRANSACTION:
          return {
            ...prevState,
            transaction: action.payload,
          };
        default:
          return initialRolState;
    }
};

export const RolContext = createContext({} as GlobalContextType<Rol>);

export function RolStore({ children }: { children: ReactNode }): ReactElement {
    const [state, dispatch] = useReducer(rolReducer, initialRolState);

    return(
        <RolContext.Provider value={{ state, dispatch }}>
            {children}
        </RolContext.Provider>
    );
  }