import React, {useState,useEffect} from 'react';
import './card.css';

const Card = ({ticket, groupingvalue, userdata}) => {
    const findname = (userid) => {
        const finditem = userdata.find((item)=>item.id === userid);
        return finditem ? [finditem.name,finditem.available] : "No name given in data";
    }
    const bgc = (availability) => ({
        backgroundColor: availability ? 'gray' : 'white'
    });
    return (
        <div class="styled-button">
            <div className='cl1'><span className='ida'>{ticket.id} </span>
            {
                (groupingvalue!="user") && (
                    <span>
                        {
                            (findname(ticket.userId)[0]=='Anoop sharma') && (
                                <span className='box2' style={{backgroundColor:'blue'}}>
                                    <span className='photo'>AS</span>
                                    <span class="availability-dot" style={bgc(findname(ticket.userId)[1])}></span>
                                </span>
                            )
                        }
                        {
                            (findname(ticket.userId)[0]=='Yogesh') && (
                                <span className='box2' style={{backgroundColor:'red'}}>
                                    <span className='photo'>Y</span>
                                    <span class="availability-dot" style={bgc(findname(ticket.userId)[1])}></span>
                                </span>
                            )
                        }
                        {
                            (findname(ticket.userId)[0]=='Shankar Kumar') && (
                                <span className='box2' style={{backgroundColor:'green'}}>
                                    <span className='photo'>SK</span>
                                    <span class="availability-dot" style={bgc(findname(ticket.userId)[1])}></span>
                                </span>
                            )
                        }
                        {
                            (findname(ticket.userId)[0]=='Ramesh') && (
                                <span className='box2' style={{backgroundColor:'orange'}}>
                                    <span className='photo'>R</span>
                                    <span class="availability-dot" style={bgc(findname(ticket.userId)[1])}></span>
                                </span>
                            )
                        }
                        {
                            (findname(ticket.userId)[0]=='Suresh') && (
                                <span className='box2' style={{backgroundColor:'orangered'}}>
                                    <span className='photo'>S</span>
                                    <span class="availability-dot" style={bgc(findname(ticket.userId)[1])}></span>
                                </span>
                            )
                        }
                    </span>
                )
            }
            </div>
            <br/>
            <div className='cl'>
                {
                    (groupingvalue!="status") && (
                        <span style={{paddingRight:'8px'}}> 
                            {
                                (ticket.status === 'Todo') && (<span><img src='./images/i1.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img></span>)
                            }
                            {
                                (ticket.status === 'Backlog') && (<span><img src='./images/i2.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img></span>)
                            }
                            {
                                (ticket.status === 'In progress') && (<span><img src='./images/i3.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img></span>)
                            }
                            {
                                (ticket.status === 'Done') && (<span><img src='./images/i4.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img></span>)
                            }
                            {
                                (ticket.status === 'Cancelled') && (<span><img src='./images/i5.png' style={{maxWidth:'20px',maxHeight:'20px'}}></img></span>)
                            }
                        </span>
                    )
                }
                <span class="ht">{ticket.title}</span>
            </div>
            <br/>
            <div>
                {
                    (groupingvalue!="priority") && (
                        <span>
                            {
                                (ticket.priority === 0) && (<span class="box" style={{backgroundColor:'white'}}>{ticket.priority}</span>)
                            }
                            {
                                (ticket.priority === 1) && (<span class="box" style={{backgroundColor:'yellow'}}>{ticket.priority}</span>)
                            }
                            {
                                (ticket.priority === 2) && (<span class="box" style={{backgroundColor:'orange'}}>{ticket.priority}</span>)
                            }
                            {
                                (ticket.priority === 3) && (<span class="box" style={{backgroundColor:'orangered'}}>{ticket.priority}</span>)
                            }
                            {
                                (ticket.priority === 4) && (<span class="box" style={{backgroundColor:'red'}}>{ticket.priority}</span>)
                            }
                        </span>
                    )
                }
                <span class="box"><div class="circle"></div>   {ticket.tag[0]}</span>
            </div>
        </div>
    );
};

export default Card;