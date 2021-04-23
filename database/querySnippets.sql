
SELECT * FROM completed_travels NATURAL JOIN tokens NATURAL JOIN customer_billings NATURAL JOIN vehicles WHERE customerid = 'Jesper' AND arrival > startdate AND arrival < enddate+1;


DROP TABLE date_testing;
CREATE TABLE date_testing(
    date DATE
);
INSERT INTO date_testing (date) VALUES ('2021-03-14');
INSERT INTO date_testing (date) VALUES ('2021-04-14');
INSERT INTO date_testing (date) VALUES ('2021-05-14');

INSERT INTO customer_jwt (username, jwt_token) VALUES ('jesper', '123');

INSERT INTO current_travels (token_id) VALUES ('10'); 

const departure = SELECT departure FROM current_travels WHERE token_id = '10';

travel_id, token_id, departure_time

INSERT INTO completed_travels (travel_id, token_id, departure) 
VALUES (travel_id, token_id, departure_time);


SELECT description, ocr, pay_by_date, SUM(cost) as total_cost, paid 
FROM completed_travels NATURAL JOIN tokens NATURAL JOIN customer_billings NATURAL JOIN vehicles 
WHERE customer_id = 'Jesper' AND arrival > start_date AND arrival < end_date+1 
GROUP BY pay_by_date, ocr, description, paid;


SELECT description, ocr, pay_by_date, SUM(cost) as total_cost, paid 
FROM completed_travels NATURAL JOIN tokens NATURAL JOIN customer_billings NATURAL JOIN vehicles 
WHERE username = '1' AND arrival > start_date AND arrival < end_date+1 
GROUP BY pay_by_date, ocr, description, paid;

SELECT description, ocr, pay_by_date, SUM(cost) as total_cost, paid 
FROM completed_travels NATURAL JOIN tokens NATURAL JOIN customer_billings NATURAL JOIN vehicles 
WHERE username = '${customerID}' AND arrival > start_date AND arrival < end_date+1 
GROUP BY pay_by_date, ocr, description, paid;

-- cat database.sql | heroku pg:psql -a murmuring-everglades-12448 