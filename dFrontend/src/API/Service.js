import axios from 'axios'

// 1. 创建axios实例
const service = axios.create({
  baseURL: '/api', // 这里的 /api 是为了配合代理或模拟后端路径
  timeout: 5000
})

// 2. 模拟后端数据（实际开发中请删除这些mock对象，直接调用后端）
const MOCK_DATA = {
  // 模拟登录
  login: (data) => {
    if (data.username === 'admin') return { code: 200, data: { token: 'admin-token', role: 'admin', name: '系统管理员' } }
    if (data.username === 'user') return { code: 200, data: { token: 'user-token', role: 'resident', name: '李先生' } }
    return { code: 401, msg: '账号或密码错误' }
  },
  // 模拟监测数据 (符合需求④基于时序建模)
  monitor: {
    times: ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45'],
    flowRates: [2.1, 2.3, 4.5, 4.8, 3.2, 2.0, 1.8, 2.2], // 瞬时流速
    totalUsage: [120.5, 120.6, 120.8, 121.2, 121.5, 121.6, 121.7, 121.8], // 累计用水
    leakRisk: 85, // 需求⑤ 深度学习计算出的漏损概率
    pressure: 0.42, // 管网压力
    voltage: '3.6V' // 电池电压
  },
  // 模拟决策列表 (需求④智能决策)
  decisions: [
    { id: 101, type: 'leak', level: 'high', title: '管网高危滴漏预警', content: 'DMA-03区域夜间最小流量异常，深度学习模型判定为暗漏。', status: 'pending', time: '2023-10-27 02:15' },
    { id: 102, type: 'behavior', level: 'warning', title: '独居老人用水异常', content: '用户ID:8902 超过24小时无用水记录，建议上门核查。', status: 'handled', time: '2023-10-26 18:00' }
  ]
}

// 3. 导出接口方法
export default {
  // ① 注册登录模块
  login(data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.login(data)), 500)
    })
  },

  // ③ & ⑥ & ④ 获取实时监测与时序数据
  getMonitorData(params) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ code: 200, data: MOCK_DATA.monitor }), 300)
    })
  },

  // ④ 获取智能决策建议
  getDecisionList() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ code: 200, data: MOCK_DATA.decisions }), 400)
    })
  },

  // ⑤ 系统分级管理 - 下发工单
  dispatchOrder(id) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ code: 200, msg: '工单已下发至维修班组' }), 300)
    })
  },

  // ② 搜索查询模块
  search(query) {
    return new Promise((resolve) => {
      console.log('搜索关键词:', query)
      setTimeout(() => resolve({ code: 200, msg: `已搜索到关于“${query}”的3条记录` }), 500)
    })
  }
}