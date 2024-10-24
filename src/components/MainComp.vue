<template>
    <div class="container">
        <SearchBar /> <!--@전달받은 이벤트명="실행함수"-->
        <WeatherInfo />
    </div>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import WeatherInfo from './WeatherInfo.vue';

</script>
