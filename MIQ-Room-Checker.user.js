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

    // use this when simple .click() not working !!!
    function triggerMouseEvent (node, eventType) {
        var clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent (eventType, true, true);
        node.dispatchEvent (clickEvent);
    };

    // Your code here...
    let interval = 60; // in seconds

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
    console.log(`${Date(Date.now())}`);
    console.log(`Looking for vacancy from ${mindate} to ${maxdate} both inclusive`);
    //document.querySelector(".flatpickr-calendar").scrollIntoView();

    setTimeout(function(){
        document.querySelector("#form_rooms_0_accessibilityRequirement_1").click();
        while (document.querySelector(".flatpickr-day:not(.flatpickr-disabled):not(.today)") == null)
        {
            triggerMouseEvent(document.querySelector("span.flatpickr-next-month"),"mousedown");
            console.log(`Next Month`);
        }
        triggerMouseEvent(document.querySelector(".flatpickr-day:not(.flatpickr-disabled):not(.today)"),"mousedown");
    }, 1000);

    setTimeout(function(){
        let dateArr = [];
        let dates = document.querySelector("#accommodation-calendar");
        let dSelected = new Date(document.querySelector(".selected").attributes["aria-label"].value);
        let tzo = dSelected.getTimezoneOffset()*60*1000;
        dSelected = new Date(dSelected.getTime() - tzo);
        dSelected = dSelected.toISOString().substring(0,10);
        console.log(`Nearest non-today available date = ${dSelected}`);
        if(dates != null) dateArr = dates.attributes["data-arrival-dates"].value.split("_")
        if(dateArr.length > 0 && dateArr[0] >= mindate && dateArr[dateArr.length-1] <= maxdate)
        {
            //alert("FAST!!! BOOK NOW!!!")
            console.log(`MATCHED`);
            if(dSelected >= mindate && dSelected <= maxdate) document.querySelector("#form_next").click();
        }
        else {
            console.log(`Not Found, refresh after ${interval} seconds.`);
            setTimeout(function(){ window.location.reload();}, interval * 1000);
        }
    }, 2000);
})();