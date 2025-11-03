<template>
  <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
    <h3 class="text-xl font-bold mb-6 flex items-center">
      <i class="fa fa-lightbulb-o text-accent mr-2"></i>推荐配置方案
    </h3>
    
    <div class="grid md:grid-cols-3 gap-6">
      <!-- 入门配置 -->
      <div class="border border-gray-200 rounded-lg p-5 card-hover">
        <div class="text-center mb-4">
          <div class="inline-block p-3 bg-blue-100 rounded-full">
            <i class="fa fa-rocket text-primary text-xl"></i>
          </div>
          <h4 class="font-bold mt-3">入门配置</h4>
        </div>
        <ul class="space-y-2 text-sm">
          <li class="flex justify-between"><span class="text-neutral">服务器数量:</span> <span>4</span></li>
          <li class="flex justify-between"><span class="text-neutral">每服务器硬盘:</span> <span>6</span></li>
          <li class="flex justify-between"><span class="text-neutral">纠删码配置:</span> <span>4+2</span></li>
          <li class="flex justify-between"><span class="text-neutral">存储效率:</span> <span>66.7%</span></li>
          <li class="flex justify-between"><span class="text-neutral">容错能力:</span> <span>2块盘/1台服务器</span></li>
        </ul>
        <p class="mt-4 text-xs text-neutral text-center">适合小型部署，平衡了存储效率和容错能力</p>
      </div>
      
      <!-- 标准配置 -->
      <div class="border-2 border-primary rounded-lg p-5 bg-blue-50 card-hover relative">
        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
          最受欢迎
        </div>
        <div class="text-center mb-4">
          <div class="inline-block p-3 bg-primary/20 rounded-full">
            <i class="fa fa-cogs text-primary text-xl"></i>
          </div>
          <h4 class="font-bold mt-3">标准配置</h4>
        </div>
        <ul class="space-y-2 text-sm">
          <li class="flex justify-between"><span class="text-neutral">服务器数量:</span> <span>8</span></li>
          <li class="flex justify-between"><span class="text-neutral">每服务器硬盘:</span> <span>8</span></li>
          <li class="flex justify-between"><span class="text-neutral">纠删码配置:</span> <span>8+4</span></li>
          <li class="flex justify-between"><span class="text-neutral">存储效率:</span> <span>66.7%</span></li>
          <li class="flex justify-between"><span class="text-neutral">容错能力:</span> <span>4块盘/2台服务器</span></li>
        </ul>
        <p class="mt-4 text-xs text-neutral text-center">适合中型部署，提供更好的容错能力</p>
      </div>
      
      <!-- 高可用配置 -->
      <div class="border border-gray-200 rounded-lg p-5 card-hover">
        <div class="text-center mb-4">
          <div class="inline-block p-3 bg-green-100 rounded-full">
            <i class="fa fa-shield text-secondary text-xl"></i>
          </div>
          <h4 class="font-bold mt-3">高可用配置</h4>
        </div>
        <ul class="space-y-2 text-sm">
          <li class="flex justify-between"><span class="text-neutral">服务器数量:</span> <span>16</span></li>
          <li class="flex justify-between"><span class="text-neutral">每服务器硬盘:</span> <span>12</span></li>
          <li class="flex justify-between"><span class="text-neutral">纠删码配置:</span> <span>16+8</span></li>
          <li class="flex justify-between"><span class="text-neutral">存储效率:</span> <span>66.7%</span></li>
          <li class="flex justify-between"><span class="text-neutral">容错能力:</span> <span>8块盘/4台服务器</span></li>
        </ul>
        <p class="mt-4 text-xs text-neutral text-center">适合大型部署，需要高容错能力的场景</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无额外逻辑
</script>