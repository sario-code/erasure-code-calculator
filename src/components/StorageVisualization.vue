<template>
  <div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
    <h3 class="text-xl font-bold mb-6 flex items-center">
      <i class="fa fa-pie-chart text-primary mr-2"></i>存储分布可视化
    </h3>
    
    <div class="grid md:grid-cols-2 gap-8">
      <!-- 饼图 -->
      <div class="h-64 md:h-80">
        <canvas id="storage-chart"></canvas>
      </div>
      
      <!-- 服务器与磁盘布局 -->
      <div>
        <h4 class="text-lg font-medium mb-4">服务器与磁盘布局 <span id="layout-config">(K={{ formData.stripeSize }}, M={{ formData.parityCount }})</span></h4>
        <div id="server-layout" class="space-y-4">
          <!-- 服务器布局将通过JS动态生成 -->
          <template v-for="s in serverCount" :key="s">
            <div class="server-rack">
              <div :class="`grid grid-cols-${cols} gap-2 p-2`">
                <template v-for="d in disksPerServer" :key="`${s}-${d}`">
                  <div :class="`disk-shadow ${diskClass(s, d)} rounded-lg p-2 text-center text-xs`">
                    <i :class="`fa fa-hard-drive ${diskIconClass(s, d)} text-lg mb-1`"></i>
                    <p>{{ diskLabel(s, d) }}</p>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h5 class="font-medium text-primary mb-2 flex items-center">
            <i class="fa fa-info-circle mr-2"></i>配置说明
          </h5>
          <p class="text-sm text-gray-700">
            {{ results.configDescription }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement
} from 'chart.js';

// 注册 Chart.js 组件
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement
);

const props = defineProps({
  results: Object,
  formData: Object,
  serverCount: Number,
  disksPerServer: Number
});

const cols = Math.min(6, props.disksPerServer);
const stripeTotal = ref(props.formData.stripeSize + props.formData.parityCount);
const dataDisksAssigned = ref(0);
const parityDisksAssigned = ref(0);

// 计算磁盘样式和标签
const diskClass = (server, disk) => {
  const totalDisks = (server - 1) * props.disksPerServer + disk;
  const position = (totalDisks - 1) % stripeTotal.value;
  
  if (position < props.formData.stripeSize) {
    return 'bg-blue-50 border-2 border-primary';
  } else {
    return 'bg-green-50 border-2 border-secondary';
  }
};

const diskIconClass = (server, disk) => {
  const totalDisks = (server - 1) * props.disksPerServer + disk;
  const position = (totalDisks - 1) % stripeTotal.value;
  
  if (position < props.formData.stripeSize) {
    return 'text-primary';
  } else {
    return 'text-secondary';
  }
};

const diskLabel = (server, disk) => {
  const totalDisks = (server - 1) * props.disksPerServer + disk;
  const position = (totalDisks - 1) % stripeTotal.value;
  
  if (position < props.formData.stripeSize) {
    return '数据';
  } else {
    return '校验';
  }
};

// 初始化图表
onMounted(() => {
  const initChart = () => {
    const { rawCapacity, usableCapacity } = props.results;
    const capacityMatch = rawCapacity.match(/(\d+\.?\d*)\s*(\w+)/);
    const usableMatch = usableCapacity.match(/(\d+\.?\d*)\s*(\w+)/);
    
    if (!capacityMatch || !usableMatch) return;
    
    const rawValue = parseFloat(capacityMatch[1]);
    const rawUnit = capacityMatch[2];
    const usableValue = parseFloat(usableMatch[1]);
    const parityValue = rawValue - usableValue;
    
    const ctx = document.getElementById('storage-chart').getContext('2d');
    
    // 销毁已存在的图表
    if (window.storageChart) {
      window.storageChart.destroy();
    }
    
    // 创建新图表
    window.storageChart = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: ['可用存储', '校验存储'],
        datasets: [{
          data: [usableValue, parityValue],
          backgroundColor: [
            '#2563eb',  // 主色调：数据存储
            '#10b981'   // 辅助色：校验存储
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value.toFixed(1)} ${rawUnit} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '70%'
      }
    });
  };
  
  initChart();
  
  // 监听窗口大小变化，重新绘制图表
  window.addEventListener('resize', initChart);
  
  return () => {
    window.removeEventListener('resize', initChart);
  };
});
</script>

<style scoped>
.grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
}
</style>