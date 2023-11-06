$("#timepicker").timepicker({
  showSeconds: !0,
  icons: { up: "mdi mdi-chevron-up", down: "mdi mdi-chevron-down" },
  appendWidgetTo: "#timepicker-input-group1",
}),
  $("#timepicker2").timepicker({
    showSeconds: !0,
    showMeridian: !1,
    icons: { up: "mdi mdi-chevron-up", down: "mdi mdi-chevron-down" },
    appendWidgetTo: "#timepicker-input-group2",
  }),
  $("#timepicker3").timepicker({
    showSeconds: !0,
    minuteStep: 15,
    icons: { up: "mdi mdi-chevron-up", down: "mdi mdi-chevron-down" },
    appendWidgetTo: "#timepicker-input-group3",
  }),
  $("#basic-datepicker").flatpickr(),
  $("#datetime-datepicker").flatpickr({
    enableTime: !0,
    dateFormat: "Y-m-d H:i",
  }),
  $("#humanfd-datepicker").flatpickr({
    altInput: !0,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  }),
  $("#minmax-datepicker").flatpickr({ minDate: "2020-01", maxDate: "2020-03" }),
  $("#disable-datepicker").flatpickr({
    onReady: function () {
      this.jumpToDate("2025-01");
    },
    disable: ["2025-01-10", "2025-01-21", "2025-01-30", new Date(2025, 4, 9)],
    dateFormat: "Y-m-d",
  }),
  $("#multiple-datepicker").flatpickr({
    mode: "multiple",
    dateFormat: "Y-m-d",
  }),
  $("#conjunction-datepicker").flatpickr({
    mode: "multiple",
    dateFormat: "Y-m-d",
    conjunction: " :: ",
  }),
  $("#range-datepicker").flatpickr({ mode: "range" }),
  $("#inline-datepicker").flatpickr({ inline: !0 }),
  $("#basic-timepicker").flatpickr({
    enableTime: !0,
    noCalendar: !0,
    dateFormat: "H:i",
  }),
  $("#24hours-timepicker").flatpickr({
    enableTime: !0,
    noCalendar: !0,
    dateFormat: "H:i",
    time_24hr: !0,
  }),
  $("#minmax-timepicker").flatpickr({
    enableTime: !0,
    noCalendar: !0,
    dateFormat: "H:i",
    minDate: "16:00",
    maxDate: "22:30",
  }),
  $("#preloading-timepicker").flatpickr({
    enableTime: !0,
    noCalendar: !0,
    dateFormat: "H:i",
    defaultDate: "01:45",
  });
