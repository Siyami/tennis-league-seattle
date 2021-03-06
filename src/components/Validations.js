import React from 'react';
import validator from 'validator';
import Validation from 'react-validation';

Object.assign(Validation.rules, {
    required: {
        rule: value => value.toString().trim(),
        hint: () => <span className="form-error is-visible">Required</span>
    },

    email: {
        rule: value => validator.isEmail(value),
        hint: value => <span className="form-error is-visible">This is not an Email.</span>
    },

    alpha: {
        rule: value => validator.isAlpha(value),
        hint: () => (
            <span className="form-error is-visible">
                String should contain only letters (a-zA-Z).
            </span>
        )
    },

    username: {
      rule: value => validator.isLength(value, { min: 3, max: 12 }),
      hint: () => (
          <span className="form-error is-visible">
              Username must be between 3 and 12 characters in length.
          </span>
      )
    },

    firstName: {
      rule: value => validator.isLength(value, { min: 2, max: 20 }),
      hint: () => (
          <span className="form-error is-visible">
              First Name must be between 3 and 20 characters in length.
          </span>
      )
    },

    lastName: {
      rule: value => validator.isLength(value, { min: 2, max: 20 }),
      hint: () => (
          <span className="form-error is-visible">
              Last Name must be between 3 and 20 characters in length.
          </span>
      )
    },

    passwordLength: {
      rule: value => validator.isLength(value, { min: 8 }),
      hint: () => (
          <span className="form-error is-visible">
              Password must be at least 8 characters in length.
          </span>
      )
    },

    ntrpLevel: {
      rule: value => validator.isLength(value > 2 && value < 8),
      hint: () => (
          <span className="form-error is-visible">
              Password must be at least 8 characters in length.
          </span>
      )
    },

    password: {
        rule: (value, components) => {
            const password = components.signupPassword.state;
            const passwordConfirm = components.signupConfirmPassword.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords must match.</span>
    }

});
