import React from 'react'
import { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import AddUserModal from './AddUserModal';

export default function Users({userData}) {
    const [modalShow, setModalShow] = useState(false);

  return (
    <Card>
        <ListGroup variant='flush'>
        {userData.map((user, i) => (
            <ListGroup.Item key={i}>{user.name}</ListGroup.Item>
        ))}
            <ListGroup.Item action onClick={() => setModalShow(true)}>Add User</ListGroup.Item>
        </ListGroup>
        <AddUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </Card>
  )
}
