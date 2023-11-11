import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const {booking, isLoading} = useBooking();
  const {checkout, isCheckingOut} = useCheckOut();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  // const booking = {};
  // const status = "checked-in";

  if(isLoading) return <Spinner/>
  console.log(booking)

  const {status, id: bookingId} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}

      {status === 'checked-in' && <Button icon={<HiArrowDownOnSquare/>} onClick={() => checkout(bookingId)} disabled={isCheckingOut}>Check out</Button>}

      <Modal>
        <Modal.Open opens='delete'>
          <Button variation='danger'>
            Delete booking
          </Button>
        </Modal.Open>
        <Modal.Window name='delete'>
              <ConfirmDelete resourceName='booking' onConfirm={() => deleteBooking(bookingId, {
                onSettled: navigate(-1), //one page back
              })} disabled={isDeleting}/>
          </Modal.Window>
      </Modal>


      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
