import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const About = () => {
  return (
    <div className="App-content">
      <Container>
        <Row>
          <Col>
            <h1>About</h1>
            <p>CalendarUs is a collaborative calendar for planning events that fit into everyones schedule</p>
            <h1>How to use CalendarUs</h1>
            <p>
              The home page showcases all of your calendars, including the ones shared to you by other users.
              This is also where you can create new calendars. Add users to created calendars by their account email.
              The calendar shows unavailability from all added users as red backgrounds. Set your unavailability in
              your profile to let others know when you're busy.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About