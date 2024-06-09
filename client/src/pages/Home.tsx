import Column from "../Components/Column";
import Login from "../Components/Login";
import "../Styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../redux/loginModal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const showModal = useSelector(
    (state: RootState) => state.loginModal.showModal
  );

  const currentUser = localStorage.getItem("user");
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleToggleModal = () => {
    dispatch(setShowModal());
  };

  return (
    <div className="Home">
      <div className="btns-container">
        <Stack spacing={2} direction="row">
          {!isLoggedIn && (
            <Button variant="contained" onClick={handleToggleModal}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <Button variant="contained" color="error" onClick={handleLogOut}>
              Log out
            </Button>
          )}
        </Stack>
      </div>

      {isLoggedIn ? (
        <Column />
      ) : (
        <h1 id="see-data">Login to see the tasks board</h1>
      )}
      {showModal && <Login />}
    </div>
  );
};

export default Home;
