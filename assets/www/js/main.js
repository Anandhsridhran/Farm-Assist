function onLoad() {
	 document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  navigator.splashscreen.hide();
  //    $('.locations ul li').remove();
	 // $.getJSON('http://192.168.2.6:3001/locations.json', function(data) {    

  //            $.each(data, function(index, location) {                   
  //               $('.locations ul').append('<li>' +
  //               '<h4>' + location.name + '</h4>' +
  //               '<p>' + location.country + '</p>' +
  //               '</li>');
  //           });      
  //       $('.locations ul').listview('refresh');
  //   });
}	


// jQuery(window).load(function() {
//     jQuery('#loading-image').hide();
// });

function refreshLocation() {
    onDeviceReady();
}



function capturePhoto(){
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
}

 function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    var params = new Object();
    params.user_key = window.localStorage.getItem('login_token');
    options.params = params;
    // cameraPic.src =  imageURI; 
    // $('ul#image-list').append('Sucesss')
     collect_images(imageURI, options)
  }
  function collect_images(image, options) {
    $('ul#image-list').append('<li><br><img width=100px src='+image+'></img><input data-image='+image+' data-option='+options+' type=checkbox class=upload /></li>');
  }

function uploadAll() {
      $('.upload:checked').each(function() {
          jQuery('#loading-image').show();

          imageURI = $(this).data('image');
          options =  $(this).data('options');
            $(this).attr('checked', false);
            var ft = new FileTransfer();            
            ft.upload(imageURI, "http://farms.herokuapp.com/api/orders/upload_picture", win, fail, options);
      });
}

 function win(r) {
      jQuery('#loading-image').hide();
      alert('Image Uploaded SuccessFully');
      console.log("Image uploaded = " + r.responseCode);
  }

  function fail(error) {
      //alert("An error has occurred. Please try again: Code = " = error.code);
      alert();
  }