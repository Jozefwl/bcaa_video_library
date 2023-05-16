import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from '@mdi/react' // component we will use to display the icon
import { mdiLibrary,  } from '@mdi/js' // icons we want to use

export default function NavbarMenu({onSearch}) {
  const [inputValue, setInputValue] = useState("")

  // search on enter
  function handleSubmit(e) {
    // when I click enter, no page will be reloaded
    e.preventDefault()
    onSearch(inputValue)
    console.log(e);
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="\">
          <Icon path={mdiLibrary} size={2} color="#27B9D0"/>
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          {/* preventDefault */}
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="me-2"
              aria-label="Search"
            />
            <Button 
            onClick={() => onSearch(inputValue)}
            variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>

      

    </Navbar>
  );
}

    