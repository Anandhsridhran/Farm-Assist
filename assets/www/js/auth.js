$(function() {        
  var token = window.localStorage.getItem('login_token');
  var username = window.localStorage.getItem('username');
  var location = window.localStorage.getItem('location');
  var id = window.localStorage.getItem('id');
  var role = window.localStorage.getItem('role');
  var farm = window.localStorage.getItem('farm');
  var barn_id =  window.localStorage.getItem('barn_id');
  var first = window.localStorage.getItem('first_name');
  var last =  window.localStorage.getItem('last_name');

  if(token === undefined || token==null){
    console.log("login must")
  }
  else if(role =="HogOwner"){   
    window.location ="main_dashboard.html"  
  } 
  else if(role =="SiteManager"){        
    window.location ="main_dashboard.html#demo-page2"
  }
  else if(role =="BarnManager"){   
    window.location ="main_dashboard.html#demo-page4"  
  } 

  $('#new_user_session').submit(function(e) {
    $('#menu').css('background-color','#004A7A');
    //$('#menu').css('background-color','rgb(0,125,208)');   
    $.ajax({
      type: "POST",
      url: 'http://nano.amfnano.com/user_sessions.json',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      dataType: "json",
      data: $(this).serialize(),
      cache: false,
      success: function(data) { 
        $('#menu').css('background-color','rgb(0,125,208)');
      //alert();       
        // return value example {single_access_token: "hvq01zyIs9C2k1yDHXO3", username: "adminuser", location_id: 0} 
        console.log(data);
        window.localStorage.setItem('login_token', data.single_access_token);
        window.localStorage.setItem('location', data.location_id);
        window.localStorage.setItem('id', data.user_id);
        window.localStorage.setItem('role', data.role);
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('first_name', data.first_name);
        window.localStorage.setItem('last_name', data.last_name);
        window.localStorage.setItem('farm', data.farm_id);
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('barn_id', data.barn_id);
        //alert(data.location_id);
        var role1 = window.localStorage.getItem('role');
        //alert(role1);
        if (role1 == "HogOwner"){
          //alert(role1);
          window.location ="main_dashboard.html"  
        }
        else if(role1 =="SiteManager"){
          // alert(role1);
          //alert(location);
           window.location ="main_dashboard.html#demo-page2"
        }
        else if(role1 =="BarnManager"){
          // alert(role1);
          window.location ="main_dashboard.html#demo-page4"  
        }
        return false;
      },
      error: function(data,status){
        $('#menu').css('background-color','rgb(0,125,208)');
        alert('Invalid username/password')
      },

      complete: function(data){
	      // alert('completed')
      },

      denied: function(data){
        $('#menu').css('background-color','rgb(0,125,208)');
		    alert('Access denied')
      }
    });
      return false
    e.preventDefault();
  });

});