import React from "react";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Nav,
    Media,
    Row,
    Button,
    Input,
} from "reactstrap";
import logo from "../../assets/img/apple-icon.png";
class Header extends React.Component {

    render() {
        return (
            <>

                <Nav className="align-items-center d-md-flex" navbar>
                    <UncontrolledDropdown nav>
                        <DropdownToggle className="pr-0" nav>
                            <Media className="align-items-center">
                                <img height="60%" width="60%" src={logo} alt="LOGO" />
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Bem-vindo!</h6>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="#logout" onClick={this.props.function}>
                                <i className="ni ni-button-power" />
                                <span>SAIR</span>
                            </DropdownItem>
                            <DropdownItem href={process.env.REACT_APP_API_DOCS} rel="noopener noreferrer" target="_blank">
                                <i className="ni ni-app" />
                                <span>API</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Row>
                    <Button className="btn btn-success" onClick={this.props.onClick}>NOVO</Button>
                    <Input
                        type="text"
                        style={{ width: '300px', height: '40px', padding: '10px' }}
                        className="mr-3 d-md-flex ml-lg-auto"
                        name="searchTerm"
                        placeholder='Pesquisar'
                        onChange={this.props.onChange}
                    />
                </Row>
                <hr color="success" />
            </>
        );
    }
}

export default Header;