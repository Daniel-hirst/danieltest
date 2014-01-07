$( document ).on( "pageinit", "#prodSearch", function( event ) {
    $( "#prodinp" ).keyup(function( event ) {
     if($( "#prodinp" ).val().length>=3)
         {

             doSearch();
         }
    });
});

function doSearch()
  {

      var searchTxt = $('#prodinp').val();



      $.ajax({
        url:'http://' + localStorage.url + '/hr/prodSearch1_ajax.php',
        cache: false,
        data: {'request' : 'searchProds',
               'searchTxt':searchTxt},
                dataType: 'json',
                success: function (data)
                {
                    if (data.errmsg.length==0)
                    {
                      //  alert (data.msg);
                       // $.mobile.changePage( "page2.html", { transition: "slideup", changeHash: false });
                                        var outputStr = '';
                 var dataArray = data.resultData;
                 outputStr = "<center><ul id=resultUl>";
                 for (var i=0; i <dataArray.length; i++)

                     {
                         outputStr = outputStr+"<li>"+dataArray[i].prodDesc + "&nbsp;" + dataArray[i].prodCode+"</li>";
                     }

                     outputStr = outputStr + "</ul></center>";
                     $('#searchDiv').html(outputStr);
                    }
                    else
                        {
                            alert (data.errmsg);

                        }
                },
                error: function (jqo, txt, err)
                {
                    alert(txt);

                }
        });

  }