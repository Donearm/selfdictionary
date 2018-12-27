$(document).ready(function() {
	$('#searchbtn').click(function() {
		showTranslation();
	});
});

function showTranslation() {
	let translation = "";

	$.ajax({
		url: '/lookup',
		type: 'post',
		dataType: 'json',
		success: function(data) {
			translation = data;
			console.log(translation);
			$('#content').text(translation);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}
