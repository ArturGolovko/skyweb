<template>
  <div class="weather-details-container">
    <!-- Графики в самом верху -->
    <div class="chart-container">
      <div class="charts-grid">
        <WeatherChart title="Temperature" :parameter="'temperature'" />
        <WeatherChart title="Humidity" :parameter="'humidity'" />
        <WeatherChart title="Pressure" :parameter="'pressure'" />
        <WeatherChart title="Light" :parameter="'light'" />
      </div>
    </div>

    <!-- Основной виджет -->
    <div class="weather-main-widget">
      <div class="weather-icon">
        <img :src="weatherIcon" alt="Weather Icon" />
      </div>

      <div class="weather-info">
        <h2>Weather Details for {{ city }}</h2>
        <p>Temperature: {{ temperature }}°C</p>
        <p>Humidity: {{ humidity }}%</p>
        <p>Wind Speed: 15 km/h</p>
        <el-button @click="goBack">Back to Locations</el-button>
      </div>
    </div>

    <!-- Виджеты в одну строку -->
    <div class="info-widgets-row">
      <div class="connection-status">
        <h3>Connection Status</h3>
        <p>Reply time (in ms): 15</p>
      </div>
      <div class="battery-status">
        <h3>Battery Status</h3>
        <p>🔋 Battery Level: <strong>{{ batteryLevel }}</strong>/5</p>
        <p>⚡ Battery Voltage: <strong>{{ batteryVoltage }} V</strong></p>

      </div>
      <div class="sun-info">
        <h3>Sunrise & Sunset</h3>
        <p>🌅 Sunrise: 07:15 AM</p>
        <p>🌇 Sunset: 05:45 PM</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import WeatherChart from '../components/WeatherChart.vue';

const route = useRoute();
const router = useRouter();
const city = route.params.city;

const batteryLevel = Math.floor(Math.random() * 5) + 1; // Фиктивный уровень заряда
const temperature = 20;
const humidity = 60;
const batteryVoltage = (Math.random() * 1.5 + 3.5).toFixed(2); // Фиктивное напряжение (от 3.5 до 5.0 вольт)

// Определение времени суток (день/ночь)
const currentHour = new Date().getHours();
const isDay = currentHour >= 6 && currentHour < 18; // День: с 6:00 до 18:00
let weatherIcon = '';

if (isDay) {
  if (temperature > 10 && humidity < 10) {
    weatherIcon = '/src/assets/weather/sunny-day.gif';
  } else if (humidity >= 10 && humidity <= 20) {
    weatherIcon = '/src/assets/weather/cloudy-day.gif';
  } else if (humidity > 20) {
    weatherIcon = '/src/assets/weather/rainy-day.gif';
  }
} else {
  if (temperature > 10 && humidity < 10) {
    weatherIcon = '/src/assets/weather/clear-night.gif';
  } else if (humidity >= 10 && humidity <= 20) {
    weatherIcon = '/src/assets/weather/cloudy-night.gif';
  } else if (humidity > 20) {
    weatherIcon = '/src/assets/weather/rainy-night.gif';
  }
}
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.weather-details-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.chart-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.weather-main-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-icon img {
  width: 350px; /* Увеличенный размер гифки */
  height: 350px;
}

.weather-info {
  flex: 1;
  margin-left: 20px; /* Отступ от гифки */
}

.weather-info h2 {
  margin-bottom: 10px;
}

.info-widgets-row {
  display: flex;
  justify-content: space-between; /* Размещаем виджеты равномерно */
  gap: 20px; /* Отступ между виджетами */
}

.connection-status,
.battery-status,
.sun-info {
  flex: 1; /* Все виджеты одинаковой ширины */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.connection-status {
  background: #7b61ff;
  color: white;
}

.battery-status {
  background: #dfffd9;
  color: #3e8e41;
  text-align: center;
}

.sun-info {
  background: #eef5ff;
}
</style>
