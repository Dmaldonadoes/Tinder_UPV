// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {
  // GET /datosaleatorios?id_usuario<num>
  servidorExpress.get(
    "/datosaleatorios/:id_usuario",
    async function (peticion, respuesta) {
      console.log(" * GET /datosaleatorios ");
      // averiguo el dni
      var id_usuario = peticion.params.id_usuario;
      // llamo a la función adecuada de la lógica
      var res = await laLogica.recibirDatosAleatorios(id_usuario);
      // si el array de resultados no tiene una casilla ...
      if (res.length != 1) {
        // 404: not found
        respuesta
          .status(404)
          .send("no se ha podido envíar unos datos aleatorios ");
        return;
      }
      // todo ok
      respuesta.send(JSON.stringify(res));
    }
  ); // get /datosaleatorios

  // GET /datosUsuario?id_usuario<num>
  servidorExpress.get(
    "/datosUsuario/:id_usuario",
    async function (peticion, respuesta) {
      console.log(" * GET /datosUsuario ");
      // averiguo el id
      var id_usuario = peticion.params.id_usuario;
      // llamo a la función adecuada de la lógica
      var res = await laLogica.obtenerDatosUsuario(id_usuario);
      // si el array de resultados no tiene una casilla ...
      if (res.length != 1) {
        // 404: not found
        respuesta
          .status(404)
          .send("no se ha podido envíar unos datos aleatorios ");
        return;
      }
      // todo ok
      respuesta.send(JSON.stringify(res));
    }
  ); // get /datosaleatorios
  // // .......................................................
  // // GET /comprobarContrasena?username=<texto>&password=<password>
  // // .......................................................
  // servidorExpress.get(
  //   "/comprobarContrasena",
  //   async function (peticion, respuesta) {
  //     console.log(" * GET /comprobarcontrasena ");
  //
  //     var username = peticion.query.username;
  //     var password = peticion.query.password;
  //     console.log(username, password);
  //     if ((username == null) | (password == null)) {
  //       respuesta
  //         .status(404)
  //         .sendStatus("Ha habido un error al iniciar sesión");
  //       return;
  //     }
  //     // llamo a la función adecuada de la lógica
  //
  //     var res = await laLogica.comprobarContrasena({
  //       username: username,
  //       password: password,
  //     });
  //     console.log(res);
  //
  //     console.log(res);
  //     respuesta.send(res);
  //   }
  // );
  // GET /comprobarContrasena?username=<texto>&password=<password>
  // .......................................................
  servidorExpress.get(
    "/comprobarContrasena",
    async function (peticion, respuesta) {
      console.log(" * GET /comprobarcontrasena ");

      var username = peticion.query.username;
      var password = peticion.query.password;
      console.log(username, password);
      if ((username == null) | (password == null)) {
        respuesta
          .status(404)
          .sendStatus("Ha habido un error al iniciar sesión");
        return;
      }
      // llamo a la función adecuada de la lógica

      var res = await laLogica.comprobarContrasena({
        username: username,
        password: password,
      });

      respuesta.send(res);
    }
  );
  // .......................................................
  // POST /borrarFilasdeTablas
  // .......................................................
  servidorExpress.post("/borrarFilasde", async function (peticion, respuesta) {
    console.log(" * GET /borrarFilasde/ ");
    // averiguo la tabla
    var tabla = JSON.parse(peticion.body).tabla;
    // llamo a la función adecuada de la lógica

    await laLogica.borrarFilasDe(tabla);
    respuesta.send("TODO OK");
  });
  // .......................................................
  // POST /borrarFilasdeTodasLasTablas
  // .......................................................
  servidorExpress.post(
    "/borrarFilasdeTodasLasTablas",
    async function (peticion, respuesta) {
      console.log(" * POST /borrarFilasdeTodasLasTablas ");

      // llamo a la función adecuada de la lógica

      await laLogica.borrarFilasDeTodasLasTablas();
      respuesta.send("TODO OK");
    }
  );
  // .......................................................
  // GET /buscarAsignatura?cod=<num>
  // .......................................................
  servidorExpress.get(
    "/buscarAsignatura",
    async function (peticion, respuesta) {
      console.log(" * GET /buscarAsignatura ");

      var codigo = peticion.query.cod;

      // llamo a la función adecuada de la lógica

      var res = await laLogica.buscarAsignaturaconCodigo(codigo);

      if (res.length != 1) {
        respuesta.status(404).send("no hay ninguna asignatura con ese codigo");
        return;
      }
      respuesta.send(res[0]);
    }
  );

  // POST /modificarDatosUsuario
  // body:
  //  {id:int, photo:blob, username:text, age:int, description:text}

  servidorExpress.post(
    "/modificarDatosUsuario",
    async function (peticion, respuesta) {
      try {
        console.log(" * POST /modificardatosUsuario");
        // averiguo los datos
        var datos = JSON.parse(peticion.body);
        console.log(datos);
        // llamo a la función adecuada de la lógica

        await laLogica.modificarDatosUsuario(datos);

        respuesta.status(200).send("TODO OK");

        return;
      } catch (err) {
        respuesta.send(err.message);
      }
    }
    // todo ok
  ); // get /persona
}; // cargar()
// .....................................................................
// .....................................................................
