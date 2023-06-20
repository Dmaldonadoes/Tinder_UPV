-- Create the table 'users'
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    age INTEGER,
    photo BLOB,
    description TEXT
);


-- Create the table 'mensajes'
CREATE TABLE mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time INTEGER NOT NULL,
    id_sender INTEGER NOT NULL,
    id_reciever INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (id_sender) REFERENCES users (id),
    FOREIGN KEY (id_reciever) REFERENCES users (id)
);


-- Create the table 'login'
CREATE TABLE login (
    id_usuario INTEGER PRIMARY KEY,
    password TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES users (id)
);
