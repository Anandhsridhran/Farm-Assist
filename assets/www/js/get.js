$(document).ready(function(){
     var token = window.localStorage.getItem('login_token');
     var role = window.localStorage.getItem('role');
     var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
     //alert("farms");
    if(role =="SiteManager"){
      var farm = window.localStorage.getItem('farm');
      $("#smhead").hide();
      $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/farms/'+farm+'/locations.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {
          // window.location ="#demo-page2";        
          list  = []
          $.each(data, function(x, v) {
             if(v.system_status=="OK"){
              // var st_img = $('<img>',{src:'online.png'}); 
              var st_img = '<img src="online.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 

            }
            else{
              // var st_img = $('<img>',{ src:'offline.png'});
              var st_img = '<img src="offline.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 
            }
            list.push("<li>"+st_img+"<a href='#' data-transition='slide' data-id="+v.location_id+" data-location="+v.name+">"+v.name+"</a></li>")
          });  
          $('#locations_list').append(list);         
          get_barns();
          $('#locations_list').listview('refresh');
          $('#db_hog2').text(user);
          return false;
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
    }
    else if(role =="HogOwner"){
    $.ajax({
      type: "GET",
      url: 'http://nano.amfnano.com/farms.json?user_credentials='+token,
      dataType: "json",
      cache: false,
      success: function(data) {
        console.log(data)
        list  = []
        $.each(data, function(x, v) {
          //alert(v.farm_id);
            if(v.system_status=="OK"){
              // var st_img = $('<img>',{src:'online.png'}); 
              var st_img = '<img src="online.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 

            }
            else{
              // var st_img = $('<img>',{ src:'offline.png'});
              var st_img = '<img src="offline.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 
            }
            list.push("<li>"+st_img+"<a href='#' class='dylist' data-transition='slide' data-id="+v.farm_id+" data-name="+v.name+">"+v.name+"</a>"+"</li>")
        });        
        $('#admin_farms').append(list);
        $('#admin_farms').listview('refresh');
        $('#db_hog1').text(user);
        get_locations();
         get_barns();
        return false;
      },
      error: function(data,status){
        alert('No data Found')
      },

      complete: function(data){
        // alert('completed')
        
      },

      denied: function(data){
        alert('Access denied')
       
      }

    });
    }
    else if(role =="BarnManager"){
      var id = window.localStorage.getItem('barn_id');
      window.localStorage.setItem('shipid', id);
      var shipid =  window.localStorage.getItem('barn_id');
      $('#db_hog4').text(user);
       $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+id+'/last_reading.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {
          window.location ="#demo-page4";
          if(data.temperatures.length === 0){
            data.temperatures = "NA";
            // alert(data.temperatures);
             $('#temp').text(data.temperatures);
          }
          else{
             $('#temp').text(data.temperatures[0].value+' F');
          }

          if(data.ir_feeds.length === 0){
            data.ir_feeds = "NA";
            // alert(data.temperatures);
             $('#s_feed').text(data.ir_feeds);
          }
          else{
             $('#s_feed').text(data.ir_feeds[0].status);
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
          $('#barntitle').text(data.barn_name);
          $('#humidity').text(data.humidity+'%');
          $('#s_status').text(data.system_status);
          // $('#temp').text(data.temperatures[0].value+'F');
          $('#ac').text(data.AC_power);
          // $('#s_feed').text(data.ir_feeds[0].status);
          if(data.system_status == "OK"){
            $("#statusimg").attr("src", "online.png");
          }
          else{
            $("#statusimg").attr("src", "offline.png")
          }

          if(data.AC_power == "OK"){
            $("#powerimg").attr("src", "images/s-box-image-3.png");
          }
          else{
            $("#powerimg").attr("src", "offline.png")
          }

          if(data.ir_feeds[0].status == "OK"){
            $("#feedimg").attr("src", "online.png");
          }
          else{
            $("#feedimg").attr("src", "offline.png")
          }
          return false;
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
      $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+id+'/last_event_report.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
          console.log(data);
          $('#events').text(data.description);
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
      $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+id+'/last_inventory_report.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {       
          // var h = $('#db_hog3').text();
          // var d = $('#db_location').text();
          // var s = $('#site').text();
          // $('#db_hog4').text(h);
          // $('#db_location4').text(d);
          // $('#site4').text(s);
          $('#sectitle').hide();

          var death_count = data.pig_deaths;
          var val1 ="";
          if(death_count.length > 0){
            var b = death_count.length-1;
            var last = death_count[b];
            val1 = last.count;
            }
            else{
              val1 =0;
            }
          
          var sick_count = data.pig_treatments;
          var val2 ="";
          if(sick_count.length > 0){
            var c = sick_count.length-1;
            var last = sick_count[c];
            val2 = last.count;
            }
            else{
              val2 =0;
            }
          // alert(c);
          // sick_count = data.pig_treatments;
          $('#curr_inven').text("Current Inventory :"+data.total_inventory);
          $('#death_pig_main').text("Pigs Death :"+val1);
          $('#sick_pig_main').text("Sick Pigs :"+val2);
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });

    }  
  // GET Sites
 
function get_locations(){
 
  $("#admin_farms li a").on('click', function(){ 
   var token = window.localStorage.getItem('login_token');
  var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;     
     //$('#locations_list').empty();  
     $('#locations_list li:not(:first)').remove();   
     var id = $(this).data('id');
     var name = $(this).data('name');
    // $(“body”).fadeOut();
    var farms = $(this).data('farms');
    //alert(farms);
      $.ajax({
        type: "GET",
        beforeSend: function() 
        { $.mobile.showPageLoadingMsg("a", "Loading"); }, 
        complete: function() 
        { $.mobile.hidePageLoadingMsg(); },
        url: 'http://nano.amfnano.com/farms/'+id+'/locations.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
          window.location ="#demo-page2";
          list  = []
          $.each(data, function(x, v) {
             if(v.system_status=="OK"){
              // var st_img = $('<img>',{src:'online.png'}); 
              var st_img = '<img src="online.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 

            }
            else{
              // var st_img = $('<img>',{ src:'offline.png'});
              var st_img = '<img src="offline.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 
            }
            list.push("<li>"+st_img+"<a href='#' data-transition='slide' data-id="+v.location_id+" data-location="+v.name+">"+v.name+"</a></li>")
          });        
          $('#locations_list').append(list);         
          $('#db_hog2').text(user);
          $('#db_farm1').text(name);
          get_barns();
          $('#locations_list').listview('refresh');
          return false;
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
}

function get_barns(){

 
  $("#locations_list li a").on('click', function(){   
     var token = window.localStorage.getItem('login_token');
     var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
    //alert("barns");
      var sitename = $('#db_farm1').text();
      //$("#barns_list").empty();
      $('#barns_list li:not(:first)').remove();   
        var $this = $(this),
        id = $(this).data('id');
         window.localStorage.setItem('loc_id', id);
        var name = $(this).data('location');
      $.ajax({
        type: "GET",
        beforeSend: function() 
        { $.mobile.showPageLoadingMsg("a", "Loading"); }, 
        complete: function() 
        { $.mobile.hidePageLoadingMsg(); },
        url: 'http://nano.amfnano.com/locations/'+id+'/barns.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {                 
          window.location ="#demo-page3"; 
          list  = []
          $.each(data, function(x, v) {
             if(v.system_status=="OK"){
              // var st_img = $('<img>',{src:'online.png'}); 
              var st_img = '<img src="online.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 

            }
            else{
              // var st_img = $('<img>',{ src:'offline.png'});
              var st_img = '<img src="offline.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 
            }
              list.push("<li>"+st_img+"<a href='#'data-transition='slide' data-id="+v.barn_id+">"+v.name+"</a></li>")
          });        
           $('#barns_list').append(list);         
           get_reading();
          $('#db_hog3').text(user);
          $('#db_location').text(name);
          $('#site').text(sitename);
          $('#barns_list').listview('refresh');
         
          return false;
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
}
  function get_reading(){
    
    $("#barns_list li a").on('click', function(){        
    var token = window.localStorage.getItem('login_token');
    var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
    var id = $(this).data('id');
    window.localStorage.setItem('shipid', id);
    var shipid =  window.localStorage.getItem('shipid');
    
      $.ajax({
        type: "GET",
        beforeSend: function() 
        { $.mobile.showPageLoadingMsg("a", "Loading"); }, 
        complete: function() 
        { $.mobile.hidePageLoadingMsg(); },
        url: 'http://nano.amfnano.com/barns/'+id+'/last_reading.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
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
          $('#barntitle').text(data.barn_name);
          $('#humidity').text(data.humidity+'%');
          $('#s_status').text(data.system_status);
          $('#temp').text(data.temperatures[0].value+' F');
          $('#ac').text(data.AC_power);
          $('#s_feed').text(data.ir_feeds[0].status);
          window.location ="#demo-page4";
           if(data.system_status == "OK"){
            $("#statusimg").attr("src", "online.png");
          }
          else{
            $("#statusimg").attr("src", "offline.png")
          }
          if(data.AC_power == "OK"){
            $("#powerimg").attr("src", "images/s-box-image-3.png");
          }
          else{
            $("#powerimg").attr("src", "offline.png")
          }
          if(data.ir_feeds[0].status == "OK"){
            $("#feedimg").attr("src", "online.png");
          }
          else{
            $("#feedimg").attr("src", "offline.png")
          }
          return false;
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
      $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+id+'/last_event_report.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
          console.log(data);
          $('#events').text(data.description);

          //alert(data);
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
      $.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+id+'/last_inventory_report.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {      
        // alert();  
          var h = $('#db_hog3').text();
          var d = $('#db_location').text();
          var s = $('#site').text();
          $('#db_hog4').text(h);
          $('#db_location4').text(d);
          $('#site4').text(s);
          // $('#sectitle').hide();

          var death_count = data.pig_deaths;
          var val1 ="";
          if(death_count.length > 0){
            var b = death_count.length-1;
            var last = death_count[b];
            val1 = last.count;
            }
            else{
              val1 =0;
            }
          
          var sick_count = data.pig_treatments;
          var val2 ="";
          if(sick_count.length > 0){
            var c = sick_count.length-1;
            var last = sick_count[c];
            val2 = last.count;
            }
            else{
              val2 =0;
            }
          // alert(c);
          // sick_count = data.pig_treatments;
          $('#curr_inven').text("Current Inventory :"+data.total_inventory);
          $('#death_pig_main').text("Pigs Death :"+val1);
          $('#sick_pig_main').text("Sick Pigs :"+val2);
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
  }
});
function backm(){
  //window.location ='#demo-page1'
  history.back();
  $('.list_view').listview().listview('refresh');
}
function backbarn(){
  alert();
  var token = window.localStorage.getItem('login_token');
     var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
    //alert("barns");
      var sitename = $('#db_farm1').text();
  // window.location="#demo-page3";
  var loc_id = window.localStorage.getItem('loc_id');
  $('#barns_list li:not(:first)').remove();   
  $.ajax({
        type: "GET",
        beforeSend: function() 
        { $.mobile.showPageLoadingMsg("a", "Loading"); }, 
        complete: function() 
        { $.mobile.hidePageLoadingMsg(); },
        url: 'http://nano.amfnano.com/locations/'+loc_id+'/barns.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {                 
          window.location ="#demo-page3"; 
          list  = []
          $.each(data, function(x, v) {
             if(v.system_status=="OK"){
              // var st_img = $('<img>',{src:'online.png'}); 
              var st_img = '<img src="online.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 

            }
            else{
              // var st_img = $('<img>',{ src:'offline.png'});
              var st_img = '<img src="offline.png" style="width:16px;height:16px;float:left; padding-left: 9px; padding-top: 12px;"/>'; 
            }
              list.push("<li>"+st_img+"<a href='#'data-transition='slide' data-id="+v.barn_id+">"+v.name+"</a></li>")
          });        
           $('#barns_list').append(list);         
           get_reading();
          $('#db_hog3').text(user);
          $('#db_location').text(name);
          $('#site').text(sitename);
          $('#barns_list').listview('refresh');
         
          return false;
        },
        error: function(data,status){
          alert('No Data Found')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
}
