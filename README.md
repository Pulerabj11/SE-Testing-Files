# 50/50 Web Testing
###### By: Brandon Pulera
Welcome to the 50/50 Web Testing team! In this file, you will find everything you need to get up to speed with how testing is implemented into this website.

#### Topics include:

- What is testing?
- JavaScript
- Files
- Tools
- Installation
- Configuration
- Running Tests
- Code Overview
- Common Problems
- To Do
- Notes

# What is testing?

Software testing is the process of verifying the functionality, reliability, and security of a program. This is done to find bugs, make improvements, and guarantee all program requirements are met.

### 1. Unit tests

Unit tests are very low level, close to the source of your application. They consist in testing individual methods and functions of the classes, components or modules used by your software. Unit tests are in general quite cheap to automate and can be run very quickly by a continuous integration server.

### 2. Integration tests

Integration tests verify that different modules or services used by your application work well together. For example, it can be testing the interaction with the database or making sure that microservices work together as expected. These types of tests are more expensive to run as they require multiple parts of the application to be up and running.

### 3. Functional tests

Functional tests focus on the business requirements of an application. They only verify the output of an action and do not check the intermediate states of the system when performing that action.

There is sometimes a confusion between integration tests and functional tests as they both require multiple components to interact with each other. The difference is that an integration test may simply verify that you can query the database while a functional test would expect to get a specific value from the database as defined by the product requirements.

### 4. End-to-end tests

End-to-end testing replicates a user behavior with the software in a complete application environment. It verifies that various user flows work as expected and can be as simple as loading a web page or logging in or much more complex scenarios verifying email notifications, online payments, etc...

End-to-end tests are very useful, but they're expensive to perform and can be hard to maintain when they're automated. It is recommended to have a few key end-to-end tests and rely more on lower level types of testing (unit and integration tests) to be able to quickly identify breaking changes.

### 5. Acceptance testing

Acceptance tests are formal tests executed to verify if a system satisfies its business requirements. They require the entire application to be up and running and focus on replicating user behaviors. But they can also go further and measure the performance of the system and reject changes if certain goals are not met.

### 6. Performance testing

Performance tests check the behaviors of the system when it is under significant load. These tests are non-functional and can have the various form to understand the reliability, stability, and availability of the platform. For instance, it can be observing response times when executing a high number of requests, or seeing how the system behaves with a significant of data.

Performance tests are by their nature quite costly to implement and run, but they can help you understand if new changes are going to degrade your system.

### 7. Smoke testing

Smoke tests are basic tests that check basic functionality of the application. They are meant to be quick to execute, and their goal is to give you the assurance that the major features of your system are working as expected.

Smoke tests can be useful right after a new build is made to decide whether or not you can run more expensive tests, or right after a deployment to make sure that they application is running properly in the newly deployed environment.

### 8. Code Coverage

Code coverage is the measure of how much code has been tested.  Generally, 80% is a good number to shoot for when trying to achieve good code coverage.
There are 5 criteria to look at when determining code coverage.
1.  **Function Coverage**  – The functions in the source code that are called and executed at least once.
2.  **Statement Coverage**  – The number of statements that have been successfully validated in the source code.
3.  **Path Coverage**  – The flows containing a sequence of controls and conditions that have worked well at least once.
4.  **Branch or Decision Coverage**  – The decision control structures (loops, for example) that have executed fine.
5.  **Condition Coverage**  – The Boolean expressions that are validated and that executes both TRUE and FALSE as per the test runs.

# JavaScript
JavaScript is the primary language used in web development.  HTML and CSS are used for formatting, while JavaScript is essential to adding functionality to a website.
Jest is specific to JavaScript, but Selenium can be written in a variety of languages.  It is customary to write your tests in the same language as the rest of the project, so others developers can more easily understand your code and to simplify interaction between the test code and main project code.

### Asynchronous
JavaScript is an asynchronous language, meaning code is not necessarily executed in order.  If one piece of code is meant to wait for a response, from a server for example, JavaScript is designed to run other code in the meantime.  This can cause problems if another section of code starts to run that depends on code that is still in a waiting state.  To understand this issue better we must look at the unique JavaScript object, called a Promise.

**Promises** are used to handle asynchronous operations in JavaScript.  They are automatically returned whenever something is happening asynchronously.  For example, in this Selenium code from this project, driver.wait returns a Promise.
```javascript
var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
```
This means emailBox will not be fully evaluated until the Promise is finished running.  The **await** keyword is used to tell JavaScript not to run any other code until the Promise is resolved.

Note: You cannot use the await keyword outside of an async function.

Using await fixed issues in this code in which some code was trying to type into the email input box before the page was loaded and the input box was selected.  Other issues involved test 2 starting before test 1 was complete.  These are the types of issues you need to be aware of when working with asynchronous code.

Understanding [Promises](https://www.geeksforgeeks.org/javascript-promises/) is the key to understanding JavaScript's asynchronous code.

For an even more in depth look, [this](https://www.freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript/#:~:text=JavaScript%20is%20a%20single%2Dthreaded,language%20with%20lots%20of%20flexibility.) is a great article to learn the technical details of how JavaScript makes this all work.

# Files

#### loginTesting.test.js

This file contains tests that confirm functionality of various elements of the website. Currently, the login page is the only thing tested.

#### webData.json

This file holds the urls, xpaths, strings, etc that are used for testing in functionalTesting.test.js.

# Tools

### Node.js

Node.js is a free, open source, cross-platform JavaScript run-time environment and helps with the development of server-side applications. It includes Node Package Manager (npm) which is used to handle installation of modules, start test servers, and run your program.

A good overview of Node.js can be found [here](https://nodejs.dev/learn/introduction-to-nodejs).

[Node.js Documentation](https://nodejs.org/en/docs/)

### Selenium

Selenium is an open source framework used for web browser automation in a variety of languages. It is used primarily for functional testing, but can help with some other testing. Selenium has a variety of tools to help with testing, but we are only working with the WebDriver for now.

The WebDriver allows control of a browser through our code. We can use this to perform any action a user might perform.

For a more broad look into Selenium, check out this [link](https://www.guru99.com/introduction-to-selenium.html).

[Selenium JavaScript Documentation](https://www.selenium.dev/selenium/docs/api/javascript/index.html)

### Jest

Jest is a JavaScript testing framework built to work with minimal setup. It is primarily used for **unit testing** and offers **code coverage** reporting.

In this project so far, it is used in conjunction with Selenium to produce a code coverage report for our functional tests. Jest usage can be expanded to include unit tests and improve the code coverage report.

[This link](https://www.softwaretestinghelp.com/jest-testing-tutorial/) will help you learn more about Jest and how to use it to create tests.

[Jest Documentation](https://jestjs.io/docs/getting-started)

# Installation

Note: Selenium and Jest are already a part of this project and you do not need to install them yourself. Use the command in the **node_modules** section to update your project to include the correct installs.

### Node JS

##### Install Node JS

- Go [here](https://nodejs.org/en/download/) and install Node.js.

### Selenium

##### Download ChromeDriver:

- Download the [ChromeDriver](https://chromedriver.chromium.org/downloads) that matches your browser’s version number.

- Add your ChromeDriver file location to your system PATH variable.

	Note: Testing with other browsers is not yet implemented.

### node_modules folder

This is a folder housing various dependencies including **Selenium** and **Jest** and it is **not tracked by GitHub.** This means it will be missing the first time you pull this project.

Use the following Node.js command, where 'ci' means 'clean install', to create this folder.

	> npm ci

It installs dependencies directly from `package-lock.json` and uses `package.json` only to validate that there are no mismatched versions. **If any dependencies are missing or have incompatible versions, it will throw an error**.

# Configuring the Selenium WebDriver

1. Import the Selenium WebDriver module.

```javascript
const  webDriver  =  require("selenium-webdriver");
```

2. Define a WebDriver client for the Chrome web browser.
	We will use this to control options for the Chrome session.

```javascript
let  chrome  =  require('selenium-webdriver/chrome');
```

3. Create an options object and set options

```javascript
let  options  =  new  chrome.Options();
options
	.excludeSwitches("enable-logging")
	.windowSize({ width: 600, height: 600 });
```

- excludeSwitches("enable-logging"): Disables Chrome logging. It was logging unnecessary info.

- windowSize: Controls the browser window size in pixels.

4. Create a WebDriver instance.

```javascript
const  driver  =  new  webDriver.Builder()
	.forBrowser("chrome")
	.setChromeOptions(options)
	.build();
```

- forBrowser: Sets the browser type.

- setChromeOptions: Takes our options object and configures the webDriver.

- build(): Builds the new WebDriver client.

The driver can now be used to control the webDriver session.

# Running Tests
Because our Selenium is wrapped in Jest, all you have to do is run Jest to perform the tests.  Just make sure your test file has the Jest naming convention:
> name.test.js

### Jest
In one terminal, start the test server with:
> npm start

In another terminal, enter the terminal command:
> npm run test

For additional arguments to add to this command, follow this [link](https://jestjs.io/docs/cli)
Note:  If you add arguments, you must add an extra &minus;&minus; before your arguments.
For example, if I want to produce a code coverage report, I'd add this argument.
> npm run test &minus;&minus; &minus;&minus;coverage
  
### Code Coverage
If you produced a code coverage report as seen above, you can find it in a folder within your project called 'coverage'.
You can open the index.html file to view the report.

# Code Overview

This is Test Case 1 found in loginTests.test.js, which tests the login with a valid email and valid password.

##### This test consists of Selenium code wrapped inside Jest code. This is done to generate code coverage for the Selenium tests. Test() and expect() are the only Jest code used here.
#### TC1
- #### Variables

	- testNum: Used for logging purposes

	- outcome: We set this boolean so Jest can confirm the outcome of the test. This is unorthodox way to work with Jest, but we are only using it for code coverage in these Selenium tests, so it isn't a big deal.

	- driver: Used to run and give us control of the browser session.

- #### Functions

	- test: Takes a string as a test name, a function as the test to run, and an integer as the maximum time, in ms, to wait for test completion.

	- announceTC: Console log output indicating which test is running.

	- validEmail: Finds and clicks the email input box. Enters a valid email into the field.

	- validPassword: Finds and clicks the password input box. Enters a valid password into the field.

	- clickLoginButton: Finds and clicks the login button.

	- testSuccessfulLogin: Attempts to find the logout button, which would indicate that the login was successful.

	- driver.quit: Terminates the current browser session.

	- tcErrorMsg: Console log output indicating test failure due to an error.

	- expect(outcome).toBe(true): Jest passes the test if outcome == true.

```javascript

//Test Case 1: Valid Email / Valid Password
test("TC1", async  function  tc1() {
	const  testNum  =  1;
	var  outcome  =  false;

	//Create the webDriver (Chrome) and open an instance of the test page
	const  driver  =  createDriver();

	try {
		announceTC(testNum);

		//Enter valid email / valid password
		await  validEmail(driver);
		await  validPassword(driver);

		//Click login button
		await  clickLoginButton(driver);

		//Test for a successful login
		outcome  =  await  testSuccessfulLogin(driver, testNum);

		//Exit the driver instance
		await  driver.quit();
		
		} catch (error) {
			console.log(error);
			console.log(tcErrorMsg(testNum));

			//Exit the driver instance
			await  driver.quit();
		}
	expect(outcome).toBe(true);
}, jestWaitTime);
```

#### validEmail

- #### Code
	- driver.wait:  Waits until a condition evaluates, or until it times out.
	- until.elementLocated:  Defines a condition for 'driver.wait' to evaluate.
		If the element is not located, a timeout error is thrown.
	- By.xpath: Indicates how an element should be located.
		Xpath (XML Path Language) looks like this, "//*[@id='email']/input".
```javascript
//Find and enter valid email on login page
async  function  validEmail(driver) {
	console.log(" Entering valid email.")

	try {
		//Click email input box.
		let  emailBox  =  await  driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
		await  emailBox.click();

		//Input email
		await  driver.findElement(By.xpath(emailInputBoxXpath)).sendKeys(validEmailString);
	} catch (error) {
		throw  error;
	}
}
```

# Common Problems

1. If you encounter this error after setting up Jest testing in a new file:

	> console.error [2022-04-30T20:45:23.776Z] @firebase/auth: Auth (9.1.3): INTERNAL ASSERTION FAILED: Expected a class definition

	Try including this at the top of the file:

	```javascript
	/**
	* @jest-environment node
	*/
	```

	This is a JSDoc comment for inline jest configuration.
	This prevents Jest from running your tests with JSDOM.
	The underlying issue is an incompatibility between JSDOM
	and an internal assertion used by the firebase library,
	documented here: https://github.com/nodejs/node/issues/20978

	It can probably be done in a Jest config option to apply to all files, but I have not yet implemented a more in depth configuration.

# Current Issues
1. Jest is producing console log that looks like this after every console log we produce.
	> at validEmail (src/Testing/loginTesting.test.js:747:13)

	This might be good for debugging, but makes it difficult to read the console output from our own code.  It would help to know how to disable this.  Possibly through a Jest CLI argument or config option.

2. At the end of the TC16 console output, Jest starts adding another line.
	> at runMicrotasks (&lt;anonymous&gt;)

	I'm not sure what this means or why it is happening.

# To Do

1. Review functional test cases for the login page.
2. Do research to find any missing functional tests.
3. Do research to find any other testing the login page needs.  Security testing is a possibility.
4. Further develop jest testing.
5. Look into testing the admin dashboard.
6. Do visual UI testing.  These are tests to ensure images, text, buttons, etc appear and have correct spacing, coloring, and load times.

# Notes
1. Currently, there is a line of code in the 'clickLoginButton' function that tells the driver to wait after the login button is pressed.  
	```javascript
		//Wait a fixed time until login info is processed (in ms)
		await driver.sleep(loginWaitTime);
	```
	This is to give time for the login info to be processed before moving on to the next function.  If a login is supposed fail, for example due to an invalid password, the email and password input boxes clear themselves after a couple seconds of processing.  The function 'testUnsuccessfulLogin' looks for the empty email input box to check if the login failed.  Conversely, the function 'testSuccessfulLogin' looks for the logout button to check if the login succeeded.  This one line of code could cause nearly all tests to fail if your connection or computer is slow and the loginWaitTime passes before the processing is complete.
	
	It would be useful to find out a better way to handle the processing time of a login, but if you continue to use this method, just increase loginWaitTime if needed.  Be aware this would increase the time it takes to run each test.  The variable 'selWaitTime' could also cause similar problems, but is set high enough where it shouldn't and does not affect testing time.