const footerHomeLink = document.querySelector('.footer span.mgc_home_7_fill')
const footerHome = footerHomeLink.parentElement;

const footerRecordLink = document.querySelector('.footer span.mgc_list_search_fill')
const footerRecord = footerRecordLink.parentElement;

const footerChartLink = document.querySelector('.footer span.mgc_chart_pie_2_fill')
const footerChart = footerChartLink.parentElement;

const footerSettingLink = document.querySelector('.footer span.mgc_settings_5_fill')
const footerSetting = footerSettingLink.parentElement;

const homeArea = document.querySelector('#homeArea');
const recordArea = document.querySelector('#recordArea')
const chartArea = document.querySelector('#chartArea');


const personIndex = document.querySelector('#personIndex');
const groupIndex = document.querySelector('#groupIndex');
const travel = document.querySelector('#travelTest');
// console.log(travel);

// const goLink = (index, target) => {
//     window.location.href = `./${index}-${target}.html`
// }

const homeSwitch = () => {
    footerHome.classList.add('active');
    footerRecord.classList.remove('active');
    footerChart.classList.remove('active');
    footerSetting.classList.remove('active');
}

const recordSwitch = () => {
    footerRecord.classList.add('active');
    footerHome.classList.remove('active');
    footerChart.classList.remove('active');
    footerSetting.classList.remove('active');
}

const chartSwitch = () => {
    footerChart.classList.add('active');
    footerRecord.classList.remove('active');
    footerHome.classList.remove('active');
    footerSetting.classList.remove('active');
}

const settingSwitch = () => {
    footerSetting.classList.add('active');
    footerChart.classList.remove('active');
    footerRecord.classList.remove('active');
    footerHome.classList.remove('active');
}

const checkState = (page) => {
    if (page === 'index.html') {
        homeSwitch()
    } else if (page === 'record.html') {
        recordSwitch()
    } else if (page === 'chart.html') {
        chartSwitch();
    } else {
        settingSwitch();
    }
}

const currentState = () => {
    if (subjectTitle === "setting.html") {
        lastPage = localStorage.getItem("pageBack")
        localStorage.setItem("currentState", lastPage)
    } else if (subjectTitle === subjectPage) {
        localStorage.setItem("currentState", "person")
    } else if (subjectTitle !== subjectPage) {
        localStorage.setItem("currentState", subjectTitle)
    }
}
const currentPage = window.location.href;
let lastPage = '';
const pageName = currentPage.split('/').pop();
let subjectTitle = pageName.split('-').shift();
let subjectPage = pageName.split('-').pop();
console.log(subjectTitle);
console.log(subjectPage);
currentState();
checkState(subjectPage);
footerHome.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTarget = localStorage.getItem("currentState")
    // console.log(currentTarget);
    if (currentTarget === "person") {
        window.location.href = "index.html";
    } else {
        window.location.href = `${currentTarget}-index.html`;
    }
})

footerRecord.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTarget = localStorage.getItem("currentState")
    // console.log(currentTarget);
    if (currentTarget === "person") {
        window.location.href = "record.html";
    } else {
        window.location.href = `${currentTarget}-record.html`;
    }
})

footerChart.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTarget = localStorage.getItem("currentState")
    // console.log(currentTarget);
    if (currentTarget === "person") {
        window.location.href = "chart.html";
    } else {
        window.location.href = `${currentTarget}-chart.html`;
    }
})

footerSetting.addEventListener('click', (e) => {
    e.preventDefault();
    const pageBack = localStorage.getItem("currentState")
    localStorage.setItem("pageBack", pageBack);
    window.location.href = 'setting.html';
})
