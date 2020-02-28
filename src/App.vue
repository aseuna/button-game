<template>
  <div id="app">
    <div class="text-center my-3">
      <b-button 
      id="helpButton" 
      v-b-popover.hover.bottom="popoverContent" 
      title="Rules">
      Help
      </b-button>
    </div>

    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: 'App',
  components: {
    Home
  },
  computed: {
    // Configuration for rules popover
    popoverContent: function(){
      return{
        html: true,
        content: () =>{
            return "<ul><li>All players increse a single total number by pressing the green button." +
            "<li>Pressing the button costs one point from the player." +
            "<li>The player has a chance to gain additional points as follows: " +
            "<ul><li> If the total number reaches a value divisible by 10, player gains 5 points" +
            "<li> If the total number reaches a value divisible by 100, player gains 40 points" +
            "<li> If the total number reaches a value divisible by 500, player gains 250 points" +
            "</ul>" + 
            "<li>Player has a chance to refresh his points in case he runs out.</ul>";
        }
      }

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#helpButton{
  width: 60px;
  height: 60px;
  border-radius: 30px; 
}
</style>
