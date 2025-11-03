<template>
  <div class="p-6 md:p-8 bg-white  border-b md:border-b-0 md:border-r border-gray-100">
    <h3 class="text-xl font-bold mb-6 flex items-center">
      <i class="fa fa-sliders text-primary mr-2"></i>配置参数
    </h3>
    
    <form id="ec-form" class="space-y-6">
      <!-- 服务器数量 -->
      <div>
        <label for="number-of-nodes" class="block text-sm font-medium text-gray-700 mb-1">
          服务器数量
        </label>
        <div class="flex items-center">
          <input 
            type="number" 
            id="number-of-nodes" 
            v-model="formData.numberOfNodes"
            min="1" 
            max="100" 
            class="flex-1 rounded-l-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 transition-all px-4 py-2 border"
            @input="handleInput('numberOfNodes', parseInt($event.target.value))"
          >
          <span class="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300">台</span>
        </div>
      </div>
      
      <!-- 每台服务器硬盘数量 -->
      <div>
        <label for="drives-per-server" class="block text-sm font-medium text-gray-700 mb-1">
          每台服务器的硬盘数量
        </label>
        <div class="flex items-center">
          <input 
            type="number" 
            id="drives-per-server" 
            v-model="formData.drivesPerServer"
            min="1" 
            max="256" 
            class="flex-1 rounded-l-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 transition-all px-4 py-2 border"
            @input="handleInput('drivesPerServer', parseInt($event.target.value))"
          >
          <span class="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300">块</span>
        </div>
      </div>
      
      <!-- 硬盘容量 -->
      <div>
        <label for="drive-capacity" class="block text-sm font-medium text-gray-700 mb-1">
          硬盘容量
        </label>
        <div class="flex items-center">
          <input 
            type="number" 
            id="drive-capacity" 
            v-model="formData.driveCapacity"
            min="1" 
            max="100" 
            step="0.5" 
            class="flex-1 rounded-l-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 transition-all px-4 py-2 border"
            @input="handleInput('driveCapacity', parseFloat($event.target.value))"
          >
          <span class="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300">TB</span>
        </div>
      </div>
      
      <!-- 纠删码条带大小 (K) -->
      <div>
        <label for="ec-stripe-options" class="block text-sm font-medium text-gray-700 mb-1">
          纠删码条带大小 (K)
          <span class="text-xs text-neutral ml-2">数据块数量</span>
        </label>
        <select 
          id="ec-stripe-options" 
          v-model="formData.stripeSize"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 transition-all px-4 py-2 border"
          @change="$emit('updateForm', 'stripeSize', parseInt($event.target.value)); $emit('calculate', parseInt($event.target.value))"
        >
          <option v-for="size in stripeSizeOptions" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
      
      <!-- 纠删码奇偶校验 (M) -->
      <div>
        <label for="ec-parity-options" class="block text-sm font-medium text-gray-700 mb-1">
          纠删码奇偶校验 (M)
          <span class="text-xs text-neutral ml-2">校验块数量，可承受M块失效</span>
        </label>
        <select 
          id="ec-parity-options" 
          v-model="formData.parityCount"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 transition-all px-4 py-2 border"
          @change="$emit('updateForm', 'parityCount', parseInt($event.target.value))"
        >
          <option v-for="parity in parityOptions" :key="parity" :value="parity">{{ parity }}</option>
        </select>
      </div>
      
      <button 
        type="button" 
        id="calculate-btn" 
        class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
        @click="$emit('calculate')"
      >
        <i class="fa fa-calculator mr-2"></i>计算存储配置
      </button>
    </form>
    
    <div id="error-message" class="mt-4 text-red-500 text-sm" :class="{ hidden: !errorMessage }">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, watch } from 'vue';

const props = defineProps({
  formData: Object,
  errorMessage: String,
  stripeSizes: Array
});

const emit = defineEmits(['updateForm', 'calculate']);

// 计算可用的条带大小选项
const stripeSizeOptions = computed(() => {
  return props.stripeSizes && props.stripeSizes.length > 0 
    ? props.stripeSizes 
    : [4, 8, 16];
});

// 计算可用的校验块选项
const parityOptions = computed(() => {
  const stripeSize = props.formData.stripeSize;
  const parityOptions = [];
  let currentSize = stripeSize;
  
  while (currentSize >= 4) {
    if (currentSize % 2 === 0) {
      const parity = currentSize / 2;
      parityOptions.push(parity);
    }
    currentSize--;
  }
  
  return parityOptions.length > 0 ? parityOptions : [2, 4];
});

// 处理输入事件
const handleInput = (field, value) => {
  emit('updateForm', field, value);
  // 当基础配置参数改变时，触发计算以更新纠删码参数
  if (field !== 'stripeSize' && field !== 'parityCount') {
    emit('calculate');
  }
};
</script>