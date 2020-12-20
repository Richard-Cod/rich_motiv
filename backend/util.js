const {Work} = require("./models/db");

const moment = require('moment')

 const  userWorked3timesThisWeek = async (UserId) => {
    let test = false

    //Obtenir tous les 3 derniers works enregistrés pour ce user
    const data = await Work.findAll({
        limit: 3,
        where : {UserId},
        order: [
            ['id', 'DESC']
        ]
    })

    //Moins de 3 works dans la bdd 
    if (data.length < 3) return false;

    const works = [ data[0],data[1],data[2] ]


    const test1 = moment(works[0].date).isSame(works[1].date, 'week');
    const test2 = moment(works[1].date).isSame(works[2].date, 'week');
    test = test1 && test2
    
    console.log("userWorked3timesThisWeek ",test);
    return test
}

const userWorkedToday = async (UserId,date) => {
    const data = await Work.findAll({
        limit: 1,
        where : {UserId},
        order: [
            ['id', 'DESC']
        ]
    })

    if (data.length == 0) return false

    const bddDate = data[0].date.toISOString()
    const test1 = bddDate.substr(0,10) === date.substr(0,10)

    console.log(bddDate.substr(0,10),"  -------------- ",  date.substr(0,10));
    console.log("userWorkedToday ",test1);

    return test1
}

async function run () {
    const userId = 1
    await userWorkedToday(userId,"2020-11-09T23:13:09Z")
    
    await userWorked3timesThisWeek(userId)
}

//run()


module.exports = {
    userWorked3timesThisWeek,
    userWorkedToday
   
}
