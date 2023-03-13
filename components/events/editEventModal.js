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
import { updateEvent } from '../../lib/events';

const EditEventModal = (props) => {
  // Event form
  const [title, setTitle] = useState(props.eventToUpdate.title);
  const [capacity, setCapacity] = useState(props.eventToUpdate.capacity);
  const [isPrivate, setIsPrivate] = useState(props.eventToUpdate.isPrivate);
  const [password, setPassword] = useState(props.eventToUpdate.password);
  const [startDate, setStartDate] = useState(props.eventToUpdate.startDate);
  const [endDate, setEndDate] = useState(props.eventToUpdate.endDate);

  const [isUpdating, setIsUpdating] = useState(false);

  const resetForm = () => {
    setIsUpdating(false);
    setTitle(props.eventToUpdate.title);
    setCapacity(props.eventToUpdate.capacity);
    setIsPrivate(props.eventToUpdate.isPrivate);
    setPassword(props.eventToUpdate.password);
    setStartDate(props.eventToUpdate.startDate);
    setEndDate(props.eventToUpdate.endDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      await updateEvent({
        eventId: props.eventToUpdate.eventId,
        title: title,
        capacity: capacity,
        isPrivate: isPrivate,
        password: password,
        startDate: startDate,
        endDate: endDate,
      });
      resetForm();
      props.setEditEventModal(false);
      props.refresh(props.eventToUpdate.eventId);
    } catch (error) {
      props.setError({
        title: 'Error Updating Event',
        message: error.message,
      });
      resetForm();
      props.setEditEventModal(false);
      props.setErrorModal(true);
    }
  };

  return (
    <Modal isOpen={props.editEventModal}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader>Update Event</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isUpdating}
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
              disabled={isUpdating}
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
              disabled={!isPrivate || isUpdating}
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
              disabled={isUpdating}
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
              disabled={isUpdating}
            />
          </FormGroup>
        </ModalBody>
        {isUpdating ? (
          <ModalFooter>
            <Button outline disabled>
              Cancel
            </Button>
            <Button disabled>
              <Spinner type="border" size="sm" />
              Editing...
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button outline onClick={() => props.setEditEventModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Edit</Button>
          </ModalFooter>
        )}
      </Form>
    </Modal>
  );
};

export default EditEventModal;
