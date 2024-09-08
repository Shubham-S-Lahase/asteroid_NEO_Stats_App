<template>
  <div class="w-screen hc p-4 space-background">
    <h1 class="text-4xl font-bold text-center mb-6 glowing-text">
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
        Get Stats
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader"></div>
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
        <h2 class="text-2xl text-center font-semibold text-gray-200 mb-2">
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
import { parseAsteroidStats } from "~/utils/asteroidutils.js";

const startDate = ref("");
const endDate = ref("");
const data = ref(null);
const fastestAsteroid = ref({});
const closestAsteroid = ref({});
const averageSize = ref(0);
const chartData = ref([]);
const totalAsteroids = ref(0);
const loading = ref(false);

const updateStartDate = (date) => {
  startDate.value = date;
};

const updateEndDate = (date) => {
  endDate.value = date;
};

// Fetch data from NASA API
const fetchData = async () => {
  try {
    loading.value = true;
    if (!startDate.value || !endDate.value) {
      alert("Please select both start and end dates.");
      loading.value = false;
      return;
    }

    const start = new Date(startDate.value);
    const end = new Date(endDate.value);

    const dateDifference = (end - start) / (1000 * 60 * 60 * 24);

    if (dateDifference > 7) {
      alert(
        "The date range cannot exceed 7 days.\n Please select a shorter range."
      );
      loading.value = false;
      return;
    }

    if (new Date(endDate.value) < new Date(startDate.value)) {
      alert("End date cannot be earlier than start date.");
      loading.value = false;
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
    chartData.value = Object.entries(fetchedData)
      .map(([date, asteroids]) => [date, asteroids.length])
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

    // console.log(chartData.value);

    // Calculate total number of asteroids
    totalAsteroids.value = Object.values(fetchedData).flat().length;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    loading.value = false;
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
  color: #e0e0e0;
  text-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff00ff;
  animation: color-change 9s infinite linear;
}

@keyframes color-change {
  0% {
    color: #ff00ff;
    text-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff00ff;
  }
  25% {
    color: #00ffff;
    text-shadow: 0 0 5px #00ffff, 0 0 15px #00ffff, 0 0 30px #00ffff;
  }
  50% {
    color: #9b59b6;
    text-shadow: 0 0 5px #9b59b6, 0 0 15px #9b59b6, 0 0 30px #9b59b6;
  }
  75% {
    color: #3498db;
    text-shadow: 0 0 5px #3498db, 0 0 15px #3498db, 0 0 30px #3498db;
  }
  100% {
    color: #ff00ff;
    text-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff00ff;
  }
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
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #514b82;
  mask: radial-gradient(circle closest-side at 50% 40%, transparent 94%, #000);
  -webkit-mask: radial-gradient(
    circle closest-side at 50% 40%,
    #0000 94%,
    #000
  );
  transform-origin: 50% 40%;
  animation: l25 1s infinite linear;
}
@keyframes l25 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
