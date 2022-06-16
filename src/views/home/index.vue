<template>
    <div class="home">
        <dp-title :title="title" :is-show-arrow="false"></dp-title>
        <div class="target">
            <img src="@/assets/images/home_target.png" alt="">
        </div>
        <div class="content">
            <div class="trafficOperation">
                <div class="header" @click="goDetail(1)">
                    <span>交通运行</span>
                    <img src="@/assets/images/right.png" alt="" />
                </div>
                <div class="center">
                    <img src="@/assets/images/traffic.svg" alt="" />
                    <p>通行量</p>
                </div>
                <div class="footer">
                    <template v-for="item in traffic">
                        <div class="item">
                            <p><span>{{ item.num }}</span>辆</p>
                            <p>{{ item.title }}</p>
                        </div>
                        <span class="lin"></span>
                    </template>
                </div>
            </div>
            <div class="dumpTruck">
                <div class="header" @click="goDetail(3)">
                    <span>泥头车</span>
                    <img src="@/assets/images/right.png" alt="" />
                </div>
                <div class="center">
                    <img src="@/assets/images/dump.png" alt="" />
                    <p>泥头车</p>
                </div>
                <div class="footer">
                    <div class="item">
                        <p><span>{{ dump.sum }}</span>辆</p>
                        <p>当前总数</p>
                    </div>
                    <span class="lin"></span>
                    <div class="item">
                        <p class="load">{{ dump.load }}</p>
                        <p>主要路段</p>
                    </div>
                </div>
            </div>
            <!-- <div class="underline"></div> -->
            <div class="hazardousVehicle">
                <div class="header" @click="goDetail(4)">
                    <span>危化品车</span>
                    <img src="@/assets/images/right.png" alt="" />
                </div>
                <div class="center">
                    <img src="@/assets/images/hazardous.png" alt="" />
                    <p>危化品车</p>
                </div>
                <div class="footer">
                    <div class="item">
                        <p><span>{{ hazardous.sum }}</span>辆</p>
                        <p>当前总数</p>
                    </div>
                    <span class="lin"></span>
                    <div class="item">
                        <p class="load">{{ hazardous.load }}</p>
                        <p>主要路段</p>
                    </div>
                </div>
            </div>
            <div class="governServices">
                <div class="header" @click="goDetail(2)">
                    <span>政务服务</span>
                    <img src="@/assets/images/right.png" alt="" />
                </div>
                <div class="center">
                    <div>
                        <p>
                            <img src="@/assets/images/yewu.svg" />
                            <span>{{ govern.byyw }}</span>
                        </p>
                        <p>本月总体业务量</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/hp.svg" />
                            <span>{{ govern.hp }}</span>
                        </p>
                        <p>好评率</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/ywmp.svg" />
                            <span>{{ govern.fastApprovePercent }}</span>
                        </p>
                        <p>秒批业务占比</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/bnbj.svg" />
                            <span>{{ govern.bnbj }}</span>
                        </p>
                        <p>本年办结率</p>
                    </div>
                </div>
            </div>
            
            <div class="home_underline">
                <img src="@/assets/images/home_underline.svg" alt="">
                <span>以下卡片待上线</span>
                <img src="@/assets/images/home_underline.svg" alt="">
            </div>
            
            <!-- <div class="underline"></div> -->
            <div class="ecologicalIndicators">
                <div class="header">
                    <span>生态指标</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div>
                        <img src="@/assets/images/ecological_yezi.svg" />
                        <p>空气质量</p>
                    </div>
                    <div>
                        <p>优</p>
                        <p>25</p>
                    </div>
                    <div>
                        <p>无</p>
                        <p>首要污染物</p>
                    </div>
                </div>
                <div class="footer">
                    <div class="item">
                        <div>
                            <p>SO2</p>
                            <p>5ug/m³</p>
                        </div>
                        <div>
                            <p>PM2.5</p>
                            <p>13ug/m³</p>
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            <p>PM10</p>
                            <p>25ug/m³</p>
                        </div>
                        <div>
                            <p>NO2</p>
                            <p>9ug/m³</p>
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            <p>CO</p>
                            <p>0.5ug/m³</p>
                        </div>
                        <div>
                            <p>O2</p>
                            <p>76ug/m³</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tourismCulture">
                <div class="header">
                    <span>旅游文化</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div class="item">
                        <img src="@/assets/images/tourism_sum.svg" />
                        <p><span>766.71</span>万人次</p>
                        <p>接待总次数</p>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <img src="@/assets/images/tourism_income.svg" />
                        <p><span>24.933</span>亿元</p>
                        <p>旅游业总收入</p>
                    </div>
                </div>
            </div>
            <!-- <div class="underline"></div> -->
            <div class="brightMode">
                <div class="header">
                    <span>群众诉求服务</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div class="item">
                        <div class="title">政法系统光明模式</div>
                        <div class="db">
                            <div>
                                <p>162</p>
                                <p>受理数</p>
                            </div>
                            <div class="lin"></div>
                            <div>
                                <p>162</p>
                                <p>化解数</p>
                            </div>
                        </div>
                        <div class="source">数据来源: 政法办公室</div>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <div class="title">12345热线</div>
                        <div class="db">
                            <div>
                                <p>1489</p>
                                <p>受理数</p>
                            </div>
                            <div class="lin"></div>
                            <div>
                                <p>1398</p>
                                <p>办结数</p>
                            </div>
                        </div>
                        <div class="source">市政务服务数据管理局</div>
                    </div>
                </div>
                <div class="footer">统计频率: 季度</div>
            </div>
            <div class="dataSharing">
                <div class="header">
                    <span>数据共享平台</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div>
                        <p>
                            <img src="@/assets/images/dataSharing_system.svg" />
                            <span>52</span>个
                        </p>
                        <p>数据湖系统</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/dataSharing_sum.svg" />
                            <span>19.2</span>亿
                        </p>
                        <p>数据湖数据量</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/dataSharing_app.svg" />
                            <span>19</span>个
                        </p>
                        <p>数据共享应用</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/dataSharing_share.png" />
                            <span>16.4</span>亿
                        </p>
                        <p>数据共享数据量</p>
                    </div>
                </div>
            </div>
            <!-- <div class="underline"></div> -->
            <div class="smartEmergency">
                <div class="header">
                    <span>智慧应急</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div>
                        <p>
                            <img src="@/assets/images/smartEmergency_big.svg" />
                        </p>
                        <p>重大危险源</p>
                    </div>
                    <div>
                        <p>
                            <img
                                src="@/assets/images/smartEmergency_yujing.svg"
                            />
                        </p>
                        <p>预警</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/smartEmergency_san.svg" />
                        </p>
                        <p>三防</p>
                    </div>
                    <div>
                        <p>
                            <img
                                src="@/assets/images/smartEmergency_qixiang.svg"
                            />
                        </p>
                        <p>气象</p>
                    </div>
                </div>
            </div>
            <div class="smartWater">
                <div class="header">
                    <span>智慧水务</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="xy">
                    <span>响应级别</span>
                    <span>无</span>
                </div>
                <div class="center">
                    <div class="item">
                        <div>水库水位</div>
                        <div>
                            <p>监测点<span></span>个</p>
                            <p>超汛限<span></span>个</p>
                        </div>
                    </div>
                    <div class="item">
                        <div>河道水位</div>
                        <div>
                            <p>监测点<span></span>个</p>
                            <p>超汛限<span></span>个</p>
                        </div>
                    </div>
                    <div class="item">
                        <div>潮位</div>
                        <div>
                            <p>监测点<span></span>个</p>
                            <p>超汛限<span></span>个</p>
                        </div>
                    </div>
                    <div class="item">
                        <div>积涝</div>
                        <div>
                            <p>监测点<span></span>个</p>
                            <p>超汛限<span></span>个</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="underline"></div> -->
            <div class="smartMedical">
                <div class="header">
                    <span>智慧医疗</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <p>
                        <img src="@/assets/images/smartMedical_chae.svg" />
                        <span>医疗收支差额</span>
                    </p>
                    <p>
                        <img src="@/assets/images/smartMedical_sum.svg" />
                        <span>参保人数</span>
                    </p>
                    <p>
                        <img src="@/assets/images/smartMedical_jieyu.svg" />
                        <span>基金累计结余</span>
                    </p>
                </div>
            </div>
            <div class="smartHousing">
                <div class="header">
                    <span>智慧住建</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div class="item">
                        <p><span></span>个</p>
                        <p>
                            <img
                                src="@/assets/images/smartHousing_sum.svg"
                            />项目总数
                        </p>
                    </div>
                    <span class="lin"></span>
                    <div class="item">
                        <p><span></span>人</p>
                        <p>
                            <img
                                src="@/assets/images/smartHousing_person.svg"
                            />在场总人数
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <div>
                        <p>
                            <img src="@/assets/images/smartHousing_keng.svg" />
                            <span>个</span>
                        </p>
                        <p>深基坑</p>
                    </div>
                    <div>
                        <p>
                            <img
                                src="@/assets/images/smartHousing_engine.svg"
                            />
                            <span>个</span>
                        </p>
                        <p>暗挖工程</p>
                    </div>
                    <div>
                        <p>
                            <img src="@/assets/images/smartHousing_jixie.svg" />
                            <span>个</span>
                        </p>
                        <p>起重机械</p>
                    </div>
                </div>
            </div>
            <!-- <div class="underline"></div> -->
            <div class="gis">
                <div class="header">
                    <span>三维GIS</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div class="item">
                        <div>
                            <img src="@/assets/images/gis_map.png" alt="" />
                        </div>
                        <div>96</div>
                        <div>地图服务</div>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <div class="title">
                            <img
                                src="@/assets/images/gis_function.png"
                                alt=""
                            />
                        </div>
                        <div>253</div>
                        <div>功能服务</div>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <div class="title">
                            <img src="@/assets/images/gis_apply.png" alt="" />
                        </div>
                        <div>3</div>
                        <div>已应用系统数</div>
                    </div>
                </div>
            </div>
            <div class="smartCity">
                <div class="header">
                    <span>智慧城管</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="center">
                    <div class="item">
                        <div class="title">
                            <img
                                src="@/assets/images/smartCity_chengguan.svg"
                            />
                            <p>智慧城管</p>
                        </div>
                        <div class="unit"><span></span>万元</div>
                        <div>城市维护费</div>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <div class="title">
                            <img src="@/assets/images/smartCity_huanwei.svg" />
                            <p>环卫指数</p>
                        </div>
                        <div class="unit"><span></span>%</div>
                        <div>生活垃圾分类回收量</div>
                    </div>
                </div>
            </div>
            <!-- <div class="underline"></div> -->
            <div class="wisdomSutra">
                <div class="header">
                    <span>智慧经服</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="top">
                    <p>科技研发资金</p>
                    <p>专利情况</p>
                </div>
                <div class="center">
                    <div class="item">
                        <div>
                            <p>投入<span></span>万元</p>
                        </div>
                        <div class="lielin"></div>
                        <div>
                            <p>同比<span></span>%</p>
                        </div>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <div>
                            <p>申请数<span></span>个</p>
                        </div>
                        <div class="lielin"></div>
                        <div>
                            <p>同比<span></span>%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="commercialSubject">
                <div class="header">
                    <span>商事主体</span>
                    <img src="@/assets/images/right.png" />
                </div>
                <div class="top">
                    <div class="tt">
                        <img
                            src="@/assets/images/commercialSubject_zhu.svg"
                            alt=""
                        />
                        <span>商事主体数</span>
                        <span></span>
                        <span>家</span>
                    </div>
                </div>
                <div class="center">
                    <div class="item">
                        <p>家</p>
                        <p>
                            <img
                                src="@/assets/images/commercialSubject_qiye.svg"
                            /><span>企业数量</span>
                        </p>
                    </div>
                    <div class="lin"></div>
                    <div class="item">
                        <p>家</p>
                        <p>
                            <img
                                src="@/assets/images/commercialSubject_shanghu.svg"
                            /><span>个体商户数量</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { queryPieChart, getTrafficFlow, getMainRoadRank } from "@/api/dumpTruck";
import { parseTime } from "@/utils/util";
import { getoverall } from "@/api/service";
import { gettarget } from "@/api/gov";
import { getbusinranking } from "@/api/business";

export default {
    name: "home",
    data() {
        return {
            title: "专题场景",
            name: "home",
            timeType: "month",
            time2Type: "year",
            traffic: [],
            govern: {
                byyw: '',
                hp: '',
                fastApprovePercent: '',
                bnbj: ''
            },
            dump: {
                sum: '',
                load: ''
            },
            hazardous: {
                sum: '',
                load: ''
            }
        };
    },
    mounted() {
        console.log("home mounted");
        this.initTrafficOperation();
        this.initGovernService();
        this.initDumpTruck();
        this.initHazardousVehicle();
    },
    methods: {
        goDetail(id) {
            console.log(id);
            id == 1 && this.$router.push("trafficOperation");
            id == 2 && this.$router.push("governServices");
            id == 3 && this.$router.push("dumpTruck");
            id == 4 && this.$router.push("hazardousVehicle");
        },
        initTrafficOperation() {
            queryPieChart({
                date: parseTime(new Date(), "{y}-{m}-{d}"),
                vehicleType: "all",
            }).then(res => {
                if (res.data.data) {
                    res.data.data.forEach((item) => {
                            this.traffic.push({
                            title: item.name,
                            num: item.num,
                        });
                    });
                }
            });
        },
        initGovernService() {
            let self = this;
            getoverall({
                timeType: 'month'
            }).then(res => {
                if (res.data.data) {
                    let { total } = res.data.data;
                    self.govern.byyw = total;
                }
            });
            
            gettarget().then(res => {
                if (res.data.data) {
                    self.govern.fastApprovePercent = res.data.data.fastApprovePercent * 100 + "%";
                    self.govern.hp = (1 - res.data.data.negativeCommentPercent) * 100 + "%";
                }
            });
            
            getbusinranking({
                timeType: 'year'
            }).then(res => {
                if (res.data.data.length > 0) {
                    var all_percent = 0;
                    res.data.data.forEach((item) => {
                        all_percent += item.percent
                    });
                    var per_percent = (all_percent  *100).toFixed(2) + '%';
                    self.govern.bnbj =  per_percent;
                }
            });
        },
        initDumpTruck() {
            getTrafficFlow({carType: 'dumpTruck', timeType: 'day'}).then(res => {
                var { total } = res.data.data;
                if (!total) {
                    total = 0
                }
                this.dump.sum = total;
            })
            let postData = {
                dataTime: parseTime(new Date(), '{y}{m}{d}'),
                carType: 'dumpTruck',
            }
            getMainRoadRank(postData).then(res => {
                if (res.data.data.length > 0) {
                    this.dump.load = res.data.data[0].roadName;
                }
            })
        },
        initHazardousVehicle() {
            getTrafficFlow({carType: 'dangerCar', timeType: 'day'}).then(res => {
                var { total } = res.data.data;
                if (!total) {
                    total = 0
                }
                this.hazardous.sum = total;
            })
            let postData = {
                dataTime: parseTime(new Date(), '{y}{m}{d}'),
                carType: 'dangerCar',
            }
            getMainRoadRank(postData).then(res => {
                if (res.data.data.length > 0) {
                    this.hazardous.load = res.data.data[0].roadName;
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
$trafficHeader: #a257c9;
$governHeader: #4b6bc6;
$dumpTruckHeader: #3092ed;
$hazardousHeader: #dea90a;
$ecologicalHeader: #05bc3d;
$tourisHeader: #6300bf;
$brightHeader: #3092ed;
$dataSharingHeader: #23b471;
$smartEmergency: #c07efc;
$smartWaterHeader: #b8741a;
$smartMedicalHeader: #23b471;
$smartHousingHeader: #0000bf;
$gisHeader: #545efb;
$smartCityHeader: #70b503;
$wisdomSutraHeader: #ff7e3d;
$commercialSubjectHeader: #4b6bc6;

@mixin module {
    width: 100%;
    height: 150px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgb(215 215 215 / 35%);
    margin: 10px 0;
}

@mixin head($bacgroundColor) {
    height: 30px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $bacgroundColor;
    font-size: 18px;
    font-weight: 600;
    position: relative;
    border-radius: 5px 5px 0 0;
    img {
        width: 20px;
        height: auto;
        position: absolute;
        right: 0;
    }
}

p {
    margin: 0;
}



.home {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #f6f5f5;
    overflow-x: hidden;
    overflow-y: scroll;
    text-align: center;
    .target {
        position: fixed;
        top: 44px;
        width: 100%;
        height: 150px;
        background-color: #ffffff;
        z-index: 9999;
        img {
            width: 100%;
            height: auto;
        }
    }
    .content {
        position: relative;
        top: 194px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 13px 20px 10px 20px;
        width: 100%;
        padding-bottom: 40px;
        .underline {
            width: 100%;
            margin: 10px 0;
            border: 1px solid #d7d7d7;
        }
        .trafficOperation {
            @include module;
            .header {
                @include head($trafficHeader);
            }
            .center {
                height: 60px;
                font-size: 15px;
                font-weight: 600;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 25px;
                    height: auto;
                }
                p {
                    margin: 0;
                    text-align: center;
                }
            }
            .footer {
                height: 50px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item {
                    color: #333333;
                    p {
                        margin: 0;
                        font-size: 14px;
                        font-weight: 300;
                        &:nth-of-type(1) {
                            color: #9e9e9e;
                            margin-bottom: 3px;
                            font-size: 11px;
                        }
                        span {
                            color: #a257c9;
                            font-size: 18px;
                            font-weight: 500;
                        }
                    }
                }
                .lin {
                    height: 30px;
                    border: 1px dashed #a257c9;
                    &:last-child {
                        display: none;
                    }
                }
            }
        }
        .dumpTruck {
            @include module;
            .header {
                @include head($dumpTruckHeader);
            }
            .center {
                height: 60px;
                font-size: 15px;
                font-weight: 600;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 35px;
                    height: auto;
                }
                p {
                    margin: 0;
                    text-align: center;
                }
            }
            .footer {
                height: 50px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item {
                    color: #333333;
                    p {
                        margin: 0;
                        font-size: 14px;
                        font-weight: 300;
                        &:nth-of-type(1) {
                            color: #9e9e9e;
                            margin-bottom: 3px;
                            font-size: 11px;
                        }
                        span {
                            color: #3092ed;
                            font-size: 18px;
                            font-weight: 500;
                        }
                        &.load {
                            font-size: 18px;
                            color: #3092ed;
                            font-weight: 500;
                        }
                    }
                }
                .lin {
                    height: 30px;
                    border: 1px dashed #3092ed;
                }
            }
        }
        .hazardousVehicle {
            @include module;
            .header {
                @include head($hazardousHeader);
            }
            .center {
                height: 60px;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 35px;
                    height: auto;
                }
                p {
                    margin: 0;
                    text-align: center;
                }
            }
            .footer {
                font-size: 15px;
                height: 50px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item {
                    color: #333333;
                    p {
                        margin: 0;
                        font-size: 14px;
                        font-weight: 300;
                        &:nth-of-type(1) {
                            color: #9e9e9e;
                            margin-bottom: 3px;
                            font-size: 11px;
                        }
                        span {
                            color: #dea90a;
                            font-size: 18px;
                            font-weight: 500;
                        }
                        &.load {
                            font-size: 18px;
                            color: #dea90a;
                            font-weight: 500;
                        }
                    }
                }
                .lin {
                    height: 30px;
                    border: 1px dashed #dea90a;
                }
            }
        }
        .governServices {
            @include module;
            .header {
                @include head($governHeader);
            }
            .center {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: 10px;
                div {
                    width: 150px;
                    height: 45px;
                    margin-bottom: 5px;
                    background-color: #e4e9f6;
                    border: 1px dashed #4b6bc6;
                    font-size: 14px;
                    font-weight: 300;
                    color: #333333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    p {
                        margin: 0;
                        &:nth-of-type(1) {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 600;
                            color: #4b6bc6;
                        }
                        &:nth-of-type(2) {
                            white-space: nowrap;
                            text-align: center;
                            font-size: 12px;
                        }
                    }
                    img {
                        width: 20px;
                        height: auto;
                    }
                }
            }
        }
        .home_underline {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 10px 0 30px 0;
            span {
                font-size: 12px;
                font-weight: 400;
                color: #D7D7D7;
            }
            img {
                width: auto;
                height: 2px;
            }
        }
        .ecologicalIndicators {
            @include module;
            .header {
                @include head($ecologicalHeader);
            }
            .center {
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: 50px;
                font-size: 14px;
                img {
                    width: 23px;
                    height: auto;
                }
                p {
                    margin: 0;
                    font-size: 14px;
                    white-space: nowrap;
                }
                div {
                    width: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    &:nth-of-type(2) {
                        p {
                            &:nth-of-type(1) {
                                color: #05bc3d;
                                font-size: 16px;
                            }
                        }
                    }
                    &:nth-of-type(3) {
                        p {
                            &:nth-of-type(1) {
                                color: #05bc3d;
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
            .footer {
                display: flex;
                justify-content: space-around;
                .item {
                    height: 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    div {
                        background-color: #dcf5e2;
                        border: 1px dashed #10bd43;
                        width: 50px;
                        height: 25px;
                        p {
                            font-size: 6px;
                            line-height: 6px;
                            margin: 5px;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .tourismCulture {
            @include module;
            .header {
                @include head($tourisHeader);
            }
            .center {
                height: 110px;
                display: flex;
                display: flex;
                align-items: center;
                justify-content: space-around;
                div {
                    p {
                        margin: 0;
                        white-space: nowrap;
                        font-size: 10px;
                        span {
                            font-size: 18px;
                            color: #6300bf;
                        }
                        &:nth-of-type(2) {
                            color: #b5aaef;
                            margin-top: 5px;
                        }
                    }
                }
                img {
                    width: 40px;
                    height: auto;
                }
                .lin {
                    height: 80%;
                    border: 1px dashed #b5aaef;
                }
            }
        }
        .brightMode {
            @include module;
            .header {
                @include head($brightHeader);
            }
            .center {
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
                .item {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    .title {
                        height: 30px;
                        width: 100%;
                        text-align: center;
                        position: relative;
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .db {
                        // height: 40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 10px;
                        p {
                            font-size: 14px;
                            margin: 0;
                            white-space: nowrap;
                            font-weight: 500;
                            &:nth-of-type(1) {
                                color: #3092ed;
                                font-size: 18px;
                                font-weight: 400;
                            }
                        }
                    }
                    .source {
                        text-align: center;
                        font-size: 10px;
                        color: #7f7f7f;
                        font-weight: 500;
                    }
                }
                .lin {
                    height: 80%;
                    border: 1px dashed #3092ed;
                }
            }
            .footer {
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
                font-size: 10px;
                color: #7f7f7f;
                font-weight: 500;
            }
        }
        .dataSharing {
            @include module;
            .header {
                @include head($dataSharingHeader);
            }
            .center {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: 10px;
                div {
                    width: 150px;
                    height: 45px;
                    margin-bottom: 5px;
                    background-color: #dff4ea;
                    border: 1px dashed #6ecd9f;
                    font-size: 14px;
                    font-weight: 300;
                    color: #333333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    p {
                        margin: 0;
                        &:nth-of-type(1) {
                            font-size: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            span {
                                color: #23b471;
                                font-weight: 600;
                            }
                        }
                        &:nth-of-type(2) {
                            white-space: nowrap;
                            text-align: center;
                        }
                    }
                    img {
                        width: 25px;
                        height: auto;
                    }
                }
            }
        }
        .smartEmergency {
            @include module;
            .header {
                @include head($smartEmergency);
            }
            .center {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: 10px;
                div {
                    width: 150px;
                    height: 45px;
                    margin-bottom: 5px;
                    background-color: #f6ecff;
                    border: 1px dashed #d09efe;
                    font-size: 12px;
                    font-weight: 300;
                    color: #333333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    p {
                        margin: 0;
                        &:nth-of-type(1) {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            span {
                                color: #c9e2df;
                                font-weight: 600;
                            }
                        }
                        &:nth-of-type(2) {
                            white-space: nowrap;
                            text-align: center;
                        }
                    }
                    img {
                        width: 30px;
                        height: auto;
                    }
                }
            }
        }
        .smartWater {
            @include module;
            .header {
                @include head($smartWaterHeader);
            }
            .xy {
                font-size: 12px;
                color: #c48c47;
                text-align: center;
                span {
                    &:nth-of-type(2) {
                        margin-left: 5px;
                        color: #ba7721;
                        font-size: 14px;
                        font-weight: 400;
                    }
                }
            }
            .center {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                .item {
                    width: 150px;
                    height: 45px;
                    margin-bottom: 5px;
                    background-color: #f4eade;
                    border: 1px dashed #c48c47;
                    font-size: 10px;
                    font-weight: 300;
                    color: #333333;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    div {
                        display: flex;
                        flex-direction: column;
                        flex: 4;
                        &:nth-of-type(1) {
                            font-size: 8px;
                            color: #7f7f7f;
                            width: 10px;
                            height: 100%;
                            flex: 1;
                            line-height: 10px;
                            font-size: 10px;
                            justify-content: center;
                        }
                    }
                    p {
                        margin: 0;
                        &:nth-of-type(1) {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            span {
                                color: #c9e2df;
                                font-weight: 600;
                            }
                        }
                        &:nth-of-type(2) {
                            white-space: nowrap;
                            text-align: center;
                        }
                    }
                    img {
                        width: 15px;
                        height: auto;
                    }
                }
            }
        }
        .smartMedical {
            @include module;
            .header {
                @include head($smartMedicalHeader);
            }
            .center {
                img {
                    width: 22px;
                    height: auto;
                }
                p {
                    margin: 14px;
                    color: #ba7721;
                    font-size: 14px;
                    font-weight: 300;
                    display: flex;
                    align-items: center;
                    span {
                        margin-left: 5px;
                    }
                }
            }
        }
        .smartHousing {
            @include module;
            .header {
                @include head($smartHousingHeader);
            }
            .center {
                height: 50px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item {
                    color: #333333;
                    p {
                        margin: 0;
                        font-size: 12px;
                        font-weight: 300;
                        color: #333333;
                        &:nth-of-type(1) {
                            color: #9e9e9e;
                            margin-bottom: 3px;
                        }
                    }
                    img {
                        width: 13px;
                        height: auto;
                    }
                }
                .lin {
                    height: 30px;
                    border: 1px dashed #dadcf6;
                }
            }
            .footer {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: 10px;
                div {
                    width: 50px;
                    height: 40px;
                    margin-bottom: 5px;
                    background-color: #dadcf6;
                    border: 1px dashed #0000bf;
                    font-size: 10px;
                    font-weight: 300;
                    color: #333333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    p {
                        margin: 0;
                        &:nth-of-type(1) {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            span {
                                color: #9e9e9e;
                                font-weight: 600;
                            }
                        }
                        &:nth-of-type(2) {
                            white-space: nowrap;
                            text-align: center;
                        }
                    }
                    img {
                        width: 12px;
                        height: auto;
                    }
                }
            }
        }
        .gis {
            @include module;
            .header {
                @include head($gisHeader);
            }
            .center {
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                img {
                    width: 32px;
                    height: auto;
                }
                .item {
                    width: 55px;
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    div {
                        &:nth-of-type(2) {
                            font-size: 18px;
                            font-weight: 400;
                            color: #545efb;
                        }
                    }
                }
                .lin {
                    height: 80%;
                    border: 1px dashed #e6e7ff;
                }
            }
        }
        .smartCity {
            @include module;
            .header {
                @include head($smartCityHeader);
            }
            .center {
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                img {
                    width: 32px;
                    height: auto;
                }
                .item {
                    width: 55px;
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    div {
                        p {
                            margin: 0;
                        }
                    }
                    .unit {
                        font-size: 10px;
                    }
                    .title {
                        font-weight: 600;
                    }
                }
                .lin {
                    height: 80%;
                    border: 1px dashed #e6e7ff;
                }
            }
        }
        .wisdomSutra {
            @include module;
            .header {
                @include head($wisdomSutraHeader);
            }
            .top {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                color: #333333;
                font-size: 14px;
                font-weight: 400;
                p {
                    margin: 0;
                    line-height: 30px;
                }
            }
            .center {
                display: flex;
                height: 50px;
                align-items: center;
                justify-content: space-around;
                .lin {
                    height: 80%;
                    border: 1px dashed #ffdece;
                }
                .lielin {
                    width: 100%;
                    border: 1px dashed #ffdece;
                }
                .item {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                    height: 100%;
                    justify-content: space-around;
                    p {
                        margin: 0;
                        span {
                            margin: 0 10px;
                        }
                    }
                }
            }
        }
        .commercialSubject {
            @include module;
            .header {
                @include head($commercialSubjectHeader);
            }
            .top {
                display: flex;
                align-items: center;
                position: relative;
                justify-content: center;
                top: 10px;
                height: 40px;
                .tt {
                    width: 155px;
                    height: 30px;
                    background-color: #e4e9f6;
                    border: 1px dashed #4b6bc6;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    img {
                        width: 20px;
                        height: auto;
                        margin: 0 5px;
                    }
                    span {
                        &:nth-of-type(1) {
                            font-size: 12px;
                            font-weight: 400;
                            color: #333333;
                        }
                        &:nth-of-type(2) {
                            margin: 0 25px;
                        }
                        &:nth-of-type(3) {
                            font-size: 11px;
                            font-weight: 300;
                            color: #9e9e9e;
                        }
                    }
                }
            }
            .center {
                display: flex;
                align-items: center;
                white-space: nowrap;
                font-size: 10px;
                width: 100%;
                position: relative;
                justify-content: space-around;
                height: 60px;
                img {
                    width: 20px;
                    height: auto;
                }
                .lin {
                    height: 50%;
                    border: 1px dashed #4b6bc6;
                }
                .item {
                    flex: 1;
                    p {
                        font-size: 14px;
                        color: #333333;
                        font-weight: 300;
                        &:nth-of-type(1) {
                            font-size: 10px;
                            color: #9E9E9E;
                        }
                    }
                }
            }
        }
    }
}
</style>