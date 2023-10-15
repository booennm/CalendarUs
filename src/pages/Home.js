import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../App.css'
import Modal from '../components/Modal'

function Home() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState();
  const [events, setEvents] = useState([{ title: 'event 1', date: '2023-10-22' },
  { title: 'event 2', date: '2023-10-28' }])

  const handleSelect = (info) => {
    setOpenModal(true);
    setSelectedInfo(info);
    /* const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          //id: id,
        },
      ]);
    } */
  };

  const handleEdit = (info) => {
    setSelectedInfo(info);
    setOpenModal(true);
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          //id: id,
        },
      ]);
    }
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
    <>
    {openModal &&
    <Modal openState={setOpenModal} setCalendarEvents={setEvents} calendarEvents={events} info={selectedInfo}/>
    }
    <div className="App-header">
      <FullCalendar
        editable
        selectable
        select={handleSelect}
        //eventClick={handleEdit}
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(info) => <EventItem info={info} />}
        //dateClick={this.handleDateClick}
      />
    </div>
    </>
  );
}

export default Home;