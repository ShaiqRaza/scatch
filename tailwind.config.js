/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/createAccountPage.ejs',
    './views/loginPage.ejs',
    './views/homePage.ejs',
    './views/createOwnerPage.ejs',
    './views/panelPage.ejs',
    './views/cartPage.ejs',
  ],
  theme: {
    extend: {},
    screens: {
      'xss': '400px',
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

