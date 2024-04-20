import DataTable from "react-data-table-component";
import { useState } from "react";
import './TableStyles.css';
import jsonData from "../services/arbs.json";

function Table() {
  const columns = [
    {
      name: "Asset",
      cell: (row:any) => row.assetName,
      sortable: true,
      selector:"assetName"
    },
    {
      name: "Ticker",
      cell: (row:any) => row.ticker,
      sortable: true,
      selector:"ticker"
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      cell: (row:any) => {
        if (row.price < 0) {
          return (
            <div className="minus">
              {row.price}
            </div>
          );
        } else if (row.price >= 0) {
          return (
            <div className="plus">
              {row.price}
            </div>
          );
        }
      }
    },
  ];

  const [data, setData] = useState(jsonData);
  const [sortedField, setSortedField] = useState('');
  const [sortDirection, setSortDirection] = useState(0);

    const handleSort = (column:any) => {
    if (column.selector === sortedField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
      setSortedField(column.selector);
    }
  };

  const customSort = (rows:any, field:any, direction:any) => {
    let multiplier = direction === "asc" ? 1 : -1;
    let attr = field === "assetName" ? "order" :field;
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
