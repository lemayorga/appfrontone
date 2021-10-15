// import {Route, Link, Redirect,Switch, BrowserRouter as Router} from 'react-router-dom';
import {Route, Link,Switch, BrowserRouter as Router} from 'react-router-dom';
import {Card, Row, Col} from 'antd';
import App from "../App";
import Home from '../pages/Home';

export const NoMatchPage = () => {
    return (
      <Row style={{marginTop: '20%'}}>
        <Col xs={{span: 12, offset: 6}}>
  
          <Card>
            <div className="card-body">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h2>Page not found</h2>
                <Link to="/dashboard">back to dashboard</Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  };

  const routing = (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
        {/* <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/layout/grid" component={Grid} />
        <Route exact path="/layout/gridLayout" component={GridLayout} />
        <Route exact path="/form/form-elements" component={FormElements} />
        <Route exact path="/form/form-controls" component={FormControls} />
        <Route exact path="/form/form-components" component={FormComponents} />
        <Route exact path="/navigation/affix" component={Affix} />
        <Route exact path="/navigation/dropdown" component={Dropdown} />
        <Route exact path="/navigation/menu" component={Menu} />
        <Route exact path="/navigation/pagination" component={Pagination} />
        <Route exact path="/navigation/pageheader" component={PageHeader} />
        <Route exact path="/navigation/steps" component={Steps} />
        <Route exact path="/components/buttons" component={Buttons} />
        <Route exact path="/components/typography" component={Typography} />
        <Route exact path="/calendar/basic-calendar" component={BasicCalendar} />
        <Route  exact  path="/calendar/notice-calendar"  component={NoticeCalendar}   />
        <Route   exact path="/calendar/selectable-calendar" component={SelectableCalendar}  />
        <Route exact path="/data-display/list" component={List} />
        <Route exact path="/data-display/tooltip-popover" component={Tooltip} />
        <Route exact path="/data-display/carousel" component={Carousel} />
        <Route exact path="/charts" component={Charts} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/table" component={Table} />
        <Route exact path="/language-switcher" component={LanguageSwitcher} />
        <Route exact path="/docs" component={Docs} /> */}
        <Route path="*" component={NoMatchPage} />
    </Switch>
    </Router>
  );


  export default routing;