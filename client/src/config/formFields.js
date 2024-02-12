export const registrationFields = [
  {
    name: "firstName",
    type: "text",
  },
  {
    name: "lastName",
    type: "text",
  },
  {
    name: "email",
    type: "email",
    validations: {
      pattern: {
        //eslint-disable-next-line no-useless-escape
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "Email format is invalid !",
      },
    },
  },
  {
    name: "password",
    type: "password",
    validations: {
      minLength: {
        value: 6,
        message: "Password must be of atleast 6 characters",
      },
    },
  },
  {
    name: "confirm_password",
    type: "password",
  },
];

export const loginFields = [registrationFields[2], registrationFields[3]];
