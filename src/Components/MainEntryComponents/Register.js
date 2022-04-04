import React, { useState } from "react";
import { registerUser } from "../../utils/apiCalls";
import { Link } from "react-router-dom";
import "../../css/register.css";
import "../../css/MainEntry/mainEntry.css";

export default function Register() {
  const initialUserForm = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  const [userData, setUserData] = useState({ ...initialUserForm });
  const [duplicatePassword, setDuplicatePassword] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);
  const [resStatus, setResStatus] = useState(false);

  function handleMainChange({ target }) {
    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  }

  function handleDupliecatePasswordChange({ target }) {
    setDuplicatePassword(target.value);
  }

  function handleSubmit() {
    registerUser(userData);
    setResStatus(true);
  }

  function validatePasswordsMatch() {
    if (userData.password.localeCompare(duplicatePassword) === 0) {
      if (submissionCount > 0) {
        setSubmissionCount(0);
        return true;
      } else {
        return true;
      }
    } else {
      setSubmissionCount(1);
      return false;
    }
  }

  function handleFormClear(event) {
    setUserData({
      ...userData,
      password: "",
    });
    setDuplicatePassword("");
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    if (validatePasswordsMatch()) {
      handleSubmit();
    } else {
      handleFormClear();
    }
  }

  function startingDisplay() {
    return (
      <form
        className='main-forms'
        autoComplete='off'
        onSubmit={onSubmitHandler}
      >
        <h3> Welcome to Delete! </h3>

        <input
          type='text'
          placeholder='First Name'
          value={userData.firstName}
          id='firstName'
          name='firstName'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='Last Name'
          value={userData.lastName}
          id='lastName'
          name='lastName'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='Phone Number'
          value={userData.phoneNumber}
          id='phoneNumber'
          name='phoneNumber'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='E-Mail'
          value={userData.email}
          id='email'
          name='email'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='Password'
          value={userData.password}
          id='password'
          name='password'
          onChange={(e) => handleMainChange(e)}
        />
        <input
          type='text'
          placeholder='Retype your password'
          value={duplicatePassword}
          id='duplicatePassword'
          name='duplicatePassword'
          onChange={handleDupliecatePasswordChange}
        />
        <button className='btn btn-login btn-medium' type='submit'>
          Create Account!
        </button>
      </form>
    );
  }

  function duplicatePasswordMismatchDisplay() {
    return (
      <form
        className='main-forms'
        onSubmit={onSubmitHandler}
        autoComplete='off'
      >
        <h3> Welcome to Delete! </h3>

        <input
          type='text'
          placeholder='First Name'
          value={userData.firstName}
          id='firstName'
          name='firstName'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='Last Name'
          value={userData.lastName}
          id='lastName'
          name='lastName'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='Phone Number'
          value={userData.phoneNumber}
          id='phoneNumber'
          name='phoneNumber'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='E-Mail'
          value={userData.email}
          id='email'
          name='email'
          onChange={(e) => handleMainChange(e)}
        />

        <input
          type='text'
          placeholder='Password'
          value={userData.password}
          id='password'
          name='password'
          onChange={(e) => handleMainChange(e)}
        />
        <input
          type='text'
          placeholder='Retype your password'
          value={duplicatePassword}
          id='duplicatePassword'
          name='duplicatePassword'
          onChange={handleDupliecatePasswordChange}
        />
        <h4>Passwords must match!</h4>
        <button className='btn btn-register btn-medium' type='submit'>
          Create Account!
        </button>
      </form>
    );
  }

  function directToLoginPage() {
    return (
      <div>
        <h3>
          Thank you for registering! To start a consultation, please login!
        </h3>
        <Link to='/login'>Login</Link>
      </div>
    );
  }

  return (
    <div className='main-container'>
      {submissionCount > 0
        ? resStatus
          ? directToLoginPage()
          : duplicatePasswordMismatchDisplay()
        : resStatus
        ? directToLoginPage()
        : startingDisplay()}
    </div>
  );
}
