<template>
    <div class="hazardousVehicle">
        <dp-title
            :title="title"
            :is-show-arrow="true"
            @goBack="goBack"
        ></dp-title>
        <div class="content">
            <div class="hazardousStatistics">
                <div class="header">
                    <span>危化品车流量统计</span>
                    <date-picker  :target="'hazardousStatisticsTimeType'" @datePickerClick="datePickerClick"></date-picker>
                </div>
                <div class="center">
                    <div class="item">
                        <img src="@/assets/images/traffic_in.png" alt="" />
                        <div>{{hazardousStatistics.carIn}}</div>
                        <div>驶入车辆</div>
                    </div>
                    <div class="item">
                        <img src="@/assets/images/traffic_out.png" alt="" />
                        <div>{{hazardousStatistics.carOut}}</div>
                        <div>驶出车辆</div>
                    </div>
                    <div class="item">
                        <img src="@/assets/images/traffic_pure.png" alt="" />
                        <div>{{hazardousStatistics.carNetinflow}}</div>
                        <div>净流入车辆</div>
                    </div>
                    <div class="item">
                        <img src="@/assets/images/traffic_vehicle.png" alt="" />
                        <div>{{hazardousStatistics.total}}</div>
                        <div>总车辆</div>
                    </div>
                </div>
            </div>
            <div class="hazardousRanking">
                <div class="header">
                    <span>危化品出入口通行量排名</span>
                    <drive-picker :target="'direction'" @drivePickerClick="drivePickerClick"></drive-picker>
                </div>
                <div class="center">
                    <div id="hazardousRankingStatic"></div>
                </div>
            </div>
            <div class="hazardousDistribution">
                <div class="header">
                    <span>危化品车出入口通行量时间分布</span>
                    <drive-picker :target="'driveTimeDirection'" @drivePickerClick="drivePickerClick"></drive-picker>
                </div>
                <div class="center">
                    <div id="hazardousDistributionStatic"></div>
                </div>
            </div>
            <div class="hazardousLoad">
                <div class="header">
                    <span>危化品车主要路段通行量</span>
                </div>
                <div class="center">
                    <div id="hazardousLoadStatic"></div>
                </div>
            </div>
            <div class="hazardousSection">
                <div class="header">
                    <span>危化品车主要路段通行量时间分布</span>
                    <time-picker :target="'monitorTimeType'" :initValue="monitorTimeType" @timePickerClick="timePickerClick"></time-picker>
                </div>
                <div class="center">
                    <div id="hazardousSectionStatic"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import { getTrafficFlow, getTrafficRank, getTimeDistribution, getMainRoadRank } from "@/api/dumpTruck";
import { parseTime } from "@/utils/util";
export default {
    name: "home",
    data() {
        return {
            title: "危化品车",
            carType: 'dangerCar',
            hazardousStatisticsTimeType: 'day',
            hazardousStatistics: {
                carIn: 0,
                carOut: 0,
                carNetinflow: 0,
                total: 0
            },
            monitoringEntranceIndex: 0,
            direction: 0,
            driveTimeDirection: 0,
            monitorTimeType: 'day',
        };
    },
    created() {
        this.initData();
    },
    mounted() {
        console.log("mounted");
        this.initHazardousRanking();
        this.initHazardousDistribution();
        this.initHazardousLoad();
        this.initHazardousSection();
    },
    methods: {
        initData() {
            let postData = {
                carType: this.carType,
                timeType: this.hazardousStatisticsTimeType,
            };
            getTrafficFlow(postData).then(res => {
                let { carIn, carOut, carNetinflow, nativeLocation, otherPlace, total } =
        res.data.data;
                this.hazardousStatistics.carIn = carIn || 0;
                this.hazardousStatistics.carOut = carOut || 0;
                this.hazardousStatistics.carNetinflow = carNetinflow || 0;
                this.hazardousStatistics.total = total || 0;

            })
        },
        initHazardousRanking() {
            let postData = {
                carType: this.carType,
                direction: this.direction,
                timeType: "day",
            };
            getTrafficRank(postData).then((res) => {
                // 基于准备好的dom，初始化echarts实例
                var labels = [];
                var values = [];
                var allTime = [];
                var maxArr = [];
                res.data.data.forEach((item, index) => {
                    item.value = item.flowNum;
                    allTime.push(item);
                    if (this.carType !== "all") {
                        labels.push("0" + (index + 1) + " " + item.tollName);
                    } else {
                        labels.push(item.tollName);
                    }
                    values.push(item.flowNum);
                });
                if (values.length !== 0) {
                    maxArr = [];
                    let max = Math.max(...values);
                    values.forEach(() => {
                        maxArr.push(max);
                    });
                } else {
                    maxArr = [];
                }

                var myChart = echarts.init(
                    document.getElementById("hazardousRankingStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "0%",
                        right: "0%",
                        bottom: "0%",
                        top: "0%",
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                        formatter: "{b0}: {c0}",
                    },
                    xAxis: {
                        show: false, //是否显示x轴
                        type: "value",
                    },
                    yAxis: [
                        {
                            type: "category",
                            inverse: true, //让y轴数据逆向
                            triggerEvent: true,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: (val, index) => {
                                        if (index === 0) {
                                            return "#41FFEA";
                                        } else {
                                            return "#86B3B8";
                                        }
                                    }, //y轴字体颜色
                                },
                                //定义富文本标签
                                rich: {
                                    lg: {
                                        fontWeight: "bold",
                                        fontSize: 12, //字体默认12
                                        color: "#08C",
                                        padding: [0, 5, 0, 0],
                                    },
                                    title: {
                                        color: "#000000",
                                        fontWeight: "lighter",
                                    },
                                },
                            },
                            splitLine: { show: false }, //横向的线
                            axisTick: { show: false }, //y轴的端点
                            axisLine: { show: false }, //y轴的线
                            data: labels,
                        },
                        {
                            type: "category",
                            inverse: true,
                            axisTick: "none",
                            axisLine: "none",
                            show: true,
                            axisLabel: {
                                textStyle: {
                                    color: function (value, index) {
                                        if (index === 0) return "#FF3600";
                                        if (index === 1) return "#FE8602";
                                        if (index === 2) return "#EFC500";
                                        if (index === 3) return "#7CFF00";
                                        if (index === 4) return "#7CFF00";
                                    },
                                    fontSize: "12",
                                },
                                formatter: (value, index) => {
                                    if (allTime.length > 0) {
                                        return (
                                            value + "/" + allTime[index].allNum
                                        );
                                    } else {
                                        return value;
                                    }
                                },
                            },
                            data: values,
                        },
                    ],
                    series: [
                        {
                            name: "数据内框",
                            type: "bar",
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 30,
                                    color: echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        1,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: "rgba(71,181,255,0.6)",
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(65,255,234,0.7)",
                                            },
                                        ]
                                    ),
                                },
                            },
                            barWidth: 11,
                            data: values,
                        },
                        {
                            name: "外框",
                            type: "bar",
                            itemStyle: {
                                normal: {
                                    borderColor: "rgba(115,255,254,1)",
                                    borderWidth: 0.5,
                                    barBorderRadius: 15,
                                    color: "rgba(102, 102, 102,0)",
                                },
                            },
                            barGap: "-100%",
                            z: 0,
                            barWidth: 11,
                            data: maxArr,
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        initHazardousDistribution() {
            let postData = {
                timeType: "month",
                carType: this.carType,
                direction: this.driveTimeDirection,
                roadName: "all",
                roadFlag: 1,
            };
            getTimeDistribution(postData).then(res => {
                var labels = [];
                var values = [];
                res.data.data.forEach((item) => {
                    item.name = item.name.replace("出入口", "");
                });
                labels = res.data.data[1].x;
                values = res.data.data;

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("hazardousDistributionStatic")
                );
                // 绘制图表
                var option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                        // formatter: function (params) {
                        //     console.log(params); // 当我们想要自定义提示框内容时，可以先将鼠标悬浮的数据打印出来，然后根据需求提取出来即可
                        // }
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
                        left: "35%",
                        right: 0,
                        icon: "circle",
                        itemWidth: 8, // 设置宽度
                        itemHeight: 4, // 设置高度
                        itemGap: 1, // 设置间距
                        itemStyle: {
                            fontSize: 4,
                        },
                        textStyle: {
                            //图例文字的样式
                            color: "#000000",
                            fontSize: 10,
                        },
                        y: "top",
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: labels,
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,0.12)",
                                },
                            },
                            axisLabel: {
                                margin: 10,
                                color: "#e2e9ff",
                                textStyle: {
                                    fontSize: 10,
                                    color: "#ffffff",
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            name: "个",
                            minInterval: 1,
                            axisLabel: {
                                formatter: "{value}",
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
                if (values.length > 0) {
                    for (const key in values) {
                        option.legend.data.push(values[key].name);
                        var color = Math.round(Math.random() * 10);
                        option.series.push({
                            type: "line",
                            name: values[key].name,
                            smooth: true,
                            data: values[key].y,
                            barWidth: "4px",
                            symbolSize: 5,
                            symbol: "circle",
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
        initHazardousLoad() {
            let postData = {
                dataTime: parseTime(new Date(), "{y}{m}{d}"),
                carType: this.carType,
            };
            getMainRoadRank(postData).then((res) => {
                var labels = [];
                var values = [];
                var allTime = [];
                var maxArr = [];
                res.data.data.forEach((item) => {
                    labels.push(item.roadName.slice(0, 4));
                    values.push(item.num);
                    allTime.push(item);
                });

                var eData = values;
                var cData = [...values].map((value) => {
                    return parseInt(value);
                });
                if (values.length !== 0) {
                    maxArr = [];
                    let max = Math.max(...cData);
                    values.forEach(() => {
                        maxArr.push(max);
                    });
                } else {
                    this.maxArr = [];
                }

                var arr = [];
                var maxLen = 0;
                for (let index = 0; index < labels.length; index++) {
                    arr.push(labels[index].length);
                }
                if (arr.length) {
                    maxLen = Math.max(...arr);
                }

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("hazardousLoadStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "1%",
                        right: "0%",
                        bottom: "0%",
                        top: "0%",
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                        formatter: "{b0}: {c0}",
                    },
                    xAxis: {
                        show: false, //是否显示x轴
                        type: "value",
                    },
                    yAxis: [
                        {
                            type: "category",
                            inverse: true, //让y轴数据逆向
                            triggerEvent: true, //开启监听点击事件
                            offset: this.maxLen <= 3 ? 50 : 200,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: (val, index) => {
                                        if (index === 0) {
                                            return "#41FFEA";
                                        } else {
                                            return "#86B3B8";
                                        }
                                    }, //y轴字体颜色
                                },
                                //定义富文本标签
                                rich: {
                                    lg: {
                                        fontWeight: "bold",
                                        fontSize: 12, //字体默认12
                                        color: "#08C",
                                        padding: [0, 5, 0, 0],
                                    },
                                    title: {
                                        color: "#000000",
                                        fontWeight: "lighter",
                                    },
                                },
                            },
                            splitLine: { show: false }, //横向的线
                            axisTick: { show: false }, //y轴的端点
                            axisLine: { show: false }, //y轴的线
                            data: labels,
                        },
                        {
                            type: "category",
                            inverse: true,
                            axisTick: "none",
                            axisLine: "none",
                            show: true,
                            axisLabel: {
                                textStyle: {
                                    color: function (value, index) {
                                        if (index === 0) return "#FF3600";
                                        if (index === 1) return "#EFC500";
                                        if (index === 2) return "#7DFF00";
                                        if (index === 3) return "#7DFF00";
                                        if (index === 4) return "#7DFF00";
                                    },
                                    fontSize: "12",
                                },
                                formatter: (value, index) => {
                                    if (allTime.length > 0) {
                                        return (
                                            value + "/" + allTime[index].allNum
                                        );
                                    } else {
                                        return value;
                                    }
                                },
                            },
                            data: values,
                        },
                    ],
                    series: [
                        {
                            name: "数据内框",
                            type: "bar",
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 30,
                                    color: echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        1,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: "rgba(71,181,255,0.6)",
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(65,255,234,0.7)",
                                            },
                                        ]
                                    ),
                                },
                            },
                            barWidth: 11,
                            data: cData,
                        },
                        {
                            name: "外框",
                            type: "bar",
                            itemStyle: {
                                normal: {
                                    borderColor: "rgba(115,255,254,1)",
                                    borderWidth: 0.5,
                                    barBorderRadius: 15,
                                    color: "rgba(102, 102, 102,0)",
                                },
                            },
                            barGap: "-100%",
                            z: 0,
                            barWidth: 11,
                            data: maxArr,
                        },
                    ],
                };

                option && myChart.setOption(option);
            });
        },
        initHazardousSection() {
            let postData = {
                timeType: this.monitorTimeType,
                carType: this.carType,
                direction: 2,
                roadName: 'all',
                roadFlag: 0,
            };
            getTimeDistribution(postData).then((res) => {
                var labels = [];
                var values = [];
                labels = res.data.data[0].x;
                values = res.data.data;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("hazardousSectionStatic")
                );
                // 绘制图表
                var option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                            shadowStyle: {
                                color: echarts.graphic.LinearGradient(
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
                            color: "#000",
                            fontSize: 10,
                        },
                        // y:"top"
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: labels,
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
                if (values.length > 0) {
                    for (const key in values) {
                        option.legend.data.push(values[key].name); //图例数组 名字需和series的name相同
                        var color = Math.round(Math.random() * 10);
                        option.series.push({
                            type: "line",
                            name: values[key].name,
                            smooth: true, //是否平滑
                            data: values[key].y,
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
            if (e.target === 'hazardousStatisticsTimeType') {
                this.hazardousStatisticsTimeType = e.type;
                this.initData();
            }
        },
        drivePickerClick(e) {
            if (e.target === 'direction') {
                this.direction = e.type
                this.initHazardousRanking();
            }
            if (e.target === 'driveTimeDirection') {
                this.driveTimeDirection = e.type
                this.initHazardousDistribution();
            }
        },
        timePickerClick(e) {
            if (e.target === 'monitorTimeType') {
                this.monitorTimeType = e.type
            }
        }
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
.hazardousVehicle {
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
        .hazardousStatistics {
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
        .hazardousRanking {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #hazardousRankingStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .hazardousDistribution {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #hazardousDistributionStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .hazardousLoad {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #hazardousLoadStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .hazardousSection {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #hazardousSectionStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
    }
}
</style>