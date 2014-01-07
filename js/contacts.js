$( document ).on( "pageshow", "#contactPage", function( event ) {
    onContactsLoad();
});
$( document ).on( "pageshow","#contactView", function( event ) {
// alert( "Page was loaded" );
    onViewLoad();
});
$( document ).on( "pageshow","#contactForm", function( event ) {
// alert( "Page was loaded" );
    onFormLoad();
});


function onContactsLoad()
{
  var fields = ["id","displayName", "name"];
  var options = new ContactFindOptions();
  options.multiple = true;
  navigator.contacts.find(fields, showContacts, onError,options);
}
function onViewLoad()
{
  alert('onviewload');
  alert('id = ' + getParameterByName("id"));
  getContactById(getParameterByName("id"), showContact);
}
function onFormLoad()
{
  alert('onFormLoad');
  var id = getParameterByName("id");
  if(id.length > 0)
   {
     getContactById(id, populateForm);
   }



}
function getContactById(id, callback)
{
   var fields = ["id","displayName", "name", "emails", "phoneNumber"];
   var options = new ContactFindOptions();
   alert ("getContactById="+id);
   options.filter = id;
   options.multiple = true;
   navigator.contacts.find(fields, callback, onError, options);
}
function showContact(contacts)
{
  //This shows single contact details
  if(contacts.length > 0)
  {
        var contact = contacts[0];

        //This adds this contacts id to the save link
        $("a[href='contactForm.html']").attr("href", function(i, href)
        {
          return href + "?id=" + contact.id;
        });
alert (contact.displayName);
        //Now append data to the contact div
        if (contact.displayName ==null)
         {
          $("#contact").append("<h2>" + contact.name.familyName +  "</h2");
        alert ("Doing family name = " + contact.name.familyName);

         }
         else
           {
             $("#contact").append("<h2>" + contact.displayName +  "</h2");
             alert ("Doing display name");
           }
        if(contact.emails.length > 0)
        {
          $("#contact").append("<h3> Emails </h3>");
          $("#contact").append("<ul>");
        }
        for (var i = 0; i < contact.emails.length; i++)
        {
            $("#contact").append("<li>" + "<a href='mailto:" + contact.emails[i].value +"'>" + contact.emails[i].value + "</a></li>");
        }
        if (contact.emails.length > 0)
        {
              $("#contact").append("</ul>");
        }
        if(contact.phoneNumber.length > 0)
        {
          alert("getting phone number");
           $("#contact").append("<h3>Phone Numbers</h3>");
            $("#contact").append("<ul>");

        }
        for (var i = 0; i < contact.phoneNumber.length; i++)
        {

            $("#contact").append("<li><a href='tel:" + contact.phoneNumber[i].value +"'>" + contact.phoneNumber[i].value + "</a></li>");

        }
        if (contact.phoneNumber.length > 0)
        {
            $("#contact").append("</ul>");
        }
        if(contact.url.length > 0)
        {
          alert ("url")
            $("#contact").append("<h3>Webpage</h3>");
            $("#contact").append("<ul>");
            for (var i = 0; i < contact.url.length; i++)
            {
                $("#contact").append("<li>" + contact.url[i].value + "</li>");
            }
            $("#contact").append("</ul>");
        }

        else
        {
         alert("Unable to find contact");
        }
    }
}

function getParameterByName(name)
{
  //attempts to get a passed variable from another page
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(location.href);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function showContacts(contacts)
{
  //This shows list of all contacts in the div contactList
  alert ("Getting Contacts: num contacts = " + contacts.length);


  //Sort contacts alphabetically on displayName
  var cSort = function (a, b)
  {
    //alert("family name" + a.name.familyName);
    //alert("display name" + a.displayName);
    if (a.displayName === null)
      {
        var aName = a.name.familyName;
        var bName = b.name.familyName;
      }
      else
      {
         var aName = a.displayName;
         var bName = b.displayName;
      }
    return aName < bName ? -1 : (aName == bName ? 0 : 1);
  };
  contacts = contacts.sort(cSort);    //array of sorted contacts

alert('done sort');
  $("#contactList").html("");     //clear current list
  var dividers = "";

  //Loop through contacts in array


  for (var i=0; i < contacts.length; i++)
    {
      if (contacts[i].displayName === null)
        {
      var firstLetter = contacts[i].name.familyName.charAt(0).toUpperCase();
        }
        else
          {
            var firstLetter = contacts[i].displayName.charAt(0).toUpperCase();
          }
      //check if we need to add a divider on change in first letter
      if(dividers.indexOf(firstLetter) < 0)
      {
          dividers+= firstLetter;
          $("#contactList").append("<li data-role=\"list-divider\">" + firstLetter + "</li>");
      }
      if (contacts[i].displayName === null)
        {
          $("#contactList").append("<li><a href='contactView.html?id=" + contacts[i].id + "'>" + contacts[i].name.familyName + "</a></li>");

        }
      else
        {

          $("#contactList").append("<li><a href='contactView.html?id=" + contacts[i].id + "'>" + contacts[i].displayName + "</a></li>");
        }
    }
    $("#contactList").listview('refresh');
}


function populateForm(contacts, id)
{
  if(contacts.length > 0)
    {
      var contact = contacts[0];

      $('#contactId').value(contact.id);
      if (contact.displayName != null)
      $('#nameDisplay').value(contact.displayName);
      $('#firstName').value(contact.name.firstName);
      $('#lastName').value(contact.name.lastName);

    if(contact.emails.length > 0)
        {
          $('#emailHome').value(contact.emails[0]);
          if(contact.emails.length > 1)
            {
              $('#emailWork').value(contact.emails[1]);
             if(contact.emails.length > 2)
                {
                  $('#emailother').value(contact.emails[2]);
                }
            }
       }
       if(contact.phoneNumbers.length > 0)
        {
          $('#phoneHome').value(contact.emails[0]);

          if(contact.phoneNumbers.length > 1)
            {
              $('#phoneWork').value(contact.emails[1]);

              if(contact.phoneNumbers.length > 2)
                {
                  $('#phoneOther').value(contact.emails[2]);
                }
            }
       }
   }
}


function saveContact(contacts)
{
  var form = document.getElementsByTagName('formContact')[0].elements;
  var contact;

  if (form.id.value != 0 && typeof contacts == "undefined")
    {
      getContactByID(form.id.value, saveContact);
    }
    else if (typeof contacts != "undefined")
    {
      contact = contacts[0];
    }
    else
    {
      contact = navigator.contacts.create();
    }

    contact.displayName = form.displayName.value;
    contact.nickname = form.displayName.value;

    var name = new ContactName();
    name.givenName = form.firstName.value;
    name.familyName = form.lastName.value;
    contact.name = name;

    var emails = new Array();
    if(form.email_home.value.length > 0)
      {
        emails[emails.length] = new ContactField('home', form.email_home.value);
      }
      if(form.email_work.value.length > 0)
      {
        emails[emails.length] = new ContactField('work', form.email_work.value);
      }
      if(form.email_other.value.length > 0)
      {
        emails[emails.length] = new ContactField('other', form.email_other.value);
      }
      contact.emails = emails;

      var phoneNumbers = new Array();

      if(form.phone_home.value.length > 0)
      {
        phoneNumbers[phoneNumbers.length] = new ContactField('home', form.phone_home.value);
      }
      if(form.phone_work.value.length > 0)
      {
        phoneNumbers[phoneNumbers.length] = new ContactField('work', form.phone_work.value);
      }
      if(form.email_other.value.length > 0)
      {
        phoneNumbers[phoneNumbers.length] = new ContactField('other', form.phone_other.value);
      }
      contact.phoneNumbers = phoneNumbers;
      contact.save(onSuccess,onError);
}
function onSuccess(contact)
{
  alert("Save Successfull");
  $.mobile.changePage("contacts.html");
}

function onError(contactError)
{
  alert ("Contact Error = " + contactError.code);
  return false;
}
