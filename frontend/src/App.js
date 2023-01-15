import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import Preloader from './components/common/Preoader';
import Customer from './components/Customer/Customer';
import CustomerList from './components/CustomerList/CustomerList';
import Log from './components/Log/Log';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar'
import NewMember from './components/NewMember/NewMember';
import Profile from './components/Profile/Profile';
import { initializeApp } from './redux/app-reducer';

const App = props => {
  useEffect(() => {
    props.initializeApp()
  }, [])

  if (!props.initialized)
    return <Preloader />

  if(!props.isAuth)
    return <Login />
    
  return (
    <div className="container">
      <Navbar />
      <div className='pageContent'>
        <Routes>
          <Route path='/dashboard' element={<CustomerList />} />
          <Route path='/customer/:customerId' element={<Customer />} />
          <Route path='/log' element={<Log />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/newMember' element={<NewMember />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Navigate to={'/dashboard'} /> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized, isAuth: state.auth.isAuth })

export default connect(mapStateToProps, { initializeApp })(App)
