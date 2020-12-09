<template>
  <router-view/>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
.acomodar{
  margin: 0;
  padding: 0;
}
/* swal */
.swal-overlay {
  background-color: rgba(44, 0, 53, 0.9);
}
.swal-modal {
  background-color: rgb(50, 50, 223);
  border: 3px solid rgb(255, 255, 255);
}
.swal-title {
  margin: 0px;
  font-size: 18px;
  margin-bottom: 28px;
  color: #000;
  text-transform: uppercase;
}
.swal-icon{
  height: 40%;
  width: 40%;
}
.swal-text{
  color: black;
}
.swal-footer {
  background-color: rgb(245, 248, 250);
  margin-top: 32px;
  border-top: 1px solid #bac2c7;
  overflow: hidden;
  text-align: center;
}
.swal-button {
  padding: 10px 19px;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid #000000;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  color: rgb(255, 255, 255);
  background: linear-gradient(#f1f1f1, #4c59ee, #1e2feb, #4c59ee, #f1f1f1);
}
/* intentos y tiempo  */
.encabezado{
  border: solid 3px black;
  border-top: 0px ;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: auto;
}
.encabezado-imagenes{
  width: 25px;
  height: 30px;
  padding: 0px;
}
.encabezado-texto{
  border-radius: 5px;
  width: 10%;
  padding: 4px 15px;
  background: rgba(255, 255, 255, 0);
  border-style: solid;
  border-width: 2px;
  border-color: white;
  color: white;
}
.col{
  height: 99%;
  position: relative;
}
/* acomodar las imagenes del juego */
.vh-juego{
  background: url('assets/fondo/fondo.jpg');
  background-size: 100%;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 80px auto;
}
/*centrado*/
.calcular-fondo{
  background: url('assets/fondo/fondo.jpg');
  background-size: 100%;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
}
.calcular-centro{
  display: table-cell;
  vertical-align: middle;
}
.calcular-centrado{
  width: 50%;
  padding: 3px 3px 3px 5px;

  display: inline-block;
}
/* sin pading */
.margen{
  margin: auto;
}
.margen img{
  margin: auto;
  position:absolute;
  height:99%;
  width:98%;
  top:0px;
  left:0px;
}
/* imagen */
.target-image{
  width: 98%;
  position: relative;
  border-radius: 10px;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  background: white;
}
img.card-img-top.girar {
    animation: fadein 1s;
}

@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
/*BOTONES*/
.volver-inicio{
  float: center;
  letter-spacing: 1px;
  display: fixed;
  background: red;
  border-radius: 50px;
  border-color: rgb(35, 101, 241);
  border-width: 2px;
  border-bottom: 6px solid #000;
  margin: auto;
  padding: auto;
}
.boton{
  display: block;
  padding: 10px;
  text-align: center;
  margin: auto;
  color: rgb(0, 0, 0);
  letter-spacing: 1px;
  border-color: linear-gradient(#f1f1f1, #4c59ee, #1e2feb, #4c59ee, #f1f1f1);
  border-width: 2px;
  border-style: solid;
  text-shadow: rgb(174, 0, 255) -2px 2px;
  border-bottom: 6px solid #000;
  position: relative;
}
.boton-pausar{
  float: left;
  border-color: rgba(255, 255, 255, 0);
  padding: 0px;
  background: none;
}
.imagen-boton-pausar{
  width: 30px;
  height: 30px;
}
.boton-home{
  background: linear-gradient(#f1f1f1, #4c59ee, #1e2feb, #4c59ee, #f1f1f1);
  background-size: 100%;
  text-transform: uppercase;
  border-radius: 50px;
  width: 70%;
  height: 60px;
  font-size: medium;
}
.botones{
  background: linear-gradient(#f1f1f1, #4c59ee, #1e2feb, #4c59ee, #f1f1f1);
  background-size: 100%;
  border-radius: 10px;
  width: 98%;
  height: 70px;
  font-size: medium;
}
</style>
