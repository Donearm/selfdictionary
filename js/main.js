$(document).ready(function() {
	let lang = "";

	// Find out which language button is pressed
	$(document).on("click", '.langbtn', function(event) {
		let lang = $(this).attr('id');
		console.log(lang);
	});
	$('#searchbtn').click(function(lang) {
		showTranslation();
	});
});

function showTranslation(language) {
	// Get the term in the text form
	let term = $("#term").serializeArray();

	$.ajax({
		url: '/lookup',
		type: 'post',
		dataType: 'json',
		data: term,
		success: function(data) {
			console.log(data);
			$('#content').text(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}
