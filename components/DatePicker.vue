<template>
  <input type="date" :value="selectedDate" @input="updateDate" />
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const selectedDate = ref('');
const emit = defineEmits(['update:date']);

const updateDate = (event) => {
  selectedDate.value = event.target.value; // Update the local state
  emit('update:date', selectedDate.value); // Emit the change
};
</script>
