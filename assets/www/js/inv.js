$(window).load(function(){
// $(document).on('pagebeforeshow', 'inventory.html#demo-page1', function(){ 
  // $(".radio_death").attr("checked",true).checkboxradio("refresh");
	get_data();
  date();
  // $(".radio_death").attr("checked",true).checkboxradio("refresh");
  // $(".radio_treat").attr("checked",true).checkboxradio("refresh");
});
// $(document).ready(function(){
//   $(".radio_death").attr("checked",true).checkboxradio("refresh");
// });
function date(){
  function pad (str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
          }
        var today = new Date(); 
        var dd = pad(today.getDate(),2);
        var mm = pad(today.getMonth()+1,2); //January is 0!
        var yyyy = today.getFullYear();   
        var date = yyyy + '-' + mm + '-' + dd;
        $('#report_date').val(date); 
         var months = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];

        var selectedMonthName = months[today.getMonth()];
        // alert(selectedMonthName);
        $('#month_of_inventory').val(selectedMonthName)
        $('select').selectmenu('refresh', true);
}
function get_data(){
	var token = window.localStorage.getItem('login_token');
  	var id =  window.localStorage.getItem('shipid');
  	$.ajax({
        type: "GET",
        url: 'http://nano.amfnano.com/barns/'+id+'/last_inventory_report.json?user_credentials='+token,
        crossDomain: true,
        success: function(data) { 
        console.log(data);
        // alert(JSON.stringify(data));
        	$("#run_rep").text(JSON.stringify(data.report_date));
        	$("#run_inven").text(JSON.stringify(data.total_inventory));
        	$("#run_death").text(JSON.stringify(data.pig_deaths.length));
        	$("#run_sick").text(JSON.stringify(data.pig_treatments.length));
        	$("#run_ini").text(JSON.stringify(data.user_initials));
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
function cancelinvent(){
	
	// alert("sff");
	// var token = window.localStorage.getItem('login_token');
 //    var shipid =  window.localStorage.getItem('shipid');
 //    $.ajax({
 //        type: "GET",
 //        url: 'http://nano.amfnano.com/barns/'+shipid+'/last_reading.json?user_credentials='+token,
 //        // dataType: "json",
 //        crossDomain: true,
 //        beforeSend: function() 
 //        { $.mobile.showPageLoadingMsg("a", "Loading"); }, 
 //        // cache: false,
 //        success: function(data) { 
 //          alert(JSON.stringify(data));          
 //        },
 //        error: function(data,status){
 //          alert("Required Valid Data");
 //        },

 //        complete: function() 
 //        { $.mobile.hidePageLoadingMsg(); },

 //        denied: function(data){
 //          alert('Access denied')
 //        }
 //      });
}