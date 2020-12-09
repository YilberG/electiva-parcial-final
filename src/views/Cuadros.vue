<template>
    <div class="calcular-fondo imagen-fondo">
        <div class="calcular-centro">
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="columna=2,fila=3" @click="game()">3x2</button>
            </div>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="columna=3,fila=4" @click="game()">4x3</button>
            </div>
            <br>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="columna=4,fila=5" @click="game()">5x4</button>
            </div>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="columna=5,fila=6" @click="game()">6x5</button>
            </div>
            <br>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="columna=7,fila=8" @click="game()">8x7</button>
            </div>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="columna=8,fila=9" @click="game()">9x8</button>
            </div>
            <br>
            <div class="calcular-centrado">
                <button type="submit" class="volver-inicio"><img src="../assets/fondo/home.png" alt="atras" width="50" height="50" @click="home()"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cuadros',
    data(){
        return{
            fila: 0,
            columna: 0
        }
    },
    mounted(){
        if (localStorage.getItem('categoria') === null) {
            this.$router.push("/Categorias")
        }
    },
    methods: {
        game(){
            localStorage.setItem('fila', this.fila);
            localStorage.setItem('columna', this.columna);
            this.$router.push("/Cartas")
        },
        home(){
            this.$router.push("/")
        }
    }
}
</script>