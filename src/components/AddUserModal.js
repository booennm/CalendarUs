import { Modal, Button, Form } from "react-bootstrap"
import { useRef, useState } from "react";
import { USERS_REF, db, CALENDARS_REF } from "../firebase";
import { doc, where, getDocs, updateDoc, arrayUnion, query, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function AddUserModal(props) {
    const { id } = useParams();
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        addUser();
    }

    const addUser = async () => {
        const q = query(collection(db, USERS_REF), where('email', "==", emailRef.current.value));
        const calendarRef = doc(db, CALENDARS_REF, id);

        try {
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty) {
                const userId = querySnapshot.docs[0].id;
                console.log(userId)
                try {
                    await updateDoc(calendarRef, {
                        users: arrayUnion(userId)
                    })
                } catch (error) {
                    console.error('Error adding user to array', error.message);
                }
            }else {
                console.log('Cannot add user, user document does not exist');
            }
        } catch (error) {
            console.error('Error getting user', error.message);
        }

        setLoading(false);
        props.onHide()
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
          Add User to CalendarName
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>User Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>Add User</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
