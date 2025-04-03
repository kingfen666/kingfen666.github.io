<template>
  <div class="container">
    <!-- 垃圾桶结构 -->
    <div class="trash-container" ref="trashRef">
      <div class="trash-lid" :class="{ 'lid-open': isOpen }"></div>
      <div class="trash-body">
      
        <div class="warning-label">
          <span class="biohazard-symbol">☣</span>
          <span class="warning-text">有害垃圾</span>
        </div>
      </div>
    </div>

    <!-- 待清理物品 -->
    <img 
      :src="imageSrc"
      class="trash-item"
      :class="{ 'disposing': isDisposing }"
      alt="垃圾"
    >

    <!-- 操作按钮 -->
    <button class="action-btn" @click="handleAction">
      {{ isDisposed ? '重置' : '开始清理' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isOpen = ref(false);
const isDisposing = ref(false);
const isDisposed = ref(false);
const trashRef = ref(null);
const imageSrc = 'public\\mmexport1743693875134.jpg';

// 获取垃圾桶位置
let trashTopPosition = 0;
let trashLeftPosition = 0;

onMounted(() => {
  const rect = trashRef.value.getBoundingClientRect();
  trashTopPosition = rect.top + 30; // 垃圾桶顶部坐标
  trashLeftPosition = rect.left + rect.width/2 - 30; // 垃圾桶中心坐标
});

const handleAction = () => {
  if (isDisposed.value) {
    resetState();
    return;
  }

  isOpen.value = true;
  setTimeout(() => {
    isDisposing.value = true;
    setTimeout(() => {
      isOpen.value = false;
      isDisposed.value = true;
    }, 1900);
  }, 300);
};

const resetState = () => {
  isDisposing.value = false;
  isDisposed.value = false;
  isOpen.value = false;
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f8ff;
  overflow: hidden;
}

/* 垃圾桶容器 */
.trash-container {
  position: absolute;
  margin-top: 35%;
  left: 30%;
  transform: translateX(-50%);
  z-index: 2;
}

/* 垃圾桶盖子 */
.trash-lid {
  width: 160px;
  height: 40px;
  background: #d32f2f;
  border-radius: 10px 10px 0 0;
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  box-shadow: -3px -4px 8px rgba(0,0,0,0.2);
}

.lid-open {
  transform: rotate(-75deg);
}

/* 垃圾桶主体 */
.trash-body {
  width: 160px;
  height: 220px;
  background: linear-gradient(160deg, #c62828 0%, #b71c1c 100%);
  border-radius: 0 0 20px 20px;
  position: relative;
  box-shadow: 
    5px 10px 20px rgba(0,0,0,0.2),
    inset 0 -15px 25px rgba(0,0,0,0.3);
}
.warning-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;

  border-radius: 8px;
}
.biohazard-symbol {
  color: #fff;
  font-size: 2.5em;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  margin-bottom: 8px;
}

.warning-text {
  color: #fff;
  font-size: 1.3em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}


/* 精确动画控制 */
.trash-item {
  position: fixed;
  width: 100px;
  right: 20%;
  top: 40%;
  opacity: 1;
  z-index: 1;
  transition: opacity 0.3s;
  pointer-events: none;
}

.trash-item.disposing {
  animation: dispose 2s forwards cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dispose {
  0% {
    transform: 
      translate(0, 0) 
      scale(1) 
      rotate(0deg);
    opacity: 1;
  }
  30% {
    transform: 
      translate(calc(-50vw + 50px), -80px) 
      scale(0.9) 
      rotate(-120deg);
    opacity: 0.9;
  }
  60% {
    transform: 
      translate(calc(-100vw + 160px), 40px) 
      scale(0.7) 
      rotate(-240deg);
    opacity: 0.6;
  }
  100% {
    transform: 
      translate(calc(-100vw + 180px), 60px) 
      scale(0.4) 
      rotate(-360deg);
    opacity: 0;
  }
}

/* 操作按钮 */
.action-btn {
  position: fixed;
  bottom: 15vh;
  padding: 18px 60px;
  background: linear-gradient(145deg, #d32f2f 0%, #b71c1c 100%);
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(181, 28, 28, 0.3);
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: translateY(-3px);
}

.action-btn:active {
  transform: translateY(1px);
}

@media (max-width: 768px) {
  .trash-container {
    top: 15vh;
  }

  .trash-item {
    width: 80px;
    right: 10%;
  }

  @keyframes dispose {
    100% {
      opacity: 0;
      transform: 
        translate(calc(-100vw + 210px), -100px) 
        scale(0.4);
    }
    0% { opacity: 1; }
  30% { opacity: 0.9; }
  60% { opacity: 0.6; }
 
   
  }
  
}
</style>