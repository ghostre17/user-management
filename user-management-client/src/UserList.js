import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const apiUrl = 'http://localhost:5000/api/users';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h1 className="text-center my-4">User List</h1>
            <ListGroup>
                {users.map(user => (
                    <ListGroupItem key={user.id}>
                        <Row>
                            <Col>
                                <div><strong>Name:</strong> {user.name}</div>
                                <div><strong>Age:</strong> {user.age}</div>
                                <div><strong>Address:</strong> {user.address}</div>
                                <div><strong>Phone:</strong> {user.phone}</div>
                            </Col>
                            <Col className="text-right">
                                <Button variant="warning" size="sm" as={Link} to={`/${user.id}/edit`}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default UserList;
