(function() {
  var COLLECT_URL = "/collect";
  var PROJECT_ID = 1000;
  var GLOBAL_VAR_NAME = "__freshlytics__";

  window[GLOBAL_VAR_NAME] = {};

  window[GLOBAL_VAR_NAME].sendPageView = function() {
    var path = location.pathname;
    var referrer = document.referrer;

    var url =
      COLLECT_URL +
      "?project_id=" +
      PROJECT_ID +
      "&path=" +
      encodeURIComponent(path) +
      "&referrer=" +
      encodeURIComponent(referrer);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
  };

  window[GLOBAL_VAR_NAME].sendPageView();
})();
