import Calendar from '../components/Calendar'
import Users from '../components/Users'
import { Container, Row, Col } from 'react-bootstrap'

function CalendarPage() {
  return (
    <div className="App-header">
      <Container>
        <Row>
          <Col>
            <Calendar />
          </Col>
        </Row>
        <Row className='mx-auto, mt-5'>
          <Col>
            <Users />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CalendarPage