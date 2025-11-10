


# Rapid Application Development with AWS Amplify

<a href="https://www.packtpub.com/product/rapid-application-development-with-aws-amplify/9781800207233?utm_source=github&utm_medium=repository&utm_campaign=9781800207233"><img src="https://static.packt-cdn.com/products/9781800207233/cover/smaller" alt="Rapid Application Development with AWS Amplify" height="256px" align="right"></a>

This is the code repository for [Rapid Application Development with AWS Amplify](https://www.packtpub.com/product/rapid-application-development-with-aws-amplify/9781800207233?utm_source=github&utm_medium=repository&utm_campaign=9781800207233), published by Packt.

**Build cloud-native mobile and web apps from scratch through continuous delivery and test automation**

## What is this book about?
AWS Amplify is a modern toolkit that includes a command line interface (CLI); libraries for JS, iOS, and Android programming; UI component libraries for frameworks like React, Angular, and Vue.js for web development, and React Native and Flutter for mobile development.

This book covers the following exciting features:
* Build React and React Native apps with Amplify and TypeScript
* Explore pre-built Amplify UI components for rapid prototyping
* Add user management with Amplify authentication to your app
* Use Amplify GraphQL to create a blog post
* Discover how to upload photos to Amplify Storage

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/1800207239) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. For example, Chapter02.

The code will look like the following:
```
function setInput(key, value) {
setFormState({ ...formState, [key]: value })
}
async function fetchTodos() {
try {
const todoData = await
API.graphql(graphqlOperation(listTodos))
const todos = todoData.data.listTodos.items
setTodos(todos)
} catch (err) { console.log('error fetching todos') }
}
```

**Following is what you need for this book:**

This book is for developers and tech companies looking to develop cloud-native products rapidly with the AWS ecosystem. Web and mobile developers with little-to-no experience in TypeScript programming will also find this book helpful. Although no prior experience with AWS or TypeScript is required, basic familiarity with modern frameworks such as React and React Native is useful.

With the following software and hardware list you can run all code files present in the book (Chapter 1-9).

### Software and Hardware List

| Chapter  | Software required                     | OS required                        |
| -------- | --------------------------------------| -----------------------------------|
| 1-9      | Visual Studio Code 1.57.0+ (IDE)      | Windows, Mac OS X, and Linux (Any) |
| 1-9      | Xcode 12.4+ (IDE)                     | Mac OS only(optional)              |
| 1-9      | AWS Account (free trial)              | Windows, Mac OS X, and Linux (Any) |
| 1-9      | Android Studio 4.2.1+ (IDE)           | Windows, Mac OS X, and Linux (Any) |
| 1-9      | React 17+ & React Native 0.64+        | Windows, Mac OS X, and Linux (Any) |
| 1-9      | Node.js                               | Windows, Mac OS X, and Linux (Any) |
| 1-9      | Expo SDK 41+                          | Windows, Mac OS X, and Linux (Any) |
| 1-9      | Typescript 4.3.2+                     | Windows, Mac OS X, and Linux (Any) |


[Rapid Application Development with AWS Amplify](https://github.com/PacktPublishing/Rapid-Application-Development-with-AWS-Amplify)

Follow the Rapid Application Development with AWS Amplify book to setup different AWS Amplify projects.

In the project directory of each chapter, you can run:

### `yarn install`
Install the dependencies

## For ReactJS project

### `yarn start`

Runs the app in the development mode on the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## For React Native and Expo projects

### `yarn ios`

Runs the app in the development mode on the iOS simulator.

The app will reload if you make edits.<br />
You will also see any lint errors in the console.

**Note: Requires macOS and XCode**

### `yarn android`

Runs the app in the development mode on the android emulator.<br />

The app will reload if you make edits.<br />
You will also see any lint errors in the console.

**Note: Requires Android Studio**

<hr/>

We also provide a PDF file that has color images of the screenshots/diagrams used in this book. [Click here to download it](https://static.packt-cdn.com/downloads/9781800207233_ColorImages.pdf).



### Related products <Other books you may enjoy>
* Building Low-Code Applications with Mendix [[Packt]](https://www.packtpub.com/product/building-low-code-applications-with-mendix/9781800201422?utm_source=github&utm_medium=repository&utm_campaign=9781800201422) [[Amazon]](https://www.amazon.com/dp/1800201427)

* Building Vue.js Applications with GraphQL [[Packt]](https://www.packtpub.com/product/building-vue-js-applications-with-graphql/9781800565074?utm_source=github&utm_medium=repository&utm_campaign=9781800565074) [[Amazon]](https://www.amazon.com/dp/1800565070)

## Get to Know the Author
**Adrian Leung**
is a full-stack cloud native engineer and Agile Transformation Coach with a deep understanding of Business and Organisational Agilities. His background has led him to coach many enterprises in digital transformation with Design Thinking and Agile as well as enterprise scalable cloud-native solution architectures to deliver real value to their customers.
  
Adrian earned a degree in Applied Information Technology from The University of Newcastle, Australia in 2007. His work history includes helping many enterprises in Hong Kong with their digital transformation journey. He is currently the Founder of Adventvr that is building amazing products and espousing the benefits of serverless systems whenever he has the chance.


### Download a free PDF

 <i>If you have already purchased a print or Kindle version of this book, you can get a DRM-free PDF version at no cost.<br>Simply click on the link to claim your free PDF.</i>
<p align="center"> <a href="https://packt.link/free-ebook/9781800207233">https://packt.link/free-ebook/9781800207233 </a> </p>