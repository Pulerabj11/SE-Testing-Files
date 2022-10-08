/**
 * @jest-environment node
 * 
 * This is a JSDoc comment for inline jest configuration.
 * This prevents Jest from running your tests with JSDOM.
 * Running without this generates an error.
 * The underlying issue is an incompatibility between JSDOM
 * and an internal assertion used by the firebase library,
 * documented here: https://github.com/nodejs/node/issues/20978
 */

//Import files to be used for Jest testing
//Jest needs access to other files for its code coverage report
import * as AuthContext from "../contexts/AuthContext.js";
import * as App from "../Components/App.js";
import * as Dashboard from "../Components/Dashboard.js";
import * as Login from "../Components/Login.js";
import * as PrivateRoute from "../Components/PrivateRoute.js";
import * as firebase from "../firebase.js";
import * as reportWebVitals from "../reportWebVitals.js";

//Import json data
const jsonData = require("./webData.json");

//Set xpath constants
const emailInputBoxXpath = jsonData.xpath[0].emailInputBox;
const passwordInputBoxXpath = jsonData.xpath[0].passwordInputBox;
const logInButtonXpath = jsonData.xpath[0].logInButton;
const logOutButtonXpath = jsonData.xpath[0].logOutButton;

//Set login info constants
const validEmailString = jsonData.loginInfo[0].validEmail;
const validEmailStringBadFormat = jsonData.loginInfo[0].validEmailBadFormat;
const validPasswordString = jsonData.loginInfo[0].validPassword;
const invalidEmailString = jsonData.loginInfo[0].invalidEmail;
const invalidEmailStringBadFormat = jsonData.loginInfo[0].invalidEmailBadFormat;
const invalidPasswordString = jsonData.loginInfo[0].invalidPassword;

//Set url constants
const loginPageURL = jsonData.URLs[0].loginPageURL;
const adminPageURL = jsonData.URLs[0].adminPageURL;

//Imports the main Selenium Webdriver module
const webDriver = require("selenium-webdriver");

//Defines a WebDriver client for the Chrome web browser
//Used to define options for the Chrome session
var chrome = require('selenium-webdriver/chrome');

//Define some shorthand constants for webDriver classes
const By = webDriver.By,
    until = webDriver.until,
    Key = webDriver.Key;

//Boolean to indicate if the first test has run or not.  Used in announceTC()
var firstTest = true;

//Time (ms) to wait after log in button is pressed in Selenium tests
//This affects run time.  Used in clickLoginButton()
const loginWaitTime = 3000;

//Time (ms) to wait for an element to be found in Selenium tests
//This does not affect run time
//An error is thrown if program waits this long for an element to be found
const selWaitTime = 10000;

//Time (ms) to wait for an element to be found in Selenium tests
//This does not affect run time
//The test will fail and you may get an error if the test does not resolve within this time
const jestWaitTime = 20000;

//
// 
// LOG IN TEST CASES
// 
//
describe("Login Tests", () => {
    //Test Case 1: Valid Email / Valid Password
    test("TC1", async function tc1() {
        const testNum = 1;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter valid email / valid password
            await validEmail(driver);
            await validPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for a successful login
            outcome = await testSuccessfulLogin(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 2: Valid Email / Invalid Password
    test("TC2", async function tc2() {
        const testNum = 2;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter valid email / invalid password
            await validEmail(driver);
            await invalidPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for an unsuccessful login
            outcome = await testUnsuccessfulLogin(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 3: Invalid Email / Valid Password
    test("TC3", async function tc3() {
        const testNum = 3;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter invalid email / invalid password
            await invalidEmail(driver);
            await validPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for an unsuccessful login
            outcome = await testUnsuccessfulLogin(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 4: Invalid Email / Invalid Password
    test("TC4", async function tc4() {
        const testNum = 4;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter invalid email / invalid password
            await invalidEmail(driver);
            await invalidPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for an unsuccessful login
            outcome = await testUnsuccessfulLogin(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 5: Valid Email / No Password
    test("TC5", async function tc5() {
        const testNum = 5;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid email / No password
            await validEmail(driver);
            await noPassword();

            //Click login button
            await clickLoginButton(driver);

            //Test for an unsuccessful login
            outcome = await testEmptyPasswordNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 6: Invalid Email / No Password
    test("TC6", async function tc6() {
        const testNum = 6;
        var outcome = false;
        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid email / No password
            await invalidEmail(driver);
            await noPassword();

            //Click login button
            await clickLoginButton(driver);

            //Test for a empty password notification
            outcome = await testEmptyPasswordNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 7: No Email / Valid Password
    test("TC7", async function tc7() {
        const testNum = 7;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid email / No password
            await noEmail();
            await validPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for a empty email notification
            outcome = await testEmptyEmailNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 8: No Email / Invalid Password
    test("TC8", async function tc8() {
        const testNum = 8;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter No email / Invalid Password
            await noEmail();
            await invalidPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for a empty email notification
            outcome = await testEmptyEmailNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 9: No Email / No Password
    test("TC9", async function tc9() {
        const testNum = 9;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter No Email / No Password
            await noEmail();
            await noPassword();

            //Click login button
            await clickLoginButton(driver);

            //Test for a empty email notification
            outcome = await testEmptyEmailNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 10: Valid Email w/o '@...com' / Valid Password
    test("TC10", async function tc10() {
        const testNum = 10;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid Email w/o '@...com' / Valid password
            await validEmailNoAtSymbol(driver);
            await validPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for wrong email format
            outcome = await testWrongEmailFormatNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 11: Valid Email w/o '@...com' / Invalid Password
    test("TC11", async function tc11() {
        const testNum = 11;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid Email w/o '@...com' / Invalid password
            await validEmailNoAtSymbol(driver);
            await invalidPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for wrong email format
            outcome = await testWrongEmailFormatNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 12: Valid Email w/o '@...com' / No Password
    test("TC12", async function tc12() {
        const testNum = 12;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid Email w/o '@...com' / No password
            await validEmailNoAtSymbol(driver);
            await noPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for wrong email format
            outcome = await testWrongEmailFormatNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 13: Invalid Email w/o '@...com' / Valid Password
    test("TC13", async function tc13() {
        const testNum = 13;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Invalid Email w/o '@...com' / Valid password
            await invalidEmailNoAtSymbol(driver);
            await validPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for wrong email format
            outcome = await testWrongEmailFormatNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 14: Invalid Email w/o '@...com' / Invalid Password
    test("TC14", async function tc14() {
        const testNum = 14;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Invalid Email w/o '@...com' / Invalid password
            await invalidEmailNoAtSymbol(driver);
            await invalidPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for wrong email format
            outcome = await testWrongEmailFormatNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 15: Invalid Email w/o '@...com' / No Password
    test("TC15", async function tc15() {
        const testNum = 15;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Invalid Email w/o '@...com' / No password
            await invalidEmailNoAtSymbol(driver);
            await noPassword(driver);

            //Click login button
            await clickLoginButton(driver);

            //Test for wrong email format
            outcome = await testWrongEmailFormatNotification(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 16: Check Password Visibility
    test("TC16", async function tc16() {
        const testNum = 16;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter No Email / No Password
            await noEmail();
            await noPassword();

            //Test for wrong email format
            outcome = await testPasswordVisibility(driver, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 17: Check enter key functionality while email input box is selected
    test("TC17", async function tc17() {
        const testNum = 17;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid Email / Valid Password
            await validEmail(driver, testNum);
            await validPassword(driver, testNum);

            //Find email input box webElement to test enter key
            var element = await driver.findElement(By.xpath(emailInputBoxXpath))

            //Test enter key functionality on the given element
            outcome = await testEnterKeyFunctionality(driver, element, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 18: Check enter key functionality while password input box is selected
    test("TC18", async function tc18() {
        const testNum = 18;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid Email / Valid Password
            await validEmail(driver, testNum);
            await validPassword(driver, testNum);

            //Find password input box webElement to test enter key
            var element = await driver.findElement(By.xpath(passwordInputBoxXpath))

            //Test enter key functionality on the given element
            outcome = await testEnterKeyFunctionality(driver, element, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);

    //Test Case 19: Check enter key functionality while log in button is selected
    test("TC19", async function tc19() {
        const testNum = 19;
        var outcome = false;

        //Create the webDriver (Chrome) and open an instance of the test page
        const driver = createDriver();

        try {
            announceTC(testNum);

            //Enter Valid Email / Valid Password
            await validEmail(driver, testNum);
            await validPassword(driver, testNum);

            //Find log in button webElement to test enter key
            var element = await driver.findElement(By.xpath(logInButtonXpath))

            //Test enter key functionality on the given element
            outcome = await testEnterKeyFunctionality(driver, element, testNum);

            //Exit the driver instance
            await driver.quit();
        } catch (error) {
            console.log(error);
            console.log(tcErrorMsg(testNum));

            //Exit the driver instance
            await driver.quit();
        }
        expect(outcome).toBe(true);
    }, jestWaitTime);
});

afterAll(() => endOfTestsMsg());

//
// 
// HELPER FUNCTIONS
//
//

//Creates a driver for each test case
function createDriver() {

    //Create object for controlling ChromeDriver options.
    var options = new chrome.Options();

    //Set the options
    //excludeSwitches disables chrome logging.  It was logging unnecessary info.
    //windowSize controls the browser window size in pixels.
    options
        .excludeSwitches("enable-logging")
        .windowSize({ width: 600, height: 600 });

    //Creates a new WebDriver instance
    //Provides control over a browser session.
    const driver = new webDriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    //Open an instance of this web page
    driver.get(loginPageURL);

    return driver;
}

//Click log in button on login page
async function clickLoginButton(driver) {
    //Click log in button.
    var logInButton = await driver.wait(until.elementLocated(By.xpath(logInButtonXpath)), selWaitTime);
    await logInButton.click();

    //Wait a fixed time until login info is processed (in ms)
    await driver.sleep(loginWaitTime);
}

//Find and enter valid email on login page
async function validEmail(driver) {
    console.log("   Entering valid email.")
    try {
        //Click email input box.
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
        await emailBox.click();

        //Input email
        await driver.findElement(By.xpath(emailInputBoxXpath)).sendKeys(validEmailString);
    } catch (error) {
        throw error;
    }
}

//Find and enter invalid email on login page
async function invalidEmail(driver) {
    console.log("   Entering invalid email.")
    try {
        //Click email input box.
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
        await emailBox.click();

        //Input email
        await driver.findElement(By.xpath(emailInputBoxXpath)).sendKeys(invalidEmailString);
    } catch (error) {
        throw error;
    }
}

//Find and enter valid email with no @ symbol on login page.
async function validEmailNoAtSymbol(driver) {
    console.log("   Entering valid email without '@' symbol.")
    try {
        //Click email input box.
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
        await emailBox.click();

        //Input email
        await driver.findElement(By.xpath(emailInputBoxXpath)).sendKeys(validEmailStringBadFormat);
    } catch (error) {
        throw error;
    }
}

//Find and enter invalid email with no @ symbol on login page.
async function invalidEmailNoAtSymbol(driver) {
    console.log("   Entering invalid email without '@' symbol.")
    try {
        //Click email input box.
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
        await emailBox.click();

        //Input email
        await driver.findElement(By.xpath(emailInputBoxXpath)).sendKeys(invalidEmailStringBadFormat);
    } catch (error) {
        throw error;
    }
}

//Indicate that no email is being entered.
async function noEmail() {
    console.log("   No email entered.")
}

//Find and enter valid password on login page.
async function validPassword(driver) {
    console.log("   Entering valid password.")
    try {
        //Click password input box.
        var passwordBox = await driver.wait(until.elementLocated(By.xpath(passwordInputBoxXpath)), selWaitTime);
        await passwordBox.click();

        //Input password.
        driver.findElement(By.xpath(passwordInputBoxXpath)).sendKeys(validPasswordString);
    } catch (error) {
        throw error;
    }
}

//Find and enter invalid password on login page.
async function invalidPassword(driver) {
    console.log("   Entering invalid password.")
    try {
        //Click password input box.
        var passwordBox = await driver.wait(until.elementLocated(By.xpath(passwordInputBoxXpath)), selWaitTime);
        await passwordBox.click();

        //Input password.
        driver.findElement(By.xpath(passwordInputBoxXpath)).sendKeys(invalidPasswordString);
    } catch (error) {
        throw error;
    }
}

//Indicate that no password is being entered.
async function noPassword() {
    console.log("   No password entered.")
}

//Announces success if logout button is visible on admin dashboard page.
//Use this if a successful login is the goal.
async function testSuccessfulLogin(driver, testNum) {
    console.log("   Testing log in.");
    console.log("   Expected Outcome:  Log in accepted.");
    try {
        //Try to find logout button
        var logoutButton = await driver.wait(until.elementLocated(By.xpath(logOutButtonXpath)), selWaitTime);

        //If logout button is displayed, login was successful.
        if (await logoutButton.isDisplayed()) {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}

//Announces success if email/password input gets cleared due to wrong credentials.
//Use this if an unsuccessful login is the goal.
async function testUnsuccessfulLogin(driver, testNum) {
    console.log("   Testing log in.");
    console.log("   Expected Outcome:  Log in not accepted.");
    try {
        //Try to find email input box
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);

        //If email input box is empty, login was unsuccessful.
        if (await emailBox.getAttribute("value") === "") {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}

//Announces success if notification appears when email field is empty.
//Use this for empty email field tests.
async function testEmptyEmailNotification(driver, testNum) {
    console.log("   Testing log in.");
    console.log("   Expected Outcome:  'Please fill out this field.' notification pops up for email input.");
    try {
        //Try to find the alert message
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
        var emailAlert = await emailBox.getAttribute('validationMessage');

        //If alert message is displayed, login was not successful and user is notified.
        if (emailAlert === "Please fill out this field.") {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}

//Announces success if notification appears when password field is empty.
//Use this for empty password field tests.
async function testEmptyPasswordNotification(driver, testNum) {
    console.log("   Testing log in.");
    console.log("   Expected Outcome:  'Please fill out this field.' notification pops up for password input.");
    try {
        //Try to find the alert message
        var passwordBox = await driver.wait(until.elementLocated(By.xpath(passwordInputBoxXpath)), selWaitTime);
        var pwAlert = await passwordBox.getAttribute('validationMessage');

        //If alert message is displayed, login was not successful and user is notified.
        if (pwAlert === "Please fill out this field.") {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}

//Announces success if notification appears when email field is empty.
//Use this for empty email field tests.
async function testWrongEmailFormatNotification(driver, testNum) {
    console.log("   Testing log in.");
    console.log("   Expected Outcome:  'Please include an '@' in the email address.' notification pops up for email input.");
    try {
        //Try to find the alert message and user text entered.
        var emailBox = await driver.wait(until.elementLocated(By.xpath(emailInputBoxXpath)), selWaitTime);
        var emailAlert = await emailBox.getAttribute("validationMessage");
        var emailValue = await emailBox.getAttribute("value");

        //If alert message is displayed, login was not successful and user is notified.
        if (emailAlert === "Please include an '@' in the email address. '" + emailValue + "' is missing an '@'.") {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}

//Announces success if the password input box is of type 'password'.
//Use this for password visibility tests.
async function testPasswordVisibility(driver, testNum) {
    console.log("   Testing password visibility.");
    console.log("   Expected Outcome:   Password text is masked.")

    try {
        var passwordBox = await driver.wait(until.elementLocated(By.xpath(passwordInputBoxXpath)), selWaitTime);
        var passwordVisbility = await passwordBox.getAttribute("type")

        if (passwordVisbility === "password") {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}

//Announces success if sending an 'enter key pressed command' logs you in.
//Use this for enter key functionality tests.
async function testEnterKeyFunctionality(driver, element, testNum) {
    console.log("   Testing enter key functionality.");
    console.log("   Expected Outcome:   Log in successful.");
    try {
        //Hit the enter key on the webElement we passed in.
        element.sendKeys(Key.ENTER);

        //Try to find logout button.
        var logoutButton = await driver.wait(until.elementLocated(By.xpath(logOutButtonXpath)), selWaitTime);

        //If logout button is displayed, login was successful.
        if (await logoutButton.isDisplayed()) {
            console.log(tcSuccessMsg(testNum));
            return true;
        }
    } catch (error) {
        throw error;
    }
}


//
// 
// MESSAGE FUNCTIONS
// Used to indicate outcome of test cases.
// 
//

//Log a header for the start of a test.
function announceTC(testNum) {
    //If this is the first test to run, announce it.
    if (!firstTest) {
        console.log("<-------------------------------------------->\nTC" + testNum + " RUNNING\n");
    } else {
        console.log("<---------------START OF TESTS--------------->\nTC" + testNum + " RUNNING\n");
        firstTest = false;
    }
}

//Print message to signify the end of testing.
function endOfTestsMsg() {
    console.log("<----------------END OF TESTS---------------->\n\n");
}

//Print result of test.
function tcSuccessMsg(testNum) {
    return "\nTest Case " + testNum + " Successful";
}

//Print result of test.
function tcFailureMsg(testNum) {
    return "\nTest Case " + testNum + " Failed";
}

//Print result of test.
function tcErrorMsg(testNum) {
    return "\nTest Case " + testNum + " failed due to error.";
}