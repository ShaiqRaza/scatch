/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/createAccountPage.ejs',
    './views/loginPage.ejs',
    './views/homePage.ejs',
    './views/createOwnerPage.ejs',
    './views/panelPage.ejs',
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      'xxl': '1480px',
    }
  },
  plugins: [],
}

