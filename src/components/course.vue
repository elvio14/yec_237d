<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue';
import { defineProps } from 'vue'

const courses = ref()

const props = defineProps({
    codes: [String],
})

const codes = props.codes

onMounted(() => {
      fetch('http://localhost:5000/api/course/all')
        .then((response) => response.json())
        .then((data) => {
          courses.value = data;
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