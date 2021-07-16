import React from 'react';
import Header from './Components/Header/Header';
import './App.css';
import PostLeave from './Components/PostLeaveForm/PostLeave';
import { Route } from 'react-router-dom';
import Employees from './Components/employees/Employees';
class App extends React.Component {
  state = {
    employees: [
      {
        name: 'laura Anne Eggletion',
        reqNumber: 700,
        code: 115,
        image: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',
        jobTitle: 'front end developer',
        salaryProfile: 'senior',
        leaveDate: new Date(2021, 11, 9).toLocaleDateString(),
        actualLeaving: '',
        rejoinDate: new Date(2021, 11, 17).toLocaleDateString(),
        leaveType: 'Annual Leave With Payroll',
        joiningDate: new Date(2010, 11, 9).toLocaleDateString(),
        leaveToAvail: 'locale',
        requireSalary: 'no',
        guarantor: ['ahmed mohammed', 'ismail abo zaid'],
        guarantorValue: '',
        replacement: '',
        address: '',
        contactNumber: '',
        email: '',
        remarks: '',
        condition: 'success',
        file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

        daysNumber: '',
        location: {
          hotel: 'Hotel indigo',
          department: 'Admin & General',
          specialist: 'Human Resources',
        },
      },
      {
        name: 'Nedal Ahmed Mohammed',
        reqNumber: 707,
        code: 220,
        image: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',
        jobTitle: 'back end developer',
        salaryProfile: 'Leader',
        leaveDate: new Date(2021, 10, 8).toLocaleDateString(),
        actualLeaving: '',
        rejoinDate: new Date(2021, 11, 9).toLocaleDateString(),
        leaveType: 'Sick Leave',
        joiningDate: new Date(2020, 11, 9).toLocaleDateString(),
        leaveToAvail: 'locale',
        requireSalary: 'no',
        daysNumber: '',
        guarantor: [],
        guarantorValue: '',
        replacement: '',
        address: '',
        contactNumber: '',
        email: '',
        remarks: '',
        condition: 'pending',

        file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

        location: {
          hotel: 'Hotel indigo',
          department: 'Web Development',
          specialist: 'back End  Development',
        },
      },
      {
        name: 'amila john',
        reqNumber: 800,
        code: 303,
        image: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',
        jobTitle: 'front end developer',
        salaryProfile: 'senior',
        leaveDate: new Date(2021, 12, 5).toLocaleDateString(),
        actualLeaving: '',
        rejoinDate: new Date(2021, 12, 20).toLocaleDateString(),
        leaveType: 'Annual Leave With Payroll',
        joiningDate: new Date(2017, 11, 9).toLocaleDateString(),
        leaveToAvail: 'locale',
        requireSalary: 'no',
        daysNumber: '',
        guarantor: ['heba mahmoud', 'samia ahmed'],
        guarantorValue: '',
        replacement: '',
        address: '',
        contactNumber: '',
        email: '',
        remarks: '',
        condition: 'pending',

        file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

        location: {
          hotel: 'Hotel indigo',
          department: 'Admin & General',
          specialist: 'Human Resources',
        },
      },
      {
        name: 'laura Anne Eggletion',
        reqNumber: 309,
        code: 156,
        image: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',
        jobTitle: 'front end developer',
        salaryProfile: 'senior',
        leaveDate: new Date(2021, 10, 7).toLocaleDateString(),
        actualLeaving: '',
        rejoinDate: new Date(2021, 11, 7).toLocaleDateString(),
        leaveType: 'Annual Leave With Payroll',
        joiningDate: new Date(2020, 11, 9).toLocaleDateString(),
        leaveToAvail: 'locale',
        requireSalary: 'no',
        daysNumber: '',
        guarantor: ['john ishaq', 'amr mansour'],
        guarantorValue: '',
        replacement: '',
        address: '',
        contactNumber: '',
        email: '',
        remarks: '',
        condition: 'refused',

        file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

        location: {
          hotel: 'Hotel indigo',
          department: 'Admin & General',
          specialist: 'Human Resources',
        },
      },
      {
        name: 'mohammed adel Mansour',
        reqNumber: 900,
        code: 809,
        image: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',
        jobTitle: 'front end developer',
        salaryProfile: 'senior',
        leaveDate: new Date(2021, 11, 9).toLocaleDateString(),
        actualLeaving: '',
        rejoinDate: new Date(2021, 12, 7).toLocaleDateString(),
        leaveType: 'Annual Leave With Payroll',
        joiningDate: new Date(2015, 11, 9).toLocaleDateString(),
        leaveToAvail: 'locale',
        requireSalary: 'no',
        daysNumber: '',
        guarantor: ['ahmed abdo mansour', 'turki al elshikh'],
        guarantorValue: '',
        replacement: '',
        address: '',
        contactNumber: '',
        email: '',
        remarks: '',
        condition: 'pending',

        file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

        location: {
          hotel: 'Hotel indigo',
          department: 'Admin & General',
          specialist: 'Human Resources',
        },
      },
    ],
    selectedEmployee: {
      name: '',
      reqNumber: '',
      code: '',
      image: './assets/man.png',
      jobTitle: '',
      salaryProfile: '',
      leaveDate: '',
      actualLeaving: '',
      rejoinDate: '',
      leaveType: '',
      joiningDate: '',
      leaveToAvail: 'locale',
      requireSalary: 'no',
      daysNumber: '',
      guarantor: [],
      guarantorValue: '',
      replacement: '',
      address: '',
      contactNumber: '',
      email: '',
      remarks: '',
      condition: '',

      file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

      location: {
        hotel: '',
        department: '',
        specialist: '',
      },
    },
    applications: 5,
  };
  updateState = (newEmployees) => {
    this.setState({ employees: newEmployees });
  };
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <Route path='/' exact>
          <PostLeave
            className='test'
            {...this.props}
            employees={this.state}
            updateState={this.updateState}
          ></PostLeave>
        </Route>
        <Route path='/employees'>
          <Employees employeesState={this.state}></Employees>
        </Route>
        <Route path='/employees:id'>
          <PostLeave
            className='test'
            {...this.props}
            employees={this.state}
            updateState={this.updateState}
          ></PostLeave>{' '}
        </Route>
        <Route path='/new-employee'>
          <newEmployee></newEmployee>
        </Route>
      </React.Fragment>
    );
  }
}

export default App;
