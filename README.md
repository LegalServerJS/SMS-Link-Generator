# SMS-Link-Generator
Generates a URL with the matter id as a GET parameter which is texted to client.

![Alt text](SMSImage.png?raw=true "Optional Title")

## Description
We use this to create a link to our website with the client's matter id as a paremeter. This link is auto populated into the message block for sending a text message. The link allows the client to certify our terms and conditions without having to mail them anything. The link goes to a gravity form on our website and because the url has the matterid, the gravity form is able to email the response back to the legal server file.

## Setup
Add the matter id as a read only field at the bottom of the page.
Add the javascript into an instruction block (make sure HTML is checked)
Change the URL to your particular site.

## How it works
When the button is pushed it grabs the matter id that you added at the bottom, adds the rest of the email (@mvls.legalserver.org), then creates the url. The code then finds the SMS message box and inputs the url into the box so the staff member only has to click the button and click send. 

## Note
This code also checks to make sure it's one of the pre approved LPC's for sending a text message terms and conditions through. You can use this or modify as you see fit.
