import api from '../../services/api';
import Details from '../Modals/Details';
import {Redirect } from "react-router-dom";
import React from "react";
import {
    Card,
    CardBody,
    Col,
    Row,
  } from "reactstrap";
  
  class Grid extends React.Component {
    state = {
        clientById: [],
        modal_client: false,
        searchTerm: '',
        name: '',
        phone: '',
        email: '',
        cpf: '',
        address: '',
        id: '',
        error: false,
      };
      listClientById = async (id) => {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
        try{
          const client = await api.get(`/clients/${id}`, { headers })
          this.setState({ clientById: client.data, id: client.data._id, name: client.data.name, phone: client.data.phone, email: client.data.email, cpf: client.data.cpf, address: client.data.address });
        }catch (e){
          if(e.response.status === 401){
            this.setState({error: true});
          }
        }
      }
      render() {
        const toggle_client = () => this.setState({ modal_client: !(this.state.modal_client) });
        if(this.state.error){
          alert("Sua sessão expirou!");
          return ( <Redirect to={'/auth/login'}></Redirect> );
        }
        return (
            <>
            <Row>
                {this.props.data
                .filter((c)=> {
                    if(this.props.filter === ""){
                      return c;
                    } else if(c.name.toLowerCase().includes(this.props.filter.toLowerCase())){
                      return c;
                    } else if(c.cpf.includes(this.props.filter)){
                      return c;
                    } else if(c.email.toLowerCase().includes(this.props.filter.toLowerCase())){
                      return c;
                    } else if(c.address.toLowerCase().includes(this.props.filter.toLowerCase())){
                      return c;
                    } else if(c.phone.includes(this.props.filter)){
                      return c;
                    }
                  })
                .map(c => {
                    return (
                    <>
                        <Col xs={6} md={4}>
                        <Card outline color="success" onClick={() => {
                        this.listClientById(c._id);
                        setTimeout(() => {
                          this.setState({ modal_client: !(this.state.modal_client) });
                        }, 1000);
                      }} style={{ cursor: 'pointer' }}>
                            <CardBody>
                            <b>Nome:</b> {c.name}<br />
                            <b>CPF</b>: {c.cpf}<br />
                            <b>E-mail:</b> {c.email}<br />
                            </CardBody>
                        </Card>
                        </Col>
                    </>
                    )
                })
                }
            </Row>
            <Details 
            open={this.state.modal_client} 
            toggle={toggle_client} 
            name={this.state.name} 
            phone={this.state.phone}
            email={this.state.email}
            cpf={this.state.cpf}
            address={this.state.address}
            />
            </>
        );
  }
}

export default Grid;