<template>
    <div class="trafficOperation">
        <dp-title
            :title="title"
            :is-show-arrow="true"
            @goBack="goBack"
        ></dp-title>
        <div class="content">
            <div class="monitorTrafficFlow">
                <div class="header">
                    <span>车辆监测车流量统计</span>
                    <date-picker
                        :target="'monitorTrafficFlowTimeType'"
                        @datePickerClick="datePickerClick"
                    ></date-picker>
                </div>
                <div class="center">
                    <div class="item">
                        <img src="@/assets/images/traffic_in.png" alt="" />
                        <div>{{ monitorTrafficFlow.carIn }}</div>
                        <div>驶入车辆</div>
                    </div>
                    <div class="item">
                        <img src="@/assets/images/traffic_out.png" alt="" />
                        <div>{{ monitorTrafficFlow.carOut }}</div>
                        <div>驶出车辆</div>
                    </div>
                    <div class="item">
                        <img src="@/assets/images/traffic_pure.png" alt="" />
                        <div>{{ monitorTrafficFlow.carNetinflow }}</div>
                        <div>净流入车辆</div>
                    </div>
                </div>
            </div>
            <div class="trafficFlow">
                <div class="header">
                    <span>各街道车流量统计</span>
                </div>
                <div class="center">
                    <div id="trafficFlowStatic"></div>
                </div>
            </div>
            <div class="monitoringEntrance">
                <div class="header">
                    <span>车辆监测出入口通行量排名</span>
                    <date-picker
                        :target="'monitoringEntranceTimeType'"
                        @datePickerClick="datePickerClick"
                    ></date-picker>
                </div>
                <div class="center">
                    <div id="monitoringEntranceStatic"></div>
                </div>
            </div>
            <div class="monitorDrive">
                <div class="header">
                    <span>车辆监测车型排名</span>
                    <drive-picker
                        :target="'direction'"
                        @drivePickerClick="drivePickerClick"
                    ></drive-picker>
                </div>
                <div class="center">
                    <div id="monitorDriveStatic"></div>
                </div>
            </div>
            <div class="monitorLoad">
                <div class="header">
                    <span>车辆监测主要路段通行量排名</span>
                </div>
                <div class="center">
                    <div id="monitorLoadStatic"></div>
                </div>
            </div>
            <div class="monitorTime">
                <div class="header">
                    <span>车辆监测主要路段通行量时间分布</span>
                    <time-picker
                        :target="'monitorTimeType'"
                        @timePickerClick="timePickerClick"
                    ></time-picker>
                </div>
                <div class="center">
                    <div id="monitorTimeStatic"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import {
    getTrafficFlow,
    queryPieChart,
    queryTodayVehicleTypeRanking,
    getMainRoadRank,
    getTimeDistribution,
    getTrafficRank,
} from "@/api/dumpTruck";
import { parseTime } from "@/utils/util";
export default {
    name: "home",
    data() {
        return {
            title: "交通运行",
            carType: "all",
            timeType: "day",
            monitorTrafficFlowTimeType: "day",
            monitorTrafficFlow: {
                carIn: 0,
                carOut: 0,
                carNetinflow: 0,
            },
            monitoringEntranceTimeType: "day",
            direction: 0,
            monitorTimeType: "day",
        };
    },
    created() {
        this.initMonitorTrafficFlow();
    },
    mounted() {
        this.initTrafficFlow();
        this.initMonitoringEntrance();
        this.initMonitoringDrive();
        this.initMonitorLoad();
        this.initMonitorTime();
    },
    methods: {
        initMonitorTrafficFlow() {
            let postData = {
                carType: this.carType,
                timeType: this.monitorTrafficFlowTimeType,
            };
            getTrafficFlow(postData).then((res) => {
                let { carIn, carOut, carNetinflow } = res.data.data;
                this.monitorTrafficFlow.carIn = carIn;
                this.monitorTrafficFlow.carOut = carOut;
                this.monitorTrafficFlow.carNetinflow = carNetinflow;
            });
        },
        initTrafficFlow() {
            queryPieChart({
                date: parseTime(new Date(), "{y}-{m}-{d}"),
                vehicleType: "all",
            }).then((res) => {
                if (res.data.data) {
                    var list = [];
                    res.data.data.forEach((item) => {
                        list.push({
                            name: item.name,
                            value: item.num,
                        });
                    });
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(
                        document.getElementById("trafficFlowStatic")
                    );
                    // 绘制图表
                    var option = {
                        tooltip: {
                            trigger: "item",
                        },
                        legend: {
                            orient: "vertical",
                            left: "right",
                        },
                        series: [
                            {
                                name: "Access From",
                                type: "pie",
                                radius: "80%",
                                data: list,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: "rgba(0, 0, 0, 0.5)",
                                    },
                                },
                            },
                        ],
                    };
                    option && myChart.setOption(option);
                }
            });
        },
        // 车辆监测出入口通行量排名
        initMonitoringEntrance() {
            let postData = {
                carType: 'all',
                direction: '',
                timeType: this.monitoringEntranceTimeType
            };
            getTrafficRank(postData).then((res) => {
                var values = [];
                var labels = [];
                if (res.data.data) {
                    res.data.data.forEach((item) => {
                        values.push(item.flowNum);
                        labels.push(item.tollName);
                    });
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("monitoringEntranceStatic")
                );
                // 绘制图表
                var option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {},
                    grid: {
                        top: "0",
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "value",
                        boundaryGap: [0, 0.01],
                    },
                    yAxis: {
                        type: "category",
                        data: labels,
                    },
                    series: [
                        {
                            type: "bar",
                            data: values
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        // 车辆监测车型排名
        initMonitoringDrive() {
            let postData = {
                dataTime: parseTime(new Date(), "{y}{m}{d}"),
                direction: this.direction,
                tollName: "all",
            };
            queryTodayVehicleTypeRanking(postData).then((res) => {
                var values = [];
                var labels = [];
                if (res.data.data) {
                    res.data.data.forEach((item) => {
                        values.push(item.num);
                        labels.push(item.vehicleTypeName);
                    });
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("monitorDriveStatic")
                );
                // 绘制图表
                var option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {},
                    grid: {
                        top: "0",
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "value",
                        boundaryGap: [0, 0.01],
                    },
                    yAxis: {
                        type: "category",
                        data: labels,
                    },
                    series: [
                        {
                            type: "bar",
                            data: values,
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        // 车辆监测主要路段通行量排名
        initMonitorLoad() {
            let postData = {
                dataTime: parseTime(new Date(), "{y}{m}{d}"),
                carType: "all",
            };
            getMainRoadRank(postData).then((res) => {
                var values = [];
                var labels = [];
                if (res.data.data) {
                    res.data.data.forEach((item) => {
                        values.push(item.num);
                        labels.push(item.roadName);
                    });
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("monitorLoadStatic")
                );
                // 绘制图表
                var option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {},
                    grid: {
                        top: "0",
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "value",
                        boundaryGap: [0, 0.01],
                    },
                    yAxis: {
                        type: "category",
                        data: labels,
                    },
                    series: [
                        {
                            type: "bar",
                            data: values,
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        initMonitorTime() {
            let postData = {
                timeType: this.monitorTimeType,
                carType: "all",
                direction: 2,
                roadName: "all",
                roadFlag: 0,
            };
            getTimeDistribution(postData).then((res) => {
                var eData = res.data.data;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("monitorTimeStatic")
                );
                // 绘制图表
                const option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                            shadowStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(255,255,255,.08)", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(29,235,255,.08)", // 100% 处的颜色
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                    },
                    grid: {
                        top: "25%",
                        right: "0",
                        left: "0",
                        bottom: "0",
                        containLabel: true,
                    },
                    legend: {
                        data: [],
                        left: "right",
                        right: 0,
                        icon: "circle",
                        top: 12,
                        bottom: 8,
                        itemWidth: 8, // 设置宽度
                        itemHeight: 6, // 设置高度
                        itemGap: 2, // 设置间距
                        itemStyle: {
                            fontSize: 4,
                        },
                        textStyle: {
                            //图例文字的样式
                            color: "#000000",
                            fontSize: 10,
                        },
                        // y:"top"
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.labels,
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,0.12)",
                                },
                            },
                            axisLabel: {
                                margin: 10,
                                interval: "auto",
                                color: "#e2e9ff",
                                textStyle: {
                                    fontSize: 10,
                                    color: "#86B3B8",
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            name: "个",
                            minInterval: 1,
                            splitNumber: 3,

                            axisLabel: {
                                formatter: (val) => {
                                    if (val === 0) {
                                        return "个";
                                    } else {
                                        return val;
                                    }
                                },

                                color: "#86B3B8",
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "rgba(0,242,152,.2)",
                                },
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(0,242,152,.2)",
                                },
                            },
                        },
                    ],
                    series: [],
                };
                const colorList = ["#00f298", "#32fdf6", "#efc500", "#219efe"];
                if (eData.length > 0) {
                    for (const key in eData) {
                        option.legend.data.push(eData[key].name); //图例数组 名字需和series的name相同
                        var color = Math.round(Math.random() * 10);
                        option.series.push({
                            type: "line",
                            name: eData[key].name,
                            smooth: true, //是否平滑
                            data: eData[key].y,
                            smooth: "true",
                            symbol: "circle",
                            symbolSize: 5,
                            itemStyle: {
                                normal: {
                                    color: colorList[key],
                                },
                            },
                        });
                    }
                }
                option && myChart.setOption(option);
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        datePickerClick(e) {
            if (e.target === "monitorTrafficFlowTimeType") {
                this.monitorTrafficFlowTimeType = e.type;
                this.initMonitorTrafficFlow();
            }
            if (e.target === "monitoringEntranceTimeType") {
                this.monitoringEntranceTimeType = e.type;
                this.initMonitoringEntrance();
            }
        },
        drivePickerClick(e) {
            if (e.target === "direction") {
                this.direction = e.type;
            }
        },
        timePickerClick(e) {
            if (e.target === "monitorTimeType") {
                this.monitorTimeType = e.type;
                this.initMonitorTime();
            }
        },
        selectTime({ type }) {
            this.timeType = type;
            this.getTrafficFlow();
        },
    },
};
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
@mixin module {
    position: relative;
    width: 100%;
    height: 180px;
    background-color: #ffffff;
    color: #333333;
    margin: 10px 0;
}
@mixin header {
    color: #333333;
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    white-space: nowrap;
}

.trafficOperation {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #f6f5f5;
    overflow-x: hidden;
    overflow-y: scroll;
    .content {
        position: relative;
        top: 44px;
        width: 100%;
        .monitorTrafficFlow {
            @include module;
            .header {
                @include header;
            }
            .center {
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: 140px;
                text-align: center;
                img {
                    width: 60px;
                    height: auto;
                }
                .item {
                    font-size: 14px;
                    font-weight: 300;
                    div {
                        &:nth-of-type(1) {
                            font-size: 16px;
                            font-weight: 600;
                            color: #02a7f0;
                        }
                    }
                }
            }
        }
        .trafficFlow {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #trafficFlowStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .monitoringEntrance {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #monitoringEntranceStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .monitorDrive {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #monitorDriveStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .monitorLoad {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #monitorLoadStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .monitorTime {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #monitorTimeStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
    }
}
</style>