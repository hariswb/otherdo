import "./App.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen";
import CreateTaskScreen from "./screens/CreateTaskScreen";
import TaskScreen from "./screens/TaskScreen";
import { useEffect } from "react";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch()

  useEffect(()=>{
    if(userInfo){
    }
  },[userInfo])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <Link to="/">otherdo</Link>
          </div>
          <div className="header-links">
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Route path="/tasks/:id" exact={true} component={TaskScreen} />
            <Route path="/create" exact={true} component={CreateTaskScreen} />
            <Route path="/profile" exact={true} component={ProfileScreen} />
            <Route path="/register" exact={true} component={RegisterScreen} />
            <Route path="/signin" exact={true} component={SigninScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
