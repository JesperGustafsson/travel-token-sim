DROP TABLE current_travels;
CREATE TABLE current_travels(
    travel_id SERIAL PRIMARY KEY,
    token_id VARCHAR(255),
    vehicle VARCHAR(255),
    departure TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE completed_travels;
CREATE TABLE completed_travels(
    travel_id VARCHAR(255) PRIMARY KEY,
    token_id VARCHAR(255),
    vehicle VARCHAR(255),
    departure TIMESTAMP,
    arrival TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE vehicles;
CREATE TABLE vehicles(
    vehicle VARCHAR(255) PRIMARY KEY,
    cost INT
);
INSERT INTO vehicles (vehicle, cost) VALUES ('truck', 100);
INSERT INTO vehicles (vehicle, cost) VALUES ('car', 50);
INSERT INTO vehicles (vehicle, cost) VALUES ('bike', 25);

DROP TABLE tokens;
CREATE TABLE tokens (
    token_id VARCHAR(255) DEFAULT NULL PRIMARY KEY,
    username VARCHAR(255) DEFAULT NULL
);

DROP TABLE customers;
CREATE TABLE customers(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

DROP TABLE customer_jwt;
CREATE TABLE customer_jwt(
    username VARCHAR(255) PRIMARY KEY,
    jwt_token VARCHAR(255)
);

DROP TABLE customer_billings;
CREATE TABLE customer_billings(
    ocr SERIAL PRIMARY KEY,
    paid BOOLEAN DEFAULT FALSE,
    username VARCHAR(255), 
    start_date DATE,
    end_date DATE,
    pay_by_date DATE,
    description VARCHAR(255)
);

