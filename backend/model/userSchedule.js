const mongoose = require('mongoose');

const userSchedule = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    time:[
        {
            checkpoint: {
                type: String
            },            
        }
    ]
})


userSchedule.methods.addData = async function(isActive,dateTime){
    try{
        console.log(dateTime);
        this.isActive = isActive;
        this.time = this.time.concat({checkpoint:dateTime});
        await this.save();
        return this.time;
    }catch(error){  
        console.log(error.message);
    }
}

const Schedule = mongoose.model('SCHEDULE',userSchedule);

module.exports = Schedule;