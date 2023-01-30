# Frontend Mentor - 3-column preview card component solution

This is my solution for a take-home assignment for the Frontend Engineer role at Eurosender.

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)

## Overview

This code is a shipping cost calculator for multiple packages. It's implemented as a React component called "ParcelShippingForm". The component makes use of useState hook to store the state of the parcels being shipped. The user can add or remove parcels from the list and enter details such as the weight, length, width, height, and country of origin/destination in each form. Upon submission, the prices of each parcel are calculated using a calculatePrice function, which uses a calculatePackagePrice function to determine the price of each individual parcel. The price is calculated based on the parcel's volume, base price, and country multipliers (I used the information provided in API/priceEngine.js). The total price of all parcels is displayed to the user after submission.

### Links

- Live Site URL: (https://shipping-form-challenge.netlify.app)

## My process

Before starting the coding, I always begin by sketching the project in my notebook. Then, I made a basic HTML form layout for the parcel ordering form. After that, I created a new React application using Node.js modules in VSCode's terminal. I converted the HTML form to JSX in App.js and built a React component "ParcelShippingForm" for data manipulation. Once the React component was complete, I added a simple, user-friendly, and responsive design to the shipping form in the CSS file.

### Built with

- Desktop-first workflow
- [React](https://reactjs.org/) - JS library
- JSX
- Node.js (https://nodejs.org)
- CSS custom properties
- Flexbox

## Author

- Website - [Luiza Moshkin](https://luiza-moshkin.netlify.app/)
- LinkedIn - [Luiza Moshkin](https://www.linkedin.com/in/luiza-moshkin)
- GitHub - [Luiza Moshkin](https://github.com/la-viza)

## Comments

When I looked at the requirements of the task, I knew that it's going to be a real challenge for me. Nevertheless, I accepted the challenge of the task despite its difficulties, focusing on my existing skills rather than quitting.

Here is the checklist of all the requirements that I was abble to solve:

- The form should contain 2 select fields, each representing an origin and destination countries.
- The form should allow users to add and remove packages from the order
- Each package needs to have 4 fields: weight, height, width and length, whereas each is required to be filled by the user
- After each change, user should see prices for individual packages. The price can be fetched from the `/api/quote` endpoint (see API documentation below)
- Make sure that the prices displayed are in a proper 2 decimals format

The task I didn't complete:

- TypeScript is not being used in the app, due to my lack of proficiency in it. But I'm a quick learner, studying hard every day, and expect to polish my TypeScript skills within one month.
- A total price for multiple packages is not displayed.
- By pressing on the "Make an order" button, a new order should be created by calling the `/api/order` endpoint (see documentation below) and a confirmation screen displayed
- As a bonus, you can implement a form validation based on the response from the API.
