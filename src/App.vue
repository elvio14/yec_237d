<script setup>
import Degree from './components/degree.vue'
import Courses from './components/course.vue'
import { ref, onMounted} from 'vue';

const showTerm = ref('f1')

</script>

<template>
  <Degree></Degree>
  <div id="buttons">
    <button @click="showTerm='f1'" class="active">Fall 1</button>
    <button @click="showTerm='w1'" class="">Winter 1</button>
    <button @click="showTerm='f2'" class="">Fall 2</button>
    <button @click="showTerm='w2'" class="">Winter 2</button>
    <button @click="showTerm='f3'" class="">Fall 3</button>
    <button @click="showTerm='w3'" class="">Winter 3</button>
    <button @click="showTerm='f4'" class="">Fall 4</button>
    <button @click="showTerm='w4'" class="">Winter 4</button>
  </div>
  <Courses :codes="showTerm"></Courses>
</template>

<style scoped>
.active{
  background-color: aquamarine;
  color: black;
}
button{
  margin: 1rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
