<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeMenu"
      class="menu"
      background-color="#1F2937"
      text-color="#ffffff"
      active-text-color="#4F46E5"
      router
    >
      <el-menu-item index="/">
        <router-link to="/" class="menu-link">
          Home
        </router-link>
      </el-menu-item>

      <el-menu-item index="/locations">
        <router-link to="/locations" class="menu-link">
          Locations
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const activeMenu = route.path; // Динамически определяем активное меню
</script>

<style scoped>
.sidebar {
  position: fixed; /* Фиксируем сайдбар */
  top: 0;
  left: 0;
  height: 100vh; /* Полная высота экрана */
  width: 200px; /* Ширина сайдбара */
  background-color: #1F2937; /* Цвет фона */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.menu-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 10px 20px;
}

.menu-link:hover {
  color: #4F46E5;
}
</style>
