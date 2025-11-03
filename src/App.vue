<template>
  <div class="min-h-screen bg-gray-50 font-sans text-dark">
    <!-- 导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300" :class="headerClasses">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <i class="fa-solid fa-calculator text-primary text-2xl"></i>
          <h1 class="text-xl md:text-2xl font-bold text-dark">
            纠删码计算器
            <span class="text-sm md:text-base font-normal text-neutral ml-2">Erasure Code Calculator</span>
          </h1>
        </div>
        <nav class="hidden md:flex space-x-6">
          <a href="#calculator" class="text-neutral hover:text-primary transition-colors">计算器</a>
          <a href="#about" class="text-neutral hover:text-primary transition-colors">关于纠删码</a>
          <a href="#faq" class="text-neutral hover:text-primary transition-colors">常见问题</a>
        </nav>
        <button class="md:hidden text-dark" @click="mobileMenuOpen = !mobileMenuOpen">
          <i class="fa fa-bars text-xl"></i>
        </button>
      </div>
      <!-- 移动端菜单 -->
      <div id="mobile-menu" class="hidden md:hidden bg-white border-t" :class="{ hidden: !mobileMenuOpen }">
        <div class="container mx-auto px-4 py-2 flex flex-col space-y-3">
          <a href="#calculator" class="py-2 text-neutral hover:text-primary transition-colors" @click="mobileMenuOpen = false">计算器</a>
          <a href="#about" class="py-2 text-neutral hover:text-primary transition-colors" @click="mobileMenuOpen = false">关于纠删码</a>
          <a href="#faq" class="py-2 text-neutral hover:text-primary transition-colors" @click="mobileMenuOpen = false">常见问题</a>
        </div>
      </div>
    </header>

    <!-- 主横幅 -->
    <section class="bg-gradient-to-r from-primary to-blue-700 text-white py-12 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-4xl font-bold mb-4">纠删码存储配置计算器</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          快速计算纠删码存储方案，优化您的数据冗余与存储效率
        </p>
      </div>
    </section>

    <!-- 计算器主体 -->
    <section id="calculator" class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- 计算卡片 -->
          <div class="rounded-xl shadow-lg overflow-hidden mb-12">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- 输入区域 -->
              <CalculatorForm 
                :formData="formData" 
                :stripeSizes="stripeSizes"
                @updateForm="updateForm" 
                @calculate="calculate"
                :errorMessage="errorMessage"
              />
              
              <!-- 结果区域 -->
              <ResultDisplay 
                :results="results" 
                :numShardsGlobal="numShardsGlobal"
              />
            </div>
          </div>
          
          <!-- 可视化展示 -->
          <StorageVisualization 
            :results="results" 
            :formData="formData"
            :serverCount="formData.numberOfNodes"
            :disksPerServer="formData.drivesPerServer"
          />
          
          <!-- 推荐配置 -->
          <RecommendedConfigs />
        </div>
      </div>
    </section>

    <!-- 关于纠删码 -->
    <AboutErasureCode id="about" />

    <!-- 常见问题 -->
    <FaqSection id="faq" />

    <!-- 页脚 -->
    <footer class="bg-dark text-white py-10">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <i class="fa fa-shield text-primary text-2xl"></i>
              <h3 class="text-xl font-bold">纠删码计算器</h3>
            </div>
            <p class="text-gray-400 text-sm">
              一个简单实用的纠删码存储配置计算工具，帮助您优化存储方案，平衡数据可靠性和存储效率。
            </p>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">快速链接</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#calculator" class="hover:text-primary transition-colors">计算器</a></li>
              <li><a href="#about" class="hover:text-primary transition-colors">关于纠删码</a></li>
              <li><a href="#faq" class="hover:text-primary transition-colors">常见问题</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold mb-4">联系我们</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <!-- <li class="flex items-center"><i class="fa fa-envelope mr-2 text-primary"></i> contact@example.com</li> -->
              <li class="flex items-center"><i class="fa-brands fa-github mr-2 text-primary"></i> github.com/sario-code/erasure-code-calculator</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 纠删码计算器 | Erasure Code Calculator. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import CalculatorForm from './components/CalculatorForm.vue';
import ResultDisplay from './components/ResultDisplay.vue';
import StorageVisualization from './components/StorageVisualization.vue';
import RecommendedConfigs from './components/RecommendedConfigs.vue';
import AboutErasureCode from './components/AboutErasureCode.vue';
import FaqSection from './components/FaqSection.vue';

// 状态管理
const mobileMenuOpen = ref(false);
const scrollY = ref(0);
const formData = ref({
  numberOfNodes: 4,
  drivesPerServer: 8,
  driveCapacity: 4,
  stripeSize: 8,
  parityCount: 2
});
const results = ref({
  totalServers: 4,
  totalDisks: 32,
  rawCapacity: '128 TB',
  usableCapacity: '96 TB',
  storageEfficiency: '75.0%',
  driveFailuresTolerance: 2,
  serverFailuresTolerance: 1,
  configDescription: '此配置包含4台服务器，每台8块硬盘(4TB)，纠删码配置为8+2。总容量128TB，可用容量96TB。系统可以容忍最多2块磁盘或1台服务器同时失效而不丢失数据。'
});
const errorMessage = ref('');
const stripeSizes = ref([]);
const numServersPerShardGlobal = ref(0);
const numShardsGlobal = ref(0);
const storageChart = ref(null);

// 导航栏滚动效果
const headerClasses = computed(() => {
  return scrollY.value > 50 
    ? 'py-2 shadow' 
    : 'py-4';
});

// 单位转换相关
const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const niceBytes = (bytes) => {
  let unitIndex = 0;
  let numBytes = parseInt(BigInt(Math.round(Number(bytes))), 10) || 0;
  
  while (numBytes >= 1024 && ++unitIndex) {
    numBytes /= 1024;
  }
  
  return numBytes.toFixed(numBytes < 10 && unitIndex > 0 ? 1 : 0) + " " + units[unitIndex];
};

const getBytes = (value, unit) => {
  const num = parseFloat(value);
  const unitIndex = units.findIndex(u => u === unit);
  
  if (unitIndex === -1) return "0";
  
  return (num * Math.pow(1024, unitIndex)).toString(10);
};

// 计算条带大小
const calculateStripeSizes = (numNodes, drivesPerServer) => {
  numShardsGlobal.value = 1;
  numServersPerShardGlobal.value = numNodes;
  
  let totalServers = numNodes;
  
  // 计算分片
  for (let i = 1; i <= 16; i++) {
    if (totalServers % i === 0) {
      numServersPerShardGlobal.value = i;
      numShardsGlobal.value = totalServers / i;
    }
  }
  
  // 验证服务器数量
  if (numServersPerShardGlobal.value <= 3) {
    resetParityTable();
    errorMessage.value = "高可用性推荐至少4台服务器";
    return [];
  }
  
  // 计算有效的条带大小
  let possibleStripeSizes = [];
  
  if (numShardsGlobal.value === 1) {
    let multiplier = 1;
    let stripeSize = numServersPerShardGlobal.value * multiplier;
    
    while (stripeSize <= 16) {
      if ((numServersPerShardGlobal.value * drivesPerServer) % stripeSize === 0) {
        possibleStripeSizes.push(stripeSize);
      }
      multiplier++;
      stripeSize = numServersPerShardGlobal.value * multiplier;
    }
  } else {
    possibleStripeSizes.push(numServersPerShardGlobal.value);
  }
  
  // 排序并去重
  if (possibleStripeSizes.length > 1) {
    possibleStripeSizes = [...new Set(possibleStripeSizes)].sort((a, b) => b - a);
  }
  
  return possibleStripeSizes;
};

// 计算校验块数量
const calculateParityCount = (stripeSize) => {
  const parityOptions = [];
  let currentSize = stripeSize;
  
  while (currentSize >= 4) {
    if (currentSize % 2 === 0) {
      const parity = currentSize / 2;
      parityOptions.push(parity);
    }
    currentSize--;
  }
  
  return parityOptions;
};

// 重置校验表
const resetParityTable = () => {
  errorMessage.value = '';
  results.value = {
    ...results.value,
    usableCapacity: '0 TiB',
    rawCapacity: '0 TiB',
    storageEfficiency: '0%',
    driveFailuresTolerance: 0,
    serverFailuresTolerance: 0
  };
};

// 单组配置计算
const singleSetConfiguration = () => {
  const { numberOfNodes, drivesPerServer, driveCapacity, stripeSize, parityCount } = formData.value;
  const driveCapacityBytes = parseInt(getBytes(driveCapacity, "TiB"));
  
  // 计算总原始容量
  const totalRawCapacity = numberOfNodes * drivesPerServer * driveCapacityBytes;
  
  // 计算可用容量和存储效率
  const efficiencyRatio = (stripeSize - parityCount) / stripeSize;
  const usableCapacity = totalRawCapacity * efficiencyRatio;
  
  // 计算容错能力
  let driveFailureTolerance = parityCount;
  if (driveFailureTolerance === stripeSize / 2) {
    driveFailureTolerance--;
  }
  
  // 计算服务器容错能力
  const totalDrives = Math.floor(driveFailureTolerance / stripeSize * numberOfNodes * drivesPerServer);
  const serverFailureTolerance = Math.floor(driveFailureTolerance * numServersPerShardGlobal.value / stripeSize);
  const totalServers = Math.floor(driveFailureTolerance * numServersPerShardGlobal.value / stripeSize * numShardsGlobal.value);
  
  // 更新结果
  results.value = {
    ...results.value,
    totalServers: numberOfNodes,
    totalDisks: numberOfNodes * drivesPerServer,
    rawCapacity: niceBytes(totalRawCapacity),
    usableCapacity: niceBytes(usableCapacity),
    storageEfficiency: Math.floor(100 * efficiencyRatio) + "%",
    driveFailuresTolerance: driveFailureTolerance,
    serverFailuresTolerance: serverFailureTolerance,
    configDescription: `此配置包含${numberOfNodes}台服务器，每台${drivesPerServer}块硬盘(${driveCapacity}TB)，纠删码配置为${stripeSize}+${parityCount}。总容量${niceBytes(totalRawCapacity)}，可用容量${niceBytes(usableCapacity)}。系统可以容忍最多${driveFailureTolerance}块磁盘或${serverFailureTolerance}台服务器同时失效而不丢失数据。`
  };
  
  // 显示/隐藏服务器容错信息
  // 这部分在ResultDisplay组件中处理
};

// 开始纠删码计算
const beginECCalculation = (isStripeChange = false) => {
  const { numberOfNodes, drivesPerServer, stripeSize } = formData.value;
  const totalDrives = numberOfNodes * drivesPerServer;
  
  // 不重新生成条带大小选项如果是条带大小变更
  if (!isStripeChange) {
    // 条带大小选项在calculate函数中处理
  }
  
  // 清除错误信息
  errorMessage.value = '';
  
  // 计算校验块数量
  const parityOptions = calculateParityCount(stripeSize);
  
  // 验证总驱动器数量
  if (totalDrives < 4) {
    resetParityTable();
    errorMessage.value = "请指定包含4个或更多驱动器的配置";
    return;
  }
  
  // 验证校验选项
  if (parityOptions.length === 0) {
    resetParityTable();
    errorMessage.value = "无效的配置组合，请尝试其他组合";
    return;
  }
  
  // 填充校验选项并设置默认值
  if (!isStripeChange) {
    // 设置默认校验值
    if (totalDrives >= 16 && parityOptions.includes(4)) {
      formData.value.parityCount = 4;
    } else {
      // 默认选择第一个选项
      formData.value.parityCount = parityOptions[0];
    }
  }
  
  // 执行计算
  singleSetConfiguration();
};

// 主计算函数
const calculate = (stripeSize = 0) => {
  const { numberOfNodes, drivesPerServer, driveCapacity } = formData.value;
  const numDrivesPerServer = parseInt(drivesPerServer);
  
  // 验证每服务器驱动器数量
  if (numDrivesPerServer > 256 || numDrivesPerServer < 1) {
    resetParityTable();
    errorMessage.value = "每服务器驱动器数量必须至少为1且最多为256";
    return;
  }
  
  // 验证驱动器容量
  if (driveCapacity < 1) {
    resetParityTable();
    errorMessage.value = "驱动器容量必须至少为1TiB";
    return;
  }
  
  // 计算条带大小（如果不是条带大小变更）
  if (stripeSize === 0) {
    stripeSizes.value = calculateStripeSizes(numberOfNodes, drivesPerServer);
  }
  
  // 验证输入和条带大小
  if (!isNaN(numberOfNodes) && !isNaN(drivesPerServer) && !isNaN(driveCapacity) && 
      numberOfNodes !== "" && drivesPerServer !== "" && driveCapacity !== "" && 
      stripeSizes.value.length > 0) {
    
    let selectedStripeSize = stripeSizes.value[0];
    const isStripeChange = stripeSize !== 0;
    
    if (isStripeChange) {
      selectedStripeSize = stripeSize;
      formData.value.stripeSize = stripeSize;
    } else {
      // 更新表单中的条带大小为第一个可用选项
      formData.value.stripeSize = selectedStripeSize;
    }
    
    beginECCalculation(isStripeChange);
  }
};

// 更新表单数据
const updateForm = (field, value) => {
  formData.value[field] = value;
};

// 监听滚动事件
onMounted(() => {
  const handleScroll = () => {
    scrollY.value = window.scrollY;
  };
  
  window.addEventListener('scroll', handleScroll);
  calculate();
  
  // 处理URL参数
  const params = new URLSearchParams(window.location.search);
  if (params.has("number_of_servers") && params.has("drives_per_server") && 
      params.has("drive_capacity") && params.has("stripe_size") && params.has("parity_count")) {
      
    formData.value.numberOfNodes = parseInt(params.get("number_of_servers"));
    formData.value.drivesPerServer = parseInt(params.get("drives_per_server"));
    formData.value.driveCapacity = parseFloat(params.get("drive_capacity"));
    formData.value.stripeSize = parseInt(params.get("stripe_size"));
    formData.value.parityCount = parseInt(params.get("parity_count"));
    
    calculate();
  }
  
  return () => window.removeEventListener('scroll', handleScroll);
});

// 监听表单数据变化
watch([() => formData.value.numberOfNodes, () => formData.value.drivesPerServer, () => formData.value.driveCapacity], () => {
  calculate();
});

watch([() => formData.value.stripeSize, () => formData.value.parityCount], () => {
  singleSetConfiguration();
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .disk-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .server-rack {
    border: 2px solid #cbd5e1;
    border-radius: 6px;
    background-color: #f8fafc;
    position: relative;
    padding-top: 20px;
    margin-bottom: 15px;
  }
  .server-rack::before {
    content: '服务器';
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: white;
    padding: 0 5px;
    font-size: 12px;
    color: #64748b;
  }
}
</style>