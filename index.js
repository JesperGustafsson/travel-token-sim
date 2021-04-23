const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt')
const pool = require('./db')
const path = require('path');
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}

// Requests
app.post('/newDeparture', async (req, res) => {
    try {
        const tokenID = req.body.tokenID;
        const vehicleType = req.body.vehicleType;
        const departureTimestamp = req.body.departureTimestamp;
        
        console.log(`departureTimestamp`, departureTimestamp)

        if (departureTimestamp) {
            var query = await pool.query(
                `
                INSERT INTO current_travels (token_id, vehicle, departure) VALUES ('${tokenID}', '${vehicleType}', '${departureTimestamp}'); 
                `
            )
        } else {
            var query = await pool.query(
                `
                INSERT INTO current_travels (token_id, vehicle) VALUES ('${tokenID}', '${vehicleType}'); 
                `
            )
        };

        res.json();
    } catch (err) {
        console.error(err)
    }
})
app.post('/newArrival', async (req, res) => {

    try {
        const tokenID = req.body.tokenID;

        var query = await pool.query(
            `
        SELECT * FROM current_travels WHERE token_id = '${tokenID}';
        `
        )


        const travelID = query.rows[0]['travel_id'];
        const departure = query.rows[0]['departure'];
        const departureTime = departure.toISOString();
        const vehicleType = query.rows[0]['vehicle'];
        const arrivalTime = req.body.arrivalTime;

        if (arrivalTime) {
            var query = await pool.query(
                `
            INSERT INTO completed_travels (travel_id, token_id, vehicle, departure, arrival)
            VALUES ('${travelID}', '${tokenID}', '${vehicleType}', '${departureTime}', '${arrivalTime}');
            DELETE FROM current_travels WHERE token_id = '${tokenID}';
            `
            )
        } else {

            var query = await pool.query(
                `
            INSERT INTO completed_travels (travel_id, token_id, vehicle, departure)
            VALUES ('${travelID}', '${tokenID}', '${vehicleType}', '${departureTime}');
            DELETE FROM current_travels WHERE token_id = '${tokenID}';
            `
            )
        }

        res.json();

    } catch (err) {
        console.error(err)
    }
})
app.post('/getTable', async (req, res) => {

    try {
        const table = req.body.table;

        var query = await pool.query(
            `
        SELECT column_name, data_type, column_default 
        FROM information_schema.columns
        WHERE table_name = 'completed_travels';

        `
        )


        res.json();

    } catch (err) {
        console.error(err)
    }
})
app.get('/getCurrentTravels', async (req, res) => {

    

    try {
        const query = await pool.query(
            `
            SELECT * FROM current_travels;
            `
        )

        res.json(query.rows);

    } catch (err) {
        console.error('getCurrentTravels', err)
    }
})
app.get('/getTokenTravels', async (req, res) => {
    const tokenID = req.query.tokenID;
    try {
/*         const query = await pool.query(
            `
            SELECT vehicle, departure, arrival, cost FROM completed_travels NATURAL JOIN tokens NATURAL JOIN vehicles 
            WHERE token_id = '${tokenID}'; 
            `
        ) */
        const query = await pool.query(
            `
            SELECT vehicle, departure, arrival, cost FROM completed_travels NATURAL JOIN vehicles 
            WHERE token_id = '${tokenID}'; 
            `
        )
        res.json(query.rows);
    } catch (err) {
        console.error(err)
    }
});
app.get('/getCustomerTravels', async (req, res) => {

    try {
        const customerID = req.query.customerID;

        const query = await pool.query(
            `
            SELECT vehicle, departure, arrival, cost FROM completed_travels NATURAL JOIN tokens NATURAL JOIN vehicles
            WHERE username = '${customerID}'; 
            `
        )

        res.json(query.rows);

    } catch (err) {
        console.error(err)
    }
});
app.get('/getCustomerBillings', async (req, res) => {

    try {
        const customerID = req.query.customerID;

        const query = await pool.query(
            `
            SELECT description, ocr, pay_by_date, SUM(cost) as total_cost, paid 
            FROM completed_travels NATURAL JOIN tokens NATURAL JOIN customer_billings NATURAL JOIN vehicles 
            WHERE username = '${customerID}' AND arrival > start_date AND arrival < end_date+1 
            GROUP BY pay_by_date, ocr, description, paid;
            `
        )

        res.json(query.rows);

    } catch (err) {
        console.error(err)
    }
});
app.post('/linkTokenToCustomer', async (req, res) => {
    try {
        const { customerID, tokenID } = req.body;

        const query = await pool.query(
            `
            INSERT INTO tokens (username, token_id) VALUES ('${customerID}', '${tokenID}');
            `
        )

        res.json();

    } catch (err) {
        console.error(err)
    }
})

//Auth

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);


        let query = await pool.query(
            `
            INSERT INTO customers (username, password) VALUES ('${username}', '${hashedPassword}');
            `
        );

        res.json();
        query = await pool.query(
            `
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-01-01', '2021-01-30', '2021-05-15', 'The bill for January 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-02-01', '2021-02-28', '2021-04-15', 'The bill for February 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-03-01', '2021-03-31', '2021-09-15', 'The bill for March 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-04-01', '2021-04-30', '2021-05-15', 'The bill for April 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-05-01', '2021-05-31', '2021-04-15', 'The bill for May 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-06-01', '2021-06-30', '2021-09-15', 'The bill for June 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-07-01', '2021-07-31', '2021-05-15', 'The bill for July 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-08-01', '2021-08-31', '2021-04-15', 'The bill for August 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-09-01', '2021-09-30', '2021-09-15', 'The bill for September 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-10-01', '2021-10-31', '2021-05-15', 'The bill for October 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-11-01', '2021-11-30', '2021-04-15', 'The bill for November 2021');
            INSERT INTO customer_billings (username, start_date, end_date, pay_by_date, description) 
                    VALUES ('${username}', '2021-12-01', '2021-12-31', '2021-09-15', 'The bill for December 2021');
            `
        );
    } catch (err) {
        console.error("/register", err)
    }
}) //
app.post('/login', async (req, res) => {
    // Authenticate User


    try {
        const { username, password } = req.body;

        const query = await pool.query(
            `
        SELECT password FROM customers WHERE username='${username}'; 
        `
        )
        const databasePassword = query.rows[0].password;

        if (await bcrypt.compare(password, databasePassword)) {
            console.log("Correct password!")

            const user = { name: username }

            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)




            const queryB = await pool.query(
                `
                INSERT INTO customer_jwt (username, jwt_token) VALUES ('${user.name}', '${refreshToken}');
                `)


            res.json({ accessToken: accessToken, refreshToken: refreshToken })
                

        } else {
            console.log("Wrong password!")
        }
    } catch (err) {
        console.error(err)
    }

}) //
app.post('/logout', async (req, res) => {

    console.log("Loggin out!")
    const { refreshToken } = req.body;

    const response = await pool.query(`
      DELETE FROM customer_jwt WHERE jwt_token='${refreshToken}' 
    `)

    res.json();

}) //
app.post('/getUsernameFromJWT', async (req, res) => {

    const { refreshToken } = req.body;
    const response = await pool.query(`
     SELECT username FROM customer_jwt WHERE jwt_token='${refreshToken}' 
    `)
    res.json(response.rows[0]?.username)
}) //
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
});