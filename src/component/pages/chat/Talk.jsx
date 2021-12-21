import React from 'react'
import Image1 from "../../images/115946.jpg"
import Image2 from "../../images/147190.jpg"
import "./Talk.css"
function Talk(props) {
    const { pos, type, message, name, date, time, category, openImg } = props;
    let newTime;
    console.log(type)
    if( time.charAt(0) === "0" ){
        newTime = time.charAt(1) + ":" + time.charAt(3) + time.charAt(4)
    }else{
        newTime = time
    }

    if (pos === "left") {
        if(type === 0){
            if( category === "純男"){
                return (
                    <div className="talk-left">
                        <img className={"talk-left-img"} src={Image1} alt="" />
                        <p>{message}</p>
                        <h5>{date}  {newTime}</h5>
                    </div>
                )
            }else{
                return (
                    <div className="talk-left">
                        <img className={"talk-left-img"} src={Image2} alt="" />
                        <p>{message}</p>
                        <h5>{date}  {newTime}</h5>
                    </div>
                )
            }
        }else{
            return(
                <>
                <img className="img-left" alt="" src={message} onClick={()=>{openImg(message)}}/>
                <div className="clear-left"></div>
                <h5 className="time-left">{date}  {newTime}</h5>
                <br/>
                </>
            )
        }
        
        
    }
    else {
        if(type === 0){
            return (
                <div className="talk-right">
                    <p>{message}</p>
                    <h5 className="right-time">{date}  {newTime}</h5>
                </div>
            )
        }else{
            return(
                <>
                <img className="img-right" alt="" src={message} onClick={()=>{openImg(message)}}/>
                <div className="clear-right"></div>
                <h5 className="time-right">{date}  {newTime}</h5>
                <div className="clear-right"></div>
                <br/>
                </>
            )
        }
        
    }


}

export default Talk
