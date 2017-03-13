$('document').ready(function(){
    $("#submitLogin").click(function(){

        var data = $("#login-form").serialize();
        $.ajax({
    
        type : 'POST',
        url  : 'Mod5CheckUser.php',
        data : data,
        dataType: "json",
        
        success : function(response)
        {
            if(response.success ===true){    
               window.location.replace("Mod5Calendar.php");
            }
            else if (response.success === false){
                $("#error").html("<b>Wrong Username/Password</b>");
            }
        }
   });
});
    
     $("#submitNewUser").click(function(){
        
        var data = $("#new-user-form").serialize();
        $.ajax({
    
        type : 'POST',
        url  : 'Mod5NewUser.php',
        data : data,
       dataType: "json",

        success : function(response)
        {
            if(response.success ===true){
                window.location.replace("Mod5Calendar.php");
            }
            else if (response.success === false){
               $("#error").html("<b>Wrong Username/Password</b>");
            }
        }
   });
});
     
     $("#submitGuest").click(function(){
        
   window.location.replace("Mod5Calendar.php");
});
    
});