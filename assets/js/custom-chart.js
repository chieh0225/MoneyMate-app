import Chart from "chart.js/auto";

// 讀取 CSS 變數的值
const getComputedStyleValue = (variable) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

// 使用變數設置顏色
const textPrimaryColor = getComputedStyleValue("--text-primary");
const textSecondaryColor = getComputedStyleValue("--text-secondary");

// 宣告 tooltipEl 變數
let tooltipEl = document.getElementById("chartjs-tooltip");

const data = {
  labels: ["食物", "票卷", "住宿", "飲料"],
  datasets: [
    {
      label: "My First Dataset",
      data: [12050, 24000, 9080, 4950], // 原始數據
      backgroundColor: [
        "#4ADE81",
        "#22C55E",
        "#86EFAD",
        "#BBF7D1",
      ],
      hoverBackgroundColor: [
        // 這是 hover 時的顏色
        "#4ADE81",
        "#22C55E",
        "#86EFAD",
        "#BBF7D1",
      ],
      hoverOffset: 4,
    },
  ],
};

// 計算數據的總和
const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);

// 格式化數字，添加千位分隔符
const formatNumber = (num) => num.toLocaleString();

// 在圖表中心顯示文本的插件
const centerTextPlugin = {
  id: "centerTextPlugin",
  beforeDraw: (chart) => {
    if (chart.config.type === "doughnut") {
      const ctx = chart.ctx;
      const { left, right, top, bottom } = chart.chartArea;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;

      ctx.restore();
      ctx.save();

      // 設置總金額的字體樣式
      ctx.font = "700 16px Arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = textPrimaryColor; // 使用 CSS 變數顏色

      // 顯示總金額
      const totalText = `$${formatNumber(total)}`;
      ctx.fillText(totalText, centerX, centerY - 12); // 顯示金額

      // 設置「總支出」的字體樣式
      ctx.font = "400 13px Arial"; // 字體大小 13px，字重 400
      ctx.fillStyle = textSecondaryColor; // 使用 CSS 變數顏色
      ctx.fillText("總支出", centerX, centerY + 12); // 顯示文字

      ctx.restore();
    }
  },
};

// 註冊插件
Chart.register(centerTextPlugin);

const chart = new Chart(document.getElementById("acquisitions"), {
  type: "doughnut",
  data: data,
  options: {
    cutout: "80%", // 調整這個值來改變環的寬度
    responsive: false, // 設定為 false 以保持固定大小
    animation: {
      duration: 0, // 全局設置動畫持續時間為 0
    },
    animations: {
      colors: false,
      x: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // 禁用內建 tooltip
        external: function (context) {
          const tooltip = context.tooltip;

          // 確保 tooltipEl 被正確設置
          if (!tooltipEl) {
            tooltipEl = document.createElement("p");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.classList.add('roundedTag-sm');
            tooltipEl.style.color = "#737373";
            tooltipEl.style.border = "1px solid #e7e7e7";
            // tooltipEl.style.backgroundColor = "#F0FDF5";
            // tooltipEl.style.borderRadius = "50px";
            // tooltipEl.style.padding = "4px 8px";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.zIndex = "1000"; // 增加 z-index 確保 tooltip 顯示在最上層

            // 設置字體樣式
            // tooltipEl.style.fontSize = "11px";
            // tooltipEl.style.lineHeight = "1.4";
            // tooltipEl.style.fontWeight = "400";

            // 使用 Flexbox 來垂直置中內容
            // tooltipEl.style.display = "flex";
            // tooltipEl.style.alignItems = "center";
            // tooltipEl.style.justifyContent = "center";

            document.body.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.left = `${position.left + window.pageXOffset + tooltip.caretX
            }px`;
          tooltipEl.style.top = `${position.top + window.pageYOffset + tooltip.caretY
            }px`;
          tooltipEl.style.width = "auto";
          tooltipEl.style.height = "auto";

          // 獲取對應的 label
          const label =
            context.chart.data.labels[tooltip.dataPoints[0].dataIndex];

          // 顯示 tooltip 的內容
          tooltipEl.innerHTML = `${label}`;
          tooltipEl.style.opacity = "1";
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
      animationDuration: 300, // 設置懸停動畫的持續時間
    },
    layout: {
      padding: 20, // 為 hoverOffset 效果提供空間
    },
  },
});

console.log(chart.chartArea);
