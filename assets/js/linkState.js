const footerHomeLink = document.querySelector(".footer span.mgc_home_7_fill");
const footerHome = footerHomeLink.parentElement;

const footerRecordLink = document.querySelector(
  ".footer span.mgc_list_search_fill"
);
const footerRecord = footerRecordLink.parentElement;

const footerChartLink = document.querySelector(
  ".footer span.mgc_chart_pie_2_fill"
);
const footerChart = footerChartLink.parentElement;

const footerSettingLink = document.querySelector(
  ".footer span.mgc_settings_5_fill"
);
const footerSetting = footerSettingLink.parentElement;

const homeArea = document.querySelector("#homeArea");
const recordArea = document.querySelector("#recordArea");
const chartArea = document.querySelector("#chartArea");

const personIndex = document.querySelector("#personIndex");
const groupIndex = document.querySelector("#groupIndex");
const travel = document.querySelector("#travelTest");
// console.log(travel);

const homeSwitch = () => {
  footerHome.classList.add("active");
  footerRecord.classList.remove("active");
  footerChart.classList.remove("active");
  footerSetting.classList.remove("active");
};

const recordSwitch = () => {
  footerRecord.classList.add("active");
  footerHome.classList.remove("active");
  footerChart.classList.remove("active");
  footerSetting.classList.remove("active");
};

const chartSwitch = () => {
  footerChart.classList.add("active");
  footerRecord.classList.remove("active");
  footerHome.classList.remove("active");
  footerSetting.classList.remove("active");
};

const settingSwitch = () => {
  footerSetting.classList.add("active");
  footerChart.classList.remove("active");
  footerRecord.classList.remove("active");
  footerHome.classList.remove("active");
};

const checkState = (page) => {
  if (page === "setting.html") {
    settingSwitch();
  } else if (page === "record.html") {
    recordSwitch();
  } else if (page === "chart.html") {
    chartSwitch();
  } else {
    homeSwitch();
  }
};

const currentState = () => {
  if (subjectTitle === "setting.html") {
    lastPage = localStorage.getItem("pageBack");
    localStorage.setItem("currentState", lastPage);
  } else if (subjectTitle === subjectPage) {
    localStorage.setItem("currentState", "person");
  } else if (subjectTitle !== subjectPage) {
    localStorage.setItem("currentState", subjectTitle);
  }
};
const currentPage = window.location.href;
let lastPage = "";
const pageName = currentPage.split("/").pop();
let subjectTitle = pageName.split("-").shift();
let subjectPage = pageName.split("-").pop();
console.log(subjectTitle);
console.log(subjectPage);
currentState();
checkState(subjectPage);
footerHome.addEventListener("click", (e) => {
  e.preventDefault();
  const currentTarget = localStorage.getItem("currentState");
  // console.log(currentTarget);
  if (currentTarget === "person") {
    window.location.href = "index.html";
  } else {
    window.location.href = `${currentTarget}-index.html`;
  }
});

footerRecord.addEventListener("click", (e) => {
  e.preventDefault();
  const currentTarget = localStorage.getItem("currentState");
  // console.log(currentTarget);
  if (currentTarget === "person") {
    window.location.href = "record.html";
  } else {
    window.location.href = `${currentTarget}-record.html`;
  }
});

footerChart.addEventListener("click", (e) => {
  e.preventDefault();
  const currentTarget = localStorage.getItem("currentState");
  // console.log(currentTarget);
  if (currentTarget === "person") {
    window.location.href = "chart.html";
  } else {
    window.location.href = `${currentTarget}-chart.html`;
  }
});

footerSetting.addEventListener("click", (e) => {
  e.preventDefault();
  const pageBack = localStorage.getItem("currentState");
  localStorage.setItem("pageBack", pageBack);
  window.location.href = "setting.html";
});

// // category-item prevent link
// const categoryItem = document.querySelectorAll('.category-item-bg-light');
// categoryItem.forEach(element => {
//     element.addEventListener('click', (e) => {
//         e.preventDefault();
//     })
// });

const categoryItems = document.querySelectorAll(".category-item-bg-light");
categoryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const link = item.querySelector("a"); // 找到該 <li> 內的 <a> 元素
    if (link) {
      const href = link.getAttribute("href");
      // 如果 href 存在且不是 '#'，允許跳轉
      if (href && href !== "#") {
        window.location.href = href;
      } else {
        // 如果 href 是 '#' 或不存在，阻止預設行為
        e.preventDefault();
      }
    }
  });
});

// 隱藏金額狀態
const eyeBtn = document.querySelector('#hiddenBtn');
const eyeCloseBtn = document.querySelector('#showBtn');
const visibleItem = document.querySelector('#info-visible-item');
const invisibleItem = document.querySelector('#info-invisible-item');
if (eyeBtn) {
  eyeBtn.addEventListener('click', () => {
    changeItemStatus();
  })

  eyeCloseBtn.addEventListener('click', () => {
    changeItemStatus();
  })
}

const changeItemStatus = () => {
  visibleItem.classList.toggle('d-none');
  invisibleItem.classList.toggle('d-none');
}