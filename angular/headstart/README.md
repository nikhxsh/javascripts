## TypeScript vs JavaScript

* The reason the file ends in .ts instead of .js is that Angular is written in a superset of JavaScript called TypeScript.

* TypeScript is the ES6 version of JavaScript plus a few other TypeScript only features which Angular needs in order to work.

* Transpilation

	* Browsers don't support TypeScript. Browsers barely support ES6 JavaScript. We use something called a transpiler which converts from one language to another.

	* At the tsconfig.json file you can see the target is set to ES5.

	* The process of converting TypeScript into ES5 is called transpilation and we use a tool called tsc to compile on the command line.

## Module

* We are using the term module for two different concepts. In JavaScript the term module generally refers to code which exists in a 
  single file. 
	* An NgModule is a different concept, it combines code from different files together into one package.
	*  An NgModule therefore contains functionality from multiple files a module refers to functionality in a single file.

##  HTML is a set of written instructions for how to display a web page.

* The browser reads the HTML and creates something called a DOM, a Document Object Model. This is the manifestation of those HTML
  instructions in memory.
* Changing the HTML doesn't automatically update the webpage unless the user refreshes the browser, changing the DOM however instantly
  updates the webpage.

## Binding

* With the [] we are binding to an input of a Component.

* With the () we are binding to an output of a Component.

* This is what we call one-way data binding, since data only flows one way, either into or out of a component.

## SPA

* There is only ever a single page returned from the server, all further modifications of the page are handled by the client and 
  that is why it is called a Single Page Application.
  
* The advantagesThe advantages of an SPA are:

	* Can be faster. Instead of making a time-consuming request to a far away server every time the URL changes the client app 
    updates the page much faster.

	* Less bandwidth required. We don't send over a big html page for every URL change, instead we might just call a smaller API 
    which returns just enough data to render the change in the page.

	* Convenience. Now a single developer can build most of the functionality of a site instead of splitting the effort between a 
    front end and server side developer.

	* Angular has a couple of modules which let us implement our application as an SPA, the concept as a whole in Angular is called the   
    Component Router and in this section you will learn how to build an SPA in Angular using the component router.

## TypeScript

* `npm install -g typescript` 
* `tsc –v`
  And it should print something like >  Version 1.8.0
* We can compile a typescript file into a javascript file by calling: `tsc hello.ts`
* We can watch a typescript file for changes and compile it automatically with: `tsc -w hello.ts`
  TypeScript is a super-set of ES6

## Reactive Programming with RxJS

* RxJS stands for *R*eactive E*x*tensions for *J*ava*S*cript, and its a library that gives us an implementation 
  of Observables for JavaScript.

* Streams
	1. Streams are a sequence of values over time
	2. For example a number that goes up by 1 every second might have a stream that looks like
		`[0,1,2,3,4]`
	3. Another stream might be a sequence of x and y positions of mouse click events, like so:
		`[(12,34), (345,22), (1,993)]`

* Reactive programming is the idea that you can create your entire program just by defining the different 
    streams and the operations that are performed on those streams.

* With reactive programming we stop thinking about variables, instead we think in terms of streams 
    and how those streams are connected together.

* Reactive programming is the idea we can define an application as a series of different streams with
    operations that connect the different streams together and which are automatically called when
    new values are pushed onto those streams.

* Observables

	1. Observables is a new primitive type which acts as a blueprint for how we want to create streams,
       subscribe to them, react to new values, and combine streams together to build new ones.

	2. Observables might become a core part of the JavaScript language in the future, so we can think of RxJS 
	   as a placeholder for when that arrives.

	3. An observable isn't a stream. An observable is a blueprint which describes a set of streams and how
       they are connected together with operations.

        a. __interval__

          `let obs = Rx.Observable.interval(1000);`

          The operation interval takes as the first param the number of milliseconds between each push of
          the number onto the stream.

        b. __subscriber__
         This observable is cold, that means it is not currently pushing out numbers.
         The observable will become hot and start pushing numbers onto it is first stream, when it gets it is
         first subscriber

          `obs.subscribe(value => console.log("Subscriber: " + value));`

         By calling subscribe onto an observable it:
          Turns the observable hot so it starts producing.
          Lets us pass in a callback function so we react when anything is pushed onto the final stream in
          the observable chain.

        c. __take__
         We pass to that operator the number of items we want to take from the first stream. It creates a
         second stream and only pushes onto it the number of items we've requested,

          `let obs = Rx.Observable.interval(1000).take(3);`

        d. __map__
         Finally I want to add another operator called map, this takes as input the output stream from take,
         convert each value to a date and pushes that out onto a third stream

          `let obs = Rx.Observable.interval(1000).take(3).map((v) => Date.now());`

## RxJS & Angular

* Angular observables

	1. **EventEmitter** > Under the hood this works via Observables.

	2. **Http** > HTTP requests in Angular are all handled via Observables.

	3. **Forms** > Reactive forms in Angular expose an observable, a stream of all the input fields in the form
         combined.

## Form control state

* The form control instance on our model encapsulates state about the control itself, such as if it is currently valid or if it is 
  been touched

	1. **Dirty & Pristine**

		- through the controls property of our myform model, for example we can print out the the dirty state of the 
        email field like

        `<pre>Dirty? {{ myform.controls.email.dirty }}</pre>`

		- Dirty is true if the user has changed the value of the control. The opposite of dirty is pristine so if we wrote

        `<pre>Pristine? {{ myform.controls.email.pristine }}</pre>`

		- This would be true if the user hasn't changed the value, and false if the user has.

	2. **Touched & Untouched**

		- Said to be touched if the the user focused on the control and then focused on something else.
        The difference between touched and dirty is that with "touched" the user doesn't need to actually
        change the value of the input control

        `<pre>Touched? {{ myform.controls.email.touched }}</pre>`

		- touched is true of the field has been touched by the user,The opposite of touched is the property untouched.

	3. **Valid & Invalid**

		- valid is true of the field doesn't have any validators or if all the validators are passing.

        `<pre>Valid? {{ myform.controls.email.valid }}</pre>`

        - Again the opposite of valid is invalid,

        `<pre>Invalid? {{ myform.controls.email.invalid }}</pre>`

		- This would be true if the control was invalid and false if it was valid.

## Dependency Injection ＆ Providers

* What is a dependency?
  - When module A in an application needs module B to run, then module B is a dependency of module A.

* The DI framework in Angular consists of 4 concepts working together:

  **Token**: This uniquely identifies something that we want injected. A dependancy of our code.

  **Dependancy**: The actual code we want injected.
  
  **Provider**: This is a map between a token and a list of dependancies.

  **Injector**: This is a function which when passed a token returns a dependancy

* **Injectors**

 1.  At the core of the DI framework is an injector. An injector is passed a token and returns a dependency (or list of).We say that an injector 
 resolves a token into a dependency.
	  - We import our injector class.
       `import { ReflectiveInjector } from '@angular/core';`

	  - We create two service classes, a MandrillService which sends email via the Mandrill platform and the SendGridService which sends email 
	   via the SendGrid platform.

		```javascript
			class MandrillService {};
			class SendGridService {};
		```

	  - We configure our injector by providing an array of classes.

		```javascript
			let injector = ReflectiveInjector.resolveAndCreate([ 
			MandrillService,
			SendGridService
			]);
		```

	  - We pass in a token, the class name, into our injector and ask it to resolve to a dependency. In this case it simply returns an instance of MandrillService

		```javascript
			let emailService = injector.get(MandrillService); 
			console.log(emailService);
			//The injector doesn't return the class, but an instance of the class instantiated with new, like so:
			emailService = new MandrillService()
		```
	  - The dependencies returned from injectors are cached. So multiple calls to the same injector for the same token will return the same instance
   		(A different injector for the same token might return a different instance of a dependency but the same injector will always return the same instance.)

* **Child Injectors**

 1. Injectors can have one or more child injectors. These behave just like the parent injector with a few additions.

	  - Each injector creates it is own instance of a dependency

		```javascript
            import { ReflectiveInjector } from '@angular/core';
            class EmailService {}
            let injector = ReflectiveInjector.resolveAndCreate([EmailService]); 
            let childInjector = injector.resolveAndCreateChild([EmailService]); ①
            console.log(injector.get(EmailService) === childInjector.get(EmailService)); // false ② 
		```
		① The childInjector and parent injector are both configured with the same providers.
		② The childInjector resolves to a different instance of the dependency compared to the parentinjector.

	  - Child injectors forward requests to their parent injector if they can't resolve the token locally.

		```javascript
            import { ReflectiveInjector } from '@angular/core';
            class EmailService {}
            let injector = ReflectiveInjector.resolveAndCreate([EmailService]);  ① 
            let childInjector = injector.resolveAndCreateChild([]);  ② 
            console.log(injector.get(EmailService) === childInjector.get(EmailService)); // true ③ 
		```
		① We configure a parent injector with EmailService.
		② We create a child injector from the parent injector, this child injector is not configured with any providers.
		③ The parent and child injectors resolve the same token and both return the same instance of the dependency.

* **Providers**

 1. we can configure injectors with providers and a provider links token to a dependency
	```javascript
        let injector = ReflectiveInjector.resolveAndCreate([
            MandrillService,
            SendGridService
        ]);

        //is in fact a shortcut for:

        let injector = ReflectiveInjector.resolveAndCreate([
            { provide: MandrillService, useClass: MandrillService },
            { provide: SendGridService, useClass: SendGridService },
        ]);
	```
 2. The provide property is the token and can either be a type, a string or an instance of something called an InjectionToken. If we wanted to 
    re-use our application and move from Mandrill to SendGrid without using DI we would have to search through all the code for where we have requested
    MandrillService to be injected and replace with SendGridService. A better solution is to configure the DI framework to return either MandrilService 
	or SendGridService depending on the context,
	```javascript
        import { ReflectiveInjector } from '@angular/core';

        class MandrillService {};
        class SendGridService {};
        let injector = ReflectiveInjector.resolveAndCreate([
       	 { provide: "EmailService", useClass: MandrillService }
        ]);

        let emailService = injector.get("EmailService");
        console.log(emailService); // new MandrillService()

        // To switch to using the SendGridService throughout our application we can just configure our injector with a different provider

        let injector = ReflectiveInjector.resolveAndCreate([
        { provide: "EmailService", useClass: SendGridService }
        ]);
	```
 4. **Provider configurations**

	  - **useClass**:  We can have a provider which maps a token to a class,

 	  ```javascript
          let injector = ReflectiveInjector.resolveAndCreate([
          	{ provide: Car, useClass: Car },
          ]);
	  ```

	  - **useExisting**: We can make two tokens map to the same thing

 	  ```javascript
          let injector = ReflectiveInjector.resolveAndCreate([
            //The token GenericEmailService resolves to an instance of GenericEmailService.
            { provide: GenericEmailService, useClass: GenericEmailService }, 
            //maps the token MandrillService to whatever the existing GenericEmailService provider points to.
            { provide: MandrillService, useExisting: GenericEmailService }, 
            //maps the token MandrillService to whatever the existing GenericEmailService provider points to.
            { provide: SendGridService, useExisting: GenericEmailService } 
          ]);
 	  ```
	  - **useValue**: If the intention however is to pass around read-only constant values then passing an object is a problem since any code 
    in your application will be able to change properties on that object. What Config points to can't be changed but the properties of Config 
	can be changed.

 	  ```javascript
            import { ReflectiveInjector } from '@angular/core';
            let injector = ReflectiveInjector.resolveAndCreate([
              { provide: "Config", useValue: Object.freeze({
                  'APIKey': 'XYZ1234ABC',
                  'APISecret': '555-123-111'
                  });
               }
            ]);

            let config = injector.get("Config");
            console.log(config); // Object {APIKey: "XYZ1234ABC", APISecret: "555-123-111"}
 	  ```
  - **useFactory**: We can also configure a provider to call a function every-time a token is requested, leaving it to the provider to figure out 
    what to return, like so:

	  ```javascript
			const isProd = true;
			let injector = ReflectiveInjector.resolveAndCreate([
			{
			provide: "EmailService",
				useFactory: () => { 
				if (isProd) {
					return new MandrillService();
				} else {
					return new SendGridService();
				}
				}
			},
			]);

			let emailService1 = injector.get("EmailService");
			console.log(emailService1); // MandrillService {}
	  ```
    When the injector resolves to this provider, it calls the useFactory function and returns whatever is returned by this function as the dependency.

 5. **Tokens**
 
	  - **String token**

	  ```javascript
        let injector = ReflectiveInjector.resolveAndCreate([
          { provide: "EmailService", useClass: MandrillService } 
        ]);
        let emailService = injector.get("EmailService");
        console.log(emailService); // new MandrillService()
	  ```
	  - **Type token**

	  ```javascript
        let injector = ReflectiveInjector.resolveAndCreate([
          { provide: EmailService, useClass: SendGridService }
        ]);
        let emailService = injector.get(EmailService);
        console.log(emailService);
	  ```
	  - **Injection token**

  	  ```javascript
		let EmailService = new InjectionToken<string>("EmailService"); 
		let injector = ReflectiveInjector.resolveAndCreate([
			{ provide: EmailService, useClass: SendGridService } 
		]);
		let emailService = injector.get(EmailService);
		console.log(emailService);
  	  ```
 6. The Injector Tree

  - We have a top level parent injector which is attached to our NgModule.
  
  - Then we have child injectors descending in a hierarchy matching the component tree. So a parent component will have a child injector 
    stemming from NgModule.

  - A child component of parent component will have a child injector stemming from Parent.

## JSONP
* JSONP is a method of performing API requests which go around the issue of CORS. JSONP treats the API as if it was a javascript file, The browser 
  then just downloads the javascript file and since browsers don't check for CORS when downloading javascript files it a works around the issue of CORS.

* That is is JSONP in a nutshell.

	1. We treat the API as a javascript file.

	2. The API wraps the JSON response in a function who is name we define.

	3. When the browser downloads the fake API script it runs it, it calls the function passing it the JSON data.

	* We can only use JSONP when:

	1. The API itself supports JSONP. It needs to return the JSON response wrapped in a function and it usually lets us pass in the function name we want 
	it to use as one of the query params.
	
	2. We can only use it for GET requests, it doesn't work for PUT/POST/DELETE and so on.

## Routing Strategies
* HashLocationStrategy
 1. To enable HashLocationStrategy in an Angular application we pass {useHash: true} when we are providing our routes with RouterModule

    `RouterModule.forRoot(routes, {useHash: true})`

 2. The # part of the url is called the hash fragment.Another way to think about the hash fragment, since it is ever sent to the server, is that its 
 for storing the state of your client application. It is therefore an ideal solution for implementing client side routing:

	• It is part of the URL so can be bookmarked and sent to other people.

	• It won't confuse the server side since the hash fragment is never sent to the server.

	• It can be programmatically changed via JavaScript.

* PathLocationStrategy

 1. This is the default strategy in Angular so we need to do nothing to enable it. It takes advantage of a relatively new HTML5 API called pushstate. 
    By using pushstate we can change the URL and not have the browser request the page from the server and without needing to use a hash fragment.

	• So if we were at `localhost:4040/search`

	• By using the pushstate API we can change the URL to `localhost:4040/artist/1234/tracks`

	•  And the browser won't make a GET request to the server for `/artist/1234/tracks`

	• Unfortunately it has one big downside, if we then reloaded the page or bookmarked and opened it later the browser would make a request to the server 
	  for `e.g. localhost:4040/artist/1234/tracks`

* base href

 1. When using the PathLocationStrategy we need to tell the browser what will be prefixed to the  requested path to generate the URL.

    `<base href='/my/app'/>`


## Testing

* Unit Testing: This is sometimes also called Isolated testing. It is the practice of testing small isolated pieces of code. If your test uses some 
  external resource, like the network or a database, it is not a unit test.

* Functional Testing: This is defined as the testing of the complete functionality of an application. In practice with web apps, this means interacting 
  with your application as it is running in a browser just like a user would interact with it in real life, i.e. via clicks on a page. This is also called 
  End To End or E2E testing.
  
* Jasmine:

 1. Jasmine is a javascript testing framework that supports a software development practice called. Behaviour Driven Development, or BDD for short. It is a specific
   flavour of Test Driven Development(TDD). Jasmine, and BDD in general, attempts to describe tests in a human readable format so that nontechnical	people can understand 
   what is being tested. For example if we wanted to test this function:

  	  ```javascript
		function helloWorld() {
			return 'Hello world!';
		}

		//We would write a jasmine test spec like so:

		describe('Hello world', () => {  //Test Suit
			it( isays hello', () => { //Test spec
				expect(helloWorld()). //expect(actual)
				 toEqual('Hello world!'); // matcher(expected) 
			});
		});
  	  ```
 2. Setup & Teardown

	- __beforeAll__: This function is called once, before all the specs in describe test suite are run.

	- __afterAll__: This function is called once after all the specs in a test suite are finished.

	- __beforeEach__: This function is called before each test specification, it function, has been run.

	- __afterEach__: This function is called after each test specification has been run.

  	  ```javascript
	    describe('Hello world', () => {
		  let expected = "";
			beforeEach(() => {
			  expected = "Hello World";
			});

			afterEach(() => {
			  expected = "";
			});

			it( isays hello', () => {
			 expect(helloWorld())
			 .toEqual(expected);
			});
		});
  	  ```
 3. Disabled and focused tests
 	- You can disable and focus test as per will:
  	  ```javascript
		xdescribe('Hello world', () => { //These tests will not be run.
			xit( isays hello', () => { //These tests will not be run.
				expect(helloWorld())
					.toEqual('Hello world!');
			});
		});
		//Conversely you can also focus on specific tests by pre-pending with f, like so:
		fdescribe('Hello world', () => { //Out of all the tests in all the tests suites and tests specs, these are the only ones that will be run.
			fit( isays hello', () => { 
				expect(helloWorld())
					.toEqual('Hello world!');
			});
		});
  	  ```
4. Karma
 - Manually running Jasmine tests by refreshing a browser tab repeatedly in different browsers every-time we edit some code can become tiresome.
 - Karma is a tool which lets us spawn browsers and run jasmine tests inside of them all from the command line.

###### by default the cli installs the karma-chrome-launcher. you could try installing a headless browser like phantomjs or karma-spec-reporter
  (https://github.com/angular/angular-cli/issues/2013)
	  