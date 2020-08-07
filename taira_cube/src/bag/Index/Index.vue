<template>
  <section>
    <van-dropdown-menu active-color="#ff0000">
      <van-dropdown-item v-model="value1" :options="this.$store.state.sh.city_sh" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
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
  </section>
</template>
<script>
import {
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Cell,
  CellGroup,
  Button,
  Icon,
  Popup,
  Toast
} from "vant";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["countDouble","sh_area"]),
    testvuex() {
      return this.$store.state.name;
    },
  },
  data() {
    return {
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
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  created() {
    this.$store.dispatch('Sh_area_get').then(() => {
      console.log('suc')
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
    loading() {
      Toast.loading({
        message: "加载中..."
        //forbidClick: true
      });
    }
  },
  mounted() {
    //this.option1 = this.$store.state.sh.city_sh
  },
  watch: {
    
  },
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
