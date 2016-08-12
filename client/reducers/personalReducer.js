/**
 * Created by lxy on 16/8/12.
 */

import {updateStep} from '../constants/personalConst.js';
const initialState = {
    tab: ['介绍','技能','项目','教育'],
    step: 0,
    name: '郎啸宇',
    age: '26',
    tel: '18810032068',
    skills: [
        '熟悉JavaScript, 了解作用域链, 原型, 原型链, ES6, 闭包等应用',
        'node基本应用, 常用模块使用, 路由设计, RESTful ,express, MVC, 图片裁剪, JSON Web Token 应用, 单点登录基于redis的session持久化',
        'mongoDB基本使用, CRUD',
        '了解React, 生命周期, 数据传递, 组件化, 虚拟DOM',
        '了解AngularJS 1.X, MV* 框架, Provider, 双向数据绑定, Directive',
        '熟悉Jade模板引擎, 以及Scss 预处理器',
        'webpack, gulp,  前端自动化工具的基本应用'
    ],
    workExperience: [
        {
            companyName: '世纪鼎利',
            cycle: ['2015-10','至今'],
            project: [
                {
                    name: '知新网 (教育类)',
                    content: '负责PC端Web开发, 使用Angular + node 做前后端分离架构, api采用RESTful风格,负责开发 CMS 内容管理平台, 基本使用架构类似知心网, 使用了UI框架Boot',
                    path: 'http://www.aizhixin.com'
                },
                {
                    name: '知新点点 (学校资源管理)',
                    content: '负责开发知新点点 CMS , 解决学校数据导入, 老师学生基本数据生成, 以及生产运行数据, 使用 Angular + node + Boot 架构',
                },
                {
                    name: '知新督导 (学校数据统计)',
                    content: '负责知新督导Web开发, 采用百度第三方插件 echart 进行数据图形展示',
                }
            ]
        }
    ],
    educationExperience: [
        {
            name: '中央广播电视大学信息工程学区',
            graduationTime: ['2009-9', '2011-6'],
            level: '大专',
            major: '法学'

        }
    ],
    introduction: 'Web前端开发 1年多, 目前技术阶段属于 (初级 -> 我 -> 中级) , 热爱编程工作, 前端也是自学, 属于兴趣驱动型, 热爱研究新技术, 希望可以找到很多志同道合的开发者一起研究学习',
    instructions: ''
}
const personal = (state = initialState, action = undefined) => {
    switch (action.type) {
        case updateStep:
            return Object.assign({},state,{
                step: action.step
            })
        default :
            return state;
    }
}


export default personal;