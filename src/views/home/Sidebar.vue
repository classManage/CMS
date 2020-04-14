<template>
  <el-menu
    text-color="#fff"
    active-text-color="rgb(68,232,247)"
    :unique-opened="true"
    default-active="1"
    router
  >
    <el-menu-item index="/basic">
      <i class="el-icon-menu"></i>
      <span slot="title">管理首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>基本情况</span>
      </template>
      <el-menu-item index="/homTeacher">
        <template slot="title">
          <span>班主任</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>人数</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-3">
        <template slot="title">
          <span>获奖情况</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-4">
        <template slot="title">
          <span>相册</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-5">
        <template slot="title">
          <span>出勤率图表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-6">
        <template slot="title">
          <span>人员列表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>考勤</span>
      </template>
      <el-menu-item index="1-4-1">
        <template slot="title">
          <span>人员签到列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>一键签到</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-3">
        <template slot="title">
          <span>考勤历史记录</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>班费</span>
      </template>
      <el-menu-item index="1-4-1">
        <template slot="title">
          <span>往期班费记录</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>班费缴纳人员名单</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-3">
        <template slot="title">
          <span>拖欠次数记录</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>课表</span>
      </template>
      <el-menu-item index="1-4-1">
        <template slot="title">
          <span>课表图</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>下节课</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>分数查询</span>
      </template>
      <el-menu-item index="1-4-1">
        <template slot="title">
          <span>期中</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>期末</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-3">
        <template slot="title">
          <span>模拟</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-4">
        <template slot="title">
          <span>考证</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-5">
        <template slot="title">
          <span>测验</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>班级风采</span>
      </template>
      <el-menu-item index="1-4-1">
        <template slot="title">
          <span>活动</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-4-2">
        <template slot="title">
          <span>相册</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="8">
      <i class="el-icon-menu"></i>
      <span slot="title">意见反馈</span>
    </el-menu-item>
  </el-menu>
</template>
