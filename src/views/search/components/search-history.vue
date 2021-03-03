<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <!-- isDeleteShow 默认为 false，即默认显示 v-else 的删除按钮 -->
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories', [])">全部删除</span
        >&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :title="item"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <!-- 每一行的删除按钮 -->
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // props 如果是普通数据，不能修改
    // 如果是引用类型数据，可以修改，但不能重新赋值
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
