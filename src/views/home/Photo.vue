<template>
  <div class="con">
  <div class="example-3d">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide><img src="@/assets/img/1.jpg" ></swiper-slide>
      <swiper-slide><img src="@/assets/img/10.jpg" ></swiper-slide>
      <swiper-slide><img src="@/assets/img/9.jpg" ></swiper-slide>
      <swiper-slide><img src="@/assets/img/8.jpg" ></swiper-slide>
      <swiper-slide><img src="@/assets/img/5.jpg" ></swiper-slide>
      <swiper-slide><img src="@/assets/img/6.jpg" ></swiper-slide>
      <swiper-slide><img src="@/assets/img/7.jpg" ></swiper-slide>
    </swiper>
    </div>
    <WaterfallFlow></WaterfallFlow>
  </div>
</template>

<script>
 import { WaterfallFlow } from "@/utils/components";
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    name: 'swiper-example-3d-coverflow',
    title: '3D Coverflow effect',
    components: {
      Swiper,
      SwiperSlide,
      WaterfallFlow
    },
    data() {
      return {
         swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            //loop:true,
            modifier: 1,
            autoplay:true,
            slideShadows:true
          },
        }
      }
    },
    mounted(){
       
    },
    
  };
</script>

<style scoped>
.con{
  width: 100%;
   background-color: #dedede;
 }
.example-3d {
    width: 100%;
    margin: 0 auto;
    height: 300px;
    padding-top: 50px;
    padding-bottom: 50px;
    border: 4px solid #fff;
    margin-bottom: 20px;
     background-color: #fff !important;
    }
 .swiper {
    height: 100%;
    width: 100%;
  }
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      text-align: center;
      font-weight: bold;
      background-position: center;
      background-size: cover;
     }
    .swiper-slide img{
        width:100%;
        height:100%;
    }
  
</style>