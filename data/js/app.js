// Insert loading symbol while processing data
$('body').append('<div class=\"loading\"></div>');

var courseObjs = []; // Keeps track of courses to avoid repeated ajax calls
var courseObj = {}; // Current AJAX request

$('body').html($('body').html().replace(/\b[A-Z]{2,}\s*[0-9]{1,3}\b(?!.[0-9])(?=[^>]*(<|$))/g, "<span class=\"flow-link\">$&</span>"));

$('body > .loading').remove();

$('body').append('<div id=\"frame\"></div>');

$('#frame').html(self.options.html).css('display','none');

$('body').append('<link id="css" rel="stylesheet" href="' + self.options.css + '"></link>');

$('body .flow-link').hover( mouseOver, mouseOut );

function mouseOver(){
	$('#frame').css('display','block');
	$('#frame').removeClass('info');
	$('#frame').addClass('loading');

	$(this).mousemove(function(event) { // Allows hover frame to follow cursor 
		$('#frame').css('left',event.pageX+'px');
		$('#frame').css('top',event.pageY+'px');
	});

	var courseCode = $(this).text().replace(' ','').toLowerCase();

	if ($.grep(courseObjs,function(e) {return e.id == courseCode}).length == 0) { // Searches if information on the course has been fetched and stored already
		courseObj = $.ajax({jsonp: false, dataType: 'json', url: getAPIURL(courseCode)})
		courseObj.done(function(flowInfo) {
			courseObjs.push(flowInfo);
			loadContent(courseCode);
		});
	} else {
		loadContent(courseCode);
	}
}

function mouseOut(){
	$('#frame').css('display','none');
	if ($.active > 0)
			courseObj.abort(); // Terminates any ongoing AJAX request 
}

function getAPIURL(courseCode) { // Returns URL to the course info through the UWFlow API
	return 'https://uwflow.com/api/v1/courses/' + courseCode; 
}

function loadContent(courseCode){ // Loads information into hovering frame
	reloadStylesheets();
	var data = $.grep(courseObjs,function(e) {return e.id == courseCode})[0];
	$('#frame').removeClass('loading');
	$('#frame').addClass('info');
	$('#code').html(data.code);
	$('#course-name').html(data.name);
	$('#description').html(data.description);
	$('#useful-bar').css('width',(data.ratings[0].rating*100)+'%');
	$('#useful').html(Math.round(data.ratings[0].rating*100)+'%');
	$('#easy-bar').css('width',(data.ratings[1].rating*100)+'%');
	$('#easy').html(Math.round(data.ratings[1].rating*100)+'%');
	$('#overall').html(Math.round(data.overall.rating*100)+'%');
}

function reloadStylesheets() {
	$('#css').replaceWith('<link id="css" rel="stylesheet" href="' + self.options.css + '"></link>');
}
