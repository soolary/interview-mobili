<template>
  <div class="chart-container">
    <div class="top-box">
      <MMNavBar title="市场数据"></MMNavBar>
      <!-- 选择区域 -->
      <div class="option-box">
        <div class="option" @click="togglePop(true)">
          北京
          <i class="iconfont iconicon_xuanze_nor"></i>
        </div>
        <div class="option" @click="togglePop(false)">
          产品经理
          <i class="iconfont iconicon_xuanze_nor"></i>
        </div>
      </div>
      <!-- 弹出层 -->
      <van-popup
        transition="fade"
        v-model="showPop"
        position="top"
        :style="{ height: '80%' }"
      >
        <van-search
          shape="round"
          v-model="value"
          placeholder="请输入搜索关键词"
        />
        <!-- 索引列 -->
        <van-index-bar v-if="showCity">
          <van-index-anchor index="热门" />
          <van-cell title="北京" />
          <van-cell title="武汉" />
          <van-cell title="广州" />
          <van-cell title="深圳" />
          <van-index-anchor index="A" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="B" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </van-index-bar>
        <!-- 列表页 -->
        <div v-else class="list">
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
          <van-cell title="职位1" />
        </div>
      </van-popup>
    </div>
    <!-- 图标区域 -->
    <div class="main">
      <!-- 工资 -->
      <div class="salary-box">
        <h2>工资收入</h2>
        <!-- 表头 -->
        <div class="table-head van-hairline--bottom">
          <span>区间</span>
          <span>占比</span>
        </div>
        <canvas id="salary"> </canvas>
        <!-- 底部 -->
        <div class="bottom-info">
          近1年 32613 份样本 / 可信度：高
        </div>
      </div>
      <!-- 工作经验 -->
      <div class="experience-box">
        <h2>工作经验</h2>
        <div class="f2-tooltip"><span> </span> <span> </span></div>
        <canvas id="experience"></canvas>
      </div>
      <!-- 平均工资 -->
      <div class="average-box">
        <h2>历年平均工资变化趋势</h2>
        <div class="f2-tooltip"><span> </span> <span> </span></div>
        <canvas id="average"></canvas>
      </div>
      <!-- 就业形势 -->
      <div class="situation-box">
        <h2>就业形势</h2>
        <span class="axis">相关职位比例</span>
        <canvas id="situation"></canvas>
        <div class="tip-box"><van-icon name="warning-o" /> 说明</div>
        <div class="info">
          曲线越向上代表市场需求量越大，就业情况越好。反之，代表该类职位需求量较少。该数据由各地招聘网站统计而来，可能因抓取系统稳定性等因素而致使数据偏离客观实情，仅供参考。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import F2 from '@antv/f2'
import $ from 'jquery'
export default {
  data () {
    return {
      // 是否显示弹出层
      showPop: false,
      // 是否显示列表
      showCity: false,
      // 输入框
      value: ''
    }
  },
  methods: {
    // 工资收入
    salaryChart () {
      const data = [
        {
          assetType: '5k以下',
          percent: 9.5,
          const: 'const'
        },
        {
          assetType: '5k-10k',
          percent: 16.4,
          const: 'const'
        },
        {
          assetType: '10k-20k',
          percent: 14.5,
          const: 'const'
        },
        {
          assetType: '20k-50k',
          percent: 30.5,
          const: 'const'
        },
        {
          assetType: '50k以上',
          percent: 28.9,
          const: 'const'
        }
      ]

      const colorMap = {
        '5k以下': '#73a0fa',
        '5k-10k': '#73deb3',
        '10k-20k': '#7585a2',
        '20k-50k': '#eb7e65',
        '50k以上': '#f7c739'
      }
      // 设置图例项的内容
      const legendItems = []
      data.forEach(function (obj) {
        const item = {
          name: obj.assetType,
          // 显示的内容
          value: '             ' + obj.percent + '%',
          marker: {
            symbol: 'square',
            fill: colorMap[obj.assetType],
            radius: 4
          }
        }
        legendItems.push(item)
      })

      const chart = new F2.Chart({
        id: 'salary',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {
        percent: {
          formatter: function formatter (val) {
            return val + '%'
          }
        }
      })
      chart.coord('polar', {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.5
      })
      chart.legend({
        position: 'right',
        // 开启自定义
        custom: true,
        showTitle: true,
        // 设置每一项
        items: legendItems,
        nameStyle: {
          fill: '#808080'
        }, // 图例项 key 值文本样式
        valueStyle: {
          fill: '#333',
          textAlign: 'left'
          // fontWeight: 'bold' // 图例项 value 值文本样式
        }
      })
      chart.axis(false)
      chart.guide().html({
        position: ['50%', '55%'],
        html: `<div class="salary-info" >\n
            <p  id="title"></p>\n
            <p  id="money"></p>\n
          </div>`
      })
      chart
        .interval()
        .position('const*percent')
        .color('assetType', function (val) {
          return colorMap[val]
        })
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })

      chart.render()
      document.querySelector('#title').innerText = '平均'
      document.querySelector('#money').innerText = '¥ 17610'
    },
    // 工作经验
    experienceChart () {
      // 数据
      const data = [
        {
          num: '4500',
          info: '应届生',
          value: 11020
        },
        {
          num: '7940',
          info: '1-3年',
          value: 17020
        },
        {
          num: '6700',
          info: '3-5年',
          value: 24040
        },
        {
          num: '6403',
          info: '5-10年',
          value: 29040
        },
        {
          num: '4200',
          info: '10年以上',
          value: 39210
        }
      ]
      // 位置
      const canvasOffsetTop = $('#experience').position().top
      const canvasOffsetLeft = $('#experience').position().left

      const chart = new F2.Chart({
        id: 'experience',
        pixelRatio: window.devicePixelRatio
      })

      chart.source(data)
      chart.tooltip({
        custom: true,
        onChange: function onChange (ev) {
          const tooltipEl = $('.experience-box .f2-tooltip')
          const currentData = ev.items[0]
          const text = currentData.value
          tooltipEl.html(
            [
              `<span><b>${currentData.origin.info}:${currentData.origin.value}元</b></span>`,
              '<span>' + text + ' 个样本</span>'
            ].join('')
          )

          tooltipEl.css({
            opacity: 1,
            left:
              canvasOffsetLeft +
              currentData.x -
              tooltipEl.outerWidth() / 2 +
              'px',
            top:
              canvasOffsetTop +
              currentData.y -
              tooltipEl.outerHeight() -
              15 +
              'px'
          })
        }

        // crosshairsType: 'xy',
        // crosshairsStyle: {
        // lineDash: [2]
        // }
      })
      chart.axis('info', {
        tickLine: {
          length: 4,
          stroke: '#e8e8e8',
          lineWidth: 1
        }
      })
      // 设置线段
      chart
        .line()
        .position('info*value')
        .color('#00b8d4')
      // 设置转折点
      chart
        .point()
        .position('info*value')
        .adjust('stack')
        .style('medalType', { fill: '#fff', lineWidth: 1 })
        .color('#00b8d4')
      // 设置面积区域
      chart
        .area()
        .position('info*value')
        .color('#00b8d4')
      chart.render()
    },
    // 平均工资变化趋势
    averageChart () {
      // 数据
      const data = [
        {
          num: '4500',
          date: '2010',
          value: 11020
        },
        {
          num: '7940',
          date: '2011',
          value: 17020
        },
        {
          num: '6700',
          date: '2012',
          value: 24040
        },
        {
          num: '6403',
          date: '2013',
          value: 29040
        },
        {
          num: '4200',
          date: '2014',
          value: 39210
        },
        {
          num: '4200',
          date: '2015',
          value: 39210
        },
        {
          num: '4200',
          date: '2016',
          value: 39210
        },
        {
          num: '4200',
          date: '2017',
          value: 39210
        },
        {
          num: '4200',
          date: '2018',
          value: 39210
        },
        {
          num: '4200',
          date: '2019',
          value: 39210
        },
        {
          num: '4200',
          date: '2020',
          value: 39210
        }
      ]
      // 位置
      const canvasOffsetTop = $('#average').position().top
      const canvasOffsetLeft = $('#average').position().left

      const chart = new F2.Chart({
        id: 'average',
        pixelRatio: window.devicePixelRatio
      })

      chart.source(data, {
        date: {
          tickCount: 5,
          min: 0
        }
      })
      chart.tooltip({
        custom: true,
        onChange: function onChange (ev) {
          const tooltipEl = $('.average-box .f2-tooltip')
          const currentData = ev.items[0]
          tooltipEl.html(
            [
              `<span><b>${currentData.origin.date}:${currentData.origin.value}元</b></span>`
            ].join('')
          )

          tooltipEl.css({
            opacity: 1,
            left:
              canvasOffsetLeft +
              currentData.x -
              tooltipEl.outerWidth() / 2 +
              'px',
            top:
              canvasOffsetTop +
              currentData.y -
              tooltipEl.outerHeight() -
              15 +
              'px'
          })
        }

        // crosshairsType: 'xy',
        // crosshairsStyle: {
        // lineDash: [2]
        // }
      })
      chart.axis('date', {
        tickLine: {
          length: 2,
          stroke: '#e8e8e8',
          lineWidth: 1
        }
      })
      // 设置线段
      chart
        .line()
        .position('date*value')
        .color('#00b8d4')
      // 设置转折点
      chart
        .point()
        .position('date*value')
        .adjust('stack')
        .style('medalType', { fill: '#fff', lineWidth: 1 })
        .color('#00b8d4')
      // 设置面积区域
      chart
        .area()
        .position('date*value')
        .color('#00b8d4')
      chart.render()
    },
    // 就业形势
    situationChart () {
      // 数据
      const data = [
        {
          num: '4500',
          date: '2010',
          value: 30010
        },
        {
          num: '7940',
          date: '2011',
          value: 17020
        },
        {
          num: '6700',
          date: '2012',
          value: 14040
        },
        {
          num: '6403',
          date: '2013',
          value: 29040
        },
        {
          num: '4200',
          date: '2014',
          value: 39210
        },
        {
          num: '4200',
          date: '2015',
          value: 29210
        },
        {
          num: '4200',
          date: '2016',
          value: 19210
        },
        {
          num: '4200',
          date: '2017',
          value: 49210
        },
        {
          num: '4200',
          date: '2018',
          value: 29210
        },
        {
          num: '4200',
          date: '2019',
          value: 19210
        },
        {
          num: '4200',
          date: '2020',
          value: 39210
        }
      ]
      const chart = new F2.Chart({
        id: 'situation',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {})
      // chart.axis('value', {
      //   label: {
      //     text: '相关职位比例'
      //   }
      // })
      chart.axis('value', false)
      chart.axis('date', {
        label: {
          rotate: -Math.PI / 2,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      })
      // 设置线段
      chart
        .line()
        .position('date*value')
        .color('#00b8d4')
        .shape('smooth')
      // 设置转折点
      chart
        .point()
        .position('date*value')
        .adjust('stack')
        .style('medalType', { fill: '#fff', lineWidth: 1 })
        .color('#00b8d4')
      // 设置面积区域
      chart
        .area()
        .position('date*value')
        .color('#00b8d4')
      chart.render()
    },
    // 切换弹出层显示
    togglePop (showCity) {
      this.showPop = true
      this.showCity = showCity
    }
  },
  mounted () {
    this.salaryChart()
    this.experienceChart()
    this.averageChart()
    this.situationChart()
  }
}
</script>

<style lang="less">
.chart-container {
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .top-box {
    padding-bottom: 11px;
    background: @white-color;
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    position: relative;
    .van-nav-bar__left {
      padding-left: 0;
    }
    .iconbtn_nav_back {
      font-size: 44px;
    }
    .option-box {
      display: flex;
      justify-content: space-between;
      padding: 0 79px;
      .option {
        font-size: 14px;
        color: #222222;
      }
      .iconfont {
        color: #b4b4bc;
        font-size: 15px;
      }
    }
  }
  .main {
    padding: 15px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      margin-bottom: 12px;
    }
    canvas {
      width: 100%;
      height: 190px;
    }
    .salary-info {
      text-align: center;
      width: 150px;
      height: 50px;
      p {
        color: #222222;
      }
      #title {
        font-size: 11px;
        margin: 0;
        margin-bottom: 5px;
      }
      #money {
        font-size: 11px;
        margin: 0;
      }
    }
    .salary-box {
      position: relative;
      margin-bottom: 40px;
      .table-head {
        width: 147px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #b4b4bd;
        padding-bottom: 7px;
        position: absolute;
        right: 20px;
        top: 40px;
      }
      .bottom-info {
        font-size: 12px;
        color: #b4b4bd;
        text-align: center;
      }
    }
  }
  .chart-wrapper {
    position: relative;
  }
  .f2-tooltip {
    -moz-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 99;
    background-color: #00b8d4;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    width: 120px;
    opacity: 0;
  }

  .f2-tooltip span {
    display: block;
    color: #fff;
  }
  .f2-tooltip span:nth-child(1) {
    font-size: 11px !important;
  }
  .f2-tooltip span:nth-child(2) {
    font-size: 13px !important;
  }
  // 平均
  .situation-box {
    position: relative;
    .axis {
      position: absolute;
      font-size: 10px;
      transform: rotate(-90deg);
      left: -30px;
      top: 100px;
      color: #545671;
    }
    .tip-box {
      font-size: 12px;
      color: #545671;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      span {
        font-size: 12px;
        font-weight: 600;
      }
    }
    .info {
      font-size: 10px;
      text-align: justify;
      color: #545671;
      line-height: 15px;
    }
  }
  // 弹出层
  .select-box {
    background-color: #f7f4f5;
    height: 649px;
    position: absolute;
    top: 75px;
    width: 100%;
    z-index: 999;
  }
  .van-overlay {
    top: 75px;
  }
  .van-popup--top {
    top: 75px;
    background-color: #f7f4f5;
  }
  // transition切换的效果 淡入 淡出
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .van-search {
    background-color: transparent;
    .van-search__content {
      background-color: #fff;
    }
  }
}
</style>
