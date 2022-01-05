import React from 'react';
import { Redirect, Route, RouteComponentProps } from "react-router";
// import Constants from "../types/Constants";

export interface PropsRoute {
    Component: React.FC<RouteComponentProps>
    path: string;
    exact?: boolean;
};


const AuthRoute = ({Component,path, exact = false}:PropsRoute): JSX.Element =>{

    const isAuthed = true; // !! localStorage.getItem(Constants.ACCESS_TOKEN);
    const message = 'Es necesario iniciar sesión';

    return(
        <Route 
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) =>
                isAuthed ? (
                   <Component {...props} />
                ) : (
                    <Redirect 
                        to={{
                            pathname: '/login',
                            state:{
                                message,
                                requestedPath: path
                            }
                        }}
                    />
                )
            }
        />
    );
}



export default AuthRoute;