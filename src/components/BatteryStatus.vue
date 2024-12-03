<template>
  <div class="battery-status">
    <h3>Battery Status</h3>
    <div class="battery-value">
      🔋 Battery Level: <strong>{{ batteryLevel }}</strong>/5
    </div>
    <div class="battery-voltage">
      ⚡ Battery Voltage: <strong>{{ batteryVoltage }} V</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatteryStatus",
  data() {
    return {
      batteryLevel: Math.floor(Math.random() * 5) + 1, // Фиктивные данные уровня батареи (от 1 до 5)
      batteryVoltage: (Math.random() * 1.5 + 3.5).toFixed(2), // Фиктивное напряжение (от 3.5 до 5.0 вольт)
    };
  },
};
</script>

<style scoped>
.battery-status {
  background: #e9f7f5;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}

.battery-value,
.battery-voltage {
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
}

.battery-voltage {
  margin-top: 10px;
  color: #3e8e41;
}
</style>
