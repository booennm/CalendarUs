import React from 'react'
import { useParams } from 'react-router-dom';
import { CALENDARS_REF, USERS_REF, auth, db } from '../firebase';
import { query, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import AddUserModal from './AddUserModal';

export default function Users() {
    const {id} = useParams();

    const [userIds, setUserIds] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
      getUserIds();
    }, [])

    useEffect(() => {
        if(userIds.length > 0) {
                getUsers();
        }
    }, [userIds])

    const getUserIds = async () => {
        const calendarRef = doc(db, CALENDARS_REF, id);

        try {
            const docSnap = await getDoc(calendarRef);

            if(docSnap.exists()) {
                setUserIds(docSnap.data().users);
            }else {
                console.log('Cannot get users, calendar document does not exist');
            }
        } catch (error) {
            console.error('Error getting userIds', error.message);
        }
    }

    const getUsers = async () => {
        try {
            const userPromises = userIds.map(async (userId) => {
                const userRef = doc(db, USERS_REF, userId);
                const docSnap = await getDoc(userRef);
                if(docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() };
                }else {
                    console.log('User document does not exist');
                    return null;
                }
            });
            const data = await Promise.all(userPromises);
            setUsers(data.filter((item) => item !== null)); //don't set unfound users
        } catch (error) {
            console.error('Error getting user', error.message);
        }
    }

  return (
    <Card>
        <ListGroup variant='flush'>
        {users.map((user, i) => (
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
