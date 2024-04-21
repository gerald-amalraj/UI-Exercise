import { useMemo } from 'react';
import jsonData from "../services/arbs.json";
import Table from './Table';

const TableContainer = () => {

    const columns = useMemo(
        () => [
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
      ],
      []
    );
  
    return <Table columns={columns} data={jsonData} />;
  };
  
  export default TableContainer;