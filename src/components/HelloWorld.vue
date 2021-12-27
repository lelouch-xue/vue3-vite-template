<template>
	<button type="button" @click="count++">count is: {{ count }}</button>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

defineProps({ msg: String });
onMounted(() => {
	axios
		.get(import.meta.env.VITE_INTERFACE_ORIGIN + 'osinfo/all')
		.then(res => {
			console.log(res.data);
		});
});
const count = ref(0);
</script>

<style lang="scss" scoped></style>
