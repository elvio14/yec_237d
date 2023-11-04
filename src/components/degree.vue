<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue';

const degree = ref({title: ''})
const code = "BSCS"
const studentNumber = "220683938"
const user = ref()

onMounted(() => {
      fetch(`http://localhost:5000/api/degree/${code}`)
        .then((response) => response.json())
        .then((data) => {
          degree.value = data[0];
          console.log(degree.value)
        })
        .catch((error) => {
            console.log(error)
        });
    });

onMounted(() => {
  fetch(`http://localhost:5000/api/user/${studentNumber}`)
    .then((response) => response.json())
    .then((data) => {
      user.value = data;
      console.log(degree.value)
    })
    .catch((error) => {
        console.log(error)
    });
});

</script>
<template>
    <div id="id">
        <h2>Degree: {{ degree.title }}</h2>
    </div>
</template>
<style>
</style>