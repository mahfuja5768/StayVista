import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { useEffect, useState } from "react";
import Loader from "../../components/Shared/Loader";
import { Helmet } from "react-helmet-async";
import Header from "../../components/RoomDetails/Header";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import RoomReservation from "../../components/RoomDetails/RoomReservation";

const RoomDetails = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("../../../public/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        const filterRoom = data.find((item) => item._id === id);
        setRoom(filterRoom);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <Container>
      <Helmet>
        <title>{room?.title}</title>
      </Helmet>
      {room && (
        <div className=" max-w-screen-lg mx-auto">
          <div>
            <Header room={room}></Header>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <RoomInfo room={room} />
            <div className="md:col-span-3 order-first md:order-last mb-6">
              {/* Calender */}
              <RoomReservation room={room}></RoomReservation>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RoomDetails;
