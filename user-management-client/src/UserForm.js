import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = 'http://localhost:5000/api/users';

function UserForm() {
    const [formData, setFormData] = useState({ name: '', age: '', address: '', phone: '' });
    const [editing, setEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/${id}`);
            setFormData(response.data);
            setEditing(true);
        } catch (error) {
            console.error('Failed to fetch user', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`${apiUrl}/${id}`, formData);
            } else {
                await axios.post(apiUrl, formData);
            }
            navigate('/users');
        } catch (error) {
            console.error('Failed to save user', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h1 className="text-center my-4">{editing ? 'Edit User' : 'Add User'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter user name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter user age"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter user address"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter user phone number"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    {editing ? 'Update User' : 'Add User'}
                </Button>
            </Form>
        </div>
    );
}

export default UserForm;
