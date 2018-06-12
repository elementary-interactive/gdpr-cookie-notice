GDPR Cookie Notice
=============

This is a javascript solution to show a gdpr compliant cookie notice on your website.

##### Demo

Check this site for a quick demo: https://passatgt.github.io/gdpr-cookie-notice/

##### How it works?

Include the scripts.js and style.css files on your site from the dist folder. Init the script with the following config file:

```
gdprCookieNotice({
  locale: 'en', //This is the default value
  timeout: 500, //Time until the cookie bar appears
  expiration: 30, //This is the default value, in days
  domain: '.yoursite.com', //If you run the same cookie notice on all subdomains, define the main domain starting with a .
  implicit: true, //Accept cookies on page scroll automatically
  statement: 'https://google.com', //Link to your cookie statement page
  performance: ['JSESSIONID'], //Cookies in the performance category.
  analytics: ['ga'], //Cookies in the analytics category.
  marketing: false, //Markegint cookie category won't appear in the modal, set it to false, if the website does not use marketing cookies
  defaultChecked: false //Sets if the checkboxes are checked or not by default
});
```

User will see a banner at the bottom of the screen, describing why the site runs cookies. Clicking on Cookie settings will let the user select which type of cookies they might allow on the site(if something is not allowed, all cookies defined in the config file will be deleted automatically on page load). The bar will be visible always if they don't allow all types of cookies to load, just to annoy them a little.

You can use listen to the gdprCookiesEnabled event to load scripts on your site only when the cookies are enabled by the user.
```
  document.addEventListener('gdprCookiesEnabled', function (e) {
    if(e.detail.analytics) { //checks if analytics cookies are enabled
      // var snippet =    insert analytics code
      //$('head').append(snippet);
      // or whatever you want...
    }
  });
```
