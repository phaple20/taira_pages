<template>
  <section>
    <van-skeleton :row="3" :loading="loading">
      <van-dropdown-menu active-color="#ff0000">
        <van-dropdown-item
          v-model="value1"
          :options="this.$store.state.sh.city_sh"
        />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
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
          ><van-button plain type="primary" @click="loadbtn">load</van-button>
        </van-col>
      </van-row>
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <div @touchstart="gotouchstart" @touchend="gotouchend">
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          </div>
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        </van-grid-item>
      </van-grid>
      <van-grid>
        <van-grid-item
          v-for="value in 6"
          :key="value"
          icon="photo-o"
          text="文字"
        >
        </van-grid-item>
      </van-grid>
    </van-skeleton>
  </section>
</template>
<script>
import {
  Skeleton,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Cell,
  CellGroup,
  Button,
  Image,
  Grid,
  GridItem,
  Icon,
  Popup,
  Toast
} from "vant";
import { mapGetters } from "vuex";
var timeOutEvent = 0;
export default {
  computed: {
    ...mapGetters(["countDouble", "sh_area"]),
    testvuex() {
      return this.$store.state.name;
    }
  },
  data() {
    return {
      loading: true,
      show: false,
      value1: 0,
      value2: "a",
      option1: this.$store.state.sh.city_sh,
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    };
  },
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Skeleton.name]: Skeleton,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  created() {
    this.$store.dispatch("Sh_area_get").then(() => {
      console.log("finish");
      this.loading = false;
    });
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
    loadbtn() {
      Toast.loading({
        message: "加载中..."
        //forbidClick: true
      });
    },
    gotouchstart(e) {
      e.preventDefault();
      clearInterval(timeOutEvent);
      this.status = true;
      timeOutEvent = 0;
      timeOutEvent = setTimeout(() => {
        this.status = false;
        Toast("长按了");
      }, 1500);
    },
    gotouchend(e) {
      clearInterval(timeOutEvent);
      //console.log(this.status);
      if (this.status) {
        Toast("点击了");
      } else {
        //Toast("长按了");
        this.status = true;
      }
    }
  },
  mounted() {
    console.log("moun");
    //this.option1 = this.$store.state.sh.city_sh
  },
  watch: {}
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
