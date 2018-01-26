  /************************************************
  Author : Karan Ravi Kotabagi
  Date:01/13/2018
  Script in Node.js
  ***********************************************
  */
  
  //Import the prompt from the node_modules to read the input from the user 
  var prompt = require('prompt');
  //Import the https object from the node modules 
  const https = require("https");
  //Import the Lob API from the node modules
  var Lob = require('lob')('test_1a7a9981b3be901e4ca7cfd7efcf9d97e5c');
  
  //Civic Info API that is required to fetch the official information with respect to the particular Link
  //This url is embedded with the my API key generated for the project
  var url = "https://www.googleapis.com/civicinfo/v2/representatives/?key=AIzaSyAKx0ujK_yI6itBdapHkbbUmP75XgB_kDQ&address=";
  
  //url2 is the final url which will be be used to get the information from the civic info API
  var url2 = "";

  //Schema that is used to read the input as required from the user which will be later used by prompt object
  var schema = {
	 //set the properties for the schema that have to be read from the user
    properties: {
      from_name: {
        description:'From Name',
        required: true
      },
      from_address_line1: 
	  {
		description:'From Address Line 1',
		required: true
      },
	  from_address_line2: 
	  {
		description:'From Address Line 2',
		required: false
      },
	  From_City: {
		description:'From City',
		required: true
      },
	  from_state: {
		description:'From State',
		required: true
      },
	  from_country: {
		description:'From Country',
		required: true
      },
	  from_zip_code: {
		description:'From Zip Code',
		required: true
      },
	  message: {
		description:'Message',
		required: true
      },
    }
  };
  
  //Callback to function in order to get the information from the civic info API and generate the letter
  var callback_get_civic_and_generate = function(result)
  {
	  //Check if the address read from the user doesn't contain any data
	  //if the address doesn't contain any of the value that is being read then this is verfied that no error is thrown
	 if(result.from_address_line1 !== undefined)
	 {
     //add the address string to the url2 by conacatenating url with the fromm_address_line1 and from_address_line2
	 url2 = url+result.from_address_line1+" "+result.from_address_line2;
	 }
	
	//use the https.get method to get the response from the civic-info url that we have in the url2
	
	https.get(url2, res => 
	{
		res.setEncoding("utf8");
  
	    let body = "";
	  //read the response data in the body
	  res.on("data", data => {
		body += data;
	  });
  
		//On the termination or the end of the response we need to parse the body 
	    res.on("end", () => 
		{
		body = JSON.parse(body);
		//First set the error with the value as the null 
		var error = "";
		//Check if the error is undefined and then assign the address code
		if(body.error !== undefined)
		{
		error = body.error.code;
		}
		//If the error is not null then definitely there is some error 
		if(error != "")
		{
			//Print the error message on the console 
			console.log("Error :-"+body.error.errors[0].message);
			//exit the process as we can't proceed if there is some error
			process.exit();
		}
		
		else
		{
		
	 //Create the letter using the Lob's letter API
	 var abc=Lob.letters.create({
	  description: 'Letter to the Senator of the respective address',
	  to: {
		name: body.officials[2].name,
		address_line1: body.officials[2].address[0].line1,
		address_line2: body.officials[2].address[0].line2,
		address_city: body.officials[2].address[0].city,
		address_state: body.officials[2].address[0].state,
		address_zip: body.officials[2].address[0].zip,
		address_country: 'US',
	  },
	  from: {
		name: result.from_name,
		address_line1: result.from_address_line1,
		address_line2: result.from_address_line2,
		address_city: result.From_City,
		address_state: result.from_state,
		address_zip: result.from_zip_code,
		address_country: 'US',
	  },
	  file: '<html style="padding-top: 3in; padding-left: 0.5in; margin: .1in;">'+result.message+'</html>',
	  color: true
	}, function (err, res) {
	  //Print the generated url to the terminal, this will point to the letter that is generated
	  if(err)
	  {
		  console.log(err.message);
	  }
	  else
	  {
	  console.log(res.url);
	  }
	});
		
		}
	  });
  res.on("error", () => {
	  console.log("Exiting");
	  process.exit();
  });
 
});
	//console.log(result.from_country);
	
  };
  
  //First Callback function that is used to verify the address 
  var callback_address_verification = function(result)
  {
	
	  if(result !== undefined )
	  {
	  //Use the Lob Verfication API to verify the address 
	  Lob.usVerifications.verify({
	  primary_line: result.from_address_line1,
	  city: result.From_City,
	  state: result.from_state,
	  zip_code: result.from_zip_code
	  },
	 function (err, res) 
	 {

		   if (err)
		   {
			   //Display the error to the console
			   console.log('There was an error with respect to the process: ' + err);
			   //Exit the process if there is some error
			   process.exit();
		   }
		   else
		   {
			  //If there is no error with respect to the address then send the result to the callback fucntion to get the 
			  //details from the civic-info api of the respective address and then generate the letter.
			  callback_get_civic_and_generate(result);
		   }
	},callback_get_civic_and_generate);
	
	 }  
 }
   //Prompt to get the input from the user 
   prompt.start();
   //Read the schema which contains the 
   prompt.get(schema, function (err, result) 
   {
	
    callback_address_verification(result);
	//callback(result);
  },callback_address_verification);
  
  