// mainTest1.js
// ........................................................
const Logica = require("../Logica.js");
var assert = require("assert");
// ........................................................
// main ()
// ........................................................
describe("Test 1: metodos de mensajes", function () {
  // ....................................................
  // ....................................................
  var laLogica = null;
  // ....................................................
  // ....................................................
  it("conectar a la base de datos", function (hecho) {
    laLogica = new Logica("../db/tinder.db", function (err) {
      if (err) {
        throw new Error("No he podido conectar con tinder.db");
      }
      hecho();
    }); // it
  });

  // ....................................................
  // ....................................................
  it("borrar todas las filas de la tabla mensajes", async function () {
    await laLogica.borrarFilasDe("mensajes");
  }); //
  // ....................................................
  // ....................................................
  it("puedo iniciar sesión", async function () {
    var res = await laLogica.comprobarContrasena({
      username: "user1",
      password: "password1",
    });

    assert.equal(res[0].id_usuario, 1, "¿no es igual 1?");
  }); // it
  // ....................................................
  // ....................................................
  it("no puedo iniciar sesión", async function () {
    var res = await laLogica.comprobarContrasena({
      username: "user2",
      password: "password1",
    });

    assert.equal(res[0].id_usuario, -1, "¿no es igual -1?");
  }); // it
  // ....................................................
  // ....................................................

  it("can insert messages", async function () {
    const messages = [
      { time: 1000, id_sender: 2, id_reciever: 1, content: "Hola" },
      { time: 1001, id_sender: 3, id_reciever: 1, content: "Que tal?" },
      { time: 1002, id_sender: 2, id_reciever: 1, content: "Soy Pedro" },
      { time: 1003, id_sender: 1, id_reciever: 3, content: "Estoy bien" },
      { time: 1004, id_sender: 2, id_reciever: 3, content: "Que cuentas?" },
      { time: 1005, id_sender: 3, id_reciever: 1, content: "Como te llamas?" },
      { time: 1006, id_sender: 3, id_reciever: 1, content: "Me aburro" },
      { time: 1007, id_sender: 2, id_reciever: 3, content: "Estudia" },
      {
        time: 1008,
        id_sender: 3,
        id_reciever: 2,
        content: "Que haces mañana?",
      },
      { time: 1009, id_sender: 1, id_reciever: 2, content: "Juegas a fútbol" },
      { time: 1010, id_sender: 2, id_reciever: 3, content: "Quiero comer" },
    ];
    for (const message of messages) {
      try {
        await laLogica.publicarMensaje(message);
        //console.log(`Message inserted: ${JSON.stringify(message)}`);
      } catch (err) {
        console.error(
          `Error inserting message: ${JSON.stringify(message)}, Error: ${err}`
        );
        assert.fail(
          `Error inserting message: ${JSON.stringify(message)}, Error: ${err}`
        );
      }
    }
  });

  it("puedo recibir la hora y el otro usuario de cada último mensaje de una conversación", async function () {
    var res = await laLogica.encontrar_datos_ultimos_mensajes(1);

    assert.equal(res.length, 2, "¿no hay dos resultados");
    assert.equal(res[0].time, 1006, "¿no hay dos resultados");
    assert.equal(res[0].other_user_id, 3, "¿no hay dos resultados");
    assert.equal(res[1].time, 1009, "¿no hay dos resultados");
    assert.equal(res[1].other_user_id, 2, "¿no hay dos resultados");
  }); // it
  // ....................................................
  // ....................................................

  it("puedo obtener los datos de un usuario aleatorio", async function () {
    var res = await laLogica.recibirDatosAleatorios(1);
    //console.log(res[0]);

    assert.notEqual(res[0].id, 1, "¿el id es igual a 1");
  }); // it
  // ....................................................
  // ....................................................
  it("puedo obtener los datos de un usuario", async function () {
    var res = await laLogica.obtenerDatosUsuario(1);
    //console.log(res[0]);

    assert.equal(res[0].id, 1, "¿el id es igual a 1");
    assert.equal(res[0].username, "user1", "¿el id es igual a 1");
    assert.equal(res[0].age, 25, "¿el id es igual a 1");
  }); // it

  /*it("no puedo insertar una persona con dni que ya está",
                async function () {
                        var error = null
                        try {
                                await laLogica.insertarPersona(
                                        {
                                                dni: "1234A", nombre: "Pepa",
                                                apellidos: "Pérez Pérez"
                                        })
                        } catch (err) {
                                error = err
                        }
                        assert(error, "¿Ha insertado el dni que ya estaba 1234A? (¿No ha pasado por el catch()?")
                }) // it
        // ....................................................
        // ....................................................
        it("cerrar conexión a la base de datos",

                async function () {
                        try {
                                await laLogica.cerrar()
                        } catch (err) {

                                // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                                throw new Error("cerrar conexión a BD fallada: " + err)
                        }
                }) // it*/
}); // describe
