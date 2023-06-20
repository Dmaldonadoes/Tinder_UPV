const sqlite3 = require("sqlite3");
// .....................................................................
// .....................................................................
module.exports = class Logica {
  // .................................................................
  // nombreBD: Texto
  // -->
  //    constructor ()  -->
  // .................................................................
  constructor(nombreBD, cb) {
    this.laConexion = new sqlite3.Database(
      nombreBD,

      (err) => {
        if (!err) {
          this.laConexion.run("PRAGMA foreign_keys = ON");
        }
        cb(err);
      }
    );
  } // ()
  // .................................................................
  //LogicadelNegocio
  // .................................................................
  // Comandos básicos SQL
  // "Selct" "Insert into (nombre de la tabla)"
  // .................................................................

  // .................................................................
  // logindata:{username:texto, password:texto}
  //     -->
  //       comprobarContrasena --> u
  //El método devolvera -1 si el usuario o la contraseña son incorrectos
  // .................................................................

  comprobarContrasena(logindata) {
    //console.log(logindata);
    var textoSQL =
      "select password, users.id as id_usuario from login, users where users.username=$usuario and users.id=login.id_usuario";
    var valoresParaSQL = { $usuario: logindata.username };
    return new Promise((resolver, rechazar) => {
      this.laConexion.all(textoSQL, valoresParaSQL, (err, res) => {
        if (err) {
          rechazar(err);
        } else {
          console.log(res);
          //console.log(logindata.password)
          if (res[0] === undefined) {
            resolver([{ id_usuario: -1 }]);
          } else if (res[0].password === logindata.password) {
            resolver([{ id_usuario: res[0].id_usuario }]);
          } else {
            resolver([{ id_usuario: -1 }]);
            console.log("El usuario o contraseña contraseña son incorrectos");
          }
        }
      });
    });
  }
  // .................................................................
  // id_usuario:int
  //     -->
  //       encontrar_datos_ultimos_mensajes() -->{other_user_id:int, time: int}
  // .................................................................
  encontrar_datos_ultimos_mensajes(id_usuario) {
    var textoSQL = `
        SELECT
          m1.time,
          CASE
            WHEN m1.id_sender = $userId THEN m1.id_reciever
            ELSE m1.id_sender
          END AS other_user_id
        FROM mensajes AS m1
        WHERE (m1.id_sender = $userId OR m1.id_reciever = $userId)
        AND m1.time = (
            SELECT MAX(m2.time)
            FROM mensajes AS m2
            WHERE (m2.id_sender = m1.id_sender AND m2.id_reciever = m1.id_reciever)
            OR (m2.id_sender = m1.id_reciever AND m2.id_reciever = m1.id_sender)
        );
      `;
    var valoresParaSQL = { $userId: id_usuario };
    return new Promise((resolver, rechazar) => {
      this.laConexion.all(
        textoSQL,
        valoresParaSQL,

        (err, res) => {
          err ? rechazar(err) : resolver(res);
        }
      );
    });
  }
  // .................................................................
  // tabla:texto --> ...............................................
  //............. borrarFilasDe() -->.................
  // .................................................................
  borrarFilasDe(tabla) {
    return new Promise((resolver, rechazar) => {
      this.laConexion.run("delete from " + tabla + ";", (err) =>
        err ? rechazar(err) : resolver()
      );
    });
  } // ()

  // .................................................................
  // datos:{mensaje:texto, id_sender:int, id_reciever:int} --> .......
  //............. publicarMensaje() -->...............................
  // .................................................................
  publicarMensaje(datos) {
    var textoSQL = `INSERT INTO mensajes (time, id_sender, id_reciever, content) VALUES ($time, $id_sender, $id_reciever, $content);`;
    var valoresParaSQL = {
      $time: datos.time,
      $id_sender: datos.id_sender,
      $id_reciever: datos.id_reciever,
      $content: datos.content,
    };
    return new Promise((resolver, rechazar) => {
      this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
        err ? rechazar(err) : resolver();
      });
    });
  } // ()
  // .................................................................
  //          borrarFilasDeTodasLasTablas() -->
  // .................................................................
  async borrarFilasDeTodasLasTablas() {
    await this.borrarFilasDe("Matricula");
    await this.borrarFilasDe("Asignatura");
    await this.borrarFilasDe("Persona");
  } // ()
  // .................................................................
  //    id_usernae:int -->
  //recibirDatosAleaorios() --> {id:int, photo:blob, username:text, age:int, description:text}
  // .................................................................
  recibirDatosAleatorios(userId) {
    //console.log(logindata)
    const textoSQL = `
    SELECT * FROM users
    WHERE id != $userId
    ORDER BY RANDOM()
    LIMIT 1
  `;

    const valoresParaSQL = { $userId: userId };

    return new Promise((resolver, rechazar) => {
      this.laConexion.all(textoSQL, valoresParaSQL, (err, res) => {
        if (err) {
          rechazar(err);
        } else {
          resolver(res);
        }
      });
    });
  }
  // .................................................................
  //    id_username:int -->
  //obtenerDatosUsuario() --> {id:int, photo:blob, username:text, age:int, description:text}
  // .................................................................
  obtenerDatosUsuario(userId) {
    //console.log(logindata)
    const textoSQL = `
    SELECT * FROM users
    WHERE id = $userId
  `;

    const valoresParaSQL = { $userId: userId };

    return new Promise((resolver, rechazar) => {
      this.laConexion.all(textoSQL, valoresParaSQL, (err, res) => {
        if (err) {
          rechazar(err);
        } else {
          resolver(res);
        }
      });
    });
  }

  // .................................................................
  //    {id_usuario:int, photo:blob, username:text, age:int, description:text} -->
  //modificarDatosUsuario() --> {photo:blob, username:text, age:int, description:text}
  // .................................................................
  modificarDatosUsuario(datos) {
    const textoSQL = `
      UPDATE users
      SET 
        username = $username, 
        age = $age, 
        photo = $photo,
        description = $description
      WHERE id = $userId
    `;
    //
    const valoresParaSQL = {
      $userId: datos.id,
      $username: datos.username,
      $age: datos.age,
      $photo: Buffer.from(datos.photo, "base64"),
      $description: datos.description,
    };

    return new Promise((resolver, rechazar) => {
      this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
        if (err) {
          rechazar(err);
        } else {
          resolver();
        }
      });
    });
  }

  //
  //

  // .................................................................
  //          cerrar() -->
  // .................................................................
  cerrar() {
    return new Promise((resolver, rechazar) => {
      this.laConexion.close((err) => {
        err ? rechazar(err) : resolver();
      });
    });
  } // ()
}; // class
// .....................................................................
// .....................................................................
