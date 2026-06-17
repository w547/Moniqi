<template>
  <div class="game-page">
    <div class="phone-container">
      <PhoneFrame />
    </div>
  </div>
</template>

<script setup>
import PhoneFrame from '@/components/phone/PhoneFrame.vue'
</script>

<style scoped>
.game-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a1a;
  padding: 10px;
}

.phone-container {
  width: 100%;
  max-width: 390px;
  height: 100%;
  max-height: 844px;
}
</style>
