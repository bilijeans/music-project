<template>
  <div class="comment">
    <div class="comment-head">
      <i class="wd-icon-arrow-left" @click="back()"></i>
      <div>评论 ({{ data.commentNums }})</div>
    </div>
    <div class="comment-play">
      <div class="comment-img">
        <img :src="songMsg.pic" />
      </div>
      <div class="comment-msg">
        <div class="comment-song">{{ songMsg.title }}</div>
        <div class="comment-singer">{{ songMsg.subTitle }}</div>
      </div>
      <i class="wd-icon-arrow-right"></i>
    </div>
    <div class="comment-hotComments">
      <div class="comment-title" v-if="hotComments[0]">精彩评论</div>
      <div class="comment-item" v-for="i in hotComments" :key="i.commentId">
        <div class="comment-usermsg">
          <div class="item-img">
            <img :src="i.user.smallIcon" />
          </div>
          <div class="item-msg">
            <div class="item-user">
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
                v-if="i.user.userIdentityInfoItems[0]"
                :src="i.user.userIdentityInfoItems[0].icon"
              />
              <img
                v-if="i.user.userIdentityInfoItems[1]"
                :src="i.user.userIdentityInfoItems[1].icon"
              />
            </div>
            <div class="item-time">{{ i.commentTime }}</div>
          </div>
          <div class="item-good">
            <span>{{ dealWithPlayNum(i.opNumItem.thumbNum) }} ❤</span>
            <!-- <span>❤</span> -->
          </div>
        </div>
        <div class="item-comment">
          <div>
            <div class="god-topic" v-if="i.topTagInfo">
              {{ i.topTagInfo.name }}
            </div>
            <div>{{ i.commentInfo }}</div>
          </div>
          <div class="reply-comments" v-if="i.replyComments[0]">
            <div v-for="n in i.replyComments" :key="n.replyId">
              <span class="active-user">{{ n.user.nickName }}</span
              >：<span v-if="n.targetUser.nickName != i.user.nickName"
                >回复
                <span class="active-user">
                  {{ n.targetUser.nickName }}：</span
                ></span
              >{{ n.replyInfo }}
            </div>
            <div
              @click="moreReply(i.commentId)"
              class="reply-nums"
              v-if="i.replyTotalCount != 0"
            >
              查看 {{ i.replyTotalCount }} 条回复 >
            </div>
          </div>
        </div>
      </div>
      <div class="comment-title" v-if="allComments[0]">
        全部评论 ({{ data.commentNums }})
      </div>
      <div class="comment-item" v-for="i in allComments" :key="i.commentId">
        <div class="comment-usermsg">
          <div class="item-img">
            <img :src="i.user.smallIcon" />
          </div>
          <div class="item-msg">
            <div class="item-user">
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
                v-if="i.user.userIdentityInfoItems[0]"
                :src="i.user.userIdentityInfoItems[0].icon"
              />
              <img
                v-if="i.user.userIdentityInfoItems[1]"
                :src="i.user.userIdentityInfoItems[1].icon"
              />
            </div>
            <div class="item-time">{{ i.commentTime }}</div>
          </div>
          <div class="item-good">
            <span>{{ dealWithPlayNum(i.opNumItem.thumbNum) }}❤</span>
            <!-- <span>❤</span> -->
          </div>
        </div>
        <div class="item-comment">
          <div class="god-topic" v-if="i.topTagInfo">
            {{ i.topTagInfo.name }}
          </div>
          <div>{{ i.commentInfo }}</div>
          <div class="reply-comments" v-if="i.replyComments[0]">
            <div v-for="n in i.replyComments" :key="n.replyId">
              <span class="active-user">{{ n.user.nickName }}</span
              >：<span v-if="n.targetUser.nickName != i.user.nickName"
                >回复
                <span class="active-user">
                  {{ n.targetUser.nickName }}：</span
                ></span
              >{{ n.replyInfo }}
            </div>
            <div
              @click="moreReply(i.commentId)"
              class="reply-nums"
              v-if="i.replyTotalCount != 0"
            >
              查看 {{ i.replyTotalCount }} 条回复 >
            </div>
          </div>
        </div>
      </div>
      <transition name="comment">
        <div class="comment-component" v-if="moreComment" @touchend.stop>
          <comment-component
            @touchend.stop
            :moreCommentId="moreCommentId"
            @cancelMaskLayer="cancelMaskLayer"
          ></comment-component></div
      ></transition>
      <!-- 遮罩层 -->
      <div
        class="comment-mask-layer"
        v-if="moreComment"
        @click="cancelMaskLayer"
        @touchend.stop
      ></div>
    </div>
  </div>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";
export default {
  data() {
    return {
      id: "",
      data: "",
      songMsg: "",
      hotComments: [],
      allComments: "",
      moreComment: false,
      moreCommentId: null,
    };
  },
  components: {
    CommentComponent,
  },
  created() {
    this.id = this.$route.query.id;
    // console.log(this.$route.query.id);
  },
  computed: {
    commentUrl() {
      return `/MIGUM3.0/user/comment/stack/v1.0?commentId=0&hotCommentStart=0&pageSize=20&queryType=1&resourceId=${this.id}&resourceType=2`;
    },
  },
  watch: {
    commentUrl() {
      this.getCommentData();
    },
  },
  methods: {
    getCommentData() {
      this.$axios.get(this.commentUrl).then(({ data }) => {
        // console.log(data.data);
        this.data = data.data;
        this.songMsg = this.data.targetInfo;
        this.hotComments = this.data.hotComments;
        this.allComments = this.data.comments;
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
    moreReply(id) {
      // console.log(id);
      this.moreComment = true;
      this.moreCommentId = id;
    },
    cancelMaskLayer() {
      this.moreComment = false;
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-head {
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #fff;
  .wd-icon-arrow-left {
    position: absolute;
    top: 14px;
    left: 12px;
    font-size: 20px;
  }
  div {
    margin: 0 0 0 35px;
    padding: 15px;
    font-size: 16px;
  }
}
.comment-play {
  width: 90%;
  margin: 56px auto 0;
  display: flex;
  align-items: center;
  .comment-img {
    img {
      display: block;
      width: 20vw;
      height: 20vw;
      border-radius: 6px;
    }
  }
  .comment-msg {
    width: 70%;
    margin: -0 0 0 10px;
    .comment-song {
      padding: 2px;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .comment-singer {
      color: #666;
      padding: 2px;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.comment-hotComments {
  width: 90%;
  margin: 10px auto 0;
  .comment-title {
    z-index: 1;
    position: sticky;
    top: 45px;
    padding: 10px 0;
    font-weight: bold;
    background-color: #fff;
  }
  .comment-item:nth-last-child(1) {
    padding: 0 0 60px 0;
  }
  .comment-item {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    .comment-usermsg {
      position: relative;
      display: flex;
      align-items: center;
      .item-img {
        img {
          display: block;
          width: 10vw;
          border-radius: 999px;
        }
      }
      .item-msg {
        width: 70%;
        margin: 0 0 0 10px;
        .item-user {
          padding: 5px 0 0 0;
          font-size: 16px;
          span {
            float: left;
            margin-right: 2px;
          }
          img {
            margin-right: 2px;
            display: inline-block;
            height: 4vw;
          }
          &::after {
            display: block;
            content: "";
            clear: both;
          }
        }
        .item-time {
          padding: 5px 0;
          font-size: 12px;
          color: #666;
        }
      }
      .item-good {
        // display: flex;
        // align-items: center;
        position: absolute;
        top: calc(50% - 5px);
        right: 0;
        font-size: 12px;
      }
    }
    .item-comment {
      margin-left: 10px;
      padding: 10px 0 0 10vw;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1px;
      .god-topic {
        float: left;
        padding: 0px 3px;
        margin: 0 3px 0 0;
        font-size: 12px;
        border-radius: 4px;
        color: #ff5d7f;
        background-color: #fde0e5;
      }
      &::after {
        display: block;
        content: "";
        clear: both;
      }
    }
  }
}
.reply-comments {
  letter-spacing: normal;
  line-height: 18px;
  font-size: 12px;
  margin: 10px 0 0 0;
  padding: 12px;
  border-radius: 6px;
  color: #999;
  background-color: #f8f8f8;
  div {
    padding: 0 0 6px 0;
    .active-user {
      color: #ff5d7f;
    }
  }
  .reply-nums {
    padding: 6px 0;
    font-size: 14px;
    color: #ff5d7f;
  }
}
.comment-component {
  padding: 0 0 55px 0;
  position: fixed;
  // top: 46px;
  bottom: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  height: calc(100vh - 46px);
  background-color: #fff;
  overflow: auto;
}
.comment-mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(204, 204, 204, 0.4);
}

.comment-enter {
  height: 0px;
}
.comment-leave {
  height:  calc(100vh - 46px);
}
.comment-leave-to {
  height: 0;
}
.comment-enter-active,
.comment-leave-active {
  transition: all 0.2s ease-in;
}
</style>