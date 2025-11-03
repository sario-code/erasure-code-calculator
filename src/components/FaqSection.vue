<template>
  <section :id="id" class="py-12 md:py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">常见问题</h2>
        
        <div class="space-y-4">
          <!-- 问题1 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <button class="faq-toggle w-full flex justify-between items-center p-5 text-left focus:outline-none" @click="toggleFaq(1)">
              <span class="font-medium">纠删码与RAID有什么区别？</span>
              <i class="fa fa-chevron-down text-neutral transition-transform duration-300" :style="{ transform: faqOpen[1] ? 'rotate(180deg)' : 'rotate(0deg)' }"></i>
            </button>
            <div class="faq-content px-5 pb-5" v-if="faqOpen[1]">
              <p class="text-gray-600 text-sm">
                纠删码和RAID都用于数据冗余和容错，但有重要区别。RAID通常在单一设备或少数设备上实现，容错能力有限（如RAID5最多容忍1块盘失效）。而纠删码可以跨多个节点分布，提供更高的容错能力（可配置为容忍多块盘失效），并且存储效率更高，特别适合大规模分布式存储系统。
              </p>
            </div>
          </div>
          
          <!-- 问题2 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <button class="faq-toggle w-full flex justify-between items-center p-5 text-left focus:outline-none" @click="toggleFaq(2)">
              <span class="font-medium">如何选择合适的K和M值？</span>
              <i class="fa fa-chevron-down text-neutral transition-transform duration-300" :style="{ transform: faqOpen[2] ? 'rotate(180deg)' : 'rotate(0deg)' }"></i>
            </button>
            <div class="faq-content px-5 pb-5" v-if="faqOpen[2]">
              <p class="text-gray-600 text-sm">
                选择K（数据块数）和M（校验块数）需要平衡存储效率和容错能力。K值越大，存储效率越高，但数据恢复时需要读取更多块；M值越大，容错能力越强，但会降低存储效率。一般推荐配置如4+2、8+4等，具体应根据业务对数据可靠性的要求和存储成本预算来决定。
              </p>
            </div>
          </div>
          
          <!-- 问题3 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <button class="faq-toggle w-full flex justify-between items-center p-5 text-left focus:outline-none" @click="toggleFaq(3)">
              <span class="font-medium">纠删码会影响读写性能吗？</span>
              <i class="fa fa-chevron-down text-neutral transition-transform duration-300" :style="{ transform: faqOpen[3] ? 'rotate(180deg)' : 'rotate(0deg)' }"></i>
            </button>
            <div class="faq-content px-5 pb-5" v-if="faqOpen[3]">
              <p class="text-gray-600 text-sm">
                是的，纠删码会对性能产生一定影响。写入时需要计算校验块，会增加CPU开销；读取少量数据时可能需要读取多个块；数据恢复时也需要较多的计算和IO操作。但现代系统通过优化算法和并行处理，已经大幅降低了这些影响，使得纠删码在大规模存储系统中得到广泛应用。
              </p>
            </div>
          </div>
          
          <!-- 问题4 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <button class="faq-toggle w-full flex justify-between items-center p-5 text-left focus:outline-none" @click="toggleFaq(4)">
              <span class="font-medium">多服务器部署时如何分配数据和校验块？</span>
              <i class="fa fa-chevron-down text-neutral transition-transform duration-300" :style="{ transform: faqOpen[4] ? 'rotate(180deg)' : 'rotate(0deg)' }"></i>
            </button>
            <div class="faq-content px-5 pb-5" v-if="faqOpen[4]">
              <p class="text-gray-600 text-sm">
                在多服务器部署中，数据块和校验块通常会均匀分布在不同服务器上，以提高容错能力和性能。这种分布策略确保即使整个服务器发生故障，系统仍然可以通过其他服务器上的块进行数据恢复。合理的分布策略可以最大化系统的可靠性和性能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  id: String
});

const faqOpen = ref({
  1: false,
  2: false,
  3: false,
  4: false
});

const toggleFaq = (id) => {
  faqOpen.value[id] = !faqOpen.value[id];
};
</script>