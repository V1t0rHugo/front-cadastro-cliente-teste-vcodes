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
import Create from '../components/Modals/Create'
import {
  Container,
} from "reactstrap";
// core components
import {Redirect } from "react-router-dom";
import Grid from '../components/Grids/Grid';
import Header from '../components/Header/Header';
import api from '../services/api';

class Index extends React.Component {
  state = {
    clients: [],
    clientById: [],
    modal_client: false,
    modal_create: false,
    searchTerm: '',
    name: '',
    phone: '',
    email: '',
    cpf: '',
    address: '',
    visible: false,
    error: false,
  };
  componentDidMount() {
    this.listClients();
  }
  componentWillMount() {
  }
  logout = async () => {
    sessionStorage.removeItem('token');
    document.location.reload(true);
    return (
      <Redirect to='/auth/login'></Redirect>
    );
  };
  maskPhone = (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
      this.setState({[e.target.name]: e.target.value});
  };
  maskCPF = (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
      this.setState({[e.target.name]: e.target.value});
  };
  createClient = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      cpf: this.state.cpf,
      address: this.state.address,
    }
    this.setState({ loading: true });
    try{
      if(this.state.name && this.state.phone && this.state.email && this.state.cpf && this.state.address){
        const create = await api.post(`/clients`, data, { headers })
        if (create.data.message){
          return alert(create.data.message);
        }
        if (create.data) {
          alert("Cliente cadastrado com sucesso!");
          this.setState({ modal_create: !this.state.modal_create });
          this.listClients();
        }
        this.setState({ loading: false });
      } else {

        alert("Preencha todos os campos!")
      }
    }catch (e) {
      if(e.response.status === 401){
        this.setState({error: true});
      }
    }
  }
  listClients = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    this.setState({ loading: true });
    try {
    const clients = await api.get(`/clients`, { headers })
      this.setState({ clients: clients.data })
      this.setState({ loading: false });
    }catch (e){
      if(e.response.status === 401){
        this.setState({error: true});
      }
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const toggle_create = () => this.setState({ modal_create: !(this.state.modal_create) });
    if(this.state.error){
      alert("Sua sessão expirou!");
      return ( <Redirect to={'/auth/login'}></Redirect> );
    }
    return (
      <>
        <br />
        <Container fluid>
          <Header 
            onClick={toggle_create} 
            onChange={this.onChange} 
            function={this.logout}
          />
        <br />
        <br />
        < Grid 
          data={this.state.clients}
          filter={this.state.searchTerm}
          error={this.state.error}
          />
        </Container>
          <Create
          open={this.state.modal_create}
          toggle={toggle_create}
          onChange={this.onChange}
          maskPhone={this.maskPhone}
          maskCPF={this.maskCPF}
          function={this.createClient}
          error={this.state.error}
          loading={this.state.loading}
          />
      </>
    );
  }
}

export default Index;
