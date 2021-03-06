function tbc_log(a) {}
function tbc_error(a) {
    console && console.error && console.error(a)
}
function tb_createClass(a, c) {
    var b = function() {
        this.initialize && this.initialize.apply(this, arguments)
    };
    b.prototype = a;
    if (c)
        for (var d in c.prototype)
            b.prototype[d] || (b.prototype[d] = c.prototype[d]);
    return b
}
function getURL(a) {
    return chrome.extension.getURL(a)
}
function getProductMajorVersion(a) {
    if ("string" === typeof a)
        return parseInt(a.split(".")[0]);
    console.error("getProductMajorVersion failed, version = " + a)
}
function IsProductVersion_9_OrLater(a) {
    return 9 <= getProductMajorVersion(a)
}
function getCurrentPopup(a) {
    var c = "TMToolbar/popup/popup_store.html";
    8 < getProductMajorVersion(a) && (c = "TMToolbar/popup/popup_prod.html");
    return c
}
function getCurrentLocale() {
    (function() {
        "undefined" === typeof getCurrentLocale.locale_map && TMExt_$.ajax({
            url: getURL("SupportLanguageList.json"),
            async: !1,
            dataType: "json",
            success: function(a) {
                tbc_log(a);
                getCurrentLocale.locale_map = a.locales
            }
        })
    }
    )();
    var a = !1, c = "en", b = getCurrentLocale.locale_map, d;
    for (d in b) {
        if (b[d].SRC_LOCALE_NAME.toLowerCase() === navigator.language.toLowerCase()) {
            c = b[d].DST_LOCALE_NAME;
            a = !0;
            break
        }
        if (b[d].SRC_L10N_NAME.toLowerCase() === navigator.language.toLowerCase()) {
            c = b[d].DST_LOCALE_NAME;
            a = !0;
            break
        }
    }
    if (!a)
        for (d in b)
            if (-1 != b[d].SRC_LOCALE_NAME.toLowerCase().indexOf(navigator.language.toLowerCase())) {
                c = b[d].DST_LOCALE_NAME;
                a = !0;
                break
            }
    return c
}
function getLocaleResource(a, c) {
    var b = getCurrentLocale();
    return a + "/" + b + "/" + c
}
function _T(a, c) {
    return void 0 == c ? chrome.i18n.getMessage(a) : chrome.i18n.getMessage(a, c)
}
function tbc_sendRequest(a, c, b) {
    chrome.extension.sendRequest({
        action: a,
        params: c
    }, b)
}
function tbb_addRequestHandler(a, c) {
    tbb_requestHandlers[a] = c
}
function tbb_requestDispatcher(a, c, b) {
    tbc_log("request.action=" + a.action);
    var d = tbb_requestHandlers[a.action], e;
    for (e in tbb_requestHandlers)
        tbc_log("action=" + e);
    d ? d(a.params, c, b) : tbc_error("action is not supported " + a.action)
}
chrome.extension.onRequest.addListener(tbb_requestDispatcher);
function GenerateGuid() {
    var a, c, b;
    a = "";
    for (b = 0; 32 > b; b++) {
        if (8 == b || 12 == b || 16 == b || 20 == b)
            a += "-";
        c = Math.floor(16 * Math.random()).toString(16).toUpperCase();
        a += c
    }
    return a
}
"undefined" == typeof tbb_requestHandlers && (tbb_requestHandlers = {});
