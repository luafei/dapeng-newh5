<template>
    <div class="governServices">
        <dp-title
            :title="title"
            :is-show-arrow="true"
            @goBack="goBack"
        ></dp-title>
        <div class="content">
            <div class="overallBusiness">
                <div class="header">
                    <span>总体业务量 ({{ overallBusinessSum }}) 件</span>
                    <date-picker
                        :target="'overallBusinessTimeType'"
                        :initValue="overallBusinessTimeType"
                        @datePickerClick="datePickerClick"
                    ></date-picker>
                </div>
                <div class="center">
                    <div id="overallBusinessStatic"></div>
                </div>
            </div>
            <div class="departBusines">
                <div class="header">
                    <span>部门业务量</span>
                    <date-picker
                        :target="'departBusinesTimeType'"
                        :initValue="departBusinesTimeType"
                        @datePickerClick="datePickerClick"
                    ></date-picker>
                </div>
                <div class="center">
                    <div id="departBusinesStatic"></div>
                </div>
            </div>
            <div class="businessSource">
                <div class="header">
                    <span>业务来源业务量</span>
                    <date-picker
                        :target="'businessSourceTimeType'"
                        :initValue="businessSourceTimeType"
                        @datePickerClick="datePickerClick"
                    ></date-picker>
                </div>
                <div class="center">
                    <div id="businessSourceStatic"></div>
                </div>
            </div>
            <div class="departAnalysis">
                <div class="header">
                    <span>部门受理量分析</span>
                    <!-- <select  @change="selectTime">
                        <option value="1">第一季度</option>
                        <option value="2">第二季度</option>
                        <option value="3">第三季度</option>
                        <option value="4">第四季度</option>
                    </select> -->
                </div>
                <div class="center">
                    <div id="departAnalysisStatic"></div>
                </div>
            </div>
            <div class="completeRanking">
                <div class="header">
                    <span>业务办结率排名</span>
                    <date-picker
                        :target="'completeRankingTimeType'"
                        @datePickerClick="datePickerClick"
                    ></date-picker>
                </div>
                <div class="center">
                    <div id="completeRankingStatic"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import { getoverall } from "@/api/service";
import { getsection, getsource } from "@/api/gov";
import { filterDate, subStringFormatter } from "@/utils/echartsUtils";
import {
    getbusinranking,
    getbusingood,
    getbusinOvertime,
    getbusinCompleted,
} from "@/api/business";
import businData from "@/utils/businData.js";
export default {
    name: "home",
    data() {
        return {
            title: "政务服务",
            overallBusinessTimeType: "month",
            overallBusinessSum: 0,
            departBusinesTimeType: "year",
            businessSourceTimeType: "year",
            completeRankingTimeType: "day",
            timeType: "month",
            barColors: ["#2FE3EA", "#2FEA9C"],
        };
    },
    created() {
        // this.initData();
    },
    mounted() {
        console.log("mounted");
        this.initOverallBusiness();
        this.initDepartBusines();
        this.initBusinessSource();
        this.initDepartAnalysis();
        this.initCompleteRanking();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        yFormatter(val) {
            return val;
        },
        initOverallBusiness() {
            let postData = {
                timeType: this.overallBusinessTimeType,
            };
            getoverall(postData).then((res) => {
                let { x, y, total } = res.data.data;
                this.overallBusinessSum = total;
                var labels = x;
                var values = y;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("overallBusinessStatic")
                );
                // 绘制图表
                var option = {
                    tooltip: {
                        confine: true,
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    grid: {
                        top: "20%",
                        right: "0",
                        left: "0",
                        bottom: "6%",
                        // height:'100px',
                        containLabel: true,
                    },
                    legend: {
                        show: false,
                        data: [],
                        left: "30%",
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
                            color: "#fff",
                            fontSize: 10,
                        },
                        y: "top",
                    },
                    xAxis: [
                        {
                            type: "category",
                            offset: 0,
                            data: labels,
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,0.12)",
                                },
                            },
                            axisLabel: {
                                show: true,
                                interval: 0,
                                margin: 10,
                                color: "#2FE3EA",
                                textStyle: {
                                    fontSize: 12,
                                    color: "#ffffff",
                                },
                                formatter: (value, index) => {
                                    return filterDate(value, this.timeType);
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            minInterval: 1,
                            axisLabel: {
                                formatter: "{value}",
                                color: "#86B3B8",
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "rgba(44,242,152,.2)",
                                },
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(0,242,152,.2)",
                                },
                            },
                        },
                    ],
                    dataZoom: [
                        {
                            show: true,
                            height: 7,
                            maxSpan: 50,
                            xAxisIndex: [0],
                            bottom: "1%",
                            start: "100",
                            end: 60,
                            handleSize: "110%",
                            handleStyle: {
                                color: "#d3dee5",
                            },
                            textStyle: {
                                color: "#fff",
                            },
                            borderColor: "#2FE3EA",
                        },
                        {
                            type: "inside",
                            show: true,
                            heght: 15,
                            start: 0,
                            end: 35,
                        },
                    ],
                    splitLine: {
                        lineStyle: {
                            color: "rgba(0,242,152,.2)",
                        },
                    },
                    series: [
                        {
                            name: "总体业务量",
                            type: "bar",
                            barWidth: "30%",
                            data: values,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        1,
                                        0,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: this.barColors[0],
                                            },
                                            {
                                                offset: 1,
                                                color: this.barColors[1],
                                            },
                                        ]
                                    ),
                                },
                            },
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        initDepartBusines() {
            let postData = {
                timeType: this.departBusinesTimeType,
            };
            getsection(postData).then((res) => {
                var values = [];
                var labels = [];
                var commoncod = [];
                res.data.data.forEach((item) => {
                    labels.push(item.commonName);
                    values.push(item.num);
                    commoncod.push(item);
                });
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("departBusinesStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "0%",
                        right: "0%",
                        bottom: "10%",
                        top: "10%",
                        // height:"88px",
                        containLabel: true,
                    },
                    tooltip: {
                        formatter: "{b0}:{c0}",
                        confine: true,
                        showContent: true,
                    },
                    xAxis: {
                        type: "category",
                        data: labels,
                        axisTick: "none",
                        offset: 0,
                        axisLine: {
                            show: true,
                        },
                        axisLabel: {
                            interval: 0,
                            margin: 12,
                            confine: true,
                            color: "#e2e9ff",
                            textStyle: {
                                fontSize: 12,
                                color: "#86B3B8",
                            },
                            formatter: subStringFormatter,
                        },
                    },
                    yAxis: [
                        {
                            name: "个",
                            title: "个",
                            minInterval: 1,
                            type: "value",
                            axisLabel: {
                                formatter: this.yFormatter,
                                color: "#86B3B8",
                            },
                            axisLine: {
                                show: false,
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(0,242,152,.2)",
                                },
                            },
                        },
                    ],
                    dataZoom: [
                        {
                            show: true,
                            height: 7,
                            maxSpan: 30,
                            xAxisIndex: [0],
                            bottom: "1%",
                            start: "0",
                            end: 90,
                            handleSize: "110%",
                            handleStyle: {
                                color: "#2FE3EA",
                            },
                            textStyle: {
                                color: "#fff",
                            },
                            borderColor: "#2FE3EA",
                        },
                        {
                            type: "inside",
                            show: true,
                            heght: 15,
                            start: 0,
                            end: 35,
                        },
                    ],
                    series: [
                        {
                            name: commoncod,
                            data: values,
                            type: "bar",
                            barWidth: 24,
                            itemStyle: {
                                normal: {
                                    color: echarts.graphic.LinearGradient(
                                        0,
                                        1,
                                        0,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: this.barColors[0],
                                            },
                                            {
                                                offset: 1,
                                                color: this.barColors[1],
                                            },
                                        ]
                                    ),
                                },
                            },
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        initBusinessSource() {
            let postData = {
                timeType: this.businessSourceTimeType,
            };
            getsource(postData).then((res) => {
                var values = [];
                var labels = [];
                var commoncod = [];
                if (res.data.data.length > 0) {
                    res.data.data.forEach((item) => {
                        labels.push(item.commonName);
                        values.push(item.num);
                        commoncod.push(item);
                    });
                } else {
                    (labels = [
                        "01 葵涌收费站",
                        "02 土洋收费站",
                        "03 溪涌收费站",
                        "04 坪葵路",
                        "05 背仔角收费站",
                    ]),
                        (values = [2000, 800, 600, 400, 100]);
                }

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("businessSourceStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "0%",
                        right: "0%",
                        bottom: "0%",
                        top: "8%",
                        // height:"88px",
                        containLabel: true,
                    },
                    tooltip: {
                        formatter: "{b0}: {c0}个",
                        confine: true,
                    },
                    xAxis: {
                        type: "category",
                        data: labels,
                        axisTick: "none",
                        axisLine: {
                            show: true,
                        },
                        axisLabel: {
                            interval: 0,
                            margin: 10,
                            color: "#e2e9ff",
                            textStyle: {
                                fontSize: 12,
                                color: "#86B3B8",
                            },
                            formatter: subStringFormatter,
                        },
                    },
                    yAxis: [
                        {
                            name: "个",
                            title: "个",
                            minInterval: 1,
                            type: "value",
                            axisLabel: {
                                formatter: this.yFormatter,
                                color: "#86B3B8",
                            },
                            axisLine: {
                                show: false,
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(0,242,152,.2)",
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            data: values,
                            type: "bar",
                            barWidth: 24,
                            itemStyle: {
                                normal: {
                                    color: echarts.graphic.LinearGradient(
                                        0,
                                        1,
                                        0,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: this.barColors[0],
                                            },
                                            {
                                                offset: 1,
                                                color: this.barColors[1],
                                            },
                                        ]
                                    ),
                                },
                            },
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        initDepartAnalysis() {
            this.onRoadChange({ roadName: "第一季度" });
        },
        initCompleteRanking() {
            let postData = {
                timeType: this.completeRankingTimeType,
            };
            getbusinranking(postData).then(res => {
                var values = [];
                var labels = [];
                var allTime = [];
                if (res.data.data.length > 0) {
                    res.data.data.forEach((item) => {
                        labels.push(item.organizationName);
                        values.push(item.percent);
                        allTime.push(item);
                    });
                } 
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(
                    document.getElementById("completeRankingStatic")
                );
                // 绘制图表
                var option = {
                    animationDuration: 1500,
                    grid: {
                        left: "0%",
                        right: "0%",
                        bottom: "0%",
                        top: "5%",
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: "axis",
                        confine: false,
                        show: false,
                        axisPointer: {
                            type: "shadow",
                        },
                        formatter: "{b0}: {c0}%",
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
                                        color: "#fff",
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
                                formatter: (value, index) => {
                                    if (allTime.length > 0) {
                                        return (
                                            (
                                                allTime[index].percent *
                                                100
                                            ).toFixed(2) + "%"
                                        );
                                    }
                                },
                            },
                            data: values,
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
                            data: values,
                            barGap: 10,
                            label: {
                                normal: {
                                    color: "#b3ccf8",
                                    show: true,
                                    position: [0, "-12px"],
                                    textStyle: {
                                        fontSize: 14,
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
                            data: values,
                        },
                    ],
                };
                option && myChart.setOption(option);
            });
        },
        datePickerClick(e) {
            if (e.target === "overallBusinessTimeType") {
                this.overallBusinessTimeType = e.type;
                this.initOverallBusiness();
            }
            if (e.target === "departBusinesTimeType") {
                this.departBusinesTimeType = e.type;
                this.initDepartBusines();
            }
            if (e.target === "businessSourceTimeType") {
                this.businessSourceTimeType = e.type;
                this.initBusinessSource();
            }
            if (e.target === "completeRankingTimeType") {
                this.completeRankingTimeType = e.type;
                this.initCompleteRanking();
            }
        },
        onRoadChange(val) {
            // businData
            let propList = [];
            switch (val.roadName) {
                case "第一季度":
                    propList.push(
                        businData.quarterOne.type3,
                        businData.quarterOne.type4,
                        businData.quarterOne.type5
                    );
                    this.renderEcharts(propList);
                    break;
                case "第二季度":
                    propList.push(
                        businData.quarterTwo.type3,
                        businData.quarterTwo.type4,
                        businData.quarterTwo.type5
                    );
                    this.renderEcharts(propList);
                    break;
                case "第三季度":
                    propList.push(
                        businData.quarterThree.type3,
                        businData.quarterThree.type4,
                        businData.quarterThree.type5
                    );
                    this.renderEcharts(propList);
                    break;
                case "第四季度":
                    propList.push(
                        businData.quarterFour.type3,
                        businData.quarterFour.type4,
                        businData.quarterFour.type5
                    );
                    this.renderEcharts(propList);
                    break;
            }
        },
        renderEcharts(data) {
            var color = [
                "rgba(0,242,152,1)",
                "rgba(50,253,246,1)",
                "rgba(239,197,0,1)",
            ];
            var values = data;
            var labels = [
                "葵涌办事处",
                "市生态环境局大鹏管理局",
                "大鹏办事处",
                "南澳办事处",
                "教育和卫生健康局",
            ];
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(
                document.getElementById("departAnalysisStatic")
            );
            // 绘制图表
            var option = {
                grid: {
                    top: "25%",
                    bottom: "0%",
                    left: "0%",
                    right: "0%",
                    width: "100%",
                    containLabel: true,
                },
                // backgroundColor:"#0f375f",
                tooltip: {
                    trigger: "axis",
                    confine: true,
                    formatter: "{a0}: {c0}%<br />{a1}: {c1}<br />{a2}: {c2}",
                    axisPointer: {
                        type: "shadow",
                        shadowStyle: {},
                    },
                },
                legend: {
                    icon: "circle",
                    color: color,
                    top: "2",
                    right: "10",
                    itemHeight: 10,
                    textStyle: {
                        color: "#000000",
                        fontSize: 12,
                    },
                },
                xAxis: {
                    data: labels,
                    axisLine: {
                        show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: "#26D9FF",
                            // width:2
                        },
                    },
                    axisTick: {
                        show: false, //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: "rgba(250,250,250,0.6)", //X轴文字颜色
                            fontSize: 12,
                        },
                        formatter: subStringFormatter,
                    },
                    splitArea: {
                        show: false,
                        areaStyle: {
                            color: [
                                "rgba(250,250,250,0.1)",
                                "rgba(250,250,250,0)",
                            ],
                        },
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        // name: "亿元",
                        textStyle: {
                            color: "#ebf8ac",
                            fontSize: 40,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(0,242,152,.5)",
                            },
                        },
                        axisTick: {
                            show: true,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                // color: '#26D9FF',
                                // width:2
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgba(250,250,250,0.6)",
                                fontSize: 12,
                            },
                        },
                    },
                    {
                        type: "value",
                        /*name: "同比",*/
                        nameTextStyle: {
                            color: "#ebf8ac",
                            fontSize: 12,
                        },
                        position: "right",
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            formatter: "{value} %", //右侧Y轴文字显示
                            textStyle: {
                                color: "rgba(250,250,250,0.6)",
                                fontSize: 12,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "办结率",
                        type: "line",
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: false, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        symbol: "circle", //标记的图形为实心圆
                        symbolSize: 0, //标记的大小
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "rgba(239,197,0,1)",
                        },
                        lineStyle: {
                            color: "rgba(239,197,0,1)",
                            width: 1,
                            shadowColor: "rgba(239,197,0,1)",
                            shadowBlur: 10,
                            shadowOffsetY: 15,
                        },
                        areaStyle: {
                            color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "rgba(239,197,0,1)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(61,126,235, 0)",
                                },
                            ]),
                        },
                        data: values[2],
                    },
                    {
                        name: "当季办结",
                        type: "bar",
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                color: echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(0,242,152,1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,242,152,1)",
                                        },
                                    ]
                                ),
                            },
                        },
                        data: values[1],
                    },
                    {
                        name: "事件总数",
                        type: "bar",
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                color: echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(50,253,246,1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(50,253,246,1)",
                                        },
                                    ]
                                ),
                                borderWidth: 2,
                            },
                        },
                        data: values[0],
                    },
                ],
            };
            option && myChart.setOption(option);
        },
        selectTime(e) {
            console.log(e);
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
.governServices {
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
        .overallBusiness {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #overallBusinessStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .departBusines {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #departBusinesStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .businessSource {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #businessSourceStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .departAnalysis {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #departAnalysisStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .completeRanking {
            @include module;
            .header {
                @include header;
            }
            .center {
                height: 140px;
                text-align: center;
                width: 100%;
                #completeRankingStatic {
                    width: 100%;
                    height: 140px;
                }
            }
        }
    }
}
</style>