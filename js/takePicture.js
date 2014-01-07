$( document ).on( "pageinit", "#picPage", function( event ) {
// alert( "Page was loaded" );
});


document.addEventListener("deviceready",onDeviceReady,false);

function capturePhoto(){
  navigator.camera.getPicture(uploadPhoto,null,{
    quality:60,
    destinationType: Camera.DestinationType.FILE_URI,
    //destinationType: Camera.DestinationType.DATA_URL,
    sourceType:1,
    correctOrientation: true,
    encodingType: Camera.EncodingType.JPEG,
    saveToPhotoAlbum: true,
    popoverOptions: CameraPopoverOptions
  });
}

function uploadPhoto(data){
  // this is where you would send the image file to server
  var fail, ft, options, params, win;

  //    var cameraPic = document.getElementById('cameraPic');
  //    cameraPic.style.display = 'block';

  //cameraPic.src = "data:image/jpeg;base64," + data;
  $('#cameraPic').attr("src",data);

  options = new FileUploadOptions();

  options.fileKey="file";
  options.fileName=data.substr(data.lastIndexOf('/')+1);
  options.mimeType="image/jpeg";

  params = new Object();
  params.value1 = "test";
  params.value2 = "param";
  options.params = params;
  options.chunkedMode = false;


  ft = new FileTransfer();
  var appUrl = "";
  //var appUrl = ordNo + "&docType=SORDER&docLink=SORDER";
  appUrl = 'http://' + localStorage.url + '/mobile/uploadAppImage.php';

  ft.upload(data, appUrl, win, function fail(error) {
    alert("An error has occurred uploading this image: Error Code = [" + error.message + "]\n Please check you have a network connection");
  }, options);
}

function uploadComments() {
  //localStorage.comments = $('#photoComments').val();
  //alert('Order Number = ' + localStorage.ordNo);
  //alert('product Code = ' + localStorage.prodCode);
  //alert('Comments = ' + localStorage.comments);
}


