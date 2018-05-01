/**
 * detect any version of IE
 * navigate to not supported page if IE is in use
 */
(function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  //var trident = ua.indexOf('Trident/');
  if (msie > 0) {
    window.location.href = "notsupported.html";
    return;
  }

  console.log('browser compatibility check: OK');
})();