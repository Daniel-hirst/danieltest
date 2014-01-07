$( document ).on( "pageshow", "#indexPage", function( event ) {
  //alert( "Page was loaded" + localStorage.url );
   $('#urlval').val(localStorage.url);  //localStorage.url;
   $('#enterId').val(sessionStorage.enterId);
   //alert ('#url');
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use the PhoneGap API - only fires on first load of app not on each page
    //alert('phonegap is ready to use');
}



//$( document ).on( "pagechange", "#indexPage", function( event ) {
//     alert( "Page show" + localStorage.url );
//     $('#urlval').val = localStorage.url;
//});

function doLogin()
  {

      var enterId = $('#enterId').val();
      var enterPass = $('#enterPass').val();



      $.ajax({
        url:'http://' + localStorage.url + '/hr/login_ajax.php',
        cache: false,
        data: {'request' : 'chkUser',
               'userId':enterId, 'password': enterPass},
                dataType: 'json',
                success: function (data)
                {
            //      alert ("test 1");
                    if (data.errmsg.length==0)
                    {
 //alert ("test 2");
                        sessionStorage.enterId = enterId;

                        $.mobile.changePage( "page2.html", { transition: "slideup", changeHash: false });
                    }
                    else
                        {

                            alert (data.errmsg);
                            document.location.href="index.html";
                        }
                },
                error: function (jqo, txt, err)
                {
                    alert(txt);
                    document.location.href="index.html";

                }

        });
 $.mobile.changePage( "page2.html", { transition: "slideup", changeHash: false });
  }



 function doSave()
 {
    if(typeof(Storage) == 'undefined')
      {
        //No Storage Available
        alert ("Your device doesn't support storage");
        return;
      }
      else
      {
      var url = $('#urlval').val();
      localStorage.url = url;

      }
 }
