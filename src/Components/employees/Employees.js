import {
  faGlobeAmericas,
  faPlus,
  faRedo,
  faEdit,
  faEye,
  faCheck,
  faTrashAlt,
  faPrint,
  faEllipsisV,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './employees.css';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { Columns } from '../Table/columns';
const Employee = (props) => {
  const [employees, setEmployees] = useState(props.employeesState);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const [employeesArray, setEmployeesArray] = useState(
    props.employeesState.employees
  );
  const [applications, setApplications] = useState(
    props.employeesState.applications
  );

  /*const searchEmployees = (event) => {
    let searchValue = event.target.value.toLowerCase();
    if (searchValue) {
      document.querySelector('.action__results__box').style.visibility =
        'visible';
    } else {
      document.querySelector('.action__results__box').style.visibility =
        'hidden';
    }
    const FilteredEmployees = employees.employees.filter((em) => {
      return (
        em.name.toLowerCase().includes(searchValue) ||
        em.code.toString().includes(searchValue) ||
        em.jobTitle.toLowerCase().includes(searchValue)
      );
    });
    setFilteredEmployees(FilteredEmployees);
  };*/
  /* edit employee */
  const editSelectedEmployee = () => {
    if (selectedEmployee.length == undefined) {
      alert('please select employee to edit');
    } else {
      props.history.push({
        pathname: '/employees/' + selectedEmployee[0].code,
      });
    }
  };
  const rowSelected = (code, event) => {
    let employee = employeesArray.filter((em) => {
      return Number(em.code) === code;
    });
    setSelectedEmployee(employee);
    document.querySelectorAll('tr').forEach((tr) => {
      tr.classList = '';
    });
    event.target.parentElement.classList = 'clicked';
  };
  const NewEmployee = () => {
    props.history.push({ pathname: 'new-employee' });
  };
  const deleteEmployee = () => {
    let index = null;
    if (!selectedEmployee.length) {
      alert('please select employee to delete');
      return;
    } else {
      index = employeesArray.findIndex(
        (i) => i.code === selectedEmployee[0].code
      );
      const newEmployeesArray = [...employeesArray];
      newEmployeesArray.splice(index, 1);
      setEmployeesArray(newEmployeesArray);
      setSelectedEmployee({});
    }
  };

  /* start coding for the table */
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => employeesArray, [employeesArray]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 8 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    pageOptions,
    gotoPage,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter, pageIndex } = state;
  const checkCell = (cell) => {
    if (cell.column.Header === 'Image') {
      return (
        <div>
          <img src={cell.value} alt='not found' className='table__image' />
        </div>
      );
    } else if (cell.column.Header === '') {
      return <div className={cell.value}></div>;
    } else {
      return cell.render('Cell');
    }
  };
  return (
    <React.Fragment>
      <div className='Employee__heading'>
        <h3>Manage Leave Request</h3>
        <h5>You Have {applications} Application(s)</h5>
      </div>
      <div className='actions'>
        <div className='actions__left'>
          <FontAwesomeIcon
            className='action__icon__earth'
            icon={faGlobeAmericas}
            size='lg'
            color='#24298f'
          ></FontAwesomeIcon>
          <div className='action__search__container'>
            <div className='action__search'>
              <input
                type='text'
                value={globalFilter || ''}
                autoComplete='off'
                className='action__search__input'
                name='searchEmployee'
                placeholder='Filter Employees By Name Or Job Title Or Code'
                onChange={(event) => {
                  setGlobalFilter(event.target.value);
                }}
              />
              <FontAwesomeIcon
                icon={faRedo}
                flip='horizontal'
                size='sm'
                color='#bfbdbd'
              >
                {' '}
              </FontAwesomeIcon>
            </div>
            <div className='action__results__box'>
              {filteredEmployees.map((em) => {
                return (
                  <div key={em.code}>
                    {' '}
                    <div
                      className='results__box__content'
                      onClick={() => {
                        editSelectedEmployee(em.code);
                      }}
                    >
                      <img src={em.image} alt='' />
                      <p>
                        {' '}
                        {em.code}|{em.name}|{em.jobTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <FontAwesomeIcon
            className='action__icon__search'
            icon={faSearch}
            color='#fff'
          ></FontAwesomeIcon>
        </div>
        <div className='actions__right'>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faPlus}
            size='lg'
            color='#24298f'
            onClick={() => {
              NewEmployee();
            }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faEdit}
            onClick={() => editSelectedEmployee()}
            size='lg'
            color='#24298f'
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faEye}
            size='lg'
            color='#24298f'
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faCheck}
            size='lg'
            color='#24298f'
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faTrashAlt}
            id='delete'
            size='lg'
            color='#24298f'
            onClick={() => deleteEmployee()}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faPrint}
            size='lg'
            color='#24298f'
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className='actions__right__icon'
            icon={faEllipsisV}
            size='lg'
            color='#24298f'
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className='employees__contents'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span style={{ marginleft: '2px' }}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon
                            icon={faSortDown}
                            color='black'
                          ></FontAwesomeIcon>
                        ) : (
                          <FontAwesomeIcon
                            icon={faSortUp}
                            color='black'
                          ></FontAwesomeIcon>
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={(event) => {
                    rowSelected(Number(row.original.code), event);
                  }}
                >
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{checkCell(cell)} </td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='page__footer'>
        <div className='page__footer__left'>
          <div className='request__level'>
            <span className='blue'></span>
            <span>Request Level</span>
          </div>
          <div className='under__approval'>
            <span className='yellow'></span>
            <span>Under Approval</span>
          </div>
          <div className='final__approve'>
            <span className='green'></span>
            <span>Final Approve</span>
          </div>
          <div className='action__taken'>
            <span className='brown'></span>
            <span>
              Action Taken (Leaving is posted and approved or leaving extension)
            </span>
          </div>
          <div className='closed_trans'>
            <span className='brown__dark'></span>
            <span>Closed Transaction</span>
          </div>
          <div className='future__transaction'>
            <span className='blue__light'></span>
            <span>Future Date Transaction</span>
          </div>
          <div className='request__returned'>
            <span className='red'></span>
            <span>Returned</span>
          </div>
          <div className='request__hold'>
            <span className='brown__3'></span>
            <span>Hold</span>
          </div>
          <div className='request__hold__returned'>
            <span className='gray'></span>
            <span>Returned And On Hold</span>
          </div>
          <div className='request__extended'>
            <span className='pink'></span>
            <span>Extended Leave Request</span>
          </div>
        </div>

        <div className='page__footer__right'>
          <input
            type='number'
            id='paginationInput'
            placeholder={'Page ' + (pageIndex + 1) + 'of ' + pageOptions.length}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value - 1)
                : 0;
              if (e.target.value > pageOptions.length) {
                e.target.value = 0;
              } else {
                gotoPage(pageNumber);
              }
            }}
          ></input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Employee);
