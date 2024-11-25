const moment= require('moment')
const dateConversion = {}

const pad = (n) => n < 10 ? `0${  n}` : n;

dateConversion.millisecondToStringFullTime = (time) => {
   const duration =  moment.duration(time);
   return pad(duration.hours())+':'+ pad(duration.minutes())+':'+pad(duration.seconds())
}
 
module.exports = dateConversion;