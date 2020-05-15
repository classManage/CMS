<template>
  <div>
    <el-card shadow="hover">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'最新活动(' + data.length + ')'" name="new">
          <Message :data="data"></Message>
        </el-tab-pane>
        <el-tab-pane :label="'进行中活动(' + data.length + ')'" name="now">
          <Message :data="data" hideFoot></Message>
        </el-tab-pane>
        <el-tab-pane :label="'往期活动(' + data.length + ')'" name="before">
          <Message :data="data" hideFoot></Message>
        </el-tab-pane>
        <el-tab-pane :label="'我参加的活动(' + data.length + ')'" name="join">
          <Message :data="data" hideFoot></Message>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { Message } from "@/utils/components";

export default {
  data() {
    return {
      activeName: "new",
      data: [
        {
          title: "【班级活动】和其他班级的联谊，零食可乐随便应有尽有",
          createDate: "2020-05-06 09:31:10",
          position: "2020年5月15号下午3点整，足球场东南侧草坪",
          content: "和小伙伴们好吃好喝好玩",
          endDate: "晚上8点30分左右",
          contact: "手机：17136375393",
          abortDate: 1554876252
        },
        {
          title: "【学校活动】明天举行歌唱比赛",
          createDate: "2020-05-06 09:31:10",
          position: "2020年5月15号下午3点整，足球场东南侧草坪",
          content: "和小伙伴们好吃好喝好玩",
          endDate: "晚上8点30分左右",
          contact: "手机：17136375393",
          abortDate: 1554876252
        },
        {
          title: "【学校活动】学校大礼堂进行入学安全讲座",
          createDate: "2020-05-06 09:31:10",
          position: "2020年5月15号下午3点整，足球场东南侧草坪",
          content: "和小伙伴们好吃好喝好玩",
          endDate: "晚上8点30分左右",
          contact: "手机：17136375393",
          abortDate: 1554876252
        },
        {
          title: "【学校活动】大灌篮比赛",
          createDate: "2020-05-06 09:31:10",
          position: "2020年5月15号下午3点整，足球场东南侧草坪",
          content: "和小伙伴们好吃好喝好玩",
          endDate: "晚上8点30分左右",
          contact: "手机：17136375393",
          abortDate: 1554876252
        }
      ]
    };
  },
  components: {
    Message
  }
};
</script>
