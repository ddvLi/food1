<template>
  <baidu-map class="bm-view" ak="DX3r2Qeyio3WudUgFbQQmMwqGYXypdLi" :center="{lng: 113.090025, lat: 28.18606}" :zoom="15" :scroll-wheel-zoom="true">
     <bm-marker :position="{lng: 113.090025, lat: 28.18606}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {BmMarker,BmControl} from 'vue-baidu-map'
export default {
  components: {
     BmMarker,
    BaiduMap
  },
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>