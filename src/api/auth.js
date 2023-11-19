import axiosSecure from "./index.js";

export const saveUser = async (user) => {
  // console.log(user)
  // console.log(user.email)
  const currentUser = {
    email: user.email,
    role: "guest",
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  //   console.log(data)
  return data;
};

//get token from server
export const getToken = async (email) => {
  // console.log(user)
  const { data } = await axiosSecure.post("/jwt", email);
  console.log("token received from server---------->", data);
  return data;
};

//clear token from client side
export const clearCookie = async () => {
  // console.log(user)
  const { data } = await axiosSecure.get("/logout");
  console.log("token removed from client side---------->", data);
  return data;
};
