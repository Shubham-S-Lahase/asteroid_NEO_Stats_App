<template>
  <div class="w-screen hc p-4 space-background">
    <h1 class="text-4xl font-extrabold text-center mb-6 glowing-text">
      Asteroid NEO Stats
    </h1>

    <!-- Date Picker and Button Section -->
    <div
      class="flex flex-wrap justify-center mb-8 items-center animate-fade-in"
    >
      <DatePicker
        v-model="startDate"
        @update:date="updateStartDate"
        class="date-picker"
      />
      <span class="mx-2 glowing-text">to</span>
      <DatePicker
        v-model="endDate"
        @update:date="updateEndDate"
        class="date-picker"
      />
      <button
        @click="fetchData"
        class="ml-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:bg-purple-700 transition-transform transform hover:scale-105 animate-float"
      >
        Fetch Data
      </button>
    </div>

    <!-- Display Stats if Data Exists -->
    <div v-if="data" class="animate-fade-in-delayed">
      <!-- Stats Cards Section -->
      <div class="flex flex-wrap justify-center mb-8 gap-4">
        <StatsCard
          title="Fastest Asteroid"
          :value="fastestAsteroid"
          class="animated-card"
        />
        <StatsCard
          title="Closest Asteroid"
          :value="closestAsteroid"
          class="animated-card"
        />
        <StatsCard
          title="Average Size"
          :value="averageSize"
          class="animated-card"
        />
      </div>

      <!-- Total Asteroids and Chart Section -->
      <div
        class="p-6 bg-transparent shadow-lg rounded-lg transition-shadow mb-4"
      >
        <h2
          class="text-2xl text-center font-semibold text-gray-800 mb-2 glowing-text"
        >
          Total Asteroids
        </h2>
        <p class="text-lg text-center font-semibold text-gray-400">
          {{ totalAsteroids }} asteroids
        </p>
      </div>

      <!-- Chart Component -->
      <div class="flex justify-center w-full">
        <ChartComponent :chartData="chartData" class="animated-chart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DatePicker from "~/components/DatePicker.vue";
import StatsCard from "~/components/StatsCard.vue";
import ChartComponent from "~/components/ChartComponent.vue";
import { getAsteroidsData } from "~/server/nasaApi.js";
import { parseAsteroidStats } from "~/utils/asteroidUtils.js";

const startDate = ref("");
const endDate = ref("");
const data = ref(null);
const fastestAsteroid = ref({});
const closestAsteroid = ref({});
const averageSize = ref(0);
const chartData = ref([]);
const totalAsteroids = ref(0);

const updateStartDate = (date) => {
  startDate.value = date;
};

const updateEndDate = (date) => {
  endDate.value = date;
};

// Fetch data from NASA API
const fetchData = async () => {
  try {
    if (!startDate.value || !endDate.value) {
      console.error("Please select both start and end dates.");
      return;
    }

    const fetchedData = await getAsteroidsData(startDate.value, endDate.value);
    if (!fetchedData) {
      throw new Error("Invalid data structure");
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
    chartData.value = Object.entries(fetchedData).map(([date, asteroids]) => [
      date,
      asteroids.length,
    ]);

    // Calculate total number of asteroids
    totalAsteroids.value = Object.values(fetchedData).flat().length;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
</script>

<style scoped>
.space-background {
  background: radial-gradient(circle, #020111 0%, #191d29 100%);
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.glowing-text {
  color: #fff;
  text-shadow: 0 0 10px #f3f3f3, 0 0 20px #8d83f9, 0 0 30px #8d83f9;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

.animate-fade-in-delayed {
  animation: fadeIn 2.5s ease-in-out;
}

.animated-card {
  transition: all 0.3s ease;
}
.animated-card:hover {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.date-picker {
  border: 1px solid #fff;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.date-picker:hover {
  background: rgba(255, 255, 255, 0.2);
}
.hc {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
