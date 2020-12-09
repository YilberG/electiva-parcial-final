<template>
    <div class="calcular-fondo imagen-fondo">
        <div class="calcular-centro">
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="select_categoria='animales'" @click="cua()">Animales</button>
            </div>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="select_categoria='mandala'" @click="cua()">Arte mandala</button>
            </div>
            <br>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="select_categoria='musica'" @click="cua()">Musica</button>
            </div>
            <div class="calcular-centrado">
                <button class="boton botones" type="submit" v-on:click="select_categoria='paisajes'" @click="cua()">Paisajes</button>
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
    name: 'Categorias',
    data(){
        return{
            select_categoria: '',
        }
    },
    methods: {
        cua(){
            localStorage.setItem('categoria', this.select_categoria);
            this.$router.push("/Cuadros")
        },
        home(){
            this.$router.push("/")
        }
    }
}

</script>