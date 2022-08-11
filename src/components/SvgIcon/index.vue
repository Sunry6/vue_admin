<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate'

const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true,
  },
  // 图标类名
  className: {
    type: String,
    default: '',
  },
})

/**
 * 判断当前图标是否为外部图标
 */
const isExternal = computed(() => {
  external(props.icon)
})

/**
 * 外部图标样式
 * 写样式要拿圆括号包裹起来
 * 给外部图标添加样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}))

/**
 * 内部图标
 * 给所有传递过来的图标添加一个前缀
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
