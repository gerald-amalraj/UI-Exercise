import DataTable from "react-data-table-component";
import { useState } from "react";
import './TableStyles.css';

function Table({ columns, data }) {

  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

    const handleSort = (column:any) => {
    if (column.selector === sortedField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
      setSortedField(column.selector);
    }
  };

  const customSort = (rows:any, field:any, direction:any) => {
    const multiplier = direction === "asc" ? 1 : -1;
    const attr = field === "assetName" ? "order" :field;
    return rows.sort((a:any, b:any) => {
      if (a[attr] < b[attr]) return -1 * multiplier;
      if (a[attr] > b[attr]) return 1 * multiplier;
      return 0;
    });
  };

  const conditionalRowStyles = [
    {
      when: (row:any) => row.assetName.includes('Equity'),
      style: {
        backgroundColor: 'aqua'
      },
    },
    {
      when: (row:any) => row.assetName.includes('Credit'),
      style: {
        backgroundColor: 'chartreuse'
      },
    },
    
  ];

  return (
    <>
      <div className="container my-5">
        <DataTable
          columns={columns}
          data={data}
          title="UI Exercise"
          conditionalRowStyles={conditionalRowStyles}
          sortFunction={customSort} 
          onSort={handleSort} 
          sortField={sortedField} 
          sortDirection={sortDirection}
        />
      </div>
    </>
  );
}

export default Table;
