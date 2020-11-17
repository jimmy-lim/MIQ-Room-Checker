// ==UserScript==
// @name         MIQ-Room-Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       jimmy
// @match        https://allocation.miq.govt.nz/portal/organisation/189829fd-fc5c-4975-b821-e13622cce612/event/MIQ-DEFAULT-EVENT/accommodation*
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let interval = 30; // in seconds

    let mindate = localStorage.getItem("mindate");
    if(mindate == null || mindate.split("-").length != 3)
    {
        mindate = prompt("Min Date / From Date. Format: YYYY-MM-DD");
        localStorage.setItem("mindate",mindate);
    }
    let maxdate = localStorage.getItem("maxdate");
    if(maxdate == null || maxdate.split("-").length != 3)
    {
        maxdate = prompt("Max Date / To Date. Format: YYYY-MM-DD");
        localStorage.setItem("maxdate",maxdate);
    }
    let dateArr = [];
    let dates = document.querySelector("#accommodation-calendar");
    if(dates != null) dateArr = dates.attributes["data-arrival-dates"].value.split("_")
    console.log(`${Date(Date.now())}`);
    console.log(`Looking for vacancy from ${mindate} to ${maxdate} both inclusive`);
    if(dateArr.length > 0 && dateArr[0] >= mindate && dateArr[dateArr.length-1] <= maxdate) alert("FAST!!! BOOK NOW!!!")
    else {
        console.log(`Not Found, refresh after ${interval} seconds.`);
        setTimeout(function(){ window.location.reload();}, interval * 1000);
    }
})();