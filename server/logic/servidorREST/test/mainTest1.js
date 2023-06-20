// ........................................................
// mainTest1.js
// ........................................................
var request = require("request");
var assert = require("assert");
// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080";
// ........................................................
// main ()
// ........................................................
describe("Test 1 : Comprobación de metodos de Usuarios ", function () {
  // ....................................................
  // ....................................................
  it("probar GET datosaleatorios", function (hecho) {
    request.get(
      {
        url: IP_PUERTO + "/datosaleatorios/1",
        headers: { "User-Agent": "javi" },
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        var res = JSON.parse(carga);

        assert.notEqual(res[0].id, 1, "El id es el mismo que el ontroducido?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");

        hecho();
      } // callback()
    ); // .get
  }); //it

  it("probar GET /datosUsuario", function (hecho) {
    request.get(
      {
        url: IP_PUERTO + "/datosUsuario/1",
        headers: { "User-Agent": "javi" },
      },
      function (err, respuesta, carga) {
        var res = JSON.parse(carga);

        assert.equal(err, null, "¿ha habido un error?");

        assert.equal(res[0].id, 1, "¿el id es igual a 1");
        assert.equal(res[0].username, "user1", "¿el id es igual a 1");
        assert.equal(res[0].age, 25, "¿el id es igual a 1");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");

        hecho();
      } // callback()
    ); // .get
  }); // it

  // ....................................................
  // ....................................................
  /*it("probar POST /insertarAsignatura", function (hecho) {
    request.post(
      {
        url: IP_PUERTO + "/insertarAsignatura",
        headers: { "User-Agent": "jordi", "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: 18345, nombre: "Estadística" }),
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");

        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        hecho();
      } // callback()
    ); // .get
  }); //it
  // ....................................................
  // ....................................................
  it("probar GET /buscarAsignauta", function (hecho) {
    request.get(
      {
        url: IP_PUERTO + "/buscarAsignatura?cod=18345",
        headers: { "User-Agent": "jordi" },
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        var solucion = JSON.parse(carga);

        assert.equal(
          solucion.nombre,
          "Estadística",
          "¿La respuesta no es Javier?"
        );
        hecho();
      } // callback()
    ); // .get
  }); //it
  // ....................................................
  // ....................................................
  it("probar POST /insertarpersona", function (hecho) {
    request.post(
      {
        url: IP_PUERTO + "/insertarpersona",
        headers: { "User-Agent": "jordi", "Content-Type": "application/json" },
        body: JSON.stringify({
          dni: "73137014G",
          nombre: "Javier",
          apellidos: "Gracia",
        }),
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");

        hecho();
      } // callback()
    ); // .get
  }); //it
  // ....................................................
  // ....................................................
  it("probar GET /persona/:dni", function (hecho) {
    request.get(
      {
        url: IP_PUERTO + "/persona/73137014G",
        headers: { "User-Agent": "jordi" },
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        var respuesta = JSON.parse(carga);
        assert.equal(respuesta.nombre, "Javier", "¿La respuesta no es Javier?");
        hecho();
      } // callback()
    ); // .get
  }); //it
  // ....................................................
  // ....................................................
  it("probar POST /matricular", function (hecho) {
    request.post(
      {
        url: IP_PUERTO + "/matricular",
        headers: { "User-Agent": "jordi", "Content-Type": "application/json" },
        body: JSON.stringify({ dni: "73137014G", codigo: 18345 }),
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");

        hecho();
      } // callback()
    ); // .get
  }); //it
  it("probar GET /buscarDNI", function (hecho) {
    request.get(
      {
        url: IP_PUERTO + "/buscarDNI?cod=18345",
        headers: { "User-Agent": "jordi", "Content-Type": "application/json" },
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        var resultado = JSON.parse(carga);
        assert.equal(resultado[0].dni, "73137014G", "El DNI no es 73137014G");
        hecho();
      } // callback()
    ); // .get
  }); //it
  it("probar GET /buscarcodigos", function (hecho) {
    request.get(
      {
        url: IP_PUERTO + "/buscarcodigos?apellidos=Gracia",
        headers: { "User-Agent": "jordi", "Content-Type": "application/json" },
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        var resultado = JSON.parse(carga);
        assert.equal(resultado[0].codigo, 18345, "El código no es 18345?");
        hecho();
      } // callback()
    ); // .get
  }); //it*/
}); // describe
