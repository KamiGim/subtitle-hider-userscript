// ==UserScript==
// @name         Subtitle hider
// @description  subtitle hider that can be used everywhere by simple press Ctrl+F1
// @author KamiGim
// @homepage    https://github.com/KamiGim/Subtitle-Hider
// @license MIT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @match        *://*/*
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js
// @require https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @resource   jqueryUiCss https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css
// @noframes
// ==/UserScript==

var $ = window.jQuery;

(function () {
    "use strict";
    const jqueryUiCss = GM_getResourceText("jqueryUiCss");
    GM_addStyle(jqueryUiCss);
    GM_addStyle(`
	#subtitle-hider {
		z-index: 999999;  bottom: 30px;  right: 15vw;  height: 100px;  width: 70vw;
		position: fixed !important; backdrop-filter: blur(7px);
		border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 5px;
		display: inline-block; opacity: 1; visibility: visible !important;
        transition: opacity 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	}
    #subtitle-hider > * {
		display: block !important; opacity: 1; visibility: visible !important; opacity: 1;
	}
	.hidden {
		opacity: 0 !important;
        display: none !important;
	}
`);
    // append subtitle hider div
    const show = GM_getValue("show", false);
    var $html = $("<div id='subtitle-hider' />");
    $html.draggable();
    $html.resizable({
        handles: 'all'
    });
    $html.attr('mvclass', 'core')
    toggleShow(show);
    $("body").append($html);

    // observe body change
    const observer = new MutationObserver(function() {
        $html.attr('mvclass', 'core')
    });
    observer.observe(document.body, {attributeFilter: [ "mvclass" ], attributes: true, subtree: false, childList: false});

    // register keydown
    document.addEventListener(
        "keydown",
        handleKeydown,
        false
    );

    function handleKeydown(e) {
        // pressed Ctrl+F1
        if (
            e.key == "F1" &&
            !e.shiftKey &&
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey
        ) {
            const show = GM_getValue("show", false);
            const newShow = !show;
            toggleShow(newShow);
            GM_setValue("show", !show);
        }
    }


    function toggleShow(shouldShow) {
        if (shouldShow) {
            $html.removeClass("hidden");
        } else {
            $html.addClass("hidden");
        }
    }
})();
