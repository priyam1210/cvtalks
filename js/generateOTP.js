$(function(){
    $(".loginsubmitForm").click(function(){
        
        $('#loginsubmitForm').html('Wait..');
        $('#loginsubmitForm').attr('disabled','disabled');
        var cccode = $("select[name='phonecountryCode']").val();
        var mobile= $("#loginmobile").val();
        var email = $("#loginemailid").val();
        var token = $("#logincsrf").val();
        var username = '';
        var userdata = '';
        var data = '';
        
        if(mobile !== ''){
            username = mobile;
        }
        if(email !== ''){
            username = email;
        }
        
       $.ajax({
        url:'http://cvtalks.ca/api/loginsubmitForm',
        type:'POST',
        data:{
            _token:token,
            userdata:username,
            cccode:cccode
		},
        success:function(result){
            var getresult = JSON.parse(result);
            if(getresult.statusCode == 200){
                $("input[name='newloginotp']").val(getresult.otp);
                    $("#formdiv").removeClass('show');
                    $("#formdiv").addClass('hide');
                    $("#otpdiv").removeClass('hide'); 
                    $("#otpdiv").addClass('show'); 
                    console.log(getresult.otp);
            }
            else{
                swal("OOPS!!!", result.msg , "error");
            }
        }
       })
    })

    $("#loginsubmitotp").click(function(){
		var otp = $("input[name='loginotp']").val();
		var newloginotp = $("input[name='newloginotp']").val();
		$('.error').html('');
		
		if(otp == newloginotp){
		    otp = otp.trim();
            var token = $("#csrf").val();
            console.log("---",otp);
            $.ajax({
                type:"post",
                url:'http://cvtalks.ca/api/loginsubmitotp',
                data:{
                    _token:token,
                    otp:otp,
                    newloginotp:newloginotp
                },
                success:function(otpResult){
                    otpResult = JSON.parse(otpResult);
                    if(otpResult.statusCode == 200){
    					setTimeout(function(){
    						swal("Logged In Successfully", "success");
    					}, 2000);
                        location.replace("/my-profile");
                    }
                    else{
    					swal("OOPS!!!", "Otp not match. Please try again", "error");
                    }
                }
            })  
		}else{
		    setTimeout(function(){
		        $('.error').html('Invalid Otp')
		    }, 2000);
		}
        
    })
	
	
	// Sign Up 
	
	$("#submitsignupForm").click(function(){
        var name=$("#name").val();
        var mobile= $("#signupmobile").val();
        var signupcccode = $("select[name='signupphonecountryCode']").val();
        var email = $("#emailid").val();
        var token = $("#csrf").val();
        var verifyby = $('input[name="verifyby"]:checked').val();
        
       $.ajax({
        url:'/submitForm',
        type:'POST',
        data:{
            _token:token,
            verifyby:verifyby,
            name:name,
            signupcccode:signupcccode,
            mobile:mobile,
            email:email},
        success:function(result){
            var regresult = JSON.parse(result);
            // alert(result);
            if(regresult.statusCode == 200){
                $("input[name='newregotp']").val(regresult.otp);
                $("#signupformdiv").removeClass('show');
                $("#signupformdiv").addClass('hide');
                $("#signupotpdiv").removeClass('hide'); 
                $("#signupotpdiv").addClass('show'); 
            }
            else{
                swal("OOPS!!!", regresult.msg , "error");
            }
        }
       })
    })

    $("#otpSignupSubmit").click(function(){
        var otp = $("#otp").val();
        var newregotp = $("input[name='newregotp']").val();
       
        var regerror = $('.regerror').html();
        
        if(otp == newregotp){
            otp = otp.trim();
            var token = $("#csrf").val();
            console.log("---",otp);
            $.ajax({
                type:"post",
                url:'/submitotp',
                data:{
                    _token:token,
                    otp:otp,
                    newregotp:newregotp
                },
                success:function(otpResult){
                    otpResult = JSON.parse(otpResult);
                    if(otpResult.statusCode == 200){
                        setTimeout(function(){
        					swal("Registered Successfully", "success");
        				}, 4000);
                        location.replace("/my-profile");
                    }
                    else{
                        swal("OOPS!!!", "Otp not match. Please try again", "error");
                    }
                }
            })
        }else{
		    setTimeout(function(){
		        $('.regerror').html('Invalid Otp')
		    }, 2000);
		}
    })
	
})