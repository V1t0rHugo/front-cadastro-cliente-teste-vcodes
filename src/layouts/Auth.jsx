import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import logo from "../assets/img/apple-icon.png";

// core components

import routes from "routes.js";
class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-dark");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-dark");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div>
          <div className="header bg-gradient-primary py-5">
            <Container>
              <div className="header-body text-center mb-6">
              <img height="8%" width="8%" src={logo} alt="LOGO"/>
              </div>
            </Container>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
          <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                <a href={process.env.REACT_APP_API_DOCS} rel="noopener noreferrer" target="_blank">API</a>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
        </div>
      </>
    );
  }
}

export default Auth;
