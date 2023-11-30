import React, {useState,useEffect} from 'react';
import Card from './card.js';
import './kanganboard.css';

function Kanganboard ({data,groupingvalue,sortingvalue,userdata}) {
    const [groupeddata,setGroupeddata] = useState(null);
    const [finaldata,setFinaldata] = useState(null);
    console.log(data,groupingvalue,sortingvalue);

    const groupbyvalue = () => {
        console.log("in function");
        if(data){
            const groupingdata = data.reduce((group,ticket)=>{
                if (groupingvalue==="status"){
                    const status = ticket.status;
                    if(!group[status]){
                        group[status]=[];
                    }
                    group[status].push(ticket);
                    const sd = ['Backlog','Todo','In progress','Done','Cancelled'];
                    sd.forEach((stat) => {
                        if (!group[stat]) {
                          group[stat] = [];
                        }
                    });
                }
                if (groupingvalue==="user"){
                    const status = ticket.userId;
                    if(!group[status]){
                        group[status]=[];
                    }
                    group[status].push(ticket);
                }
                if (groupingvalue==="priority"){
                    const status = ticket.priority;
                    if(!group[status]){
                        group[status]=[];
                    }
                    group[status].push(ticket);
                    const sd = [0,1,2,3,4];
                    sd.forEach((stat) => {
                        if (!group[stat]) {
                          group[stat] = [];
                        }
                    });
                }

                return group;
            },{});
            console.log(groupeddata);
            setGroupeddata(groupingdata);
        }
    }

    useEffect(()=>{
        groupbyvalue();
    },[data,groupingvalue]);

    const sortingdata = () => {
        console.log(groupeddata, sortingvalue);
        if(groupeddata && sortingvalue){
            const sorteddata = {};

            for (const key in groupeddata){
                console.log(sorteddata);
                if(groupeddata.hasOwnProperty(key)){
                    const group = groupeddata[key];
                    console.log(key,group);
                    if (sortingvalue == "priority"){
                        sorteddata[key] = group.sort((a,b)=>{
                            console.log(a.priority);
                            if (a.priority<b.priority){return 1;}
                            if (a.priority>b.priority){return -1;}
                            return 0;
                        });
                    }
                    if (sortingvalue == "title"){
                        sorteddata[key] = group.sort((a,b)=>{
                            if (a.title<b.title){return -1;}
                            if (a.title>b.title){return 1;}
                            return 0;
                        });
                    }
                }
            }
            setFinaldata(sorteddata);
        }
        else if (groupeddata && !sortingvalue){
            setFinaldata(groupeddata);
        }
    }

    useEffect(()=>{
        sortingdata();
    },[groupeddata,sortingvalue]);

    const findname = (userid) => {
        const finditem = userdata.find((item)=>item.id === userid);
        return finditem ? [finditem.name,finditem.available] : "No name given in data";
    }

    const bgc = (availability) => ({
        backgroundColor: availability ? 'gray' : 'white'
    });

    return (
        <div className='kb'>
            {
                groupeddata && (
                    <div className='container'>
                        {
                            Object.entries(groupeddata).map(([gv,tickets])=>
                            <div class='box1'>
                                <div class='gvc'><span className='plus1'>
                                    {
                                        (groupingvalue === 'status') && (
                                            <span>
                                                {
                                                    (gv === 'Todo') && (<span><img src='./images/i1.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img> {gv}</span>)
                                                }
                                                {
                                                    (gv === 'Backlog') && (<span><img src='./images/i2.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img> {gv}</span>)
                                                }
                                                {
                                                    (gv === 'In progress') && (<span><img src='./images/i3.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img> {gv}</span>)
                                                }
                                                {
                                                    (gv === 'Done') && (<span><img src='./images/i4.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img> {gv}</span>)
                                                }
                                                {
                                                    (gv === 'Cancelled') && (<span><img src='./images/i5.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img> {gv}</span>)
                                                }
                                            </span>
                                        )
                                    }
                                    {
                                        (groupingvalue ==='priority') && 
                                        <span>
                                            {
                                                (gv === '0') && 
                                                (<span>
                                                    <span class="box3" style={{backgroundColor:'white'}}>{gv}</span> No Priority
                                                </span>)
                                            }
                                            {
                                                (gv === '1') && 
                                                (<span>
                                                    <span class="box3" style={{backgroundColor:'yellow'}}>{gv}</span> Low
                                                </span>)
                                            }
                                            {
                                                (gv === '2') && 
                                                (<span>
                                                    <span class="box3" style={{backgroundColor:'orange'}}>{gv}</span> Medium
                                                </span>)
                                            }
                                            {
                                                (gv === '3') && 
                                                (<span>
                                                    <span class="box3" style={{backgroundColor:'orangered'}}>{gv}</span> High
                                                </span>)
                                            }
                                            {
                                                (gv === '4') && 
                                                (<span>
                                                    <span class="box3" style={{backgroundColor:'red'}}>{gv}</span> Urgent
                                                </span>)
                                            }
                                        </span>
                                    }
                                    {
                                        (groupingvalue === 'user') && 
                                        <span>
                                            {
                                                (findname(gv)[0]=='Anoop sharma') && (
                                                    <span className='box2' style={{backgroundColor:'blue'}}>
                                                        <span className='photo'>AS</span>
                                                        <span class="availability-dot" style={bgc(findname(gv)[1])}></span>
                                                    </span>
                                                )
                                            }
                                            {
                                                (findname(gv)[0]=='Yogesh') && (
                                                    <span className='box2' style={{backgroundColor:'red'}}>
                                                        <span className='photo'>Y</span>
                                                        <span class="availability-dot" style={bgc(findname(gv)[1])}></span>
                                                    </span>
                                                )
                                            }
                                            {
                                                (findname(gv)[0]=='Shankar Kumar') && (
                                                    <span className='box2' style={{backgroundColor:'green'}}>
                                                        <span className='photo'>SK</span>
                                                        <span class="availability-dot" style={bgc(findname(gv)[1])}></span>
                                                    </span>
                                                )
                                            }
                                            {
                                                (findname(gv)[0]=='Ramesh') && (
                                                    <span className='box2' style={{backgroundColor:'orange'}}>
                                                        <span className='photo'>R</span>
                                                        <span class="availability-dot" style={bgc(findname(gv)[1])}></span>
                                                    </span>
                                                )
                                            }
                                            {
                                                (findname(gv)[0]=='Suresh') && (
                                                    <span className='box2' style={{backgroundColor:'orangered'}}>
                                                        <span className='photo'>S</span>
                                                        <span class="availability-dot" style={bgc(findname(gv)[1])}></span>
                                                    </span>
                                                )
                                            }
                                            {findname(gv)}
                                        </span>
                                        
                                    }
                                    <span style={{paddingLeft:'13px'}}>{groupeddata[gv].length}</span>
                                </span>
                                    <button class='plus'>+</button>
                                    <button class='menu'>---</button>
                                </div>
                                <ul class='ul1'>
                                    {tickets.map((ticket)=>(
                                        <li class='li1'>
                                            <Card ticket={ticket} groupingvalue={groupingvalue} userdata={userdata}></Card>
                                        </li>
                                    ))
                                    }  
                                </ul>
                            </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Kanganboard;