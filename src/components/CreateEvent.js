import React from 'react'
import '../Modal.css';
import { useState } from 'react';
import { db, CALENDARS_REF } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import DatePicker from 'react-datepicker';

function CreateEvent ({openState, info, calendarId}) {

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(info.start);
    const [endDate, setEndDate] = useState(info.end);

    const onDatePickerChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const createEvent = () => {
        if (name) {
            const newEvent = {
                start: startDate,
                end: endDate,
                title: name,
            }

            addEventToDb(newEvent);

            openState(false);
        }
    }

    const addEventToDb = async (event) => {
        try {
            const eventsRef = collection(db, CALENDARS_REF + calendarId + "/events");
            await addDoc(eventsRef, event);
        } catch (error) {
            console.log('Error adding document: ', error);
        }
    }

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='modalCloseBtn'>
                <button onClick={() => openState(false)}> x </button>
            </div>
            <div className='modalTitle'>
                <h1>Title</h1>
            </div>
            <div className='modalBody'>
                <label>
                    Event name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Duration:
                    <DatePicker
                        selected={startDate}
                        onChange={onDatePickerChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                    />
                </label>
            </div>
            <div className='modalFooter'>
                <button onClick={createEvent}>button</button>
            </div>
        </div>
    </div>
  )
}

export default CreateEvent