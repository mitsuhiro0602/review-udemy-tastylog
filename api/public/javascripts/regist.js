// noinspection JSUnresolvedFunction
const btnSubmit_onclick = function (event) {
	let $submit = $(this);

	let $form = $submit.parents("form");
	$form.attr("method", $submit.data("method"));
	$form.attr("action", $submit.data("action"));
	$form.submit();
	$submit.off().prop("disabled", true)
	$submit.on("submit", false);
};

const document_onready = function (event) {
	$("input[type='submit']").on("click", btnSubmit_onclick);
};

$(document).ready(document_onready);
