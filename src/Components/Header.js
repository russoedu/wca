import './Header.css'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export function Header () {
  return (
    <Navbar expand="lg" bg="grey" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          WhYMCA
        </Navbar.Brand>
        <div>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Português</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Translate</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}
