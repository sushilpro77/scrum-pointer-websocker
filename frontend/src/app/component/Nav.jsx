import React from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import logo from '../assets/images/plus-icon-red.png';

const Nav = () => {
  return(
    <Navbar>
      <Container>
        <Navbar.Brand> <Image src={logo} width='30px'/> Health and Build Info</Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  )
}

export default Nav;