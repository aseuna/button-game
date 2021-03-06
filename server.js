const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(serveStatic(path.join(__dirname, 'dist')));

const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING,
    ssl: process.env.SSL || false
});

app.post('/api/button_game', async (req, res) => {
    // the amount of bonus points give to the player based on the total number
    let bonus_points = 0;
    // distance to next winning value
    let distance = 0;
    // query to update the total number of clicks and then select the result
    const text = 'UPDATE bg_num SET total_number = total_number + 1 WHERE id = 1; SELECT * FROM bg_num;';
    try {
        const client = await pool.connect();
        const result = await client.query(text);
        client.release();
        console.log(result[1].rows[0].total_number);

        if(result[1].rows[0].total_number % 500 === 0){
            bonus_points = 250;
        }else if(result[1].rows[0].total_number % 100 === 0){
            bonus_points = 40;
        }else if(result[1].rows[0].total_number % 10 === 0){
            bonus_points = 5;
        }else{
            bonus_points = 0;
        }

        distance = 10 - result[1].rows[0].total_number % 10;

        // json to send relevant information back to the client
        const resJson = {
            incrementation: "SUCCESS",
            bonus_points: bonus_points,
            distance: distance
        }
        res.json(resJson);
    } catch (err) {
        console.log(err.stack)
        const resJson = {
            incrementation: "FAILURE",
            bonus_points: 0
        }
        res.json(resJson);
    }

});

var server = app.listen(process.env.PORT, process.env.HOST, function() {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
});