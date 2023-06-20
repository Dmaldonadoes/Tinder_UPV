
--selecciona los mensajes y todos los datos con los que haya interactuado un usuario
SELECT m1.*
FROM mensajes AS m1
WHERE (m1.id_sender = USER_ID OR m1.id_reciever = USER_ID)
AND m1.time = (
    SELECT MAX(m2.time)
    FROM mensajes AS m2
    WHERE (m2.id_sender = m1.id_sender AND m2.id_reciever = m1.id_reciever)
    OR (m2.id_sender = m1.id_reciever AND m2.id_reciever = m1.id_sender)
);

--selecciona la hora y el id del otro usuario del ultimo mensaje en el que hay participado un usuario

SELECT
  m1.time,
  CASE
    WHEN m1.id_sender = USER_ID THEN m1.id_reciever
    ELSE m1.id_sender
  END AS other_user_id
FROM mensajes AS m1
WHERE (m1.id_sender = USER_ID OR m1.id_reciever = USER_ID)
AND m1.time = (
    SELECT MAX(m2.time)
    FROM mensajes AS m2
    WHERE (m2.id_sender = m1.id_sender AND m2.id_reciever = m1.id_reciever)
    OR (m2.id_sender = m1.id_reciever AND m2.id_reciever = m1.id_sender)
);



