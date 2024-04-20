import React from "react";
import "./Task.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Tasklogin from "./Tasklogin";
import Taskpower from "./Taskpower";
import Tasksuper from "./Tasksuper";
import Taskuser from "./Taskuser";
import Taskpowerget from "./Taskpowerget";
import TaskuserRegister from "./Taskpoweradduser";
import Tasksuperadduser from "./Tasksuperadduser";
import Poweraddsuper from "./Taskpoweraddsuper";
import Tasksupergetuser from "./Tasksupergetuser";
import Tasksuperaddbook from "./Tasksuperaddbook";
function Taskroute() {
  return (
    <>
      <BrowserRouter>
        <Slide></Slide>
        <Routes>
          <Route exact path="/" element={<Tasklogin></Tasklogin>} />
          <Route exact path="/taskpower" element={<Taskpower></Taskpower>} />
          <Route exact path="/tasksuper" element={<Tasksuper></Tasksuper>} />
          <Route exact path="/taskuser" element={<Taskuser></Taskuser>} />
          <Route
            exact
            path="/taskpoweradduser"
            element={<TaskuserRegister></TaskuserRegister>}
          />
          <Route
            exact
            path="/tasksuperadduser"
            element={<Tasksuperadduser></Tasksuperadduser>}
          />
          <Route
            exact
            path="/taskpowerget"
            element={<Taskpowerget></Taskpowerget>}
          />
          <Route
            exact
            path="/taskpoweraddsuper"
            element={<Poweraddsuper></Poweraddsuper>}
          />
          <Route
            exact
            path="/tasksupergetuser/:superid"
            element={<Tasksupergetuser></Tasksupergetuser>}
          />
          <Route
            exact
            path="/tasksuperaddbook"
            element={<Tasksuperaddbook />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
function Slide() {
  return (
    <>
      <Link to="/"></Link>
    </>
  );
}
export default Taskroute;
