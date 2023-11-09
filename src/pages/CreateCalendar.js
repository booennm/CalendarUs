import React from 'react'
import { CALENDARS_REF, db } from '../firebase';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateCalendar() {
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const createCalendar = () => {
        if (name) {
            const newCalendar = {
                name: name,
            }

            addCalendarToDb(newCalendar);
            navigate("/");
        }
    }

    const addCalendarToDb = async (calendar) => {
        try {
            await addDoc(collection(db, CALENDARS_REF), calendar);
        } catch (error) {
            console.log('Error creating calendar: ', error);
        }
    }

  return (
    <div className='App-header'>
        <h1>Create New Calendar</h1>
        <label>
            Calendar name:
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </label>
        add users
        <button onClick={createCalendar}>Create Calendar</button>
    </div>
  )
}

export default CreateCalendar