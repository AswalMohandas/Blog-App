import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useUser } from './Hooks/UserContext';



function Navigation() {
const {user, logout} = useUser();
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
            
         {/* Right side login button */}
       
   {
  user ? (
    <NavDropdown
      title={`👤 ${user.name}`}
      id="profile-dropdown"
      align="end"
      className="me-3"
    >
      <NavDropdown.Item as={Link} to="/profile">
        My Profile
      </NavDropdown.Item>

      <NavDropdown.Item as={Link} to="/my-blogs">
        My Blogs
      </NavDropdown.Item>

      <NavDropdown.Item as={Link} to="/create-blog">
        Create Blog
      </NavDropdown.Item>

      <NavDropdown.Divider />

      <NavDropdown.Item onClick={logout}>
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  ) : (
    <Link to="/login">
      <Button variant="light">
        Login
      </Button>
    </Link>
  )
}

    {/* Create new Blog */}

   <nav className="me-auto text-white me-3">
  

    <Link to="/create-blog" className="me-3">
     <Button variant="light">
     Create Blog
     </Button>
     </Link>
   </nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

   
  )
}

export default Navigation
