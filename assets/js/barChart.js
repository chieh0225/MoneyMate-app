import Chart from 'chart.js/auto';

// July bar chart
(async function () {
    const JulyData = [
        { date: '01', count: 600 },
        { date: '02', count: 800 },
        { date: '03', count: 530 },
        { date: '04', count: 200 },
        { date: '05', count: 600 },
        { date: '06', count: 480 },
        { date: '07', count: 220 },
        { date: '08', count: 600 },
        { date: '09', count: 800 },
        { date: '10', count: 530 },
        { date: '11', count: 250 },
        { date: '12', count: 600 },
        { date: '13', count: 480 },
        { date: '14', count: 220 },
        { date: '15', count: 600 },
        { date: '16', count: 800 },
        { date: '17', count: 530 },
        { date: '18', count: 200 },
        { date: '19', count: 600 },
        { date: '20', count: 480 },
        { date: '21', count: 300 },
        { date: '22', count: 600 },
        { date: '23', count: 800 },
        { date: '24', count: 530 },
        { date: '25', count: 200 },
        { date: '26', count: 600 },
        { date: '27', count: 480 },
        { date: '28', count: 350 },
        { date: '29', count: 600 },
        { date: '30', count: 800 },
        { date: '31', count: 530 },
    ];
    const expandChart = document.querySelector('#julyExpand');
    new Chart(
        expandChart,
        {
            type: 'bar',
            data: {
                // labels: JulyData.map(row => row.date),
                labels: JulyData.map((row, index) => {
                    return index % 7 === 0 ? row.date : '';
                }),
                datasets: [
                    {
                        // label: '2024 年 07 月',
                        data: JulyData.map(row => row.count),
                        backgroundColor: JulyData.map(row =>
                            row.count <= 400 ? '#b0b0b0' : '#22C55E'
                        ),
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0, // 降低旋轉角度
                            minRotation: 0, // 降低旋轉角度
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            display: false // 隱藏 y 軸數字
                        },
                        grid: {
                            display: false  // 隱藏 X 軸格線
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // 隱藏圖例
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                // 即使 label 空白也顯示完整日期

                                return `${JulyData[index].date}日`;
                            }
                        }
                    }
                }
            }
        }
    );
})();

// recent analysis 
(async function () {
    const recentMonthExpense = [
        { month: '2月', count: 0 },
        { month: '3月', count: 0 },
        { month: '4月', count: 0 },
        { month: '5月', count: 0 },
        { month: '6月', count: 24000 },
        { month: '7月', count: 26080 },
    ];
    const recentAnalysisExpense = document.querySelector('#recentAnalysisExpense');
    new Chart(
        recentAnalysisExpense,
        {
            type: 'bar',
            data: {
                labels: recentMonthExpense.map((row, index) => {
                    return index % 2 === 0 ? row.month : '';
                }),
                datasets: [
                    {
                        data: recentMonthExpense.map(row => row.count),
                        backgroundColor: "#22C55E",
                        borderRadius: {
                            topLeft: 4,
                            topRight: 4,
                            bottomLeft: 0,
                            bottomRight: 0
                        }, // 設置圓角半徑
                        borderSkipped: 'bottom'
                    },
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0, // 降低旋轉角度
                            minRotation: 0, // 降低旋轉角度
                        },
                        grid: {
                            display: false  // 隱藏 X 軸格線
                        }
                    },
                    y: {
                        beginAtZero: true,
                        stepSize: 10000,  // 每次增量 20k
                        position: 'right', // 將 Y 軸顯示在右邊
                        ticks: {
                            callback: function (value) {
                                return value % 20000 === 0 ? value / 1000 + 'k' : '';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // 隱藏圖例
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                // 即使 label 空白也顯示完整月份
                                return recentMonthExpense[index].month;
                            }
                        }
                    }
                }
            }
        }
    );
})();

(async function () {
    const recentMonthIncome = [
        { month: '2月', count: 0 },
        { month: '3月', count: 0 },
        { month: '4月', count: 0 },
        { month: '5月', count: 0 },
        { month: '6月', count: 0 },
        { month: '7月', count: 0 },
    ];
    const recentAnalysisIncome = document.querySelector('#recentAnalysisIncome');
    new Chart(
        recentAnalysisIncome,
        {
            type: 'bar',
            data: {
                labels: recentMonthIncome.map((row, index) => {
                    return index % 2 === 0 ? row.month : '';
                }),
                datasets: [
                    {
                        data: recentMonthIncome.map(row => row.count),
                        backgroundColor: "#22C55E",
                        borderRadius: 4, // 設置圓角半徑
                        borderSkipped: false // 確保四邊都可以設置圓角
                    },
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0, // 降低旋轉角度
                            minRotation: 0, // 降低旋轉角度
                        },
                        grid: {
                            display: false  // 隱藏 X 軸格線
                        }
                    },
                    y: {
                        beginAtZero: true,
                        stepSize: 10000,  // 每次增量 20k
                        min: 0,
                        max: 40000,
                        position: 'right', // 將 Y 軸顯示在右邊
                        ticks: {
                            callback: function (value) {
                                return value % 20000 === 0 ? value / 1000 + 'k' : '';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // 隱藏圖例
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                // 即使 label 空白也顯示完整月份
                                return recentMonthIncome[index].month;
                            }
                        }
                    }
                }
            }
        }
    );
})();

// example
// (async function () {
//     const data = [
//         { year: 2010, count: 10 },
//         { year: 2011, count: 20 },
//         { year: 2012, count: 15 },
//         { year: 2013, count: 25 },
//         { year: 2014, count: 22 },
//         { year: 2015, count: 30 },
//         { year: 2016, count: 28 },
//     ];

//     new Chart(
//         document.querySelector('#acquisitions2'),
//         {
//             type: 'bar',
//             data: {
//                 labels: data.map(row => row.year),
//                 datasets: [
//                     {
//                         label: 'Acquisitions by year',
//                         data: data.map(row => row.count)
//                     }
//                 ]
//             }
//         }
//     );
// })();