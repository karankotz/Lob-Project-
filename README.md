Lob Challenge
Prompt: ​Build a command line program to send a letter to your legislator with Lob.  
Input:​ The input should be an address—including name, address line 1, address line 2, city, state, and zip code—and a 500 
character message to send to the legislator. You can choose whether to accept input by reading from a file or from standard input. 
 
Output:  
● A URL to the PDF of the letter in Lob’s API response 
● Error on bad input 

Description about the project:- ( To run the project follow the steps in the point 4)

1) This challenge has been implmented in the Node.js (File for the code is in "code.js")

2) To successfully run the project the pre-requisite is that Node.js should be installed, if not installed then it can be downloaded at the below link and can be installed.
   https://nodejs.org/en/ 
	
3) The app what I have designed selects the senator with respect to the address input by the user, and gets the senator information
   from the civic-info API that was provided to work with.
   
4) Download the Zip File : Final Lob Project.zip
   -> Open the Windows command prompt from the start menu
   -> Navigate to the path where the zip of the folder "Final Lob Project" has been extracted by running the below command 
      "cd /d path" in the windows command prompt.  
   -> Now you need to run the script with the following command -  node code.js
    (node is the command used to run the node.js scripts)
   ->The app will ask to take the respective inputs and the url will be generated, if bad address is inserted then a error will be thrown in the console.
   
5) Design of the script
   ->The first is to get the prompt and read the input using prompt module in node.js, the schema is defined in the schema variable.
   ->The callback function "callback_address_verification" will be called first, which will verfiy the address using the Lob's address verfication API.
   ->After that callback function "callback_get_civic_and_generate" that will be used to get the civic info of the official using the address provided by
     the user and that will be used again to generate the letter.
	 
6) Below is the sample output of the url generated.
   https://s3.us-west-2.amazonaws.com/assets.lob.com/ltr_aeac087aed16b919.pdf?AWSAccessKeyId=AKIAIILJUBJGGIBQDPQQ&Expires=1518473783&Signature=pXd8CcXfhg3T9Q1E9qxs5%2F3clQw%3D
   
7) Also please note that the test key is generated using myaccount for the Lob API.

8) The address line 1 is required for the app to proceed for the generation of the letter and the address line 2 is not kept mandatory,
   and rest all the fields except the address line 2 are kept as mandatory to proceed with the input and genration of the letter.
   

