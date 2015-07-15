var self = require('sdk/self');

var pageMod = require("sdk/page-mod");
var cm = require("sdk/context-menu");
var context = cm.SelectorContext('.flow-link');

var cmItem = cm.Item({
  label: "Go to Flow",
  image: self.data.url("res/icon-16.png"),
  context: context,
  contentScriptFile: "./js/go-to-flow.js",
  onMessage: function(url) {
 	var tabs = require("sdk/tabs");
	tabs.open(url);
	}
});

// Launches script if on proper site
pageMod.PageMod({
  include: /^http[s]*\:\/\/.*u(grad)?calendar\.uwaterloo.ca\/.*/,
  contentStyleFile: "./css/window-popup.css",
  contentScriptFile: ["./js/jquery-2.1.4.min.js",
  					"./js/app.js"],
  contentScriptOptions: {
    html: self.data.load("html/window-popup.html"),
    css: self.data.url("css/window-popup.css")
  }
});

