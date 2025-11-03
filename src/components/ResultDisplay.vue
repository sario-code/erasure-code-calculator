<template>
  <div class="p-6 md:p-8 bg-gray-50">
    <h3 class="text-xl font-bold mb-6 flex items-center">
      <i class="fa fa-bar-chart text-secondary mr-2"></i>计算结果
    </h3>
    
    <div id="result" class="space-y-6">
      <!-- 总服务器数 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">总服务器数量</p>
            <p class="text-2xl font-bold text-dark">{{ results.totalServers }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <i class="fa fa-server text-primary text-xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 总磁盘数 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">总磁盘数量</p>
            <p class="text-2xl font-bold text-dark">{{ results.totalDisks }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <i class="fa fa-hard-drive text-indigo-600 text-xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 总原始容量 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">总原始容量</p>
            <p class="text-2xl font-bold text-dark">{{ results.rawCapacity }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i class="fa fa-database text-secondary text-xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 可用容量 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">可用存储容量</p>
            <p class="text-2xl font-bold text-dark">{{ results.usableCapacity }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <i class="fa fa-square-check text-accent text-xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 存储效率 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">存储效率</p>
            <p class="text-2xl font-bold text-dark">{{ results.storageEfficiency }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <i class="fa fa-percent text-purple-600 text-xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 容错能力 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">最大容错磁盘数</p>
            <p class="text-2xl font-bold text-dark">{{ results.driveFailuresTolerance }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <i class="fa fa-shield text-red-600 text-xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 服务器容错能力 -->
      <div class="bg-white rounded-lg p-4 shadow-sm card-hover" id="server-tolerance-main">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-neutral text-sm">最大容错服务器数</p>
            <p class="text-2xl font-bold text-dark">{{ results.serverFailuresTolerance }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <i class="fa fa-server text-red-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  results: Object,
  numShardsGlobal: Number
});
</script>