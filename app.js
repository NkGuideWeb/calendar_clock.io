"use strict";
(function () {
    let weekdays;
    let months;
    let date;
    let year;
    let month;
    let day;
    let deg_per_sec = 6;
    let deg_per_hour = 30;
    // DOM Selection
    const year_element = document.querySelector('.year');
    const date_element = document.querySelector('.date');
    const weeks_element = document.querySelector('.weekdays');
    const dates_element = document.querySelector('.dates');
    const left_slide = document.querySelector('.left-slide');
    const right_slide = document.querySelector('.right-slide');
    const month_element = document.querySelector('.month');
    // DOM Selection Clock Arrow
    const minute_element = document.querySelector('.minute');
    const second_element = document.querySelector('.second');
    const hour_element = document.querySelector('.hour');
    // Innitialize tuples by string value i.e weekdays and months 
    weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // This function will return total days of specific months
    function getMonthDays(year = new Date().getFullYear(), month) {
        let day = 0;
        switch (month) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                day = 31;
                break;
            case 3:
            case 5:
            case 8:
            case 10:
                day = 30;
                break;
            case 1:
                if (((year % 4 == 0) && !(year % 100 == 0)) || (year % 400 == 0)) {
                    day = 29;
                }
                else {
                    day = 28;
                }
                break;
        }
        return day;
    }
    // This function will return weekday of specific date
    function getWeekDayOfSpecificDate(year = new Date().getFullYear(), month, date) {
        const d = new Date();
        d.setFullYear(year, month, date);
        return d.getDay();
    }
    //This function will return  last date and week day of last date of previous month [date,weekday]
    function getPreviousMonthLastDateAndWeekDay(year = new Date().getFullYear(), month) {
        let date_weekday = [0, 0];
        let mon = month - 1;
        let date = getMonthDays(year, mon);
        let weekday = getWeekDayOfSpecificDate(year, mon, date);
        date_weekday = [date, weekday];
        return date_weekday;
    }
    // This function will return current date [date,year,weekday,month]
    function getCurrentDate() {
        let d = new Date();
        let date = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let weekday = d.getDay();
        return [date, year, month, weekday];
    }
    // print week days 
    function printWeekDays(active_day) {
        weekdays.forEach((week, index) => {
            if (active_day !== index)
                weeks_element.innerHTML += `<span class="weekday ">${week.substring(0, 3)}</span>`;
            else
                weeks_element.innerHTML += `<span class="weekday active--week">${week.substring(0, 3)}</span>`;
        });
    }
    // function print dates
    function printDates(year = new Date().getFullYear(), active_date, month) {
        let total_day_of_months = getMonthDays(year, month);
        let perv_date_weekday = getPreviousMonthLastDateAndWeekDay(undefined, month);
        let start_date = perv_date_weekday[1] == 6 ? 0 : perv_date_weekday[1] + 1;
        // empty first
        dates_element.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            if (i == start_date) {
                for (let j = 0; j < total_day_of_months; j++) {
                    if (j + 1 != active_date) {
                        dates_element.innerHTML += `<span class="month-date" >${j + 1}</span>`;
                    }
                    else {
                        if (day == 0 || day == 6)
                            dates_element.innerHTML += `<span class="month-date month-active-date weekend" >${j + 1}</span>`;
                        else
                            dates_element.innerHTML += `<span class="month-date month-active-date" >${j + 1}</span>`;
                    }
                }
                break;
            }
            else {
                dates_element.innerHTML += `<span class="month-date fade-date"></span>`;
            }
        }
    }
    //  default date setting
    date = getCurrentDate()[0];
    year = getCurrentDate()[1];
    month = getCurrentDate()[2];
    day = getCurrentDate()[3];
    year_element.innerText = year.toString();
    date_element.innerText = `${date} ${months[month]} ${weekdays[day]}`;
    month_element.innerText = `${months[month]}`;
    printWeekDays(day);
    printDates(undefined, date, month);
    // Change Frame Slide Events
    right_slide.addEventListener('click', function () {
        if (month < 11) {
            month = month + 1;
        }
        else {
            month = 0;
        }
        day = getWeekDayOfSpecificDate(undefined, month, date);
        date = getCurrentDate()[0];
        month_element.innerText = `${months[month]}`;
        year_element.innerText = year.toString();
        date_element.innerText = `${date} ${months[month]} ${weekdays[day]}`;
        printDates(undefined, date, month);
    });
    left_slide.addEventListener('click', function () {
        if (month > 0) {
            month = month - 1;
        }
        else {
            month = 11;
        }
        day = getWeekDayOfSpecificDate(undefined, month, date);
        date = getCurrentDate()[0];
        month_element.innerText = `${months[month]}`;
        year_element.innerText = year.toString();
        date_element.innerText = `${date} ${months[month]} ${weekdays[day]}`;
        printDates(undefined, date, month);
    });
    //  Execute Clock
    setInterval(function () {
        let d = new Date();
        let sec = d.getSeconds() * deg_per_sec;
        let minute = d.getMinutes() * deg_per_sec;
        let hours = d.getHours() * deg_per_hour;
        second_element.style.transform = `rotate(${sec}deg)`;
        minute_element.style.transform = `rotate(${minute}deg)`;
        hour_element.style.transform = `rotate(${hours}deg)`;
    }, 1000);
})();
