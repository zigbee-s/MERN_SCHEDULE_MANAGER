import React, { useState, useEffect } from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Checkpoint from './Checkpoint';


// For todays date;
Date.prototype.today = function () { 
  return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
   return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}


const Timer = () => {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [hour, setHour] = useState('00');
  const [timeArray, setTimeArray] = useState([]);

  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const {user} = useAuth0();

  const resetTimer = () =>{
    setSecond('00');
    setMinute('00');
    setHour('00');
    setCounter(0);
  }

  const startTimer = ()=>{
    console.log(isActive);
    setIsActive(!isActive);
    postCurrentTime(true);
  }


  const postCurrentTime = async(isActive) => {
    var dateTime = `${new Date().today()}+${new Date().timeNow()}`
    console.log(isActive);
    try
    {
      const res = await fetch("/setTime", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isActive,user,dateTime
        })
    })

      const data = await res.json();  
      setTimeArray(data.time);
      console.log(data.message);   //Check here 
      
    
    }catch (error)
    {
      console.log(error);
    }

  }

  const resetTimerAndPostCurrentTime = ()=>{
    console.log(isActive);
    setIsActive(!isActive);
    postCurrentTime(false);
    resetTimer();
  }


  const getTime = async()=>{
    
    try{
      const res = await fetch('/getTime',{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user
        })
      })

      const data = await res.json();

      console.log(user);
      if(data.user){
        let {time, isActive} = data.user;
        console.log(time);
        setTimeArray(time);

        if(isActive){
          let latestTime = time[time.length -1];
        let dateTimeArray = latestTime.checkpoint.split("+");
        
        let dbDate = dateTimeArray[0];
        let dbTime = dateTimeArray[1];
        let dividedTime = dbTime.split(':');


        let hours = dividedTime[0];
        let mins = dividedTime[1];
        let seconds = dividedTime[2];

        //setSecond(seconds);
        //setMinute(mins);
        //setHour(hours);
        const d = new Date();
       
        const counts = ((d.getHours()*60*60 + d.getMinutes()*60 + d.getSeconds()) - (parseInt(hours)*60*60 + parseInt(mins)*60 + parseInt(seconds)));
        
        setCounter(counts);
        setIsActive(isActive);

        console.log(counts);

        var h = Math.floor(counts / 3600);
        var m = Math.floor(counts % 3600 / 60);
        var s = Math.floor(counts % 3600 % 60);  
            
        setSecond(`${s}`);
        setMinute(`${m}`);
        setHour(`${h}`);
        }else{
          setSecond("00");
          setMinute("00");
          setHour("00");
          setCounter(0);
        }
        
      }else{
        setSecond("00");
        setMinute("00");
        setHour("00");
        setCounter(0);
      }
      
    }catch(error){
      console.log(error);
    }
  };
  
  useEffect(() => {
    let intervalId;
    if(isActive){
      intervalId = setInterval(()=>{
        var h = Math.floor(counter / 3600);
        var m = Math.floor(counter % 3600 / 60);
        var s = Math.floor(counter % 3600 % 60); 
            
        setSecond(String(s));
        setMinute(String(m));
        setHour(String(h));
    
            setCounter(counter => counter + 1);
        }, 1000)
    
      return () => {
      clearInterval(intervalId);
    }
  }
  }, [isActive,counter])

 
  useEffect(() => {
      getTime();
    return () => {
        // cleaning up the listeners here
    }
 }, []);

 

  return (
    <div className="container">
      <div className="time">
      <span className="hour">{hour}</span>
        <span>:</span>
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <div className="buttons">
        <button onClick={startTimer} className="start">
          Start
        </button>
        <button onClick={resetTimerAndPostCurrentTime}>Checkpoint</button>
      </div>

       <div>
          <Checkpoint timeArray= {timeArray} />
      </div>
   </div>
  )
}

export default Timer;