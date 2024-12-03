<template>
  <div class="chart-container">
    <h3>{{ title }}</h3>
    <div class="timeframe-buttons">
      <el-button
        v-for="(time, index) in timeframes"
        :key="index"
        @click="setTimeframe(time.value)"
        :type="timeframe === time.value ? 'primary' : 'default'"
      >
        {{ time.label }}
      </el-button>
    </div>
    <line-chart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import LineChart from './LineChart.vue';

export default {
  components: {
    LineChart,
  },
  props: {
    title: String,
    parameter: String,
  },
  setup(props) {
    const timeframes = [
      { label: '24 hours', value: 24 },
      { label: '3 days', value: 72 },
      { label: '7 days', value: 168 },
    ];

    const timeframe = ref(24);
    const chartData = ref({
      labels: [],
      datasets: [],
    });

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };

    const generateChartData = () => {
      const labels = Array.from(
        { length: timeframe.value },
        (_, i) => `Hour ${i + 1}`
      );
      const data = Array.from({ length: timeframe.value }, () =>
        Math.floor(Math.random() * 100)
      );

      chartData.value = {
        labels,
        datasets: [
          {
            label: props.parameter,
            data,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
          },
        ],
      };
    };

    const setTimeframe = (newTimeframe) => {
      timeframe.value = newTimeframe;
    };

    watch(timeframe, generateChartData, { immediate: true });

    return {
      timeframes,
      timeframe,
      chartData,
      chartOptions,
      setTimeframe,
    };
  },
};
</script>

<style scoped>
.chart-container {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeframe-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
