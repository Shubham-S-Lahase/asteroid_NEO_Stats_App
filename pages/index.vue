<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-4">Asteroid Neo Stats</h1>

    <div class="flex justify-center mb-4 items-center">
      <DatePicker v-model="startDate" @update:date="updateStartDate" />
      <span class="mx-2">to</span>
      <DatePicker v-model="endDate" @update:date="updateEndDate" />
      <button
        @click="fetchData"
        class="ml-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Fetch Data
      </button>
    </div>

    <div v-if="data">
      <StatsCard title="Fastest Asteroid" :value="fastestAsteroid" />
      <StatsCard title="Closest Asteroid" :value="closestAsteroid" />
      <StatsCard title="Average Size" :value="averageSize" />
      <ChartComponent :chartData="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DatePicker from "~/components/DatePicker.vue";
import StatsCard from "~/components/StatsCard.vue";
import ChartComponent from '~/components/ChartComponent.vue';
import { getAsteroidsData } from '~/server/nasaApi.js';
import { parseAsteroidStats } from '~/utils/asteroidUtils.js';

const startDate = ref('');
const endDate = ref('');
const data = ref(null);
const fastestAsteroid = ref({});
const closestAsteroid = ref({});
const averageSize = ref(0);
const chartData = ref([]);

// Update start date
const updateStartDate = (date) => {
  startDate.value = date;
};

// Update end date
const updateEndDate = (date) => {
  endDate.value = date;
};

// Fetch data from NASA API
const fetchData = async () => {
  try {
    if (!startDate.value || !endDate.value) {
      console.error('Please select both start and end dates.');
      return;
    }
    
    // Fetch asteroid data using the start and end dates
    const fetchedData = await getAsteroidsData(startDate.value, endDate.value);
    if (!fetchedData) {
      throw new Error('Invalid data structure');
    }

    data.value = fetchedData;

    // Parse and update asteroid stats
    const {
      fastestAsteroid: fastest,
      closestAsteroid: closest,
      averageSize: avgSize,
    } = parseAsteroidStats(fetchedData);

    fastestAsteroid.value = fastest;
    closestAsteroid.value = closest;
    averageSize.value = avgSize;

    // Prepare data for the chart
    chartData.value = Object.entries(fetchedData).map(([date, asteroids]) => [date, asteroids.length]);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
</script>
