<template>
	<div class="home">
		<button @click="onClickBtn">
			<router-link to="/about"></router-link>
		</button>
	</div>
	{{ page }}
</template>

<script lang="ts" setup>
import { ref } from "vue";

const page = ref<string>("home");
const onClickBtn = () => {
	alert("onClickBtn");
};
</script>

<style lang="scss" scoped></style>
