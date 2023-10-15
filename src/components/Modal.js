import React from 'react'
import '../Modal.css';
import { useState } from 'react';

function Modal ({openState, setCalendarEvents, calendarEvents, info}) {

    const [name, setName] = useState('');

    const createEvent = () => {
        const { start, end } = info;
        if (name) {
            setCalendarEvents([
                ...calendarEvents,
                {
                start,
                end,
                title: name,
                //id: id,
                },
            ]);
            openState(false);
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
                <form onSubmit={createEvent}>
                    <label>
                        Event name:
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
            <div className='modalFooter'>
                <button>button</button>
            </div>
        </div>
    </div>
  )
}

export default Modal