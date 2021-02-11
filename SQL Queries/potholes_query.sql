CREATE TABLE potholes (
ticket_id INT,
entereddate TIMESTAMP,
lastmodified TIMESTAMP,
closeddate TIMESTAMP,
status VARCHAR(25),
contactmethod VARCHAR(25),
category VARCHAR(25),
department VARCHAR(50),
location VARCHAR(255),
city VARCHAR(25),
state VARCHAR(2),
zip INT,
latitude FLOAT,
longitude FLOAT,
month INT,
year INT
);

SELECT * FROM potholes;