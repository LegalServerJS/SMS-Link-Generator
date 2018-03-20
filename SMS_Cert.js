
<a id='matthew_opencasesearchbutton' class="animate-bottom matthew_button"  onclick="matthewGenerateSMS();" style="cursor:pointer">Get Certification SMS Link</a>
</br>
</br>
</br>
<div id='matthew_sms_link'>
</div>
<style>

/* Add animation to "page content" */
.animate-bottom {
  position: relative;
  -webkit-animation-name: animatebottom;
  -webkit-animation-duration: 1s;
  animation-name: animatebottom;
  animation-duration: 1s
}
.matthew_button {
  font: bold 11px Arial;
  text-decoration: none;
  background-color: #EEEEEE;
  color: #333333;
  padding: 2px 6px 2px 6px;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
}

/* Add a right margin to each icon */
.matthew_fa {
    margin-left: -12px;
    margin-right: 8px;
}
.matthew_loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<script>
function matthew_grab_id_for_selector(etype,textlookingfor){
	/*
	This is the jQuery version which will grab the for attribute
	from a label which is usually the id for the field with the value.
	*/
	var caseid = null;
	jQuery(etype).each(function(i){
		if(jQuery(this).text() == textlookingfor){
			caseid = jQuery(this).attr('for'); //Set the case id value outside of this anon function.
			console.log("Field ID: " + jQuery(this).attr('for'));
			return false;
		}
	});
	return caseid;
}
function matthewGenerateSMS(){
	var matteremail = jQuery('#' + matthew_grab_id_for_selector('label','Matter/Case ID#')).text() + '@mvls.legalserver.org';
	var paralegal = jQuery('#' + matthew_grab_id_for_selector('label','Primary Advocate')).text();
	var lpc = jQuery('#' + matthew_grab_id_for_selector('label','Legal Problem Code')).text().substring(0,2);
	console.log("LPC: " + lpc);
	
	var paraparts = paralegal.split(' ');
	var paraemail = (paraparts[0].substring(0,1) + paraparts[1] + '@mvlslaw.org').toLowerCase();
	var feewaived = jQuery('#' + matthew_grab_id_for_selector('label','App Fee Waiver') + ' option:selected').text();
	console.log("Fee Raw" + feewaived);
	var feevalue;
	if(feewaived == 'Please Select'){
		//Needs to pay feewaived
		feevalue = 'false';
	}else{
		feevalue = 'true';
	}
	console.log("Matter: " + matteremail);
	console.log("Para Email: " + paraemail);
	console.log("Fee Waived: " + feevalue);

	var url = 'https://mvlslaw.org/certification/?ls=' + matteremail + '&fw=' + feevalue;
	console.log(url);
	var warning_lang = "";
	if(lpc == "01" || lpc == "24" || (parseInt(lpc) >= 67 &&  parseInt(lpc) <= 69) || (parseInt(lpc) >= 30 && parseInt(lpc) <= 49)){
		//Only populate the message box if it's not one of the LPC's above which still need a paper app.
		//This is to add a safeguard if a paralegal is about to send a cert text by accident.
		console.log("Warning this is not an approved LPC");
		warning_lang = "<span style='color:red'>WARNING THIS IS NOT AN APPROVED LPC FOR CERT TEXTING: </span>";
	}else{
		jQuery('#' + matthew_grab_id_for_selector('label','Message*')).val("From MVLS: To agree to our Terms & Conditions, please click on link: " + url);
	}
	jQuery('#matthew_sms_link').html("</br></br><p>" + warning_lang + url + '</p>');
}
</script>