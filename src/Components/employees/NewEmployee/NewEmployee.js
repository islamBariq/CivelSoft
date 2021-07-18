import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './newEmployee.css';

export class NewEmployee extends Component {
  state = {
    employee: {
      name: '',
      reqNumber: '',
      code: '',
      image: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',
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
      replacement: [],
      address: '',
      contactNumber: '',
      email: '',
      remarks: '',
      condition: 'pending',

      file: 'https://image.flaticon.com/icons/png/512/1077/1077063.png',

      location: {
        hotel: '',
        department: '',
        specialist: '',
      },
    },
    applications: null,
  };
  componentDidMount() {
    this.setState({ applications: this.props.applications }, () => {});
  }
  onCancelForm = (event) => {
    document.getElementById('myForm').reset();
    event.preventDefault();
  };
  onSubmitHandler = (event) => {
    const reqNumber = parseInt(Math.random() * 1000);
    const employee = { ...this.state.employee };
    employee.reqNumber = reqNumber;
    this.setState(
      {
        employee: employee,
        applications: this.state.applications + 1,
      },
      () => {
        this.props.addNewEmployee(this.state.employee, this.state.applications);
        this.props.history.push({ pathname: '/employees' });
      }
    );
    event.preventDefault();
  };
  onChangeHandler = (event) => {
    const editEmployee = {...this.state.employee};
    if (
      event.target.name === 'leaveDate' ||
      event.target.name === 'rejoinDate' ||
      event.target.name === 'joiningDate'
    ) {
      editEmployee[event.target.name] = event.target.value;
      this.setState({ employee: editEmployee }, () => {
        return;
      });
    }
    if (
      event.target.name === 'hotel' ||
      event.target.name === 'department' ||
      event.target.name === 'specialist'
    ) {
      editEmployee.location[event.target.name] = event.target.value;
      this.setState({ employee: editEmployee }, () => {
        return;
      });
    }
    if (
      event.target.name === 'guarantor' ||
      event.target.name === 'replacement'
    ) {
      editEmployee[event.target.name][0] = event.target.value;
      this.setState({ employee: editEmployee }, () => {});
      return;
    }
    if (event.target.name === 'code') {
      editEmployee[event.target.value] = Number(event.target.value);
      this.setState({ employee: editEmployee });
    }
    editEmployee[event.target.name] = event.target.value;
    this.setState({ employee: editEmployee }, () => {});
  };
  render() {
    return (
      <>
        <div className='formContainer__new'>
          <div className='new__personal__info'>
            <form onSubmit={(event) => this.onSubmitHandler(event)} id='myForm' className="form__new">
              <fieldset className='fieldset__personal__info'>
                <legend>Personal Info</legend>
                <label htmlFor='name'>
                  Full Name
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='Enter Your Full Name'
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
                <label htmlFor='jobTitle'>
                  Job Title
                  <input
                    type='text'
                    name='jobTitle'
                    required
                    placeholder='Enter Your Job Title'
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
                <label htmlFor='salaryProfile'>
                  Salary Profile
                  <input
                    type='text'
                    required
                    name='salaryProfile'
                    placeholder='Enter Your Salary Profile'
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
                <label htmlFor='code'>
                  Code Number
                  <input
                    type='number'
                    name='code'
                    placeholder='Your Code Must Be Unique'
                    required
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
                <label htmlFor='joiningDate'>
                  Joining Date{' '}
                  <input
                    type='date'
                    name='joiningDate'
                    required
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
                <label htmlFor='hotel'>
                  Location{' '}
                  <input
                    type='text'
                    name='hotel'
                    placeholder='Your Location'
                    required
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
                <label htmlFor='department'>
                  Department
                  <input
                    type='text'
                    name='department'
                    placeholder='Your Department'
                    required
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>

                <label htmlFor='specialist'>
                  Specialist
                  <input
                    type='text'
                    placeholder='Your Specialist'
                    required
                    name='specialist'
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </label>
              </fieldset>
              <div className='new__leave__details'>
                <fieldset className='leave__details__fieldset'>
                  <legend>Leave Details</legend>
                  <div className='new__leave__details__radio'>
                    <div className='new__leave__details__radio__left'>
                      <span>Leave To Avail </span>
                      <label htmlFor='abroad'>Abroad</label>
                      <input
                        type='radio'
                        id='abroad'
                        value='abroad'
                        name='leaveToAvail'
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                      <label htmlFor='local'>Local</label>
                      <input
                        type='radio'
                        id='abroad'
                        value='local'
                        name='leaveToAvail'
                        defaultChecked
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                    <div className='new__leave__details__radio__right'>
                      <span> Require leave Salary Advance </span>
                      <label htmlFor='yes'>Yes</label>
                      <input
                        type='radio'
                        id='yes'
                        value='yes'
                        name='requireSalary'
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                      <label htmlFor='local'>No</label>
                      <input
                        type='radio'
                        id='No'
                        value='no'
                        name='requireSalary'
                        defaultChecked
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                  </div>
                  <div className='new__leave__details__date'>
                    <div className='new__leave__details__date__left'>
                      <label htmlFor='leaveDate'> Expected Leave Date</label>
                      <input
                        type='date'
                        name='leaveDate'
                        id='leaveDate'
                        required
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                    <div className='new__leave__details__date__Right'>
                      <label htmlFor='rejoinDate'>
                        {' '}
                        Expected Rejoining Date
                      </label>
                      <input
                        type='date'
                        name='rejoinDate'
                        id='rejoinDate'
                        required
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                  </div>
                  <div className='new__leave__details__type'>
                    <div className='new__leave__details__date__left'>
                      <label htmlFor='leaveType'>1st Leave Type</label>
                      <select
                        name='leaveType'
                        id='leaveType'
                        required
                        onChange={(event) => this.onChangeHandler(event)}
                      >
                        <option value=''>Please Select Leave Type</option>
                        <option value='sick leave'>Sick LEace </option>
                        <option value='annual leave with payroll'>
                          Annual Leave With Payroll
                        </option>
                      </select>
                    </div>
                    <div className='new__leave__details__date__left'>
                      <label htmlFor='leaveDate'> No Of Days</label>
                      <input
                        type='number'
                        name='daysNumber'
                        id='daysNumber'
                        required
                        placeholder='Enter Numb'
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                  </div>
                  <div className='new__leave__details__guarantor__replacement'>
                    <div className='new__leave__details__guarantor'>
                      <label htmlFor='guarantor'>Your Guarantor</label>
                      <input
                        type='text'
                        name='guarantor'
                        id='guarantor'
                        placeholder='Enter Your guarantor'
                        required
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                    <div className='new__leave__details__replacement'>
                      <label htmlFor='guarantor'>Your Replacement</label>
                      <input
                        type='text'
                        name='replacement'
                        id='replacement'
                        placeholder='Enter Your replacement'
                        required
                        onChange={(event) => this.onChangeHandler(event)}
                      />
                    </div>
                  </div>
                  <div className='new__leave__details__contact'>
                    <div className='new__leave__details__contact__top'>
                      <div className='new__leave__details__contact__email'>
                        <label htmlFor='address'>Address</label>
                        <input
                          type='text'
                          id='address'
                          name='address'
                          placeholder='Your Address'
                          required
                          onChange={(event) => this.onChangeHandler(event)}
                        />
                      </div>
                      <div className='new__leave__details__contact__email'>
                        <label htmlFor='address'>Contact no</label>
                        <input
                          type='number'
                          id='number'
                          name='contactNumber'
                          placeholder='Your Address'
                          required
                          onChange={(event) => this.onChangeHandler(event)}
                        />
                      </div>
                    </div>
                    <div className='new__leave__details__contact__bottom'>
                      {' '}
                      <div className='new__leave__details__contact__email'>
                        <label htmlFor='address'>Email</label>
                        <input
                          type='Email'
                          id='Email'
                          name='Email'
                          placeholder='Your contact Email'
                          required
                          onChange={(event) => this.onChangeHandler(event)}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className='buttons'>
                <button
                  className='cancel'
                  onClick={(event) => {
                    this.onCancelForm(event);
                  }}
                >
                  Cancel
                </button>
                <button className='submit' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(NewEmployee);
