import axios from "axios";
import React, { useState } from "react";
import TableContainer from "./TableContainer";

const DataLoader = () => {
    const [data,setData]=useState([]);
    React.useEffect(()=>{
      axios
      .get("./arbs.json")
      .then((res) => setData(res.data))
      .catch(err => console.log(err))
    },[])

    return <TableContainer data={data} />;
};

export default DataLoader;