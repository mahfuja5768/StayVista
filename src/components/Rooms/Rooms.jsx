import { useEffect, useState } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";
import Loader from "../Shared/Loader";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const roomCategory = params.get("category");
  console.log(roomCategory);

  useEffect(() => {
    setLoading(true);
    fetch("../../../public/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        if (roomCategory) {
          const selectedCategory = data.filter(
            (room) => room.category === roomCategory
          );
          setRooms(selectedCategory);
          setLoading(false);
        } else {
          setRooms(data);
          setLoading(false);
        }
      });
  }, [roomCategory]);

  if(loading){
    return <Loader></Loader>
  }

  return (
    <Container>
      {!rooms.length ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            center={true}
            title="No Rooms Available in this category!"
            subtitle="Please Select Other Category!"
          ></Heading>
        </div>
      ) : (
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {rooms?.map((room) => (
            <Card key={room._id} room={room}></Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Rooms;
