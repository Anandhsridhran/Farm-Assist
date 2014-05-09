$(function() {         
  return  authorize();
});

function authorize() {
	var token = window.localStorage.getItem('login_token');

	if(token === undefined || token==null){
	  window.location= 'index.html'
	}
}
