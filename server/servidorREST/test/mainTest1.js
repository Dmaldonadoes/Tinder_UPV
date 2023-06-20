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

  // ....................................................
  // ....................................................
  it("probar POST /modificarDatosUsuario", function (hecho) {
    request.post(
      {
        url: IP_PUERTO + "/modificarDatosUsuario/",
        headers: { "User-Agent": "javi", "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1,
          username: "user_3489",
          age: 27,
          photo:
            "/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAAqACAAQAAAABAAAA4aADAAQAAAABAAAA4QAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+IH2ElDQ19QUk9GSUxFAAEBAAAHyGFwcGwCIAAAbW50clJHQiBYWVogB9kAAgAZAAsAGgALYWNzcEFQUEwAAAAAYXBwbAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZGVzYwAAAQgAAABvZHNjbQAAAXgAAAWKY3BydAAABwQAAAA4d3RwdAAABzwAAAAUclhZWgAAB1AAAAAUZ1hZWgAAB2QAAAAUYlhZWgAAB3gAAAAUclRSQwAAB4wAAAAOY2hhZAAAB5wAAAAsYlRSQwAAB4wAAAAOZ1RSQwAAB4wAAAAOZGVzYwAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAFEdlbmVyaWMgUkdCIFByb2ZpbGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1sdWMAAAAAAAAAHwAAAAxza1NLAAAAKAAAAYRkYURLAAAAJAAAAaxjYUVTAAAAJAAAAdB2aVZOAAAAJAAAAfRwdEJSAAAAJgAAAhh1a1VBAAAAKgAAAj5mckZVAAAAKAAAAmhodUhVAAAAKAAAApB6aFRXAAAAEgAAArhrb0tSAAAAFgAAAspuYk5PAAAAJgAAAuBjc0NaAAAAIgAAAwZoZUlMAAAAHgAAAyhyb1JPAAAAJAAAA0ZkZURFAAAALAAAA2ppdElUAAAAKAAAA5ZzdlNFAAAAJgAAAuB6aENOAAAAEgAAA75qYUpQAAAAGgAAA9BlbEdSAAAAIgAAA+pwdFBPAAAAJgAABAxubE5MAAAAKAAABDJlc0VTAAAAJgAABAx0aFRIAAAAJAAABFp0clRSAAAAIgAABH5maUZJAAAAKAAABKBockhSAAAAKAAABMhwbFBMAAAALAAABPBydVJVAAAAIgAABRxlblVTAAAAJgAABT5hckVHAAAAJgAABWQAVgFhAGUAbwBiAGUAYwBuAP0AIABSAEcAQgAgAHAAcgBvAGYAaQBsAEcAZQBuAGUAcgBlAGwAIABSAEcAQgAtAHAAcgBvAGYAaQBsAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAEMepQB1ACAAaADsAG4AaAAgAFIARwBCACAAQwBoAHUAbgBnAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCAMEAbAB0AGEAbADhAG4AbwBzACAAUgBHAEIAIABwAHIAbwBmAGkAbJAadSgAUgBHAEKCcl9pY8+P8Md8vBgAIABSAEcAQgAg1QS4XNMMx3wARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAUAByAG8AZgBpAGwAIABSAEcAQgAgAGcAZQBuAGUAcgBpAGMAQQBsAGwAZwBlAG0AZQBpAG4AZQBzACAAUgBHAEIALQBQAHIAbwBmAGkAbABQAHIAbwBmAGkAbABvACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAG9mbpAaAFIARwBCY8+P8GWHTvZOAIIsACAAUgBHAEIAIDDXMO0w1TChMKQw6wOTA7UDvQO5A7oDzAAgA8ADwQO/A8YDrwO7ACAAUgBHAEIAUABlAHIAZgBpAGwAIABSAEcAQgAgAGcAZQBuAOkAcgBpAGMAbwBBAGwAZwBlAG0AZQBlAG4AIABSAEcAQgAtAHAAcgBvAGYAaQBlAGwOQg4bDiMORA4fDiUOTAAgAFIARwBCACAOFw4xDkgOJw5EDhsARwBlAG4AZQBsACAAUgBHAEIAIABQAHIAbwBmAGkAbABpAFkAbABlAGkAbgBlAG4AIABSAEcAQgAtAHAAcgBvAGYAaQBpAGwAaQBHAGUAbgBlAHIAaQENAGsAaQAgAFIARwBC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3+6M1ZW0Y/eOKvgAdBRVqI7FdbaNRg81KI416Cn0VVhhwKWkooAXNJRRQA0ojdRmomt42HAxU9FFgKLWhA+U5qs8Tp94Vr0EA9RmpcRWMWitKS2R+RwaoyRPGcGpasKxHRRRUiCiiigAooooAKKKKAP/0WUUUVymQUUUUAFSwxGVvaou+K1okEaAVUVcaQ5UVBhadRRWhQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUhAYYbpS0UAZs8JjOR0NV62HUOpU96yGG1ivpWclYloSiiipEFFFFABRRRQB//0mUUUVymQUUUUAA6j61tdqxR1H1ra7VcCkFFFFWMKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFFY8v8ArG+tbArHl/1jfWpkJjKKKKzJCiiigAooooA//9NlFFFcpkFFFFAAOo+tbXasUdR9a2u1XApBRRRVjCiiigAooooAKKKKACiiigAooooAKKKKACiiigBRWPL/AKxvrWwKx5f9Y31qZCYyiiisyQooooAKKKKAP//UZRRRXKZBRRRQADqPrW12rFHUfWtrtVwKQUUUVYwooooAKKKKACiiigAooooAKKKKACiiigAooooAUVjy/wCsb61sCseX/WN9amQmMooorMkKKKKACiiigD//1WUUUVymQUUUUAA6j61tdqxR1H1ra7VcCkFFFFWMKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFFY8v8ArG+tbArHl/1jfWpkJjKKKKzJCiiigAooooA//9k=",
          description: "This is a random user.",
        }),
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?");

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
        assert.equal(
          res[0].username,
          "user_3489",
          "¿el usuario no es igual a user_3489"
        );
        assert.equal(res[0].age, 27, "¿la edad no es 27?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");

        hecho();
      } // callback()
    ); // .get
  }); // it

  it("probar POST /modificarDatosUsuario 2", function (hecho) {
    request.post(
      {
        url: IP_PUERTO + "/modificarDatosUsuario/",
        headers: { "User-Agent": "javi", "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1,
          username: "user1",
          age: 25,
          photo:
            "/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAAqACAAQAAAABAAAA4aADAAQAAAABAAAA4QAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+IH2ElDQ19QUk9GSUxFAAEBAAAHyGFwcGwCIAAAbW50clJHQiBYWVogB9kAAgAZAAsAGgALYWNzcEFQUEwAAAAAYXBwbAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZGVzYwAAAQgAAABvZHNjbQAAAXgAAAWKY3BydAAABwQAAAA4d3RwdAAABzwAAAAUclhZWgAAB1AAAAAUZ1hZWgAAB2QAAAAUYlhZWgAAB3gAAAAUclRSQwAAB4wAAAAOY2hhZAAAB5wAAAAsYlRSQwAAB4wAAAAOZ1RSQwAAB4wAAAAOZGVzYwAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAFEdlbmVyaWMgUkdCIFByb2ZpbGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1sdWMAAAAAAAAAHwAAAAxza1NLAAAAKAAAAYRkYURLAAAAJAAAAaxjYUVTAAAAJAAAAdB2aVZOAAAAJAAAAfRwdEJSAAAAJgAAAhh1a1VBAAAAKgAAAj5mckZVAAAAKAAAAmhodUhVAAAAKAAAApB6aFRXAAAAEgAAArhrb0tSAAAAFgAAAspuYk5PAAAAJgAAAuBjc0NaAAAAIgAAAwZoZUlMAAAAHgAAAyhyb1JPAAAAJAAAA0ZkZURFAAAALAAAA2ppdElUAAAAKAAAA5ZzdlNFAAAAJgAAAuB6aENOAAAAEgAAA75qYUpQAAAAGgAAA9BlbEdSAAAAIgAAA+pwdFBPAAAAJgAABAxubE5MAAAAKAAABDJlc0VTAAAAJgAABAx0aFRIAAAAJAAABFp0clRSAAAAIgAABH5maUZJAAAAKAAABKBockhSAAAAKAAABMhwbFBMAAAALAAABPBydVJVAAAAIgAABRxlblVTAAAAJgAABT5hckVHAAAAJgAABWQAVgFhAGUAbwBiAGUAYwBuAP0AIABSAEcAQgAgAHAAcgBvAGYAaQBsAEcAZQBuAGUAcgBlAGwAIABSAEcAQgAtAHAAcgBvAGYAaQBsAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAEMepQB1ACAAaADsAG4AaAAgAFIARwBCACAAQwBoAHUAbgBnAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCAMEAbAB0AGEAbADhAG4AbwBzACAAUgBHAEIAIABwAHIAbwBmAGkAbJAadSgAUgBHAEKCcl9pY8+P8Md8vBgAIABSAEcAQgAg1QS4XNMMx3wARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAUAByAG8AZgBpAGwAIABSAEcAQgAgAGcAZQBuAGUAcgBpAGMAQQBsAGwAZwBlAG0AZQBpAG4AZQBzACAAUgBHAEIALQBQAHIAbwBmAGkAbABQAHIAbwBmAGkAbABvACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAG9mbpAaAFIARwBCY8+P8GWHTvZOAIIsACAAUgBHAEIAIDDXMO0w1TChMKQw6wOTA7UDvQO5A7oDzAAgA8ADwQO/A8YDrwO7ACAAUgBHAEIAUABlAHIAZgBpAGwAIABSAEcAQgAgAGcAZQBuAOkAcgBpAGMAbwBBAGwAZwBlAG0AZQBlAG4AIABSAEcAQgAtAHAAcgBvAGYAaQBlAGwOQg4bDiMORA4fDiUOTAAgAFIARwBCACAOFw4xDkgOJw5EDhsARwBlAG4AZQBsACAAUgBHAEIAIABQAHIAbwBmAGkAbABpAFkAbABlAGkAbgBlAG4AIABSAEcAQgAtAHAAcgBvAGYAaQBpAGwAaQBHAGUAbgBlAHIAaQENAGsAaQAgAFIARwBCACAAcAByAG8AZgBpAGwAVQBuAGkAdwBlAHIAcwBhAGwAbgB5ACAAcAByAG8AZgBpAGwAIABSAEcAQgQeBDEESQQ4BDkAIAQ/BEAEPgREBDgEOwRMACAAUgBHAEIARwBlAG4AZQByAGkAYwAgAFIARwBCACAAUAByAG8AZgBpAGwAZQZFBkQGQQAgBioGOQYxBkoGQQAgAFIARwBCACAGJwZEBjkGJwZFAAB0ZXh0AAAAAENvcHlyaWdodCAyMDA3IEFwcGxlIEluYy4sIGFsbCByaWdodHMgcmVzZXJ2ZWQuAFhZWiAAAAAAAADzUgABAAAAARbPWFlaIAAAAAAAAHRNAAA97gAAA9BYWVogAAAAAAAAWnUAAKxzAAAXNFhZWiAAAAAAAAAoGgAAFZ8AALg2Y3VydgAAAAAAAAABAc0AAHNmMzIAAAAAAAEMQgAABd7///MmAAAHkgAA/ZH///ui///9owAAA9wAAMBs/8AAEQgA4QDhAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAHBwcHBwcMBwcMEQwMDBEXERERERcdFxcXFxcdIx0dHR0dHSMjIyMjIyMjKioqKioqMTExMTE3Nzc3Nzc3Nzc3P/bAEMBIiQkODQ4YDQ0YOacgJzm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5v/dAAQAD//aAAwDAQACEQMRAD8AZRRRXKZBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/0GUUUVymQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9FlFFFcpkFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//SZRRRXKZBRRRQAUUUUAFFFFABRRRQAUUVcittw3SU0rgVFVmOFFS/Z5j2rTCqowBS1fKVYy/s03pUbIyfeFbFBAPUUcoWMWir0tqMEx9aokEHBqGrCsFFFFIQUUUUAFFFFABRRRQAUUUUAFFFFAH/02UUUVymQUUUUAFFFFABRRRQAUUU5FLMAKALVtCCPMb8KvUABRgUVqlYsKKKKYBRRRQAVVuIQw3jqOtWqOvBoauBiUtSTIUkPp2qOsiAooopAFFFFABRRRQAUUUUAFFFFAH/1GUUUVymQUUUUAFFFFABRRRQAVYtRmX8Kr1Ytf8AW/hTW40aVFFFalBRRRQAUUUUAFFFFAFC8GGWqlXLz7y/SqdZy3JYUUUVIgooooAKKKKACiiigAooooA//9VlFFFcpkFFFFABRRRQAUUUUAFSRPscGo6KYG1RVa2k3ptPUVZrVMsKKKKACiiigApaSoppBGnuaAKNw++THpUFGSeTRWTICiiikAUUUUAFFFFABRRRQAUUUUAf/9ZlFFFcpkFFFFABRRRQAUUUUAFFFFACqxU7lrSinWQc8Gsykqk7DTNuisxLiRepyKm+2f7NVzIdy7RVL7YP7tRPcyN93inzILl2SZIxnOTWY7tI25qb1OTRUN3E2FFFFSIKKKKACiiigAooooAKKKKACiiigD//12UUUVymQUUUUAFFFFABRRRQAUUUUAFFJSgE9KACinbH9DR5cn900wG0U7y5P7po2P8A3TQA2iggjrxSUgFooooAKKKKACiiigAooooAKKKKACiiigD/0GUUUVymQUUUUAFFFFABRTkRnOFFX47ZV5bk00rjsUFR3+6M1ZW0Y/eOKvgAdBRVqI7FdbaNRg81KI416Cn0VVhhwKWkooAXNJRRQA0ojdRmomt42HAxU9FFgKLWhA+U5qs8Tp94Vr0EA9RmpcRWMWitKS2R+RwaoyRPGcGpasKxHRRRUiCiiigAooooAKKKKAP/0WUUUVymQUUUUAFSwxGVvaou+K1okEaAVUVcaQ5UVBhadRRWhQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUhAYYbpS0UAZs8JjOR0NV62HUOpU96yGG1ivpWclYloSiiipEFFFFABRRRQB//0mUUUVymQUUUUAA6j61tdqxR1H1ra7VcCkFFFFWMKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFFY8v8ArG+tbArHl/1jfWpkJjKKKKzJCiiigAooooA//9NlFFFcpkFFFFAAOo+tbXasUdR9a2u1XApBRRRVjCiiigAooooAKKKKACiiigAooooAKKKKACiiigBRWPL/AKxvrWwKx5f9Y31qZCYyiiisyQooooAKKKKAP//UZRRRXKZBRRRQADqPrW12rFHUfWtrtVwKQUUUVYwooooAKKKKACiiigAooooAKKKKACiiigAooooAUVjy/wCsb61sCseX/WN9amQmMooorMkKKKKACiiigD//1WUUUVymQUUUUAA6j61tdqxR1H1ra7VcCkFFFFWMKKKKACiiigAooooAKKKKACiiigAooooAKKKKAFFY8v8ArG+tbArHl/1jfWpkJjKKKKzJCiiigAooooA//9k=",
          description: "User 1 description",
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
  /*it("probar GET /buscarAsignauta", function (hecho) {
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
