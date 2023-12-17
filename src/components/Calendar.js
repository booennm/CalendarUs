import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { db, CALENDARS_REF } from '../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import { useParams } from 'react-router-dom';

function Calendar({userData}) {
    const {id} = useParams();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState();
    const [events, setEvents] = useState([]);
    const [unavailability, setUnavailability] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
  
    useEffect(() => {
        getEvents();
    }, [])

    useEffect(() => {
      if(userData) {
        setUnavailability(userData.map((user) => (
          user.events.map((item) => ({
            id: item.id,
            start: item.start,
            end: item.end,
            type: 'unavailability'
          }))
        )))
      }
    }, [userData])
    

    useEffect(() => {
      const combinedData = [];
      combinedData.push(...events);
      combinedData.push(...unavailability);
      setCalendarData(combinedData);
    }, [events, unavailability]);

  
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

    return (
      <div className='main-calendar'>
        <FullCalendar
            selectable
            select={handleSelect}
            eventClick={handleEdit}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin ]}
            initialView="dayGridMonth"
            slotDuration= '01:00:00'
            scrollTime={false}
            height={'auto'}
            dayMaxEvents={1}
            themeSystem='bootstrap5'
            events={calendarData}
            eventContent={(info) => <EventItem info={info} className="basic-event"/>}
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
      </div>
    );
}

export default Calendar