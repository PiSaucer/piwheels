// Utilities to be called via javascript: URLs in Flash

// Tracking pixel when registration is completed
function completedRegistration(transactionID)
{
	var iframeElement = document.createElement("iframe");
	iframeElement.src = "https://a2g-secure.com/p.ashx?a=16442&e=991&t=poptropica&sid=" + transactionID + "&popcb=" + Math.random();
	iframeElement.width = "1";
	iframeElement.height = "1";
	iframeElement.frameborder = "0";
	document.body.appendChild(iframeElement);
	//loadTrackingPixel("http://a2g-secure.com/p.ashx?a=16442&e=991&t=poptropica&sid=" + transactionID);
	loadTrackingPixel("https://server.cpmstar.com/action.aspx?advertiserid=6625&gif=1");
}

// Client 1x1 pixel tracking for games and specialized ads that can't do their own tracking
// Can't call getURL on these directly from Flash due to security.
// Argument is full URL of a 1x1 image.  The image is never displayed, just loaded.
function loadTrackingPixel(URLtoTrigger)
{
	if (!window.dcpix) window.dcpix = new Array();
	var i = window.dcpix.length;
	window.dcpix[i] = new Image();
	window.dcpix[i].src = URLtoTrigger + "&popcb=" + Math.random();
}

// Sometimes we want to invoke more than one tracking pixel from the same page.
// IE 6 only performs the last getURL on a page.  Provide a way to track multiple
// pixels from a single javascript: URL.
function loadTrackingPixels()
{
	for (var i = 0; i < arguments.length; i++) {
		var URLtoTrigger = arguments[i];
		// if moat ad
		if (URLtoTrigger.indexOf("moatad") != -1)
		{
			var moatScript = document.createElement("script");
			moatScript.type = "text/javascript";
			moatScript.src = URLtoTrigger
			document.body.appendChild(moatScript);
		}
		// if no script for moat
		else if (URLtoTrigger.indexOf("pop://no.script?") == 0)
		{
			var moatNoScript = document.createElement("noscript");
			moatNoScript.className = URLtoTrigger.substring(16);
			document.body.appendChild(moatNoScript);
		}
		else
		{
			if (!window.dcpix) window.dcpix = new Array();
			var j = window.dcpix.length;
			window.dcpix[j] = new Image();
			window.dcpix[j].src = URLtoTrigger + "&popcb=" + Math.random();
		}
	}
}

function isChromeBrowser() {
	return Boolean(window.chrome);
}

function AS3EmbassyIsLoaded() {
	var isEmbassy = false;
	for (var i=0; i<window.document.embeds.length; i++) {
		if ('/framework' == window.document.embeds[i].name) {
			var attrs = window.document.embeds[i].attributes;
			if (attrs) {
				if (attrs.flashvars) {
					var fvarsString = attrs.flashvars.value;
					if (fvarsString.indexOf("GlobalAS3Embassy")) {
						isEmbassy = true;
					}
				}
			}
			break;
		}
	}
	return isEmbassy;
}

// After years of using getURL() with a POST method
// and nearly as many using navigateToURL() with a POST method,
// Microsoft has sabotaged this technique by enforcing an
// anti-Flash security policy which discards all POST vars
// and rewrites the request as a GET.
// We work around this problem by delegating the request
// to this JavaScript function (which isn't subject to the policy).
function POSTToBase(room, island, startup_path) {
	//dbug("POSTToBase " + room + ' ' + island + ' ' + startup_path);
	var roomInput =		document.getElementById('navRoom');
	var islandInput =	document.getElementById('navIsland');
	var pathInput =		document.getElementById('navPath');

	roomInput.value =	room;
	islandInput.value =	island;
	pathInput.value =	startup_path;

	roomInput.form.submit();
}

function dbug(s) {
	if (window.console.log) console.log(s);
}
