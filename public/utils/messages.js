const moment =require('moment');

function formatMessage(username,usercolor,text){
    return({
        username,
        usercolor,
        text,
        time:moment().format('h:mm a')
    }
    )
}
module.exports =formatMessage;