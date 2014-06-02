//index.html
$(document).ready(function(){
  delayShow();
  var toppos=($(window).height()/3.5) - ($("#alertdiv").height()/3.5);
  var leftpos=($(window).width()/2) - ($("#alertdiv").width()/2);
  $("#alertdiv").css("top", toppos).css("left",leftpos);    
  var token = window.localStorage.getItem('login_token');       
});
//home.html
function delayShow() {
  var secs = 20;
  setTimeout('jQuery("body").css("visibility","visible");', secs);
}

function user_logout() {

        
        window.localStorage.removeItem('login_token');
        window.localStorage.removeItem('location');
        window.localStorage.removeItem('shipid');
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('first_name');
        window.localStorage.removeItem('last_name');
        window.localStorage.removeItem('farm');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('barn_id');
        window.localStorage.removeItem('to_in');
        window.localStorage.removeItem('to_rep');

       
        window.location ='index.html';
}

//Inventory.html
function check_pig_death(){
  if($('#radio-choice-1').is(':checked')) { 
    // alert();
    window.location ='#demo-page2'
   }
   else{
        window.location ='#demo-page3'
        } 
        
  
}
function check_treat(){
  if($('#radio-choiceb-1').is(':checked')) { 
    //alert();
    window.location ='#demo-page4'
   }
   else{
        window.location ='#demo-page7'
        }   
 }

function demopage3(){
  window.location ='#demo-page3'
  //location.reload();
}
function demopage5(){
  history.back();
  //window.location ='#demo-page5'
  //location.reload();
}
function back(){
  //window.location ='#demo-page1'
  history.back();
  $('.list_view').listview().listview('refresh');
}

function reason(){
  var num = $('#report_number_of_pig_deaths').val();
  //alert(num);
  if(num>0){
  $( "#reasons" ).empty();
  var j=1;
  for (i = 0; i < num; i++) {
  var c = "Cause of Death for Pig" + j;
   var data = {
      'Belly Rupture': 'Belly Rupture',
      'Scrotal Rupture': 'Scrotal Rupture',
      'Lame/BadLeg': 'Lame/BadLeg',
      'Humpback': 'Humpback',
      'Strep': 'Strep',
      'Greasy pig': 'Greasy pig',
      'Tail Bite': 'Tail Bite',
      'Prolapse': 'Prolapse',
      'Abcess': 'Abcess',
      'Hematoma Ear': 'Hematoma Ear',
      'Euthanized': 'Euthanized'
    }
    var id = "caused"+j;
    var s = $('<br>'+ c + '</br><select id='+id+' />');
    var d = "";
    for(var val in data) {   
      d +=  $('<option />', {value: val, text: data[val]}).appendTo(s);
    }
    s.appendTo('#reasons');
    $('select').selectmenu();
    $('[type="text"]').textinput();    
    j= j+1;
  }
  window.location="#demo-page2a";
  }
  else{
    alert("Enter a valid number")
  }
};
function treat(){
  var a = $('#report_number_of_pigs_treated').val();
  //alert(a);
  if(a>0){
  $( "#medicine" ).empty();
  $( "#dosage" ).empty();
  $( "#adminis" ).empty();
  var j=1;
  for (i = 0; i < a; i++) {
  var id = "inven_med"+j;
  var m1 = "Name of medicine given for pig" + j;
  var m2 = $('<p>'+ m1 + '</p><input class="med_name" type="text" id='+id+' /><br></br>');
  //alert(id);
  m2.appendTo('#medicine');
  $('[type="text"]').textinput(); 
  j= j+1;
  }
  window.location="#demo-page4a";
  }
  else{
    alert("Enter a valid Number");
  }
}
function demo5(){
  var s = "success";
  $('.med_name').each(function(){
    if($(this).val()==null||$(this).val()==""||$(this).val()==undefined){
      // alert("enter valid name");
      s="fail";
    }
    else{
      s="success";
    }
  });
  if(s=="success"){
   $( "#dosage" ).empty();
  
  var j=1;
  // var name = $('#inven_med1').val();
  // alert(name);
  var a = $('#report_number_of_pigs_treated').val();
  for (i = 0; i < a; i++) {
  var id = "inven_dos"+j;  
  var d1 = "Dosage Amount for pig" + j;
  var d2 = $('<p>'+ d1 + '</p><input class="dos_am" type="text" id='+id+' /><br></br>');
  d2.appendTo('#dosage');
  $('[type="text"]').textinput();
  j= j+1;
  }
  $('#index').trigger('create');
  window.location = "#demo-page5";
  }
  else{
    alert("enter valid data");
  }
}
function demo6(){
  var s = "success";
  $('.dos_am').each(function(){
    if($(this).val()==null||$(this).val()==""||$(this).val()==undefined){
      // alert("enter valid name");
      s="fail";
    }
    else{
      s="success";
    }
  });
  if(s=="success"){
  $( "#adminis" ).empty();
  var j=1;
  var a = $('#report_number_of_pigs_treated').val();
  for (i = 0; i < a; i++) {
    var id = "inven_adm"+j;  
    var h1 ="How Adminstered for Pig" + j;
    var h2 = $('<p>'+ h1 + '</p><input class="admi" type="text" id='+id+' /><br></br>');
    h2.appendTo('#adminis');
    $('[type="text"]').textinput();
    j= j+1;
  }
    window.location = "#demo-page6"; 
  }
  else{
    alert("Enter valid data");
  }
}
function demo7(){
  var s = "success";
  $('.admi').each(function(){
    if($(this).val()==null||$(this).val()==""||$(this).val()==undefined){
      // alert("enter valid name");
      s="fail";
    }
    else{
      s="success";
    }
  });
  if(s=="success"){
    window.location = "#demo-page7";
  }
  else{
    alert("Enter Valid Data");
  }
}

// shipments
$(function(){    

  var token = window.localStorage.getItem('login_token');

  $('#new_shipment').on("submit", function(){
  var s = "success";
  $('.ship').each(function(){
    if($(this).val()==null||$(this).val()==""||$(this).val()==undefined){
      // alert("enter valid name");
      s="fail";
    }
    else{
      s="success";
    }
  });
  if(s=="success"){        
      var shipment_date = $('#shipment_date').val();
      var shipid =  window.localStorage.getItem('shipid');
      var total_pigs = $('#total_pigs').val();
      var total_doa = $('#shipment_dead_on_arrival').val();
      var pig_supplier = $('#pig_supplier').val();
      //alert(shipment_date + shipid + total_pigs + total_doa + pig_supplier);
       var bookData = {
                 "barn_id": shipid,
                 "shipment_date": shipment_date,
                 "total_pigs": total_pigs,
                 "total_doa":total_doa,
                 "pig_supplier":pig_supplier

             };
      $.ajax({
      type: "POST",
      url: 'http://nano.amfnano.com/shipments.json?user_credentials='+token,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(bookData),
      dataType: "json",
      cache: false,
      success: function(data) {        
        //alert(JSON.stringify(data));
        alert("Shipment created successfully");
        window.localStorage.removeItem('shipid');
        db();
        $('#new_shipment')[0].reset();
        return false
      },
      error: function(data,status){
        //alert(JSON.stringify(data));
        // alert("Shipment Not Created");
      },

      complete: function(data){
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });  
    } 
    else{
      alert("Enter Valid Data");
      return false
    }
  });


  $('#new_report').on("submit", function(){        
      var a = $("#report_initials").val();
      // alert(a);
      if(a ==""){
        alert("Enter Valid Data");
        return false
      }
      else{
          var shipid =  parseInt(window.localStorage.getItem('shipid'));
          var report_date = $('#report_date').val();
          var total_pig_deaths = $('#report_number_of_pig_deaths').val();
          var radeath =  window.localStorage.getItem('radiodeath');
          var ratreat =  window.localStorage.getItem('radiotreat');
          if(radeath == "yes"){
            // alert("checked"); 
            var td = total_pig_deaths;
            var pig_deaths_attributes;
            var temp_pig_deaths_attributes=[];
            var n =1;
            for (i = 0; i < td; i++) {
              var idtd = $("#caused"+n).val();
              pig_deaths_attributes = {"cause":idtd,"count": n };
              temp_pig_deaths_attributes.push(pig_deaths_attributes);
              n = n+1;
            }
            // alert(temp_pig_deaths_attributes);
          }
          else{
            temp_pig_deaths_attributes = [{"cause":"null","count": 0 }];
            // alert("no");
          }
          var total_pigs_treated = $('#report_number_of_pigs_treated').val();
          var user_initials = $('#report_initials').val();
          if(ratreat =="yes"){
            var b = total_pigs_treated;
            var c = 1;
            var pigt = "";
            var pig_treatments;
            var temp_pig_treatments=[];
            for (i = 0; i < b; i++) {
              var medic= "inven_med"+c;
              var inven_medic =$("#"+medic).val();
              var inven_dosage =$("#inven_dos"+c).val(); 
              var inven_admin =$("#inven_adm"+c).val();
              pig_treatments = {"medicine_given":inven_medic, "count": c, "dosage": inven_dosage , "how_administered":inven_admin };
              temp_pig_treatments.push(pig_treatments);
              c = c + 1;
              //alert(inven_medic);
            }
          }
          else{
            temp_pig_treatments = [{"medicine_given":"null", "count": 0, "dosage": "null" , "how_administered":"null" }];
          }
          
          
          var bookData = {
                     "barn_id": shipid,
                     "report_date": report_date,
                     "user_initials":user_initials,
                      "pig_deaths_attributes":temp_pig_deaths_attributes,
                      "pig_treatments_attributes":temp_pig_treatments
                 };
           // alert(JSON.stringify(bookData));  
           // alert(bookData);
          $.ajax({
          type: "POST",
          url: 'http://nano.amfnano.com/inventory_reports.json?user_credentials='+token,
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(bookData),
          // data: bookData, 
          dataType: "json",
          cache: false,
          success: function(data) {  
            // alert(JSON.stringify(data));      
            window.localStorage.removeItem('shipid');
            alert("Inventory created successfully");
            window.localStorage.removeItem('to_in');
            window.localStorage.removeItem('to_rep');
            db();
            $('#new_report')[0].reset();
            return false
          },
          error: function(data,status){
            // alert("Required valid data"); 
          },

          complete: function(data){
              // alert(JSON.stringify(data));  
              // alert('completed')
          },

          denied: function(data){
                alert('Access denied')
          }
        });
          // e.preventDefault();
          // return false
      }  
  });
});
function db(){
  var role = window.localStorage.getItem('role');
  if(role == "SiteManager"){
    // window.localStorage.removeItem('shipid');
    window.location="main_dashboard.html#demo-page2"

  }
  else if(role == "HogOwner"){
    // window.localStorage.removeItem('shipid');
    window.location ="main_dashboard.html"  
  }
  else if(role == "BarnManager"){
    // window.localStorage.removeItem('shipid');
    window.location ="main_dashboard.html#demo-page4"  
  }
}

function ship(){
  var token = window.localStorage.getItem('login_token');
  var shipid =  window.localStorage.getItem('shipid');
  window.location ='shipments.html';
}
function inven(){
  var token = window.localStorage.getItem('login_token');
  var shipid =  window.localStorage.getItem('shipid');
  // window.location ='inventory.html';
  $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+shipid+'/last_inventory_report.json?user_credentials='+token,
        // dataType: "json",
        crossDomain: true,
        // cache: false,
        success: function(data) { 
        window.location ='inventory.html'
        console.log(data);
        // alert(); 
        // alert(JSON.stringify(data));
        
        window.localStorage.setItem('to_in', data.total_inventory);
        window.localStorage.setItem('to_rep', JSON.stringify(data.report_date));
        window.localStorage.setItem('to_initi', JSON.stringify(data.user_initials));
        window.localStorage.setItem('to_death', JSON.stringify(data.total_pig_deaths));
        window.localStorage.setItem('to_sick', JSON.stringify(data.total_pigs_treated));
        var to_rep =  window.localStorage.getItem('to_rep');
        var to_in =  window.localStorage.getItem('to_in');
        var to_initi =  window.localStorage.getItem('to_initi');
        var to_death =  window.localStorage.getItem('to_death');
        var to_sick =  window.localStorage.getItem('to_sick');
        // alert(to_in);
          
          
          // $("#test1 span").text("3kj");
          
        },
        error: function(data,status){
          alert("Required Valid Data");
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
}
function deta(){
  window.location = 'details.html';
}
function invback(){
  window.localStorage.removeItem('shipid');
  history.back();
}
function cancelinv(){
  var token = window.localStorage.getItem('login_token');
    // var first = window.localStorage.getItem('first_name');
    //  var last =  window.localStorage.getItem('last_name');
    //  var user = first +" "+ last ;
    var shipid =  window.localStorage.getItem('shipid');
    // var id = shipid;
    // alert(shipid);
    $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+shipid+'/last_reading.json?user_credentials='+token,
        // dataType: "json",
        crossDomain: true,
        beforeSend: function() 
        { $.mobile.showPageLoadingMsg("a", "Loading"); }, 
        // cache: false,
        success: function(data) { 
          // alert(JSON.stringify(data));
          if(data.temperatures.length === 0){
            data.temperatures = "NA";
            // alert(data.temperatures);
             $('#temp').text(data.temperatures);
          }
          else{
             $('#temp').text(data.temperatures[0].value+' F');
          }
          if(data.humidity == null){
            data.humidity = "NA";
            // alert(data.humidity);
          }
          if(data.system_status == null){
            data.system_status = "NA";
            // alert(data.system_status);
          }
          if(data.AC_power == null){
            data.AC_power = "NA";
            // alert(data.AC_power);
          }
          window.location ="main_dashboard.html#demo-page4";
          $('#humidity').text(data.humidity+'%');
          $('#s_status').text(data.system_status);
          $('#temp').text(data.temperatures[0].value+'F');
          $('#ac').text(data.AC_power);
          if(data.system_status == "OK"){
            $("#statusimg").attr("src", "online.png");
          }
          else{
            $("#statusimg").attr("src", "offline.png")
          } 
          
        },
        error: function(data,status){
          alert("Required Valid Data");
        },

        complete: function() 
        { $.mobile.hidePageLoadingMsg(); },

        denied: function(data){
          alert('Access denied')
        }
      });

}
$(".radio_death").click(function(){
  var valu = $(this).val();
    // alert(valu);
    window.localStorage.setItem('radiodeath', valu);
});

$(".radio_treat").click(function(){
  var valu = $(this).val();
    // alert(valu);
    window.localStorage.setItem('radiotreat', valu);
});