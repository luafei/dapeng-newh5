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
                <div class="subHeader">
                    <drive-picker
                        :target="'monitoringEntranceDirection'"
                        @drivePickerClick="drivePickerClick"
                    ></drive-picker>
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
            monitoringEntranceDirection: 0,
            direction: 0,
            monitorTimeType: "day",
        };
    },
    created() {
        this.initMonitorTrafficFlow();
    },
    mounted() {
        console.log("trafficOperation");
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
                carType: "all",
                direction: this.monitoringEntranceDirection,
                timeType: this.monitoringEntranceTimeType,
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

                var maxArr = [];
                var eData;
                if (values.length !== 0) {
                    maxArr = [];
                    let max = Math.max(...values);
                    values.forEach(() => {
                        maxArr.push({
                            trueValue: max,
                            value: 100,
                        });
                    });
                    eData = values.map((item) => {
                        let value =
                            (item / maxArr[0].trueValue).toFixed(2) * 100;
                        return {
                            value: value,
                            trueValue: item,
                        };
                    });
                } else {
                    eData = maxArr = [];
                }

                var option = {
                    grid: {
                        left: "-50px", // 距离dom间距
                        right: "10px",
                        top: "0%",
                        bottom: "1%",
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: "value",
                            axisPointer: {
                                type: "shadow",
                            },
                            // 横坐标 分割线等取消显示
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: "category",
                            inverse: true,
                            axisLabel: {
                                verticalAlign: "bottom",
                                align: "left",
                                padding: [0, 10, 4, 6],
                                textStyle: {
                                    fontSize: 14,
                                    color: "#86B3B8",
                                    fontFamily: "Source Han Sans CN",
                                },
                                formatter(value, index) {
                                    index += 1;
                                    return value;
                                    // return `{rank${index}|${index}} {text1|${value}}`;
                                },
                            },
                            // 纵坐标数据
                            data: labels,
                            yAxisIndex: 0,
                            // 横坐标 分割线等取消显示
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
                            },
                        },
                        {
                            type: "category",
                            inverse: true,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                inside: false,
                                verticalAlign: "bottom",
                                padding: [0, 10, -22, -5],
                                lineHeight: "40",
                                textStyle: {
                                    fontSize: 12,
                                    color: "#000",
                                    fontFamily: "SourceHanSansCN-Regular",
                                },
                                formatter: (val, key) => {
                                    if (eData[key]) {
                                        return `${eData[key].trueValue}辆`;
                                    } else {
                                        return "0辆";
                                    }
                                },
                            },
                            // 统计的总量 用纵坐标模拟
                            data: eData,
                        },
                    ],
                    series: [
                        {
                            show: true,
                            type: "pictorialBar",
                            symbol: "fixed",
                            symbolSize: [2, 10],
                            symbolMargin: 1,
                            symbolRepeat: "repeat",
                            barWidth: 6, // 统计条宽度
                            itemStyle: {
                                normal: {
                                    color: {
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#57E9FF", // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#4BEBBB", // 100% 处的颜色
                                            },
                                        ],
                                        globalCoord: false, // 缺省为 false
                                    },
                                },
                            },
                            z: 3,
                            data: eData,
                        },
                        {
                            show: true,
                            type: "pictorialBar",
                            symbol: "fixed",
                            symbolSize: [2, 10],
                            symbolMargin: 1,
                            symbolRepeat: "repeat",
                            barGap: "-100%",
                            barWidth: 6, // 统计条宽度
                            itemStyle: {
                                normal: {
                                    color: "#aaa",
                                },
                            },
                            z: 1,
                            data: maxArr,
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
                    labels = res.data.data.map((item) => {
                        return item.vehicleTypeName;
                    });
                    values = res.data.data.map((item) => {
                        return {
                            value: item.num,
                            vehicleType: item.vehicleType,
                        };
                    });
                }

                var eData = values;
                var maxArr = [];
                if (values.length !== 0) {
                    maxArr = [];
                    let max = Math.max(...values);
                    values.forEach(() => {
                        maxArr.push(max);
                    });
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("monitorDriveStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "10px",
                        right: "10px",
                        bottom: "0%",
                        top: "5%",
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
                            axisLabel: {
                                show: false,
                                inside: false,
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
                                        color: "#86B3B8",
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
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
                            },
                            show: true,
                            axisLabel: {
                                inside: false,
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
                                formatter: function (val) {
                                    return `${val}辆`;
                                },
                            },
                            data: eData,
                        },
                    ],
                    series: [
                        {
                            name: "数据内框",
                            zlevel: 2,
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
                            data: eData,
                            barGap: 10,
                            label: {
                                normal: {
                                    color: "#b3ccf8",
                                    show: true,
                                    position: [0, "-12px"],
                                    textStyle: {
                                        fontSize: 12,
                                    },
                                    formatter: function (a) {
                                        return a.name;
                                    },
                                },
                            },
                        },
                        {
                            name: "外框",
                            type: "bar",
                            zlevel: 1,
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
                        labels.push(item.roadName.slice(0, 4));
                    });
                }
                var eData = values;
                var cData = [...values].map((value) => {
                    return parseInt(value);
                });
                var maxArr = [];
                if (values.length !== 0) {
                    maxArr = [];
                    let max = Math.max(...cData);
                    values.forEach(() => {
                        maxArr.push(max);
                    });
                } else {
                    maxArr = [];
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
                    document.getElementById("monitorLoadStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "10px",
                        right: "10px",
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
                            offset: maxLen <= 3 ? 50 : 200,
                            axisLabel: {
                                show: true,
                                margin: 20,
                                textStyle: {
                                    color: "#86B3B8", //y轴字体颜色
                                    align: "left",
                                },
                                formatter: function (val, index) {
                                    return (
                                        "{" +
                                        (index + 1) +
                                        "|" +
                                        (index + 1) +
                                        " }  " +
                                        val
                                    );
                                },
                                //定义富文本标签
                                rich: {
                                    1: {
                                        color: "#fff",
                                        backgroundColor: "#FF3602",
                                        padding: [1, 1, 2, 2],
                                        fontSize: 12,
                                        align: "right",
                                        align: "center",
                                        verticalAlign: "middle",
                                    },
                                    2: {
                                        color: "#fff",
                                        backgroundColor: "#EFC500",
                                        padding: [1, 1, 2, 2],
                                        fontSize: 12,
                                        align: "center",
                                        verticalAlign: "middle",
                                    },
                                    3: {
                                        color: "#fff",
                                        backgroundColor: "#7DFF00",
                                        padding: [1, 1, 2, 2],
                                        fontSize: 12,
                                        align: "center",
                                        verticalAlign: "middle",
                                    },
                                    4: {
                                        color: "#fff",
                                        backgroundColor: "#7CFF00",
                                        padding: [1, 1, 2, 2],
                                        fontSize: 12,
                                        align: "center",
                                        verticalAlign: "middle",
                                    },
                                    5: {
                                        color: "#fff",
                                        backgroundColor: "#7CFF00",
                                        padding: [1, 1, 2, 2],
                                        fontSize: 12,
                                        align: "center",
                                        verticalAlign: "middle",
                                    },
                                    lg: {
                                        fontWeight: "bold",
                                        fontSize: 12, //字体默认12
                                        color: "#08C",
                                        padding: [0, 5, 0, 0],
                                    },
                                    title: {
                                        color: "#86B3B8",
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
                                    return value;
                                },
                            },
                            data: eData,
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
        initMonitorTime() {
            let postData = {
                timeType: this.monitorTimeType,
                carType: "all",
                direction: 2,
                roadName: "all",
                roadFlag: 0,
            };
            getTimeDistribution(postData).then((res) => {
                var labels = [];
                var values = [];
                labels = res.data.data[0].x;
                values = res.data.data;
                var eData = values;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("monitorTimeStatic")
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
                        left: "10px",
                        right: "10px",
                        top: "25%",
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
                            color: "#86B3B8",
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
                this.initMonitoringDrive();
            }
            if (e.target === "monitoringEntranceDirection") {
                this.monitoringEntranceDirection = e.type;
                this.initMonitoringEntrance();
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
        padding-bottom: 40px;
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
            height: 220px;
            .header {
                @include header;
            }
            .subHeader {
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