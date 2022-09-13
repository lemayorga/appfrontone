import EumTransactionType from "@app/types/enums/EumTransactionType";
import {  Dispatch } from "react";

export interface GlobalState<T> {
    model: T |  null;
    data: T[];
    error?: boolean;
    loading?: boolean;
    transaction?: EumTransactionType;
}

export type ActionType = {
    type: string;
    payload?: any;
};
  
export interface GlobalContextType<T> {
  state: GlobalState<T>;
  dispatch: Dispatch<ActionType>;
};

