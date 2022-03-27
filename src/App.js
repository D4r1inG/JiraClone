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
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/about' Component={About} />
        <HomeTemplate exact path='/dragDrop' Component={DemoDragDrop} />
        <HomeTemplate exact path='/dragDropDnd' Component={DrapAndDropDnD} />
        <UserLoginTemplate exact path='/login' Component={LoginJira} />
        <UserLoginTemplate exact path='/signup' Component={SignUpJira} />
        <HomeTemplate exact path='/detail/:id' Component={Detail} />
        <HomeTemplate exact path='/profile' Component={Profile} />
        <HomeTemplate exact path='/toDoListRCC' Component={ToDoList} />
        <HomeTemplate exact path='/toDoListRFC' Component={ToDoListRFC} />
        <HomeTemplate exact path='/toDoListRedux' Component={ToDoListRedux} />
        <HomeTemplate exact path='/toDoListSaga' Component={BaiTapToDoListSaga} />
        <HomeTemplate exact path='/demoHOCModal' Component={DemoHOCModal} />
        <JiraTemplate exact path='/jiraApp' Component={IndexJira} />
        <JiraTemplate exact path='/createProject' Component={CreateProject} />
        <JiraTemplate exact path='/projectManagement' Component={ProjectManagement} />
        <JiraTemplate exact path='/userManagement' Component={UserManagement} />
        <JiraTemplate exact path='/projectDetail/:projectId' Component={IndexJira} />
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate path='*' Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
