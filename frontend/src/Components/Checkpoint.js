import React, {useState} from 'react'


export default function Checkpoint(timeArray) {
    const chkpts = timeArray.timeArray;
    
    

    let studiedTimeArray = [];

    if(chkpts && chkpts.length > 1){

        let dateTimeArray = chkpts[0].checkpoint.split("+");
        let dbTime = dateTimeArray[1];
        let dividedTime = dbTime.split(':');


        let hours = dividedTime[0];
        let mins = dividedTime[1];
        let seconds = dividedTime[2];

        let prevCount = parseInt(hours)*60*60 + parseInt(mins)*60 + parseInt(seconds)

        for(let i=1;i<chkpts.length;i++){
            let dateTimeArray = chkpts[i].checkpoint.split("+");

            let dbDate = dateTimeArray[0];
            let dbTime = dateTimeArray[1];
            let dividedTime = dbTime.split(':');


            let hours = dividedTime[0];
            let mins = dividedTime[1];
            let seconds = dividedTime[2];

            let count = parseInt(hours)*60*60 + parseInt(mins)*60 + parseInt(seconds)
            const diffCounts = count - prevCount;

            prevCount = count;

            var h = Math.floor(diffCounts / 3600);
            var m = Math.floor(diffCounts % 3600 / 60);
            var s = Math.floor(diffCounts % 3600 % 60);  

            studiedTimeArray.push(`${h}:${m}:${s}`);
        }
    }
    return (
        <>
            {studiedTimeArray.map((object,i) => <h3 key={i}>{object}</h3>)}
        </>
    )
}
