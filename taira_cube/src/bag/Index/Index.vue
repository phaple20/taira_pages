<template>
  <div>
    <!-- <button v-on:click="show = !show">Toggle</button>
    <transition name="harvey-fade">
      <p v-if="show">testtoggle</p>
    </transition> -->
    <ul>
      <li>
        <a href="">{{ $store.state.name }}</a>
      </li>
      <li><a href="">bf</a></li>
    </ul>
    <div class="andA">
      <ul>
        <li><a href="">cf</a></li>
      </ul>
    </div>
    <a href="baidu.com">df</a>
    <van-button plain type="primary">朴素按钮</van-button>
    <van-icon name="chat-o" badge="99+" />
    <van-cell-group title="分组1">
      <van-cell title="cell" icon="shop-o">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="search" class="search=icon" />
        </template>
      </van-cell>
      <!--arrow-direction="down"-->
      <van-cell title="popup" is-link value="内容" @click="showPopup" />
    </van-cell-group>
    <van-popup
      v-model="show"
      position="left"
      :style="{ width: '50%', height: '100%' }"
      get-container="body"
      closeable
      round
      :duration="0.3"
      >content</van-popup
    >
    {{ testvuex }}
    <van-row>
      <van-col span="8">{{ countDouble }}</van-col>
      <van-col span="8"
        ><van-button plain type="primary" @click="addcount">add</van-button>
      </van-col>
      <van-col span="8"
        ><van-button plain type="primary" @click="loading">load</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Col, Row, Cell, CellGroup, Button, Icon, Popup, Toast } from "vant";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["countDouble"]),
    testvuex() {
      return this.$store.state.name;
    }
    // countDouble() {
    //   return this.$store.state.countDouble;
    // }
  },
  data() {
    return {
      show: false
    };
  },
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    addcount() {
      this.$store.dispatch("Increment", {
        n: 10
      });
    },
    loading() {
      Toast.loading({
        message: "加载中..."
        //forbidClick: true
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin testxin {
  color: red;
  border: 2px solid;
  border-radius: 5px;
  text-decoration: none;
}
ul {
  li {
    margin-left: 5px;
    a {
      text-decoration: underline;
      color: $theme-color;
      &:hover {
        color: palevioletred;
      }
      .andA & {
        color: green;
        @include testxin;
      }
    }
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.harvey-fade-enter-active {
  transition: all 0.3s ease;
}
.harvey-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.harvey-fade-enter, .harvey-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
