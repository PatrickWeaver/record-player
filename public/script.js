console.log("TEST");

function submitCoverForm() {
  document.getElementById('cover-form').submit();
  document.getElementById('spinner').style.display = "block";
}


var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var $form = $('.box');

if (isAdvancedUpload) {
  $form.addClass('has-advanced-upload');
}

if (isAdvancedUpload) {

  var droppedFiles = false;

  $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
  })
  .on('dragover dragenter', function() {
    $form.addClass('is-dragover');
  })
  .on('dragleave dragend drop', function() {
    $form.removeClass('is-dragover');
  })
  .on('drop', function(e) {
    console.log("DROP!");
    droppedFiles = e.originalEvent.dataTransfer.files;
    console.log(droppedFiles[0]);
    var formData = new FormData();
    formData.append('file', droppedFiles[0]);
    formData.append('async', true);
    
    jQuery.ajax({
      url: 'player',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
          console.log(data);
      }
    });
  });

}