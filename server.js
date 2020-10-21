const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', ejs);

app.get('/', (req, res)=> {
    let url = `https://api.thevirustracker.com/free-api?countryTimeline=EE`;
    var now= new Date();
    let date = `${now.getMonth()}/${now.getDate() - 1}/${now.getFullYear()-2000}`;

    axios.get(url)
    .then(function(response){
        let firstDailyCases = response.data.timelineitems[0]["2/27/20"].new_daily_cases;
        let firstTotalCases = response.data.timelineitems[0]["2/27/20"].total_cases;
        let firstTotalRecoveries = response.data.timelineitems[0]["2/27/20"].total_recoveries;
        let newDailyCases = response.data.timelineitems[0][date].new_daily_cases;
        let newTotalCases = response.data.timelineitems[0][date].total_cases;
        let newTotalRecoveries = response.data.timelineitems[0][date].total_recoveries; 
        res.render('index.ejs', {firstDailyCases:firstDailyCases, firstTotalCases:firstTotalCases,
            firstTotalRecoveries:firstTotalRecoveries,newDailyCases: newDailyCases,newTotalCases:newTotalCases,
            newTotalRecoveries:newTotalRecoveries,  date:date  });
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server has started.');
});