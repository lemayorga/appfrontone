import {Route,Switch, BrowserRouter as Router, Link} from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import AuthRoute, { PropsRoute } from './AuthRoute';
import RolesPage from '../pages/seguridad/RolePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import Layouts from '../components/layout/Layouts';
import LayoutAnonymous  from '../components/layout/LayoutAnonymous';


const publicRoutes: PropsRoute[] = [
  {
    path: "/login",
    Component: LoginPage,
    exact: true
  },
  {
    path: "/signup",
    Component: SignupPage,
    exact: true
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
    exact: true
  }
];

const privateRoutes: PropsRoute[] = [
  {
    path: "/",
    Component: HomePage,
    exact: true
  },
  {
    path: "/seguridad/roles",
    Component: RolesPage, // sub routing is handled in that component
    exact: false // important, PageSettings is just a new Router switch container
  }
];

const NoMatchPage : React.FC = (): JSX.Element =>{
  return (
    <Row style={{ marginTop: '20%' }}>
      <Col xs={{ span: 12, offset: 6 }}>
        <Card>
          <div className="card-body">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2>Página no encontrada</h2>
              <Link to="/">Ir a inicio</Link>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}



const Routing: React.FC = (): JSX.Element =>{
  return(
    <Router>
      <Switch>
        <Route exact path={privateRoutes.map(x => x.path)}>
          <Layouts>
            <Switch>
              {privateRoutes.map(privateRouteProps => (
                <AuthRoute {...privateRouteProps} key={privateRouteProps.path} />
              ))}
            </Switch>
          </Layouts>
        </Route>

        <Route exact path={publicRoutes.map(x => x.path)}>
          <LayoutAnonymous>
            <Switch>
              {publicRoutes.map(publicRouteProps => (
                <Route {...publicRouteProps} key={publicRouteProps.path} />
              ))}
            </Switch>
          </LayoutAnonymous>
        </Route>

        <Route path="*">
          <LayoutAnonymous>
            <Switch>
              <Route component={NoMatchPage} />
            </Switch>
          </LayoutAnonymous>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routing;