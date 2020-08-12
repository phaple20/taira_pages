<template>
  <section>
    <!--
    <van-skeleton
      title
      avatar
      :row="10"
      :loading="this.$store.state.sh.loading"
    >-->
    <van-dropdown-menu active-color="#ff0000">
      <van-dropdown-item
        v-model="city_list_no"
        :options="this.$store.state.sh.city_sh"
        @change="city_area_change"
      />
      <van-dropdown-item
        v-model="city_time"
        :options="city_time_list"
        @change="city_time_change"
      />
    </van-dropdown-menu>
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
    <!--城市列表 信息-->
    <van-row v-if="sh_today" v-show="city_nav_no == 0">
      <van-divider content-position="left">基本信息</van-divider>
      <van-cell-group>
        <van-cell title="cityid" :value="sh_today.cityid"></van-cell>
        <van-cell title="weaid" :value="sh_today.weaid"></van-cell>
        <van-cell title="城区" :value="sh_today.area_2"></van-cell>
      </van-cell-group>
      <van-divider content-position="left">今日天气</van-divider>
      <van-cell-group>
        <van-cell
          title="可见蓝天"
          v-if="sh_today.today.wtBlueSkyId == 2"
          value="不可"
        ></van-cell>
        <van-cell
          title="可见蓝天"
          v-else-if="sh_today.today.wtBlueSkyId == 1"
          value="可"
        ></van-cell>
        <van-cell
          title="白天"
          :value="sh_today.today.wtNm1"
          :label="`${sh_today.today.wtTemp1}℃`"
        ></van-cell>
        <van-cell
          title="夜间"
          :value="sh_today.today.wtNm2"
          :label="`${sh_today.today.wtTemp2}℃`"
        ></van-cell>
        <van-cell title="日出时间" :value="sh_today.today.wtSunr"></van-cell>
        <van-cell title="日落时间" :value="sh_today.today.wtSuns"></van-cell>
        <van-cell
          title="风力(白天)"
          :value="sh_today.today.wtWinpNm1"
        ></van-cell>
        <van-cell
          title="风力(夜间)"
          :value="sh_today.today.wtWinpNm2"
        ></van-cell>
      </van-cell-group>
      <van-divider content-position="left">实时天气</van-divider>
      <van-cell-group>
        <van-cell title="week" :value="sh_today.realTime.week"></van-cell>
        <van-cell title="天气类型" :value="sh_today.realTime.wtNm"></van-cell>
        <van-cell title="温度℃" :value="sh_today.realTime.wtTemp"></van-cell>
        <van-cell title="湿度%" :value="sh_today.realTime.wtHumi"></van-cell>
        <van-cell title="风向" :value="sh_today.realTime.wtWindNm"></van-cell>
        <van-cell title="风力 级" :value="sh_today.realTime.wtWinp"></van-cell>
        <van-cell
          title="风速 km/h"
          :value="sh_today.realTime.wtWins"
        ></van-cell>
        <van-cell title="pm2.5 aqi" :value="sh_today.realTime.wtAqi"></van-cell>
        <van-cell
          title="能见度km"
          :value="sh_today.realTime.wtVisibility"
        ></van-cell>
        <van-cell
          title="降雨量mm"
          :value="sh_today.realTime.wtRainfall"
        ></van-cell>
        <van-cell
          title="气压hpa"
          :value="sh_today.realTime.wtPressurel"
        ></van-cell>
      </van-cell-group>
    </van-row>
    <!--城市逐小时-->
    <van-row v-if="sh_today_day" v-show="city_nav_no == 1">
      <van-divider>{{ sh_today_day.area_2 }}</van-divider>
      <van-cell-group
        v-for="(item, index) in sh_today_day.futureHour"
        :key="index"
      >
        <van-cell title="Time" :value="item.dateYmdh" size="large"></van-cell>
        <van-row>
          <van-col span="12">
            <van-cell :value="item.wtNm"></van-cell>
          </van-col>
          <van-col span="12">
            <van-cell>
              <template>
                <span class="sh_day_text_right">{{ item.wtTemp }}℃</span>
              </template>
            </van-cell>
          </van-col>
        </van-row>
        <van-cell
          title="风向"
          :value="item.wtWindNm"
          :label="item.wtWinpNm"
        ></van-cell>
      </van-cell-group>
    </van-row>
    <!-- <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <div @touchstart="gotouchstart" @touchend="gotouchend">
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        </div>
    </van-grid> -->
    <!-- </van-skeleton> -->
    <!--遮罩-->
    <van-overlay :show="this.$store.state.sh.loading">
      <div class="overlay_wrapper">
        <van-loading size="30" color="#fff" />
      </div>
    </van-overlay>
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
  Collapse,
  CollapseItem,
  Divider,
  Button,
  Image,
  Grid,
  GridItem,
  Icon,
  Loading,
  Overlay,
  Popup,
  Tag,
  Toast
} from "vant";
import { mapGetters } from "vuex";
var timeOutEvent = 0;
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Skeleton.name]: Skeleton,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Divider.name]: Divider,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Popup.name]: Popup,
    [Tag.name]: Tag,
    [Toast.name]: Toast
  },
  computed: {
    ...mapGetters(["sh_today"]),
    sh_today_day() {
      return this.$store.state.sh.sh_today_day;
    },
    city_list_no: {
      get: function() {
        return this.$store.state.sh.city_list_no;
      },
      set: function(val) {
        this.$store.state.sh.city_list_no = val;
      }
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      city_nav_no: 0,
      city_t: null,
      city_time: "today",
      city_time_list: [
        { text: "今日", value: "today" },
        { text: "逐小时", value: "futureHour" }
      ]
    };
  },
  created() {
    this.$store.dispatch("Sh_area_get");
  },
  methods: {
    showPopup() {
      this.show = true;
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
    },
    city_area_change(area_id) {
      if (this.city_nav_no == 0) {
        this.$store.dispatch("Sh_area_change", { weaid: area_id, ag: "today" });
      } else if (this.city_nav_no == 1) {
        if (this.city_t) {
          this.$store.dispatch("Sh_time_change", {
            weaid: area_id,
            ag: this.city_t
          });
        }
      }
    },
    city_time_change(city_t) {
      this.$store.state.sh.loading = true;
      this.city_t = city_t;
      const weaid = this.$store.state.sh.city_weaid;
      if (city_t == "today") {
        this.city_nav_no = 0;
        this.$store.dispatch("Sh_area_change", { weaid: weaid, ag: "today" });
      } else if (city_t == "futureHour") {
        this.city_nav_no = 1;
        this.$store.dispatch("Sh_time_change", { weaid: weaid, ag: city_t });
      }
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
.overlay_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.sh_day_text_right {
  float: right;
}
</style>
