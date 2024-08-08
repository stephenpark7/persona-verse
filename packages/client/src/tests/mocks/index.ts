
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiYyIsImV4cGlyZXNBdCI6MTcyMTczNjU0NTE3MywiaWF0IjoxNzIxNzMyOTQ1LCJleHAiOjE3MjE3MzY1NDV9.7LTugX8TbME__17Rz9-kNZPohih9vIVGkBcuOXOmPIk';

const response = {
  message: 'Token refreshed.',
  accessToken: {
    token: token,
    expiresAt: 1721736545173,
    payload: {
      userId: 4,
      username: 'c',
    },
  },
};

export {
  response,
};
