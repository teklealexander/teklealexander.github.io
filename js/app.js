
// ...Select...
var tagText;
var tagType;
var tagTitle;
var indexMap;

function initFilters(){
	indexMap = [];
	// ^ will init in loadFilters()
	tagType  = $('#Type');
	tagTitle = $('#Title');
	tagText  = $('#Text');
	tagType.empty().append( "<option>Select All Types</option>");
	tagTitle.empty().append("<option>Select All Title</option>");
	$('.Category').removeClass('active');
	$('.Found').empty();
	tagText.hide();
}
function initSearch() {
	indexMap = [];
	var arrType = [];
	CATALOG_JSON.forEach(function(obj) {
		if (arrType.indexOf(obj['Type']) < 0) {
			arrType.push(obj['Type']);
			indexMap[obj['Type']] = 0;
		}
	});
	tagType  = $('#Type');
	tagTitle = $('#Title');
	tagText  = $('#Text');
	tagType.empty().append( "<option>Select All Types</option>");
	tagTitle.empty().append("<option>Select All Titles</option>");
	$('.Category').removeClass('active');
	$('.Found').empty();
	tagType.hide();
	tagTitle.hide();
}
function loadFilters() {
	var arrType  = [];
	var arrTitle = [];
	CATALOG_JSON.forEach(function(obj) {
		if (arrType.indexOf(obj['Type']) < 0) {
			arrType.push(obj['Type']);
			tagType.append('<option>'+obj['Type']+'</option>');
			indexMap[obj['Type']] = 0;
		}
		if (arrTitle.indexOf(obj['Title']) < 0) {
			arrTitle.push(obj['Title']);
			tagTitle.append('<option>'+obj['Title']+'</option>');
		}
	});
	strType   = getParameterByName('Type');
	strTitle  = getParameterByName('Title');
	if (strType > 0 || strTitle > 0) {
		tagType.prop('selectedIndex', strType);
		tagTitle.prop('selectedIndex', strTitle);
		applyFilters();
	}
}
function applyFilters(showAll) {
	for (var k in indexMap) {
		indexMap[k] = 0;
	}
	// ...Searching...
	$('.Found').empty();
	var count = 0;
	var type = tagType.val();
//	var t1;
	CATALOG_JSON.forEach(function(obj) {
		var match = 0;
		if (obj['Type']==tagType.val() || obj['Title']==tagTitle.val() || obj['Title'].indexOf(tagText.val())>-1 || showAll) {
			type = obj['Type'];
//			if (!t1) t1 = type;
			var htm = '<tr onclick="openDetails(\''+type+'\', \''+indexMap[type]+'\')">'+ 
			'<td>'+obj['Title']+'</td>'+
			'<td>'+obj['Duration']+'</td>'+
			'</tr>';
			$('tbody#'+type).append(htm);
			$('tbody#All').append(htm);
			count++;
		}
		indexMap[type] = parseInt(indexMap[type])+1;
	});
	$('.Category').removeClass('active');
	$('.tab-pane').removeClass('active').removeClass('in');
	// $('.nav-tabs a[href="#'+tagType.val()+'"]').tab('show');
//	if (showAll) {
//		$('#btn'+t1).addClass('active');
//		$('#tab'+t1).addClass('in').addClass('active');
		$('#btnAll').addClass('active');
		$('#tabAll').addClass('in').addClass('active');
//	} else {
//		$('#btn'+type).addClass('active');
//		$('#tab'+type).addClass('in').addClass('active');
//	}
	$('.tab-content span').html(count==0 ? 'No matching record found!' : '');
	console.log(count);
}
function doSearch(event) {
	event.preventDefault();
	event.stopPropagation();
	applyFilters();
}
function showAll(event) {
	event.preventDefault();
	event.stopPropagation();
	tagType.val('Select All Types');
	tagTitle.val('Select All Titles');
	tagText.val('');
	applyFilters(true);
}
function openDetails(type, index) {
	window.location.href = 'Catalog/'+type+'/index.html?index='+index;
}

// ...Utils...
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// ...Init...

$(document).ready(function(){
//	initFilters();
//	loadFilters();
	initSearch();
	applyFilters(true);
	$('.Category').removeClass('active');
	$('.tab-pane').removeClass('active').removeClass('in');
	$('#btn'+pageTab).addClass('active');
	$('#tab'+pageTab).addClass('in').addClass('active');
});