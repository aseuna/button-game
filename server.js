const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//var distDir = __dirname + "/dist/";
//app.use(express.static(distDir));

const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING
});

app.post('/api/button_game', async (req, res) => {

    // IMPLEMENT NESTED QUERY
    const text = 'UPDATE bg_num SET total_number = total_number + 1 WHERE id = 1;';
    //const text = 'SELECT * FROM bg_num;';
    try {
        const result = await pool.query(text)

        console.log(result);

        const j = {
            incrementation: "SUCCESS"
        }
        res.json(j);
    } catch (err) {
        console.log(err.stack)
        const j = {
            incrementation: "FAILURE"
        }
        res.json(j);
    }

});

/*
app.get('*', (req,res) =>{
    console.log(res);
    res.sendFile(path.join(__dirname+'/../dist/index.html'));
});*/

var server = app.listen(process.env.SPORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);

});