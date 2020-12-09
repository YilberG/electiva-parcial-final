<template>
  <div class="calcular-fondo imagen-fondo">
    <div class="calcular-centro">
      <button class="boton boton-home" type="submit" @click="cat()">jugar</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted(){
    localStorage.clear();

  },
  methods: {
        cat(){
          localStorage.setItem('categoria', this.cat);
          this.$router.push("/Categorias")
        }
    }
}
</script>
