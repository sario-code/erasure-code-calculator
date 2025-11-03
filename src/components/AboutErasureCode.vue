<template>
  <section :id="id" class="py-12 md:py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">关于纠删码</h2>
        
        <div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <p class="text-gray-700 mb-4">
            纠删码（Erasure Code，EC）是一种数据保护方法，通过将数据分割成多个片段，然后计算并存储冗余信息（校验块），使得即使部分原始数据丢失，也可以通过剩余的数据和校验块恢复完整信息。
          </p>
          
          <p class="text-gray-700 mb-4">
            与传统的RAID技术相比，纠删码提供了更高的存储效率和更强的容错能力，特别适合大规模分布式存储系统。常见的纠删码配置表示为K+M，其中K是数据块数量，M是校验块数量，系统可以容忍最多M个块（数据块或校验块）同时丢失。
          </p>
          
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h4 class="font-medium text-primary mb-2">纠删码的主要优势</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>更高的存储效率，相比多副本机制节省存储空间</li>
              <li>更强的容错能力，可以容忍多个磁盘同时失效</li>
              <li>适合大规模分布式存储系统，可扩展性好</li>
              <li>数据恢复能力强，确保数据可靠性</li>
            </ul>
          </div>
        </div>
        
        <!-- 工作原理 -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h3 class="text-xl font-bold mb-4">纠删码工作原理</h3>
          
          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="border border-gray-200 rounded-lg p-4 text-center">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="font-bold text-primary">1</span>
              </div>
              <h4 class="font-medium mb-2">数据分割</h4>
              <p class="text-sm text-neutral">将原始数据分割成K个相等大小的数据块</p>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 text-center">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="font-bold text-primary">2</span>
              </div>
              <h4 class="font-medium mb-2">计算校验块</h4>
              <p class="text-sm text-neutral">根据数据块计算出M个校验块</p>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 text-center">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="font-bold text-primary">3</span>
              </div>
              <h4 class="font-medium mb-2">数据恢复</h4>
              <p class="text-sm text-neutral">当部分块丢失时，通过剩余块恢复完整数据</p>
            </div>
          </div>
          
          <p class="text-sm text-neutral italic text-center">
            例如，在4+2的配置中，4个数据块和2个校验块，即使同时丢失2个块（无论数据块还是校验块），都可以恢复完整数据
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id: String
});
</script>