import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { db, CALENDARS_REF } from '../firebase';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import { Modal, Form, Button } from 'react-bootstrap';

function EditEvent (props) {

    const { id } = useParams();
    const nameRef = useRef();
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        if(props.show) {
            setStartDate(props.info.event.start);
            setEndDate(props.info.event.end);
            nameRef.current.value = props.info.event.title;
        }
    }, [props.show])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        editEvent();
    }

    const handleDelete = () => {
        setLoading(true);
        removeEventFromDb();
    }

    const onDatePickerChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const editEvent = async () => {
        const updatedEvent = {
            start: startDate,
            end: endDate,
            title: nameRef.current.value,
        }

        setEventToDb(updatedEvent);

        setLoading(false);
        props.onHide();
    }

    const setEventToDb = async (event) => {
        try {
            const oldEventRef = doc(db, CALENDARS_REF + id + "/events", props.info.event.id)
            await setDoc(oldEventRef, event);
        } catch (error) {
            console.log('Error setting document: ', error);
        }
    }

    const removeEventFromDb = async () => {
        try {
            const eventRef = doc(db, CALENDARS_REF + id + "/events", props.info.event.id)
            await deleteDoc(eventRef);
        } catch (error) {
            console.log('Error removing document: ', error);
        }
        setLoading(false);
        props.onHide();
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
            Edit Event
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
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
            <Button className="w-100" type="submit" disabled={loading}>Edit Event</Button>
        </Form>
            <Button onClick={handleDelete} className="w-100" type="submit" disabled={loading}>Delete Event</Button>
        </Modal.Body>
    </Modal>
  )
}

export default EditEvent