import { SectionType, SectionData } from './types';

export const SECTIONS: Record<SectionType, SectionData> = {
  [SectionType.HOME]: {
    type: SectionType.HOME,
    title: "星际导航系统",
    color: "text-white",
    icon: "Rocket",
    formula: "",
    realWorld: "",
    modules: []
  },
  [SectionType.CIRCLE]: {
    type: SectionType.CIRCLE,
    title: "圆 (Circle)",
    color: "text-neon-blue",
    icon: "Circle",
    formula: "(x-a)² + (y-b)² = r²",
    realWorld: "雷达扫描范围、车轮滚动、水波纹扩散",
    modules: [
      {
        id: 1,
        title: "圆的方程",
        duration: "31 min",
        level: "基础",
        keyPoints: ["定义：到圆心距离为常数", "标准方程推导", "一般方程互化", "圆锥曲线的特例"],
        description: "圆是我们在宇宙中最完美的形状。它是所有圆锥曲线的起点，代表着完美的对称。"
      }
    ]
  },
  [SectionType.ELLIPSE]: {
    type: SectionType.ELLIPSE,
    title: "椭圆 (Ellipse)",
    color: "text-neon-green",
    icon: "Orbit", // Using icon names to be mapped in component
    formula: "x²/a² + y²/b² = 1",
    realWorld: "行星运行轨道、回音壁效应、油罐车截面",
    modules: [
      {
        id: 2,
        title: "定义与标准方程",
        duration: "30 min",
        level: "基础",
        keyPoints: ["定义：到两焦点距离和为常数", "方程推导", "长轴、短轴、离心率"],
        description: "行星并非绕太阳做完美的圆周运动，而是椭圆。掌握它，你就能计算卫星轨道。"
      },
      {
        id: 3,
        title: "焦点三角形",
        duration: "48 min",
        level: "基础",
        keyPoints: ["几何性质", "余弦定理应用", "典型三点构形"],
        description: "利用焦点和椭圆上一点构成的三角形，是解决几何难题的关键模型。"
      },
      {
        id: 4,
        title: "焦半径与焦点弦",
        duration: "53 min",
        level: "中档",
        keyPoints: ["焦半径公式", "焦点弦公式", "距离计算技巧"],
        description: "深入计算天体距离核心的必备工具。"
      }
    ]
  },
  [SectionType.HYPERBOLA]: {
    type: SectionType.HYPERBOLA,
    title: "双曲线 (Hyperbola)",
    color: "text-neon-pink",
    icon: "Activity",
    formula: "x²/a² - y²/b² = 1",
    realWorld: "超音速音爆、冷却塔形状、罗兰导航系统",
    modules: [
      {
        id: 5,
        title: "定义与标准方程",
        duration: "39 min",
        level: "基础",
        keyPoints: ["定义：距离差绝对值为常数", "标准方程(横/竖)", "渐近线概念"],
        description: "当飞船速度超过逃逸速度，它的轨道就变成了双曲线，一去不复返。"
      },
      {
        id: 6,
        title: "焦点三角形",
        duration: "45 min",
        level: "基础",
        keyPoints: ["几何性质", "向量与余弦定理"],
        description: "与椭圆类似的结构，但性质截然不同，注意符号的变化。"
      }
    ]
  },
  [SectionType.PARABOLA]: {
    type: SectionType.PARABOLA,
    title: "抛物线 (Parabola)",
    color: "text-neon-yellow",
    icon: "Wifi",
    formula: "y² = 2px",
    realWorld: "卫星天线、探照灯、投篮轨迹",
    modules: [
      {
        id: 7,
        title: "定义与标准方程",
        duration: "32 min",
        level: "基础",
        keyPoints: ["定义：到定点与定直线距离相等", "标准方程", "开口方向"],
        description: "汇聚能量的完美曲线。所有的光线射入抛物面都会汇聚于焦点，这是通信的基础。"
      },
      {
        id: 8,
        title: "焦半径与焦点弦",
        duration: "64 min",
        level: "中档",
        keyPoints: ["焦半径公式", "焦点弦长度", "统一公式"],
        description: "处理抛物线几何性质的核心计算技巧。"
      }
    ]
  },
  [SectionType.ADVANCED]: {
    type: SectionType.ADVANCED,
    title: "高阶·星际穿越",
    color: "text-purple-400",
    icon: "Zap",
    formula: "e = c/a",
    realWorld: "多级火箭变轨、复杂引力弹弓",
    modules: [
      {
        id: 9,
        title: "椭圆&双曲线综合",
        duration: "51 min",
        level: "中档",
        keyPoints: ["离心率计算", "离心率范围", "代数几何融合"],
        description: "离心率 e 决定了轨道的形状。掌握它，你就掌握了圆锥曲线的灵魂。"
      },
      {
        id: 10,
        title: "高阶模型专题",
        level: "拔高",
        keyPoints: ["定值问题 (寻找不变量)", "最值问题 (距离/极值)", "过定点直线", "三点共线", "四点共圆/双切线"],
        description: "真正的指挥官挑战。解决这些问题需要综合运用点差法、参数法和极致的代数运算能力。"
      }
    ]
  }
};