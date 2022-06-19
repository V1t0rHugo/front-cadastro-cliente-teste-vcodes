import React from "react";
import {Redirect } from "react-router-dom";
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Button,
    ModalBody,
    ModalHeader,
    Modal,
  } from "reactstrap";
  import { Circle } from "react-awesome-spinners";

export default function Create(props) {
    if(props.error){
        alert("Sua sessão expirou!");
        return ( <Redirect to={'/auth/login'}></Redirect> );
      }
    return (
        <Modal isOpen={props.open} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}><h2>Cadastro de clientes</h2></ModalHeader>
            <ModalBody>
                <Card className="shadow">
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            <FormGroup className="mb-3" >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-single-02" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="name" onChange={props.onChange} placeholder="Nome" type="text" required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3" >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-tablet-button" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="phone" onChange={props.maskPhone} placeholder="Telefone" type="text" required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3" >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="email" onChange={props.onChange} placeholder="E-mail" type="text" required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3" >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-badge" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="cpf" onChange={props.maskCPF} placeholder="CPF" type="text" required />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3" >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-square-pin" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="address" onChange={props.onChange} placeholder="Endereço" type="text" required />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <Button className="my-4" onClick={props.function} color="outline-success" type="button" >
                                    Cadastrar Cliente
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                    <div className="text-center">
                        {props.loading && <Circle color="#08c908" />}
                    </div>
                </Card>
            </ModalBody>
        </Modal>
    );
}