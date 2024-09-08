<template>
  <div
    class="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
  >
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ title }}</h2>
    <p class="text-lg text-gray-700">
      <template
        v-if="typeof value === 'object' && title === 'Fastest Asteroid'"
      >
        <span><strong>Asteroid Name:</strong> {{ cleanedName }}</span
        ><br />
        <span><strong>Asteroid ID:</strong> {{ value.id }}</span
        ><br />
        <span><strong>Velocity:</strong> {{ value.velocity.km_h }} km/h</span>
      </template>
      <template
        v-if="typeof value === 'object' && title === 'Closest Asteroid'"
      >
        <span><strong>Asteroid Name:</strong> {{ cleanedName }}</span
        ><br />
        <span><strong>Asteroid ID:</strong> {{ value.id }}</span
        ><br />
        <span><strong>Distance:</strong> {{ value.distance.km }} km</span>
      </template>
      <template v-if="typeof value === 'string' || typeof value === 'number'">
        <span>{{ valueLabel }}: {{ value || "N/A" }}</span>
      </template>
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

const cleanedName = computed(() => {
  if (props.value && typeof props.value.name === "string") {
    return props.value.name.replace(/[()]/g, "");
  }
  return "";
});
</script>
