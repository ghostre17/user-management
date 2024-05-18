import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import UserList from './UserList';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">User Management</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/users">View Users</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Routes>
                    <Route path="/" element={<UserForm />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/:id/edit" element={<UserForm />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
