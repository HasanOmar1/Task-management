import Column from "../Components/Column";
import "../Styles/Home.css";
// import { useGetUsersQuery } from "../api/usersApi";

const Home = () => {
  // const { data: users } = useGetUsersQuery();
  // console.log(users);

  return (
    <div className="Home">
      <Column />
    </div>
  );
};

export default Home;
