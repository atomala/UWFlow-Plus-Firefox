self.on("click", function (node, data) {
	var courseCode = node.textContent.replace(' ','').toLowerCase();
	self.postMessage("https://uwflow.com/course/" + courseCode);
});