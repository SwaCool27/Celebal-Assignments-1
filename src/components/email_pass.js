import React, { Component } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {CitySelect,CountrySelect,StateSelect,} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

// Regular expressions and validators
const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneNoValidator = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
const aadharValidator = /^\d{12}$/; // Regex for Aadhar card (12 digits)
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // Regex for PAN card (5 letters, 4 digits, 1 letter)

class FormComponent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      firstNameError: "",
      lastNameError: "",
      emailAddressError: "",
      passwordError: "",
      phoneError: "",
      isFormSubmitted: false,
      showPassword: false,
      aadharNumber: "",
      panNumber: "",
      aadharError: "",
      panError: "",
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validateEmailAddress = this.validateEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    return;
  }

  handlePhoneChange(value) {
    this.setState({
      phoneNumber: value
    });
  }

  togglePasswordVisibility() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }

  handleBlur(event) {
    const { name } = event.target;
    this.validateField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formFields = [
      "phoneNumber",
      "firstName",
      "lastName",
      "emailAddress",
      "password",
      "aadharNumber",
      "panNumber"
    ];
    let isValid = true;
  formFields.forEach(field => {
    isValid = this.validateField(field) && isValid;
  });

  if (isValid) {
    this.setState({ isFormSubmitted: true }, () => {
      console.log("isFormSubmitted:", this.state.isFormSubmitted);
    });
  } else {
    this.setState({ isFormSubmitted: false }, () => {
      console.log("isFormSubmitted:", this.state.isFormSubmitted);
    });
  }

  return this.state.isFormSubmitted;
}
  validateField(name) {
    let isValid = false;

    if (name === "phoneNumber") isValid = this.validatePhoneNumber();
    else if (name === "lastName") isValid = this.validateLastName();
    else if (name === "emailAddress") isValid = this.validateEmailAddress();
    else if (name === "password") isValid = this.validatePassword();
    else if (name === "firstName") isValid = this.validateFirstName();
    else if (name === "aadharNumber") isValid = this.validateAadhar();
    else if (name === "panNumber") isValid = this.validatePan();
    return isValid;
  }

  validateFirstName() {
    let firstNameError = "";
    const value = this.state.firstName;
    if (value.trim() === "") firstNameError = "First Name is required";

    this.setState({
      firstNameError
    });
    return firstNameError === "" ? "true" : "false";
  }

  validateLastName() {
    let lastNameError = "";
    const value = this.state.lastName;
    if (value.trim() === "") lastNameError = "Last Name is required";

    this.setState({
      lastNameError
    });
    return lastNameError === "" ? "true" : "false";
  }

  validateEmailAddress() {
    let emailAddressError = "";
    const value = this.state.emailAddress;
    if (value.trim() === "") emailAddressError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailAddressError = "Email is not valid";

    this.setState({
      emailAddressError
    });
    return emailAddressError === "" ? "true" : "false";
  }

  validatePassword() {
    let passwordError = "";
    const value = this.state.password;
    if (value.trim() === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    this.setState({
      passwordError
    });
    return passwordError === "" ? "true" : "false";
  }

  validatePhoneNumber() {
    let phoneError = "";
    const phoneNumber = this.state.phoneNumber;

    if (!phoneNumber) {
      phoneError = "Phone number is required";
  } else if (phoneNoValidator.test(phoneNumber)) {
      phoneError = "";
  } else {
      phoneError = "Please enter a valid phone number";
  }

  this.setState({
      phoneError
  });

  return phoneError === "" ? "true" : "false";
}

  /*validatePasswordConfirmation() {
    let passwordConfirmationError = "";
    if (this.state.password !== this.state.passwordConfirmation)
      passwordConfirmationError = "Password does not match Confirmation";

    this.setState({
      passwordConfirmationError
    });
    return passwordConfirmationError === "";
  }*/

  // Aadhar Card validation function
  validateAadhar() {
    let aadharError = "";
    const value = this.state.aadharNumber;
    if (!aadharValidator.test(value))
      aadharError = "Please enter a valid Aadhar Card number";

    this.setState({
      aadharError
    });
    return aadharError === "" ? "true" : "false";
  }

  // PAN Card validation function
  validatePan() {
    let panError = "";
    const value = this.state.panNumber;
    if (!panValidator.test(value))
      panError = "Please enter a valid PAN Card number";

    this.setState({
      panError
    });
    return panError === "" ? "true" : "false";
  }

  handleCountryChange(value) {
    console.log(value);
    this.setState({
      selectedCountry: value
    });
  }

  handleStateChange(value) {
    console.log(value);

    this.setState({
      selectedState: value
    });
  }

  handleCityChange(value) {
    console.log(value);

    this.setState({
      selectedCity: value
    });
  }

  render() {
    return (
      <div className="main">
        <h3>SignUp Form</h3>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>Email Address: {this.state.emailAddress}</div>
            <div>Phone Number: {this.state.phoneNumber}</div>
            <div>Country: {this.state.selectedCountry.name}</div>
            <div>State: {this.state.selectedState.name}</div>
            <div>City: {this.state.selectedCity.name}</div>
            <div>Aadhar Card Number: {this.state.aadharNumber}</div>
            <div>PAN Card Number: {this.state.panNumber}</div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.firstNameError && (
                <div className="errorMsg">{this.state.firstNameError}</div>
              )}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.lastNameError && (
                <div className="errorMsg">{this.state.lastNameError}</div>
              )}
              <input
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                value={this.state.emailAddress}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.emailAddressError && (
                <div className="errorMsg">{this.state.emailAddressError}</div>
              )}
              <input
                type={this.state.showPassword ? 'text' : 'password'} // Toggle input type
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <button type="button" onClick={this.togglePasswordVisibility}>
                {this.state.showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <br />
              {this.state.passwordError && (
                <div className="errorMsg">{this.state.passwordError}</div>
              )}

              <PhoneInput
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handlePhoneChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.phoneError && (
                <div className="errorMsg">{this.state.phoneError}</div>
              )}

              

              {/* Aadhar Card input field */}
              <input
                type="text"
                placeholder="Aadhar Card Number"
                name="aadharNumber"
                value={this.state.aadharNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.aadharError && (
                <div className="errorMsg">{this.state.aadharError}</div>
              )}

              {/* PAN Card input field */}
              <input
                type="text"
                placeholder="PAN Card Number"
                name="panNumber"
                value={this.state.panNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {this.state.panError && (
                <div className="errorMsg">{this.state.panError}</div>
              )}
                <CountrySelect
                type="text"
                value={this.state.selectedCountry.id}
                onChange={this.handleCountryChange}
                placeHolder="Select Country"
              />
              <br/>
              <StateSelect
                type="text"
                value={this.state.selectedState.id}
                countryid={this.state.selectedCountry.id}
                onChange={this.handleStateChange}
                placeHolder="Select State"
              />
              <br/>
              <CitySelect
                type="text"
                value={this.state.selectedCity.id}
                countryid={this.state.selectedCountry.id}
                stateid={this.state.selectedState.id}
                onChange={this.handleCityChange}
                placeHolder="Select City"
                />

              <button type='submit'>Signup</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;