<template>
  <div class="w-full h-96">
    <VChart :option="chartOptions" style="width: 100%; height: 100%;" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { use } from 'echarts/core';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';

use([TitleComponent, TooltipComponent, GridComponent, LineChart]);

const props = defineProps({
  chartData: Array,
});

const chartOptions = ref({
  title: {
    text: 'Asteroids Per Day',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Number of Asteroids',
      type: 'line',
      data: [],
      smooth: true,
      areaStyle: {},
      lineStyle: {
        color: '#42A5F5',
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
</script>
