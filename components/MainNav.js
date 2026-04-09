import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';
import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react" 

export default function MainNav(){

  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
    
  const router = useRouter();

  useEffect(()=>{
    setMounted(true);
    setToken(readToken());
  }, [router.asPath])

  function logout(){
    removeToken();
    setToken(null);
    router.push('/login');
  }

  return (
    <>
        <Navbar className="navbar-dark bg-dark fixed-top navbar-light" expand="lg">
          <Container>
              <Navbar.Brand as={Link} href="/">Chloe Kim</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">     
                 <Nav>
                    <Nav.Link as={Link} href="/about">About</Nav.Link>
                    {!token && <Nav.Link as={Link} href="/register">Register</Nav.Link>}
                      {token && (
                       <NavDropdown title={token.userName} id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} href="/favourites">Favourites</NavDropdown.Item>
                          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    )}
                </Nav>
              </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        <br /><br />
    </>
  )
}
