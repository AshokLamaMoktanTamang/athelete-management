export const HttpMessage = {
  BadRequest:
    'Bad Request: The request for could not be understood by the server.',
  Unauthorized: 'Unauthorized: User is unauthorized for this feature.',
  Forbidden: 'Forbidden: User is forbidden for this feature.',
  NotFound: 'Resource could not be found',
  InternalServerError:
    'Internal Server Error: Something went wrong on the server while processing.',
};

export const ResponseMessage = {
  FAILED_REGISTER: 'Failed to register the user!',
  EMAIL_TAKEN: 'Email is already taken.',

  INVALID_CREDENTIALS: 'Invalid email or password!',

  USER_CREATED: 'User created successfully',
  USER_LOGGED_IN: 'User Loged In successfully',

  ACTIVITY_CREATED: 'Activity added successfully',
  FAILED_ACTIVITY_CREATE: 'Failed to create activity',
};
