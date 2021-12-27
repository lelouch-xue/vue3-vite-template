<template>
	<div class="about">
		<HelloWorld :msg="'msg:' + Math.random()"></HelloWorld>
		<router-link to="/"></router-link>
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
	alert("about page");
});
</script>
<style lang="scss" scoped></style>
