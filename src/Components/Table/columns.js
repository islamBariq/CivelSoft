import { format } from 'date-fns';
export const Columns = [
  {
    Header: '',
    accessor: 'condition',
  },
  {
    Header: 'Req No',
    accessor: 'reqNumber',
  },
  {
    Header: 'Image',
    accessor: 'image',
  },
  {
    Header: 'code',
    accessor: 'code',
  },
  {
    Header: 'Job Title',
    accessor: 'jobTitle',
  },
  {
    Header: 'Employee Name',
    accessor: 'name',
  },
  {
    Header: 'Salary Profile',
    accessor: 'salaryProfile',
  },
  {
    Header: 'Expected Leave Start Date',
    accessor: 'leaveDate',
    Cell: ({ value }) => {
      return format(new Date(value), 'MM/dd/yyyy');
    },
  },
  {
    Header: 'Expected Rejoin Start Date',
    accessor: 'rejoinDate',
  },
  {
    Header: 'Actual Leaving',
    accessor: 'actualLeaving',
  },
  {
    Header: 'Leave Type 1',
    accessor: 'leaveType',
  },
];
