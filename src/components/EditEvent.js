import React from 'react'
import '../Modal.css';
import { useState } from 'react';
import { db, CALENDARS_REF } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';

function EditEvent ({openState, info, calendarId}) {

    const [name, setName] = useState(info.event.title);
    const [startDate, setStartDate] = useState(info.event.start);
    const [endDate, setEndDate] = useState(info.event.end);

    const onDatePickerChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(JSON.stringify(info))
    };

    const editEvent = async () => {
        if (name) {
            const updatedEvent = {
                start: startDate,
                end: endDate,
                title: name,
            }
            console.log(updatedEvent);
            setEventToDb(updatedEvent);

            openState(false);
        }
    }

    const setEventToDb = async (event) => {
        try {
            const oldEventRef = doc(db, CALENDARS_REF + calendarId + "/events", info.event.id)
            await setDoc(oldEventRef, event);
        } catch (error) {
            console.log('Error setting document: ', error);
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
                    event name:
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
                <button onClick={editEvent}>button</button>
            </div>
        </div>
    </div>
  )
}

export default EditEvent