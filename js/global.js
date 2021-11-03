

$(".burgermenu").on("click", function () {
    $(".app_drawer").addClass("active");
});
$(".close_drawer").on("click", function () {
    $(".app_drawer").removeClass("active");
});

$("form").on("change", ".file-upload-field", function () {
    $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ''));
});

$('.countryphoneselecter').selectpicker({
    showIcon: true
});