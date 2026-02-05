// 模拟后端返回的数据
export default {
  // ① 登录
  login(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.username === 'admin') resolve({ code: 200, role: 'admin', name: '管理员' })
        else resolve({ code: 200, role: 'user', name: '普通用户' })
      }, 500)
    })
  },
  // ③ & ⑥ 监测数据
  getMonitorData() {
    return Promise.resolve({
      // (4) 15分钟级时序数据
      times: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15'],
      flowRates: [2.5, 3.1, 4.2, 2.8, 3.5, 2.9],
      totalUsage: [120, 125, 132, 138, 145, 150],
      leakRisk: 85, // (5) 深度学习模型计算出的漏损风险
      device: { voltage: '3.7V', signal: '-82dBm', pressure: '0.45MPa' }
    })
  },
  // ④ 决策建议
  getDecisions() {
    return Promise.resolve([
      { id: 1, level: 'high', title: 'DMA-03区 管网滴漏预警', suggestion: '检测到持续微小流量，建议立即检修阀门 A-12。' },
      { id: 2, level: 'low', title: '设备低电量', suggestion: '终端 8901 电池电压低于 3.5V。' }
    ])
  }
}