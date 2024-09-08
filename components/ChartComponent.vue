<template>
  <div class="chart-container">
    <VChart ref="chart" :option="chartOptions" class="chart" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { use } from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";

use([TitleComponent, TooltipComponent, GridComponent, LineChart]);

const props = defineProps({
  chartData: Array,
});

const chart = ref(null);

const chartOptions = ref({
  title: {
    text: "Asteroids Per Day",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Number of Asteroids",
      type: "line",
      data: [],
      smooth: true,
      areaStyle: {},
      lineStyle: {
        color: "#42A5F5",
      },
    },
  ],
});

watch(
  () => props.chartData,
  (newData) => {
    if (newData && newData.length > 0) {
      const dates = newData.map(([date]) => date);
      const values = newData.map(([, count]) => count);
      chartOptions.value.xAxis.data = dates;
      chartOptions.value.series[0].data = values;
    }
  },
  { immediate: true }
);

// Handle chart resizing
onMounted(() => {
  const handleResize = () => {
    if (chart.value) {
      chart.value.resize();
    }
  };

  window.addEventListener("resize", handleResize);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.chart {
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 50vh;
}

@media (max-width: 768px) {
  .chart {
    height: 40vh;
  }
}

@media (max-width: 480px) {
  .chart {
    height: 30vh;
  }
}
</style>
