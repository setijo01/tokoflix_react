##Tokoflix Front-End Mini Project

Before installing and running the app, change the value of 'API_KEY' in App.js to your tmDB API Key.


Made working basic components for the app. Primary features such as listing, searching, and buying movies are working.

Movies are displayed in card format, with its poster, price, and short description. The cards need placeholder if webpath for the poster isn't available.

The app is able to keep track of the user balance and movies bought using localStorage. The implementation is extremely simplified at the moment, using a login/logout button. Due to localStorage usage, resetting the user require calling 'localStorage.clear()' command on browser console.

User is able to search on movies based on its title. The search is trigerred upon input change after a certain time interval.

Pagination is set to show 20 movies per page maximum. Forward and back button give the next and previous 10 available pages.

Movie detail page is still yet to be implemented, alongside with redux and routing.


