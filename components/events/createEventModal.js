import { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import { createEvent } from '../../lib/events';

const CreateEventModal = (props) => {
  // Event form
  const [title, setTitle] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isCreating, setCreating] = useState(false);

  const resetForm = () => {
    setCreating(false);
    setTitle('');
    setCapacity(1);
    setIsPrivate(false);
    setPassword('');
    setStartDate('');
    setEndDate('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreating(true);
    try {
      const { event } = await createEvent({
        title: title,
        capacity: capacity,
        isPrivate: isPrivate,
        password: password,
        startDate: startDate,
        endDate: endDate,
      });
      resetForm();
      props.refresh();
      props.setCreateModal(false);
    } catch (error) {
      props.setError({ title: 'Error Creating Event', message: error.message });
      resetForm();
      props.setCreateModal(false);
      props.setErrorModal(true);
    }
  };

  return (
    <Modal isOpen={props.createModal}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader>Create Event</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter name of the event"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isCreating}
            />
          </FormGroup>
          <FormGroup>
            <Label for="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              placeholder="Enter number of the participants"
              type="number"
              value={capacity}
              onChange={(event) => setCapacity(+event.target.value)}
              disabled={isCreating}
            />
          </FormGroup>
          <FormGroup check inline>
            <Input
              name="isPrivate"
              type="checkbox"
              checked={isPrivate}
              onChange={() => {
                setIsPrivate(!isPrivate);
                setPassword('');
              }}
            />
            <Label for="isPrivate">Private</Label>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Password for the event"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isPrivate || isCreating}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              disabled={isCreating}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              disabled={isCreating}
            />
          </FormGroup>
        </ModalBody>
        {isCreating ? (
          <ModalFooter>
            <Button outline disabled>
              Cancel
            </Button>
            <Button disabled>
              <Spinner type="border" size="sm" />
              Creating...
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button outline onClick={() => props.setCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary">
              Create
            </Button>
          </ModalFooter>
        )}
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
