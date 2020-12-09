<template>
    <div class="vh-juego imagen-fondo">
            <div class="encabezado row acomodar">
                <div class="col ">
                    <p>
                        <br>
                        <button class="boton-pausar" @click="pausar()"><img class="imagen-boton-pausar" src="../assets/fondo/pause.png" alt="Pause"></button>
                        <img src="../assets/fondo/movimiento.png" alt ="" class="encabezado-imagenes"><span class="encabezado-texto">{{intentos}}</span>&nbsp;&nbsp;
                        <img src="../assets/fondo/tiempo.png" alt ="" class="encabezado-imagenes">  <span class="encabezado-texto"><span id="minutos"></span> : <span id="segundos"></span></span>
                    </p>
                </div>
            </div>
            <div v-for="(fila, indiceFila) in memorama" :key="indiceFila" class="row acomodar">
                <div :key="indiceFila+''+indiceImagen" class="col margen"
                    v-for="(imagen, indiceImagen) in fila">
                    <div class="mb-1 ">                            
                        <img  @click="voltear(indiceFila, indiceImagen)" :class="{'girar': imagen.mostrar}" :src="(imagen.mostrar ? imagen.ruta : NOMBRE_IMAGEN_OCULTA)" class="target-image card-img-top img-fluid">
                    </div>
                </div>
            </div>
    </div>   
</template>

<script>
import swal from 'sweetalert';
import React from 'react'
var cronometro;
export default {
    name: 'Cartas',
    data(){
        return{
            categoria: "",
            imagenes: [],
            minutos: 0,
            segundos: 0,

            animales: [],
            mandala: [],
            musica: [],
            paisajes: [],

            COLUMNAS: 0,
            fila: 0,
            cant_imagenes: 0,
            intentos: 0,
            aciertos: 0,
            memorama:[],
            NOMBRE_IMAGEN_OCULTA: "https://st2.depositphotos.com/2398103/5861/v/600/depositphotos_58616045-stock-illustration-red-question-mark.jpg",
            SEGUNDOS_ESPERA_VOLTEAR_IMAGEN: 1,
            ultimasCoordenadas: {
                indiceFila: null,
                indiceImagen: null
            },
            intentos: 0,
            aciertos: 0,
            esperandoTimeout: false,
            mezclar: [],
        }
    },
    mounted(){
        if (localStorage.getItem('fila') === null && localStorage.getItem('columnas') === null) {
            this.$router.push("/Cuadros")
        }
        this.categoria = localStorage.getItem("categoria"),
        this.COLUMNAS = parseInt(localStorage.getItem("columna")),
        this.fila = parseInt(localStorage.getItem("fila")),
        this.cant_imagenes = (this.fila*this.COLUMNAS),
            
        this.cargarimagenes();

        switch(this.categoria){
            case 'animales':
                this.mezclar = this.animales;
                break;
            case 'mandala':
                this.mezclar = this.mandala;
                break;
            case 'musica':
                this.mezclar = this.musica;
                break;
            case 'paisajes':
                this.mezclar = this.musica;
                break;
        }
        this.tiempo()
        this.reiniciarJuego()
    },
    methods: {
        tiempo(){
            var self = this
            let contador_s = this.segundos;
            let contador_m = this.minutos;
            let s = document.getElementById("segundos");
            let m = document.getElementById("minutos");
            m.innerHTML = contador_m,
            s.innerHTML = contador_s,
            cronometro = setInterval(
                function(){
                    if(contador_s === 60)
                    {
                        contador_m++
                        contador_s = 0
                        self.guardarminutos()
                        if(contador_m === 60)
                        {
                            contador_m = 0
                        }
                        m.innerHTML = contador_m
                    }
                    contador_s++
                    s.innerHTML = contador_s
                    self.guardarsegundos();
                },1000,
            )
        },
        guardarsegundos(){
            this.segundos++
            if(this.segundos === 60)
            {
                this.segundos = 0
            }
        },
        guardarminutos(){
            this.minutos++
            if(this.minutos === 60)
            {
                this.minutos = 0
            }
        },
        reiniciarJuego() {
            let memorama = [];
            let solonecesarias = [];
            let revolver = [];
            revolver = this.mezclar
            this.mezclarArreglo(revolver)
            this.imagenes = revolver
            this.imagenes.forEach((imagen, indice) => {
                let imagenDeMemorama = {
                    ruta: imagen,
                    mostrar: false, // No se muestra la original
                    acertada: false, // No es acertada al inicio
                };
                // Poner dos veces la misma imagen
                solonecesarias.push(imagenDeMemorama, Object.assign({}, imagenDeMemorama));
            });

            
            //solo tomar la cantidad requerida
            for(let i = 0; i<this.cant_imagenes; i++){
                memorama[i] = solonecesarias[i]
            }

            // Sacudir o mover arreglo; es decir, hacerlo aleatorio
            this.mezclarArreglo(memorama)
            
            // Dividirlo en subarreglos o columnas
            let memoramaDividido = [];
            for (let i = 0; i < this.cant_imagenes; i += this.COLUMNAS) {
                memoramaDividido.push(memorama.slice(i, i + this.COLUMNAS));
            }
            // Reiniciar intentos
            this.intentos = 0;
            this.aciertos = 0;
            // Asignar a instancia de Vue para que lo dibuje
            this.memorama = memoramaDividido;
        },

        // Se desencadena cuando se hace click en la imagen
        voltear(indiceFila, indiceImagen) {
            // Si se está regresando una imagen a su estado original, detener flujo
            if (this.esperandoTimeout) {
                return;
            }
            // Si es una imagen acertada, no nos importa que la intenten voltear
            if (this.memorama[indiceFila][indiceImagen].acertada) {
                return;
            }
            
            // Si es la primera vez que la selecciona
            if (this.ultimasCoordenadas.indiceFila === null && this.ultimasCoordenadas.indiceImagen === null) {
                this.memorama[indiceFila][indiceImagen].mostrar = true;
                this.ultimasCoordenadas.indiceFila = indiceFila;
                this.ultimasCoordenadas.indiceImagen = indiceImagen;
                return;
            }

            // Si se selecciona la misma imagen ya seleccionada
            if(this.ultimasCoordenadas.indiceFila === indiceFila && this.ultimasCoordenadas.indiceImagen === indiceImagen){
                return
            }

            // Si es el que estaba mostrada, lo ocultamos de nuevo
            let imagenSeleccionada = this.memorama[indiceFila][indiceImagen];
            let ultimaImagenSeleccionada = this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen];
            if (indiceFila === this.ultimasCoordenadas.indiceFila && indiceImagen === this.ultimasCoordenadas.indiceImagen) {
                this.memorama[indiceFila][indiceImagen].mostrar = false;
                this.ultimasCoordenadas.indiceFila = null;
                this.ultimasCoordenadas.indiceImagen = null;
                this.aumentarIntento();
                return;
            }

            // En caso de que la haya encontrado, ¡acierta!
            // Se basta en ultimaImagenSeleccionada
            this.memorama[indiceFila][indiceImagen].mostrar = true;
            if (imagenSeleccionada.ruta === ultimaImagenSeleccionada.ruta) {
                this.aciertos++;
                this.memorama[indiceFila][indiceImagen].acertada = true;
                this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].acertada = true;
                this.ultimasCoordenadas.indiceFila = null;
                this.ultimasCoordenadas.indiceImagen = null;
                // Cada que acierta comprobamos si ha ganado
                if (this.haGanado()) {
                    this.indicarVictoria();
                }
            } else {
                // Si no acierta, entonces giramos ambas imágenes
                this.esperandoTimeout = true;
                setTimeout(() => {
                    this.memorama[indiceFila][indiceImagen].mostrar = false;
                    this.memorama[indiceFila][indiceImagen].animacion = false;
                    this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].mostrar = false;
                    this.ultimasCoordenadas.indiceFila = null;
                    this.ultimasCoordenadas.indiceImagen = null;
                    this.esperandoTimeout = false;
                }, this.SEGUNDOS_ESPERA_VOLTEAR_IMAGEN * 1000);
                this.aumentarIntento();
            }
        },

        // Aumenta un intento
        aumentarIntento() {
            this.intentos++;
        },

        // Método que indica si el jugador ha ganado
        haGanado() {
            return this.memorama.every(arreglo => arreglo.every(imagen => imagen.acertada));
        },
        // Mostrar alerta de victoria y reiniciar juego
        indicarVictoria() {
            clearInterval(cronometro)
            swal({
                title: "Intentos: "+this.intentos,
                text: "Tiempo: "+this.minutos+" : "+this.segundos,
                buttons: {
                    reiniciar:{
                        text: "Reiniciar",
                    },
                    salir: {
                        text: "Salir"
                    },
                },
                closeOnClickOutside: false,
                allowOutsideClick: false,
            })
            .then((value) => {
                switch(value)
                {
                    case 'reiniciar':
                        this.min = 0,
                        this.seg = 0,
                        this.tiempo()
                        this.reiniciarJuego()
                        break
                    case 'salir':
                        this.$router.push("/")
                        break
                }
            })
        },
        
        pausar(){
            clearInterval(cronometro)
            swal({
                title: 'juego en pausa',
                text: 'Tiempo: '+this.minutos+" : "+this.segundos,
                buttons:{
                    reanudar:{
                        text:"Reanudar"
                    },
                    salir:{
                        text: "Salir"
                    },
                },
                closeOnClickOutside: false,
                allowOutsideClick: false,
            }).then((value) => {
                switch(value){
                    case 'salir':
                        this.$router.push("/")
                        break
                    case 'reanudar':
                        this.tiempo()
                        break
                }
            })
        },

        mezclarArreglo(a){
            var j, x ,i 
            for(i = a.length - 1; i > 0; i--){
                j = Math.floor(Math.random() * (i+1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a
        },

        //llenar las imagenes
        cargarimagenes(){
            this.animales = [
                "https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641__340.jpg",
                "https://cdn.pixabay.com/photo/2018/08/12/16/59/ara-3601194__340.jpg",
                "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875__340.jpg",
                "https://cdn.pixabay.com/photo/2019/10/30/16/19/fox-4589927__340.jpg",
                "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__340.jpg",
                "https://cdn.pixabay.com/photo/2017/02/28/23/00/swan-2107052__340.jpg",
                "https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445__340.jpg",
                "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg",
                "https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg",
                "https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__340.png",
                "https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777__340.jpg",
                "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247__340.jpg",
                "https://cdn.pixabay.com/photo/2014/11/03/17/40/leopard-515509__340.jpg",
                "https://cdn.pixabay.com/photo/2017/12/11/15/34/lion-3012515__340.jpg",
                "https://cdn.pixabay.com/photo/2017/12/17/15/58/mammal-3024471__340.jpg",
                "https://cdn.pixabay.com/photo/2017/04/11/21/34/giraffe-2222908__340.jpg",
                "https://cdn.pixabay.com/photo/2014/11/21/17/27/frog-540812__340.jpg",
                "https://cdn.pixabay.com/photo/2017/10/31/07/49/horses-2904536__340.jpg",
                "https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228__340.jpg",
                "https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416__340.jpg",
                "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826__340.jpg",
                "https://cdn.pixabay.com/photo/2016/12/13/00/13/rabbit-1903016__340.jpg",
                "https://cdn.pixabay.com/photo/2016/10/31/14/55/rottweiler-1785760__340.jpg",
                "https://cdn.pixabay.com/photo/2011/09/27/18/52/bird-9950__340.jpg",
                "https://cdn.pixabay.com/photo/2013/01/10/14/18/starfish-74535__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/13/21/46/sheep-1822137__340.jpg",
                "https://cdn.pixabay.com/photo/2012/12/17/03/59/moose-70254__340.jpg",
                "https://cdn.pixabay.com/photo/2014/12/17/00/28/red-squirrel-570936__340.jpg",
                "https://cdn.pixabay.com/photo/2018/09/25/21/54/hedgehog-3703244__340.jpg",
                "https://cdn.pixabay.com/photo/2014/11/21/15/25/chameleon-540655__340.jpg",
                "https://cdn.pixabay.com/photo/2014/12/21/15/44/raindrops-574971__340.jpg",
                "https://cdn.pixabay.com/photo/2018/02/16/22/08/bird-3158784__340.jpg",
                "https://cdn.pixabay.com/photo/2018/05/25/12/02/frog-3428988__340.jpg",
                "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg",
                "https://cdn.pixabay.com/photo/2020/01/13/19/43/lizard-4763351__340.jpg"
            ]
            this.mandala = [
                "https://cdn.pixabay.com/photo/2016/05/10/21/50/meditation-1384758__340.jpg",
                "https://cdn.pixabay.com/photo/2017/09/13/18/59/floral-2746540__340.png",
                "https://cdn.pixabay.com/photo/2016/10/23/11/29/background-1762731__340.jpg",
                "https://cdn.pixabay.com/photo/2018/03/14/13/06/mandala-3225164__340.png",
                "https://cdn.pixabay.com/photo/2017/02/01/20/08/mandala-2031287__340.png",
                "https://cdn.pixabay.com/photo/2016/10/21/07/09/mandala-1757304__340.png",
                "https://cdn.pixabay.com/photo/2016/08/17/18/05/flower-of-life-1601163__340.png",
                "https://cdn.pixabay.com/photo/2017/09/10/05/06/mandala-2734394__340.jpg",
                "https://cdn.pixabay.com/photo/2016/10/14/12/30/background-1740107__340.jpg",
                "https://cdn.pixabay.com/photo/2017/03/17/08/28/drawing-2151087__340.png",
                "https://cdn.pixabay.com/photo/2020/11/11/18/59/mandala-5733350__340.png",
                "https://cdn.pixabay.com/photo/2017/03/17/08/28/drawing-2151087__340.png",
                "https://cdn.pixabay.com/photo/2016/04/15/21/01/flourish-1331896__340.png",
                "https://cdn.pixabay.com/photo/2019/04/24/10/21/mandala-4151794__340.png",
                "https://cdn.pixabay.com/photo/2016/11/06/17/35/mandala-1803545__340.png",
                "https://cdn.pixabay.com/photo/2018/02/19/20/23/mandala-3166158__340.png",
                "https://cdn.pixabay.com/photo/2016/10/24/18/48/background-1766913__340.jpg",
                "https://cdn.pixabay.com/photo/2017/03/16/00/22/flowers-2147877__340.jpg",
                "https://cdn.pixabay.com/photo/2017/09/10/00/36/mandala-2734015__340.jpg",
                "https://cdn.pixabay.com/photo/2017/09/03/23/42/mandala-2712538__340.jpg",
                "https://cdn.pixabay.com/photo/2016/03/25/19/49/elephant-1279524__340.jpg",
                "https://cdn.pixabay.com/photo/2019/06/23/17/11/mandala-4294290__340.jpg",
                "https://cdn.pixabay.com/photo/2016/07/26/13/18/mandala-1542826__340.png",
                "https://cdn.pixabay.com/photo/2017/01/20/12/31/pagan-1994812__340.png",
                "https://cdn.pixabay.com/photo/2016/08/01/02/29/mandala-1560359__340.png",
                "https://cdn.pixabay.com/photo/2018/05/13/16/17/mandala-3396997__340.jpg",
                "https://cdn.pixabay.com/photo/2016/07/26/21/07/flower-1543895__340.jpg",
                "https://cdn.pixabay.com/photo/2016/10/25/18/21/polygons-1769635__340.png",
                "https://cdn.pixabay.com/photo/2019/04/28/23/42/arabesque-4164761__340.png",
                "https://cdn.pixabay.com/photo/2016/03/21/15/15/circle-1270674__340.png",
                "https://cdn.pixabay.com/photo/2020/07/14/07/58/watercolor-5403250__340.png",
                "https://cdn.pixabay.com/photo/2017/01/06/07/56/mandala-1957167__340.png",
                "https://cdn.pixabay.com/photo/2016/11/14/11/51/background-1823257__340.jpg",
                "https://cdn.pixabay.com/photo/2017/02/10/19/30/fractal-2056102__340.jpg",
                "https://cdn.pixabay.com/photo/2016/04/01/22/43/mandala-1301771__340.png",
                "https://cdn.pixabay.com/photo/2017/09/21/20/45/mandala-2773487__340.png"
            ]
            this.musica = [
                "https://cdn.pixabay.com/photo/2016/02/19/11/36/microphone-1209816__340.jpg",
                "https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558__340.jpg",
                "https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790__340.jpg",
                "https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347__340.jpg",
                "https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074__340.jpg",
                "https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722__340.jpg",
                "https://cdn.pixabay.com/photo/2015/01/20/13/13/ipad-605439__340.jpg",
                "https://cdn.pixabay.com/photo/2017/10/22/14/53/ballerina-2878011__340.jpg",
                "https://cdn.pixabay.com/photo/2016/04/30/14/58/music-1363069__340.jpg",
                "https://cdn.pixabay.com/photo/2015/12/27/05/48/turntable-1109588__340.jpg",
                "https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212__340.png",
                "https://cdn.pixabay.com/photo/2014/11/26/15/20/saxophone-546303__340.jpg",
                "https://cdn.pixabay.com/photo/2014/07/31/23/49/guitarist-407212__340.jpg",
                "https://cdn.pixabay.com/photo/2018/06/30/09/29/music-3507317__340.jpg",
                "https://cdn.pixabay.com/photo/2016/03/16/23/55/flea-market-1262036__340.jpg",
                "https://cdn.pixabay.com/photo/2013/11/03/08/05/cheers-204742__340.jpg",
                "https://cdn.pixabay.com/photo/2016/04/19/05/07/turntable-1337986__340.jpg",
                "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326__340.jpg",
                "https://cdn.pixabay.com/photo/2016/08/24/20/39/violin-1617972__340.jpg",
                "https://cdn.pixabay.com/photo/2015/09/19/01/05/country-946706__340.jpg",
                "https://cdn.pixabay.com/photo/2014/05/03/01/02/concert-336695__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/23/00/58/record-player-1851576__340.jpg",
                "https://cdn.pixabay.com/photo/2017/11/15/09/28/music-player-2951399__340.jpg",
                "https://cdn.pixabay.com/photo/2016/03/28/09/36/music-1285165__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/09/23/16/music-1813100__340.png",
                "https://cdn.pixabay.com/photo/2014/06/21/20/09/violin-374096__340.jpg",
                "https://cdn.pixabay.com/photo/2015/03/26/10/22/band-691224__340.jpg",
                "https://cdn.pixabay.com/photo/2016/01/14/06/09/guitar-1139397__340.jpg",
                "https://cdn.pixabay.com/photo/2015/03/26/09/58/headphones-690685__340.jpg",
                "https://cdn.pixabay.com/photo/2017/10/25/03/40/musical-background-2886886__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/22/19/15/dark-1850120__340.jpg",
                "https://cdn.pixabay.com/photo/2015/07/31/15/01/girl-869213__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/29/06/17/audience-1867754__340.jpg",
                "https://cdn.pixabay.com/photo/2018/03/12/22/15/music-notes-3221097__340.jpg",
                "https://cdn.pixabay.com/photo/2019/03/08/21/13/record-4043223__340.jpg",
                "https://cdn.pixabay.com/photo/2016/08/15/16/48/vinyl-1595847__340.jpg"

            ]
            this.paisajes = [
                "https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828__340.jpg",
                "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
                "https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058__340.jpg",
                "https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg",
                "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539__340.jpg",
                "https://cdn.pixabay.com/photo/2016/07/28/09/01/nature-1547302__340.jpg",
                "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706__340.jpg",
                "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg",
                "https://cdn.pixabay.com/photo/2016/02/10/21/59/landscape-1192669__340.jpg",
                "https://cdn.pixabay.com/photo/2015/01/28/23/35/landscape-615429__340.jpg",
                "https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518__340.jpg",
                "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png",
                "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg",
                "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769__340.jpg",
                "https://cdn.pixabay.com/photo/2016/08/09/21/54/yellowstone-national-park-1581879__340.jpg",
                "https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080__340.jpg",
                "https://cdn.pixabay.com/photo/2016/07/22/16/29/fog-1535201__340.jpg",
                "https://cdn.pixabay.com/photo/2013/11/28/10/03/autumn-219972__340.jpg",
                "https://cdn.pixabay.com/photo/2018/11/17/22/15/tree-3822149__340.jpg",
                "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712__340.jpg",
                "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
                "https://cdn.pixabay.com/photo/2015/01/28/23/34/landscape-615428__340.jpg",
                "https://cdn.pixabay.com/photo/2017/02/19/15/28/italy-2080072__340.jpg",
                "https://cdn.pixabay.com/photo/2016/11/06/05/36/landscape-1802337__340.jpg"
            ]
        }
    }
}
</script>