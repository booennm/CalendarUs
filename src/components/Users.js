import React from 'react'
import { useParams } from 'react-router-dom';
import { CALENDARS_REF, USERS_REF, auth, db } from '../firebase';
import { query, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function Users() {
    const {id} = useParams();

    const [userIds, setUserIds] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      getUserIds();
    }, [])

    useEffect(() => {
        setUsers([]);
        if(userIds.length > 0) {
            userIds.map((userId) => {
                getUser(userId);
            })
        }
    }, [userIds])
    
    

    const getUserIds = async () => {
        const calendarRef = query(doc(db, CALENDARS_REF, id));

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

    const getUser = async (userId) => {
        const userRef = doc(db, USERS_REF, userId);
        
        try {
            const docSnap = await getDoc(userRef);
            const tempUsers = [...users];
            if(docSnap.exists()) {
                tempUsers.push({
                    id: docSnap.id,
                    ...docSnap.data()
                });
                setUsers(tempUsers);
            }else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.error('Error getting user', error.message);
        }
    }

  return (
    <Card>
        <ListGroup>
        {users.map((user, i) => (
            <ListGroup.Item key={i}>{user.name}</ListGroup.Item>
        ))}
        </ListGroup>
    </Card>
  )
}
