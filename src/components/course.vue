<script setup>
import { onMounted, computed } from 'vue'
import { ref } from 'vue';

const props = defineProps({
    codes: {
        type: Array,
        default: () => ([]),
        validator: (codes) => codes.every(code => typeof code === 'string')
    }
})

const courses = ref([])
const codes = ['POL1017', 'ART1018']
const code = 'BSCS'

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
    
const filteredCourses = computed(()=> {
    return courses.value.length > 0
    ? courses.value.filter(course => codes.includes(course.code))
    : []
})


</script>
<template>
    <div id="course" v-for="course in filteredCourses" :key="course.code">
        <h3>{{course.code}} - {{course.title }}</h3>
        <h4>credit: {{ course.credit }}</h4>
        <h4>Schedule: {{ course.days }}, {{ course.time }}</h4>
        <h4>Location: {{ course.location }}</h4>
        <h4>Educator: {{ course.educator }}</h4>
        <h4>Prerequisites: {{ course.prereq }}</h4>
    </div>
</template>
<style>
#course{

    border: solid 1px;
    border-color: aquamarine;
}
</style>