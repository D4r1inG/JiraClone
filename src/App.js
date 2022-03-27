import React, { Component, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { BrowserRouter, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Header from './components/Home/Header/Header';
import Notification from './components/Notification/Notification';
import ModalJira from './HOC/JiraAppHOC/ModalJira';
import Modal from './HOC/Modal/Modal';
import About from './pages/About/About';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import Contact from './pages/Contact/Contact';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Detail from './pages/Detail/Detail';
import DrapAndDropDnD from './pages/DragAndDropDnd/DrapAndDropDnD';
import Home from './pages/Home/Home';
import CreateProject from './pages/JiraApp/CreateProject/CreateProject';
import LoginJira from './pages/JiraApp/Login/LoginJira';
import ProjectManagement from './pages/JiraApp/ProjectManagement/ProjectManagement';
import SignUpJira from './pages/JiraApp/SignUp/SignUpJira';
import UserManagement from './pages/JiraApp/UserManagement/UserManagement';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PagesNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList';
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import IndexJira from './redux/sagas/JiraApp/IndexJira';
import indexJira from './redux/sagas/JiraApp/IndexJira';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import { JiraTemplate } from './templates/JiraTemplate/JiraTemplate';

function App() {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({
      type: 'ADD_HISTORY',
      history
    })

  },[])


  return (
    <>
    <LoadingComponent />
    {/* <Notification /> */}
    {/* <Modal /> */}
    <ModalJira />
      <Switch>
        <JiraTemplate exact path='/home' Component={IndexJira} /> 
        <UserLoginTemplate exact path='/login' Component={LoginJira} />
        <UserLoginTemplate exact path='/signup' Component={SignUpJira} />
        <JiraTemplate exact path='/jiraApp' Component={IndexJira} />
        <JiraTemplate exact path='/createProject' Component={CreateProject} />
        <JiraTemplate exact path='/projectManagement' Component={ProjectManagement} />
        <JiraTemplate exact path='/userManagement' Component={UserManagement} />
        <JiraTemplate exact path='/projectDetail/:projectId' Component={IndexJira} />
        <UserLoginTemplate exact path='/' Component={LoginJira} />
        <HomeTemplate path='*' Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
