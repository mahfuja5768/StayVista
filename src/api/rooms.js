import axiosSecure from "./index.js";

export const getAllRooms = async () => {
  const { data } = await axiosSecure("/rooms");
  return data;
};


export const getSingleRoom = async (id) => {
  const { data } = await axiosSecure(`/room/${id}`);
  return data;
};
