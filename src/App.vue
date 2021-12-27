<template>
	<router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
	console.log('项目初始化');
});
</script>

<style lang="scss" scoped>
#app {
	margin-top: 60px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	color: #2c3e50;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
