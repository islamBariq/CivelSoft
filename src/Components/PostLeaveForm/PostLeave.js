import React from 'react';
import classes from './postLeave.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
class PostLeave extends React.Component {
  state = {
    employees: [],
    filteredEmployees: [],
    selectedEmployee: {},
    selectedJoinDate: '',
    selectedLocation: null,
    editEmployee: {},
    guarantor: [],
    selected: false,
  };

  componentDidMount() {
    let code = null;
    let newSelected = {};
    this.setState({
      employees: this.props.employees,
    });
    if (this.props.match.params.id) {
      code = this.props.match.params.id;

      /*
      newSelected = this.props.employees.employees.filter((em) => {
        return em.code == code;
      });
      this.setState({ selectedEmployee: newSelected }, () => {
        console.log(this.state.selectedEmployee)
      });*/
      this.selectEmployeeByUrl(code);
    }
  }
  selectEmployeeByUrl(code) {
    document.getElementById('myForm').reset();
    const selected = this.props.employees.employees.find((employee) => {
      return employee.code == code;
    });
    this.setState({
      selectedEmployee: selected,
      editEmployee: selected,
      selectedJoinDate: selected.joiningDate,
      selectedLocation: selected.location,
      guarantor: selected.guarantor,
      selected: true,
    });
    document.getElementById('resultBox').style.visibility = 'hidden';
    this.enableInput();
  }

  searchEmployees(event) {
    let searchValue = event.target.value;
    let resultBox = document.getElementById('resultBox');
    if (searchValue) {
      resultBox.style.visibility = 'visible';
    } else {
      resultBox.style.visibility = 'hidden';
    }
    const filteredEmployees = this.state.employees.employees.filter(
      (employee) => {
        return (
          employee.name.toLowerCase().includes(searchValue) ||
          employee.jobTitle.toLowerCase().includes(searchValue) ||
          employee.code.toString().includes(searchValue)
        );
      }
    );
    this.setState({ filteredEmployees: filteredEmployees });
  }

  selectEmployee(code) {
    document.getElementById('myForm').reset();
    const selected = this.state.filteredEmployees.find((employee) => {
      return employee.code == code;
    });
    this.setState({
      selectedEmployee: selected,
      editEmployee: selected,
      selectedJoinDate: selected.joiningDate,
      selectedLocation: selected.location,
      guarantor: selected.guarantor,
      selected: true,
    });
    document.getElementById('resultBox').style.visibility = 'hidden';
    this.enableInput();
  }
  enableInput() {
    const inputs = document.getElementsByTagName('input');
    [...inputs].forEach((input) => {
      input.disabled = false;
      input.required = true;
    });
  }
  uploadFile(event) {
    const inputFile = document.getElementById('file');
    const fileNameSpan = document.getElementById('fileName');
    inputFile.click();
    inputFile.addEventListener('change', () => {
      if (inputFile.value) {
        fileNameSpan.innerHTML = inputFile.files[0].name;
      }
    });
  }
  onChangeHandler(event) {
    const employee = { ...this.state.editEmployee };
    employee[event.target.name] = event.target.value;
    this.setState({ editEmployee: employee });
  }
  submitForm(event) {
    event.preventDefault();
    const oldEmployees = [...this.state.employees.employees];
    let index = oldEmployees.findIndex(
      (i) => i.code == this.state.selectedEmployee.code
    );
    oldEmployees[index] = this.state.editEmployee;
    this.props.updateState(oldEmployees);
    this.props.history.push({ pathname: '/employees' });
  }
  checkSearchInput(event) {
    if (!this.state.selected) {
      event.preventDefault();
      alert('please select employee');
      document.getElementById('search').focus();
    }
  }

  renderOption() {
    let options = (
      <select name='guarantorValue' id='guarantor' required>
        <option>Please Select Option</option>
      </select>
    );
    if (this.state.guarantor.length === 0 && this.state.selected) {
      options = (
        <div className={classes.no__guarantor}>
          {' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color='Red'
            size='lg'
          ></FontAwesomeIcon>
          <h4 style={{ color: 'red', marginLeft: '20px' }}>No Guarantor</h4>
        </div>
      );
    }
    if (this.state.guarantor.length > 0 && this.state.selected) {
      options = (
        <select
          required
          name='guarantorValue'
          id='guarantor'
          onChange={(event) => {
            this.onChangeHandler(event);
          }}
        >
          <option value=''>Please Select Option</option>
          {this.state.guarantor.map((option, i) => {
            return (
              <option value={option} key={i}>
                {' '}
                {option}
              </option>
            );
          })}
        </select>
      );
    }
    return options;
  }
  render() {
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.top}>
            <h3 className={classes.topHeader}>Post Leave Request</h3>
            <div className={classes.left}>
              <FontAwesomeIcon
                icon={faFlag}
                size='lg'
                color='rgb(160, 156, 156)'
              />
              <h4>Request No</h4>
            </div>
          </div>
          <div className={classes.info__container}>
            <div className={classes.info}>
              <div className={classes.info__top}>
                <FontAwesomeIcon
                  icon={faGlobeAmericas}
                  color='#24298f'
                  style={{ cursor: 'pointer' }}
                  size='lg'
                  onClick={() =>
                    this.props.history.push({ pathname: '/employees' })
                  }
                ></FontAwesomeIcon>
                <div className={classes.searchContainer}>
                  <div className={[classes.searchInput]}>
                    <input
                      className={classes.focus}
                      required
                      autoComplete='off'
                      type='text'
                      id='search'
                      className={classes.search}
                      placeholder='Search Employee Name , Code , Job Title'
                      onChange={(e) => this.searchEmployees(e)}
                    />

                    <FontAwesomeIcon
                      icon={faRedo}
                      size='sm'
                      color='lightGray'
                      flip='horizontal'
                    ></FontAwesomeIcon>
                  </div>
                  <div className={classes.resultBox} id='resultBox'>
                    {this.state.filteredEmployees.map((employee) => {
                      return (
                        <div
                          className={classes.employee}
                          onClick={() => this.selectEmployee(employee.code)}
                          key={employee.code}
                        >
                          <img src={employee.image} alt=' not found' />
                          <div className={classes.employee_info}>
                            <p>
                              {employee.code}|{employee.name}|
                              {employee.jobTitle}|{employee.salaryProfile}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={classes.info__description}>
                <img
                  src='https://image.flaticon.com/icons/png/512/1077/1077063.png'
                  alt=''
                />
                <div className='description'>
                  <h5>
                    <span>
                      {this.state.selectedEmployee.code}{' '}
                      {this.state.selectedEmployee.code ? '||' : null}{' '}
                    </span>{' '}
                    {this.state.selectedEmployee.name}
                  </h5>
                  <h5>
                    Job Title:{' '}
                    <span>{this.state.selectedEmployee.jobTitle}</span>{' '}
                  </h5>
                  <h5>
                    Salary Profile:{' '}
                    <span>{this.state.selectedEmployee.salaryProfile}</span>
                  </h5>
                  <h5>
                    Joining Date: <span>{this.state.selectedJoinDate}</span>
                  </h5>
                  <h5>
                    Location:{' '}
                    <span>
                      {this.state.selectedLocation ? (
                        <span>
                          {this.state.selectedLocation.hotel}
                          <span className={classes.arrow}></span>
                          {this.state.selectedLocation.department}
                          <span className={classes.arrow}></span>

                          {this.state.selectedLocation.specialist}
                        </span>
                      ) : null}
                    </span>
                  </h5>
                </div>
              </div>
              <div className={classes.formContainer}>
                <div className={classes.form}>
                  <div className={classes.heading}>
                    <h3>Leave Details</h3>
                  </div>
                  <form
                    onSubmit={(event) => this.submitForm(event)}
                    className={classes.mainForm}
                    id='myForm'
                  >
                    <div className={classes.radio}>
                      <div className={classes.radio__top}>
                        <span>Leave To Avail</span>
                        <input
                          type='radio'
                          id='abroad'
                          name='leaveToAvail'
                          value='abroad'
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                        />
                        <label htmlFor='abroad'> Abroad</label>
                        <input
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                          name='leaveToAvail'
                          type='radio'
                          id='local'
                          value='local'
                          defaultChecked
                        />
                        <label htmlFor='local'> Local</label>
                      </div>
                      <div className={classes.radio__bottom}>
                        <span>Require Leave Salary Advance</span>
                        <input
                          type='radio'
                          id='yes'
                          value='yes'
                          name='requireSalary'
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                        />
                        <label htmlFor='yes'> Yes</label>
                        <input
                          type='radio'
                          id='no'
                          value='no'
                          name='requireSalary'
                          defaultChecked
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                        />
                        <label htmlFor='no'> No</label>
                      </div>
                    </div>
                    <div className={classes.form__date}>
                      <div className={classes.form__date__left}>
                        <label htmlFor='leave' className={classes.form__label}>
                          {' '}
                          Leaving Date
                        </label>
                        <input
                          required
                          type='date'
                          id='leave'
                          disabled
                          name='leaveDate'
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                        />
                      </div>
                      <div className={classes.form__date__Right}>
                        <label htmlFor='rejoin'> Rejoining Date</label>
                        <input
                          required
                          type='date'
                          id='rejoin'
                          name='rejoinDate'
                          disabled
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                        />
                      </div>
                    </div>
                    <div className={classes.leaving__type}>
                      <div className={classes.leaving__type__top}>
                        <div className={classes.leaving__type__left}>
                          <span>1st Leave Type</span>
                          <select
                            required
                            name='leaveType'
                            onChange={(event) => {
                              this.onChangeHandler(event);
                            }}
                          >
                            <option value=''>
                              {' '}
                              --Please Select Leave Type --
                            </option>
                            <option value='Sick Leave'> Sick Leave</option>
                            <option value='Annual Leave With Payroll'>
                              {' '}
                              Annual Leave With Payroll
                            </option>
                          </select>
                        </div>
                        <div className={classes.leaving__type__right}>
                          <span>
                            No Of Days.
                            <input
                              name='daysNumber'
                              className={classes.daysNumber}
                              disabled
                              type='number'
                              placeholder='enter numb'
                              onChange={(event) => {
                                this.onChangeHandler(event);
                              }}
                            ></input>
                          </span>
                        </div>
                      </div>
                      <div className={classes.leaving__type__bottom}>
                        <FontAwesomeIcon
                          icon={faPlus}
                          size='sm'
                          color='#6d6d6d'
                          className={classes.plus}
                        ></FontAwesomeIcon>
                      </div>
                      <div className={classes.total__days}>
                        <FontAwesomeIcon
                          icon={faCalendarCheck}
                          size='lg'
                        ></FontAwesomeIcon>
                        <span>Total Days</span>
                      </div>
                    </div>
                    <div className={classes.replacement}>
                      <div className={classes.replacement__left}>
                        <div className={classes.heading__replacement}>
                          <h3>Guarantor</h3>
                        </div>
                        {this.renderOption()}{' '}
                      </div>
                      <div className={classes.replacement__left}>
                        <div className={classes.heading__replacement}>
                          <h3>Replacement</h3>
                        </div>
                        <select name='replacement' id='replacement'>
                          <option value=''>Please Select an Option</option>
                          <option value='one'>One</option>
                          <option value='Two'>Two</option>
                        </select>
                      </div>{' '}
                    </div>
                    <div className={classes.contact__details}>
                      <div className={classes.contact__heading}>
                        <h4>Contact Details During Leaving</h4>
                      </div>
                      <div className={classes.contact__details__top}>
                        {' '}
                        <div>
                          {' '}
                          <label htmlFor='address'>Address</label>
                          <input
                            type='text'
                            name='address'
                            id='address'
                            disabled
                            onChange={(event) => {
                              this.onChangeHandler(event);
                            }}
                          />
                        </div>
                        <div>
                          {' '}
                          <label htmlFor='ContactNumber'>Contact No.</label>
                          <input
                            onChange={(event) => {
                              this.onChangeHandler(event);
                            }}
                            type='number'
                            name='contactNumber'
                            id='ContactNumber'
                            disabled
                          />
                        </div>
                      </div>
                      <div className={classes.contact__details__bottom}>
                        <label htmlFor='email'>Email</label>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          disabled
                          onChange={(event) => {
                            this.onChangeHandler(event);
                          }}
                        />
                      </div>
                    </div>
                    <div className={classes.remarks__and__attached}>
                      <div className={classes.remarks}>
                        <div className={classes.remarks__heading}>
                          <h3>Remarks</h3>
                        </div>
                        <input
                          type='text'
                          name='remarks'
                          id='remarks'
                          onChange={(event) => this.onChangeHandler(event)}
                        />
                      </div>
                      <div className={classes.attached}>
                        <div className={classes.attached__heading}>
                          <h3>Attachments</h3>
                        </div>
                        <div className={classes.file__wrapper}>
                          <span
                            className={classes.fileContent}
                            id='fileName'
                          ></span>
                          <input
                            required
                            type='file'
                            id='file'
                            name='file'
                            className={classes.file__upload}
                            onChange={(event) => {
                              this.onChangeHandler(event);
                            }}
                          />
                          <button
                            type='button'
                            onClick={(event) => {
                              this.uploadFile(event);
                            }}
                            id='uploadFile'
                          >
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              size='lg'
                            ></FontAwesomeIcon>
                          </button>
                        </div>
                        <div className={classes.file__info}>
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            size='sm'
                          ></FontAwesomeIcon>
                          <span> Max File Size 1 MB</span>{' '}
                        </div>
                      </div>
                    </div>
                    <div className={classes.buttons}>
                      <button className={classes.cancel}>Cancel</button>
                      <button
                        className={classes.submit}
                        type='submit'
                        onClick={(event) => {
                          this.checkSearchInput(event);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={classes.info__right}>
              <div className={classes.info__content_left}>
                <h4>Annual Leave Balance as on {new Date().toDateString()} </h4>
                <h5>Annual Leave </h5>
                <div className={classes.info__right__spans}>
                  <span>Annual Leave Entitlement </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>
                <div className={classes.info__right__spans}>
                  <span>Annual Leave Balance </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <div className={classes.info__right__spans}>
                  <span>Al Bal. Till Year End </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <h5>Extra Days </h5>
                <div className={classes.info__right__spans}>
                  <span>Extra Days Balance </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <h5>Sick Leave</h5>
                <div className={classes.info__right__spans}>
                  <span> Sick Leave(s) Taken</span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <h5>Unpaid Leaves</h5>
                <div className={classes.info__right__spans}>
                  <span>Unpaid Leave Taken </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <h5>Leave In Progress</h5>
                <div className={classes.info__right__spans}>
                  <span> Annual Leave </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <div className={classes.info__right__spans}>
                  <span> Extra Days</span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <div className={classes.info__right__spans}>
                  <span> Sick Leaves</span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>

                <div className={classes.info__right__spans}>
                  <span>Unpaid Leaves </span>
                  <span className={classes.span__left}>Days(s)</span>
                </div>
                <div className={classes.fade_rule}></div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(PostLeave);
