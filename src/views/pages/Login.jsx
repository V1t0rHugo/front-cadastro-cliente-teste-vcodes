/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {Redirect} from "react-router-dom";
import { Circle } from "react-awesome-spinners";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";
import api from "../../services/api";


class Login extends React.Component {
  state = {
      username: '',
      password: '',
      redirect: false,
      loading: false,
  };
  componentDidMount() {
    //this.login();
    this.onChange = this.onChange.bind(this);
  }
  login = async () => {
    let username = this.state.username;
    let password = this.state.password;
    const data = {
      username: username,
      password: password
    }
    if(this.state.username && this.state.password) {
      this.setState({loading: true});
      try{
        const auth = await api.post(`/auth/login`, data)
        if(auth.data.token){
          sessionStorage.setItem('token', auth.data.token);
          this.setState({redirect: true});
        } 
        this.setState({loading: false});
      } catch (error) {
        this.setState({loading: false});
        return alert("Usuário e/ou senha inválido(s)!");
      }
    } else {
      return alert("Preencha todos os campos!");
    }  
  }
  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    if(this.state.redirect){
      return(
        <Redirect to={'/admin/Index'}></Redirect>
      );
    }
    return (
      <>
        <Col lg="6" md="9">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Informe suas credenciais</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Usuário" name="username" type="text" onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Senha" name="password" type="password" onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="outline-success" type="button" onClick={this.login}>
                    Entrar
                  </Button>
                </div>
              </Form>
              <div className="text-center">
                {this.state.loading && <Circle color="#08c908" />}
              </div>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Login;
