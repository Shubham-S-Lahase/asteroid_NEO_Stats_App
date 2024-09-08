<template>
  <div class="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ title }}</h2>
    <p class="text-lg text-gray-700">
      {{ valueLabel }}:
      <span v-if="typeof value === 'object'">
        <a :href="value.url" target="_blank" class="text-blue-600 underline">{{ value.name }}</a>
      </span>
      <span v-else>
        {{ value || "N/A" }}
      </span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [Object, String, Number],
});

const valueLabel = computed(() => {
  if (props.title === "Fastest Asteroid") return "Speed";
  if (props.title === "Closest Asteroid") return "Distance";
  if (props.title === "Average Size") return "Average Diameter";
  return "";
});
</script>
