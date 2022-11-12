<template>
  <div class="comment-reply" @touchend.stop>
    <div @click="cancelMaskLayer" style="height: 30px">
      <div class="pull-down-btn"></div>
    </div>
    <div class="layer-master-comment">
      <van-skeleton :row="4" avatar :loading="loading">
        <div class="layer-master-item">
          <div class="img" v-if="mainCommentItem.user">
            <img :src="mainCommentItem.user.smallIcon" />
          </div>
          <div class="layer-master-msg">
            <div class="name" v-if="mainCommentItem.user">
              <span>{{ mainCommentItem.user.nickName }}</span>
              <img
                v-if="mainCommentItem.user.userMemberInfos"
                :src="mainCommentItem.user.userMemberInfos[0].icon"
              />
              <img
                v-if="mainCommentItem.user.userCommentIcons[0]"
                :src="mainCommentItem.user.userCommentIcons[0].iconPic"
              />
              <img
                v-if="
                  mainCommentItem.user.userIdentityInfoItems &&
                  mainCommentItem.user.userIdentityInfoItems[0]
                "
                :src="mainCommentItem.user.userIdentityInfoItems[0].icon"
              />
              <img
                v-if="
                  mainCommentItem.user.userIdentityInfoItems &&
                  mainCommentItem.user.userIdentityInfoItems[1]
                "
                :src="mainCommentItem.user.userIdentityInfoItems[1].icon"
              />
            </div>
            <div class="time">{{ mainCommentItem.commentTime }}</div>
          </div>
          <div class="good" v-if="mainCommentItem.opNumItem">
            <span
              >{{ dealWithPlayNum(mainCommentItem.opNumItem.thumbNum) }} ❤</span
            >
          </div>
        </div>
        <div class="layer-master-comment">
          {{ mainCommentItem.commentInfo }}
        </div>
      </van-skeleton>
    </div>
    <div class="reply-title">全部回复 ({{ allCommentsCount }})</div>
    <van-skeleton :row="4" avatar :loading="loading"></van-skeleton>
    <van-skeleton :row="4" avatar :loading="loading"></van-skeleton>
    <van-skeleton :row="4" avatar :loading="loading"></van-skeleton>
    <van-skeleton :row="4" avatar :loading="loading"></van-skeleton>
    <van-list
      :loading="loadingMore"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中..."
      @load="onLoad"
      style="padding: 0 0 0 0"
    >
      <van-cell
        class="reply-item"
        v-for="(i, index) in mainCommentItem.replyComments"
        :key="index"
      >
        <div class="reply-user">
          <div class="reply-img">
            <img :src="i.user.smallIcon" />
          </div>
          <div class="reply-msg">
            <div class="reply-name">
              <span>{{ i.user.nickName }}</span>
              <img
                v-if="i.user.userMemberInfos"
                :src="i.user.userMemberInfos[0].icon"
              />
              <img
                v-if="i.user.userCommentIcons[0]"
                :src="i.user.userCommentIcons[0].iconPic"
              />
              <img
                v-if="
                  i.user.userIdentityInfoItems &&
                  i.user.userIdentityInfoItems[0]
                "
                :src="i.user.userIdentityInfoItems[0].icon"
              />
              <img
                v-if="
                  i.user.userIdentityInfoItems &&
                  i.user.userIdentityInfoItems[1]
                "
                :src="i.user.userIdentityInfoItems[1].icon"
              />
            </div>
            <div class="reply-time">{{ i.replyTime }}</div>
          </div>
          <div class="reply-good">
            {{ dealWithPlayNum(i.opNumItem.thumbNum) }} ❤
          </div>
        </div>
        <div class="reply-comment">
          <span v-if="i.targetUser.nickName != mainCommentItem.user.nickName"
            >回复
            <span class="reply-comment-active"
              >{{ i.targetUser.nickName }}:</span
            ></span
          >
          {{ i.replyInfo }}
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  props: { moreCommentId: String },
  data() {
    return {
      resourceId: "",
      mainCommentItem: "",
      loading: true,
      loadingMore: false,
      getNum: 20,
      allCommentsCount: 1,
      finished: false,
      preCommentId: "",
      start: 0,
      allComments: [],
    };
  },
  created() {
    this.resourceId = this.moreCommentId;
    console.log(this.moreCommentId);
    this.onLoad = debounce(this.onLoad, 2000);
  },
  computed: {
    allCommentUrl() {
      return `/MIGUM3.0/user/comment/stack/${this.resourceId}/v1.0?pageSize=20&queryType=2&resourceId=${this.resourceId}&resourceType=2&start=0`;
    },
  },
  watch: {
    allCommentUrl() {
      this.getAllCommentData();
    },
  },
  methods: {
    getAllCommentData() {
      this.$axios.get(this.allCommentUrl).then(({ data }) => {
        console.log(data.data);
        this.mainCommentItem = data.data.mainCommentItem;
        this.allComments = this.mainCommentItem.replyComments;
        this.allCommentsCount = this.mainCommentItem.replyTotalCount;
        this.loading = false;
      });
    },
    // 处理点赞人数
    dealWithPlayNum(num) {
      let num1 = 0;
      let num2 = 0;
      if (num > 10000) {
        num1 = parseInt(num / 10000);
        num2 = parseInt(num % 10000);
        num2 = String(num2).slice(0, 1);
        num = num1 + "." + num2 + "w";
        return num;
      } else if (num == 0) {
        return "";
      } else {
        return num;
      }
    },
    cancelMaskLayer() {
      // this.moreComment = false;
      this.$emit("cancelMaskLayer");
    },
    // 下拉刷新
    onLoad() {
      this.start += 20;
      console.log(
        this.mainCommentItem.replyComments.length,
        this.allCommentsCount
      );

      if (this.mainCommentItem.replyComments.length < this.allCommentsCount) {
        this.$axios(
          `/MIGUM3.0/user/comment/stack/${this.resourceId}/v1.0?pageSize=20&queryType=2&resourceId=${this.resourceId}&resourceType=2&start=${this.start}`
        ).then(({ data }) => {
          console.log(data.data);
          data.data.mainCommentItem.replyComments.forEach((element) => {
            this.allComments.push(element);
          });
          this.loadingMore = false;
        });
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-skeleton--primary {
  margin: var(50px);
}
.van-skeleton {
  margin: 0 0 50px 0;
}
.comment-reply {
  width: 90%;
  margin: 0 auto;
  .pull-down-btn {
    width: 100px;
    height: 5px;
    margin: 10px auto;
    border-radius: 999px;
    background-color: #979797;
  }
  .layer-master-comment {
    border-bottom: 1px dotted #ccc;
  }
  .layer-master-comment,
  .reply-item {
    padding: 10px 0 20px;
    display: flex;
    flex-direction: column;
    .layer-master-item,
    .reply-user {
      position: relative;
      display: flex;
      align-items: center;
      .img,
      .reply-img {
        img {
          display: block;
          width: 10vw;
          border-radius: 999px;
        }
      }
      .layer-master-msg,
      .reply-msg {
        width: 70%;
        margin: 0 0 0 10px;
        .name,
        .reply-name {
          img {
            margin-right: 2px;
            display: inline-block;
            height: 4vw;
          }
        }
        .time,
        .reply-time {
          padding: 5px 0;
          font-size: 12px;
          color: #666;
        }
      }
      .good,
      .reply-good {
        position: absolute;
        top: calc(50% - 5px);
        right: 0;
        font-size: 12px;
      }
    }
    .layer-master-comment,
    .reply-comment {
      margin-left: 10px;
      padding: 10px 0 0 10vw;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1px;
      border: 0;
      .reply-comment-active {
        color: #ff5d7f;
      }
    }
  }
  .reply-title {
    padding: 30px 0;
  }
}
</style>