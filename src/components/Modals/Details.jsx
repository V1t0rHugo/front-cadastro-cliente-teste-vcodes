import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
  } from "reactstrap";

export default function Details(props) {
  return (
    <Modal isOpen={props.open} toggle={props.toggle}>
          <ModalHeader toggle={props.toggle}>Detalhes</ModalHeader>
          <ModalBody>
            <b>Nome:</b> {props.name}<br />
            <b>Telefone:</b> {props.phone}<br />
            <b>E-mail:</b> {props.email}<br />
            <b>CPF:</b> {props.cpf}<br />
            <b>Endereço:</b> {props.address}<br />
            <br />
            <div className="text-right">
            <Button class="btn btn-primary" onClick={props.toggle}>Fechar</Button>
            </div>
          </ModalBody>
        </Modal>
  );
}