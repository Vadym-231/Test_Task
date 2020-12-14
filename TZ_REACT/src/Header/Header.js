import '../CSS/App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {NavDropdown,Navbar,Nav} from 'react-bootstrap';



// or less ideally



const Header = (props, bool) => {

        return ( <header>

            <Navbar  bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="/">MyNotes</Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">


                        <NavDropdown title="Action" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/add">Add notes</NavDropdown.Item>
                            <NavDropdown.Divider />

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </header>)
        }
        export default Header;