<template>
  <div
    class="p-6 bg-white shadow-lg rounded-lg transition-transform"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    :class="{ 'hover:shadow-xl transform scale-105': isTouched }"
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
import { ref, computed } from "vue";

const props = defineProps({
  title: String,
  value: [Object, String, Number],
});

const isTouched = ref(false);

const onTouchStart = () => {
  isTouched.value = true;
};

const onTouchEnd = () => {
  setTimeout(() => {
    isTouched.value = false;
  }, 300);
};

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

<style scoped>
.hover\:shadow-xl {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.transform.scale-105 {
  transform: scale(1.05);
}

.transition-transform {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
