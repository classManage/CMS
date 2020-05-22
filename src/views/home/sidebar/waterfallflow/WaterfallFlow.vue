<template>
  <div class="photo-container">
    <div class="pubu-container">
      <div class="item" id="pubu-01"></div>
      <div class="item" id="pubu-02"></div>
      <div class="item" id="pubu-03"></div>
      <div class="item" id="pubu-04"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      windowHeight: 0,
      imgId: 0,
      wrap: null
    };
  },
  mounted() {
    this.wrap = document.querySelector('.photo-container');
    this.windowHeight = window.innerHeight - this.wrap.offsetTop + 500;
    this.insertImg();
    //监听滚动事件
    let main = document.querySelector(".el-main");
    main.addEventListener("scroll", () => {
      if (main.scrollTop > (this.windowHeight-500)) {
        //再此插入图片
        this.windowHeight += 500;
        this.insertImg();
      }
    });
  },
  methods: {
    //插入图片的算法
    insertImg() {
      var inter = setInterval(() => {
        //就是给浏览器渲染图片的时间
        if (
          this.wrap.scrollHeight >
          this.windowHeight
        ) {
          //达到预期的高度. 停止
          clearInterval(inter); //停止定时器
        }

        var mDiv = this.minDiv();
        //插入图片
        this.imgId++;
        if (this.imgId > 10) {
          this.imgId = 1;
        }
        var img = document.createElement("img");
        img.src = require(`@/assets/img/${this.imgId}.jpg`);
        mDiv.appendChild(img); //放图, 给浏览器一个指令. 插图. 但是浏览器的渲染还没有完成.
      }, 100); //定时器, 每隔100毫秒. 运行一次function
    },
    /**
     * 当前哪一列是高度最小的
     */
    minDiv() {
      var pb1 = document.getElementById("pubu-01");
      var pb2 = document.getElementById("pubu-02");
      var pb3 = document.getElementById("pubu-03");
      var pb4 = document.getElementById("pubu-04");

      var pbImgs_1 = pb1.children;
      var pbImgs_2 = pb2.children;
      var pbImgs_3 = pb3.children;
      var pbImgs_4 = pb4.children;

      var pb1Height = this.jisuan(pbImgs_1);
      var pb2Height = this.jisuan(pbImgs_2);
      var pb3Height = this.jisuan(pbImgs_3);
      var pb4Height = this.jisuan(pbImgs_4);

      var minHeight = Math.min(pb1Height, pb2Height, pb3Height, pb4Height);

      if (minHeight == pb1Height) {
        return pb1;
      }
      if (minHeight == pb2Height) {
        return pb2;
      }
      if (minHeight == pb3Height) {
        return pb3;
      }
      if (minHeight == pb4Height) {
        return pb4;
      }
    },

    jisuan(pbImgs) {
      if (pbImgs == null || pbImgs.length == 0) {
        //这一列还没有图片
        return 0;
      } else {
        var height = 0;
        //获取到当前列每一个图片
        for (var i = 0; i < pbImgs.length; i++) {
          var img = pbImgs[i];
          var h = img.height;
          height += h; //累加
        }
        return height;
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.photo-container {
  width: 100%;
  border: 4px solid #fff;
}
/deep/.pubu-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}

/deep/.pubu-container > .item {
  flex: 1;
  margin: 17px;
}
/deep/.pubu-container > .item > img {
  width: 100%;
  border: 8px solid white;
  margin-top: 5px;
  transition: all 0.3s ease-in-out;
}

/deep/.pubu-container > .item > img:hover {
  cursor: pointer;
  transform: scale(1.05); /*变大1.1倍*/
  box-shadow: 0px 3px 2px 1px #999;
}
</style>