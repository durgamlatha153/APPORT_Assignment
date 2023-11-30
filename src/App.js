import React, {useState,useEffect} from 'react';
import './App.css';
import Kanganboard from './kanganboard.js';

const App = () => {
  const [data,setData] = useState([]);
  const [groupingvalue, setGroupingvalue] = useState("");
  const [sortingvalue, setSortingvalue] = useState("");
  const [showdisplay, setShowdisplay] = useState(false);

  useEffect(()=>{
    const fetchdata = async() => {
      try{
        const response = await fetch(' https://api.quicksell.co/v1/internal/frontend-assignment');
        const fdata = await response.json();
        await setData(fdata);
        console.log(fdata);
        console.log(data);
      } catch (error){
        console.log("Cannot fetch data from api:",error);
      }
    };

    fetchdata();

    const gv = localStorage.getItem('gv');
    const sv = localStorage.getItem('sv');

    if (gv) {
      setGroupingvalue(gv);
    }
    if (sv) {
      setSortingvalue(sv);
    }
  },[]);

  const handledisplaybutton = () => {
    setShowdisplay(!showdisplay);
    console.log(data);
  }

  const handlegv = (e) => {
    setGroupingvalue(e.target.value);
    localStorage.setItem('gv',e.target.value)
  }

  const handlesv = (e) => {
    setSortingvalue(e.target.value);
    localStorage.setItem('sv',e.target.value)
  }

  return (
    <div class='kb'>
      <div class='displayb'>
        <button onClick={handledisplaybutton}>Display Options</button>
        {
          showdisplay &&(
            <div>
            <span>Grouping</span>
            <select onChange={(e)=>handlegv(e)}>
              <option value="" disabled selected>Select grouping value</option>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
            <br></br>
            <span>Sorting</span>
            <select onChange={(e)=>handlesv(e)}>
            <option value="" disabled selected>Select Sorting value</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
            </div>
        )}
      </div>
      <Kanganboard data={data.tickets} groupingvalue={groupingvalue} sortingvalue={sortingvalue} userdata={data.users}></Kanganboard>
    </div>
  );
};

export default App;
