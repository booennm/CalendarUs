import '../App.css';
import { useEffect, useState } from 'react';
import { db, CALENDARS_REF } from '../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import { useParams } from 'react-router-dom';

function Calendar() {
    const {id} = useParams();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState();
    const [events, setEvents] = useState([]);

  
    useEffect(() => {
        getEvents();
    }, [])
  
    const getEvents = () => {
      const q = query(collection(db, CALENDARS_REF + id + "/events"));
  
      onSnapshot(q, (querySnapshot) => {
        setEvents(querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate()
        })));
      });
    }
  
    const handleSelect = (info) => {
      setSelectedInfo(info);
      setOpenCreateModal(true);
    };
  
    const handleEdit = (info) => {
      setSelectedInfo(info);
      setOpenEditModal(true);
    };
  
    const EventItem = ({ info }) => {
      const { event } = info;
      return (
        <div>
          <p>{event.title}</p>
        </div>
      );
    };
    
    //use bootstrap modals instead, make event stuff like to-do etc
    return (
      <>
        <FullCalendar
            editable
            selectable
            select={handleSelect}
            eventClick={handleEdit}
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            events={events}
            eventContent={(info) => <EventItem info={info} />}
            //dateClick={this.handleDateClick}
        />
        <CreateEvent
            show={openCreateModal}
            info={selectedInfo}
            onHide={() => setOpenCreateModal(false)}
        />
        <EditEvent
            show={openEditModal}
            info={selectedInfo}
            onHide={() => setOpenEditModal(false)}
        />
      </>
    );
}

export default Calendar