<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue';

const degree = ref()
const code = "bscs"

onMounted(() => {
      fetch(`http://localhost:5000/api/degree/${code}`)
        .then((response) => response.json())
        .then((data) => {
          degree.value = data;
        })
        .catch((error) => {
            console.log(error)
        });
    });


</script>
<template>
    <div id="id">
        <h2>Degree:{{ degree.value.title }}</h2>
    </div>
</template>
<style>
</style>