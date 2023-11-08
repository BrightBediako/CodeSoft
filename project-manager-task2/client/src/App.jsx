import './App.css';
import Header from './components/header/Header';
import Signin from './components/registration/Signin';
import Signup from './components/registration/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/main.scss';
import Homepage from './pages/home/Homepage';
import ProjectManager from './pages/projectmanagement/ProjectManager';
import TaskManager from './pages/taskmanagement/TaskManager';
import Dashboard from './pages/dashboard/Dashboard';
import RequireAuth from './utils/RequireAuth';
import { useSelector } from 'react-redux';

function App() {
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route
            path='/signin'
            element={!auth.currentUser ? <Signin /> : <Dashboard />}
          />
          <Route
            path='/signup'
            element={!auth.currentUser ? <Signup /> : <Dashboard />}
          />
          <Route
            path='/dashboard'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path='/projectmanager'
            element={
              <RequireAuth>
                <ProjectManager />
              </RequireAuth>
            }
          />
          <Route
            path='/taskmanager'
            element={
              <RequireAuth>
                <TaskManager />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
