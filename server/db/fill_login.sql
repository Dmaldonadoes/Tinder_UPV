

-- Insert 5 users into the users table
INSERT INTO users (username, age, description) VALUES ('user1', 25, 'User 1 description');
INSERT INTO users (username, age, description) VALUES ('user2', 30, 'User 2 description');
INSERT INTO users (username, age, description) VALUES ('user3', 35, 'User 3 description');
INSERT INTO users (username, age, description) VALUES ('user4', 28, 'User 4 description');
INSERT INTO users (username, age, description) VALUES ('user5', 22, 'User 5 description');

-- Insert 5 login values into the login table
INSERT INTO login (id_usuario, password) VALUES (1, 'password1');
INSERT INTO login (id_usuario, password) VALUES (2, 'password2');
INSERT INTO login (id_usuario, password) VALUES (3, 'password3');
INSERT INTO login (id_usuario, password) VALUES (4, 'password4');
INSERT INTO login (id_usuario, password) VALUES (5, 'password5');


--INSERT 11 values into the message table
INSERT INTO mensajes (time, id_sender, id_reciever, content) VALUES
(1000, 2, 1, 'Hola'),
(1001, 3, 1, 'Que tal?'),
(1002, 2, 1, 'Soy Pedro'),
(1003, 1, 3, 'Estoy bien'),
(1004, 2, 3, 'Que cuentas?'),
(1005, 3, 1, 'Como te llamas?'),
(1006, 3, 1, 'Me aburro'),
(1007, 2, 3, 'Estudia'),
(1008, 3, 2, 'Que haces mañana?'),
(1009, 1, 2, 'Juegas a fútbol'),
(1010, 2, 3, 'Quiero comer');