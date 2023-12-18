<img src="bankUI.png" alt="app UI" width="400"/>

# **Project Name**
Bad Bank app - the 5th iteration: a Three Tier Bank 


** This version of my code works. I could not figure out how to hide private key in AuthRoutes.json or how to hide Connection String in dal.js 12/18/23 KR

# **Usage**: 
To duplicate my project and run your own version, download the files onto your machine or clone the repo. 

** Make adjustments to the app:
* Go to FireBase and create a project with a web app. 
* In Firebase, Build Authentication. 
* In Firebase, generate a new private key by going to Project settings and clicking on the Service Accounts tab.
* Save the file in your desired location on your computer (where you save all your keys). Do not share this key! Copy the contents for the next step.
* In the project directory, create a file named something similar to "AuthRoutes.json" and place the private key contents into this new file. Save.
* If you did not name your file in the last step AuthRoutes.json, then go into the admin.js file and enter your file name in/near line 5. Save.
* Now is a good time to create a .gitignore file for the project and add these contents: /node_modules/ and AuthRoutes.json. Save.
* In Firebase, go to Project Settings and click on the General tab. Copy the configuration, which starts with "const firebaseConfig = {
  apiKey:."
* In the login.js file at the root folder, place your unique configuration (into the firebaseConfig variable). Save.

** Run the app: 
* In your terminal navigate to the project's root directory, above the public folder.
* Type terminal command: npm install
* On AtlasDB, create an account.
* On AtlasDB, create a database (choose the free option).
* On AtlasDB, create a cluster.
* On AtlasDB, Connect to cluster (via Driver).
* On AtlasDB, create a collection called 'users' (within target cluster, click on add data/create db/ & name db 'myproject' & name collection 'users')
* On AtlasDB, click on Network Access (in left menu). Notice your IP address. Add another address: 0.0.0.0/0 
* Copy the Connection String (unique to you-don't share.) (Connection String format: mongodb+srv://<username>:<password>@<cluster-name>.<jibberish>.mongodb.net/?retryWrites=true&w=majority)
* In dal.js on/near line 3, substitute your Connection String for the const url.
* In MongoDB Compass, ensure that you have a database called myproject and a collection called users.
* In MongoDB Compass, Create a New Collection. In the URI field, place your Connection String.
* Type terminal command:  node index.js
* In your browser, navigate to address: localhost:3000 to run on your local server.

* Deploy on something like Heroku or SW3 bucket


* If you want to employ mongo_test.js, ensure that your MongoDB server is running on localhost:27017 and that you have the 'myproject' database created with a 'customers' collection before running the script. Type terminal command: node mongo_test.js.

# **Support**: 
Please contact me via email at krentmeester@uwalumni.com.

# **License**: 
MIT License

Copyright (c) 2023 Kerri Rentmeester

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.