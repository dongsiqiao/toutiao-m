<template>
  <van-button
    v-if="isFollowed"
    round
    size="small"
    @click="onFollow"
    :loading="followLoading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="followLoading"
    >关注</van-button
  >
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow() {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '无法关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
