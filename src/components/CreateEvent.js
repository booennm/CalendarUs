import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { db, CALENDARS_REF } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Modal, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

function CreateEvent (props) {

    const { id } = useParams();
    const nameRef = useRef();
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate , setEndDate] = useState();
    
    useEffect(() => {
        if(props.show) {
            if(props.info) {
                setStartDate(props.info.start);
                setEndDate(props.info.end);
            }
        }
    }, [props.show])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createEvent();
    }

    const onDatePickerChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const createEvent = () => {
        if(!nameRef.current.value) {
            nameRef.current.value = "New Event"
        }

        const newEvent = {
            start: startDate,
            end: endDate,
            title: nameRef.current.value,
        }

        addEventToDb(newEvent);

        setLoading(false);
        props.onHide();
    }

    const addEventToDb = async (event) => {
        try {
            const eventsRef = collection(db, CALENDARS_REF + id + "/events");
            await addDoc(eventsRef, event);
        } catch (error) {
            console.log('Error adding document: ', error);
        }
    }

  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Event
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" ref={nameRef} placeholder="New Event" />
            </Form.Group>
            <Form.Group id="duration">
                <Form.Label>Event Duration</Form.Label>
                <DatePicker
                    selected={startDate}
                    onChange={onDatePickerChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>Add Event</Button>
        </Form>
        </Modal.Body>
    </Modal>
  )
}

export default CreateEvent