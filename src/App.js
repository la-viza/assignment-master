import React, { useState } from "react";
import './style.css';

// Object containing multipliers for different countries
const multipliers = {
  SI: 1.2,
  UA: 1.5,
  LX: 1.8,
  FR: 1.9,
  DE: 2.5,
};

// Initial base price of the parcel
const BASE_PRICE = 10;

// The function calculates the price of a single parcel
const calculatePackagePrice = (parcel, countryFrom, countryTo) => {
  const volume = Math.max(
    (parcel.width * parcel.height * parcel.length * parcel.weight) / 100000,
    1
  );

  // Calculates the initial price
  let price = BASE_PRICE * volume;

  // Multiplier based on the country of origin and destination
  const countryFromMultiplier = multipliers[countryFrom] || 1;
  const countryToMultiplier = multipliers[countryTo] || 1;
  const countryMultiplier = (countryFromMultiplier + countryToMultiplier) / 2;

  // Applying the country multiplier
  price = price * countryMultiplier;

  return price;
};

// The function handles the price for multiple packages
const calculatePrice = (packages = [], countryFrom, countryTo) => {
  const packagesPrices = packages.map((parcel) => ({
    price: calculatePackagePrice(parcel, countryFrom, countryTo),
  }));

  // Calculates the total price considering the qunatity of packages
  const totalPrice = packagesPrices.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price;
  }, 0);

  return {
    packages: packagesPrices,
    totalPrice,
  };
};

// Main component that renders the form
export default function ParcelShippingForm() {
  const [parcels, setParcels] = useState([
    {
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      countryFrom: "",
      countryTo: "",
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handles the changes in the form fields and adding the option to accept numbers value only.
  const handleChange = (event, index) => {
    const updatedParcels = [...parcels];
    const { name, value } = event.target;
    if (name === "countryFrom" || name === "countryTo") {
      // Check if the selected country is valid
      if (multipliers[value]) {
        updatedParcels[index][name] = value;
        setParcels(updatedParcels);
      }
    } else if (!isNaN(value)) {
      // Check if the input is a number
      updatedParcels[index][name] = parseInt(value);
      setParcels(updatedParcels);
    }
  };

  // Handles the submit event of the form
  const handleSubmit = (event) => {
    // prevent default form submission behavior
    event.preventDefault();

    // calculate the total price of all packages considering the  origin and destination countries
    const prices = calculatePrice(
      parcels,
      parcels[0].countryFrom,
      parcels[0].countryTo
    );
    setTotalPrice(prices.totalPrice);
  };

  // to add a new parcel to the state
  const handleAddParcel = () => {
    setParcels([
      ...parcels,
      {
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        countryFrom: "",
        countryTo: "",
      },
    ]);
  };

  // to remove a new parcel at the specified index
  const handleRemoveParcel = (index) => {
    const updatedParcels = [...parcels];
    updatedParcels.splice(index, 1);
    setParcels(updatedParcels);
  };

  // JSX/ UI
  return (
 
    
        <div className="form card" >
      
        <form  onSubmit={handleSubmit}>
        
          {parcels.map((parcel, index) => (
            <div key={index}>
         
             <div className="form-labels">
  <label className="countriesChosen">
    Ship from:
      </label>
    <select className="selectMenu"
      name="countryFrom"
      value={parcel.countryFrom}
      onChange={(event) => handleChange(event, index)}
    >
      <option value="">Select</option>
      <option value="SI">Slovenia</option>
      <option value="UA">Ukraine</option>
      <option value="LX">Luxembourg</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option>
    </select>

  <label className="countriesChosen">
   Ship to:
    <select
    className="selectMenu"
      name="countryTo"
      value={parcel.countryTo}
      onChange={(event) => handleChange(event, index)}
    >
      <option value="">Select</option>
      <option value="SI">Slovenia</option>
      <option value="UA">Ukraine</option>
      <option value="LX">Luxembourg</option>
      <option value="FR">France</option>
      <option value="DE">Germany</option>
    </select>
  </label>
  <label >
    Weight (kgs):
    <input
    className="weightInput"
      type="number"
      name="weight"
      value={parcel.weight}
      onChange={(event) => handleChange(event, index)}
    />
  </label>
  <label className="dimensions">
    Length(cm):
    <input
      type="number"
      name="length"
      value={parcel.length}
      onChange={(event) => handleChange(event, index)}
    />
  </label>
  <label className="dimensions">
    Width(cm):
    <input
      type="number"
      name="width"
      value={parcel.width}
      onChange={(event) => handleChange(event, index)}
    />
  </label>
  <label className="dimensions heightInput">
    Height(cm):
    <input
      type="number"
                  name="height"
                  value={parcel.height}
                  onChange={(event) => handleChange(event, index)}
                />
              </label>
               <br />

           <div class="btn">
          <button className="btnCalculate"
          type="submit"><span>Calculate</span>
    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="#eef2ff" stroke-width="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="#eef2ff"></path> </svg></button>
          {/* To display a total price in two-decimals format  */}
          <p className="totalPrice">Total Price: {totalPrice.toFixed(2)}&euro;</p>
      
          <div>
           <button className="btnAddRemove" type="button" onClick={handleAddParcel}>
            + parcel
          </button>
          
          <button className="btnAddRemove" type="button" onClick={handleRemoveParcel}>
            - parcel
          </button> 
          </div>
          </div>
          
              <br />
            </div>
            </div>
          ))}
          
        </form>
      </div>
    
   
  );
}
