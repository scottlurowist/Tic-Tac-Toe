# TIC TAC TOE: A Description

This application is a simplem single-player version of Tic Tac Toe. The player always
starts as the "X" player, and then is automatically assigned to the "O" player. This
alernation takes place until either one player wins or both players tie.

If a user is new to the application, they can create an account. From there the user
may signin to the app. They may change their password, play a game, view game history
stats, and of course exit the app.



## Planning Story
The first thing that I did was to create 7 user stories and 6 wireframes based upon my
initial understanding of the requirements. 

I then took care of the low-hanging fruit by implementing the signup, signin, change password,
game options, and signout pages along with the web service invocation.

It became clear that since we are manually implementing and SPA, I created a pseudo-state
machine to hide and show the approptiate sections of the page. That kept that logic in one place,
reduced redundant jQuery queries to the DOM, and generally kept things DRY.

I also knew that I would create a JS module to implement a "game engine". This keeps track
of the player's moves, updates the game board, and scores each move.

Due to my experience, I was able to design most of these things in my head.

### User Stories

- As a User I want to sign up so that I may play tic-tac-toe.
- As a User I want to sign in once I have created an account so that I may play tic-tac-toe.
- As a signed in User I want to change my password so that I can ensure that my account is secure.
- As a signed in User I want to sign out from the app so that my session is closed.
- As a player I want to be notified on-screen when I win, lose, or tie so that I have conclusion to a game.
- As a player who just finished a game, I want to be able to start a new game so that I can play tic-tac-toe
    again.
- As a player who has played games, I want to review past games so that I can study them.    


### Technologies Used

- jQuery
- HTML/CSS/SCSS
- Bootstrap
- Javascript
- Grunt / Webpack


### Unsolved Problems

- I have no usolved problems based upon the requirements.

### Nice-to-haves
- Translate the text of the game into other languages.
- Simplify the scoring logic.
- Use JS classes.

#### Wireframes:
![Home Page](./scott-design/Wireframes/1-Tic-Tac_Toe-Signup-Signin.png)
![Create An Account](./scott-design/Wireframes/2-Tic-Tac_Toe-Create-Account.png)
![Sign In To The App](./scott-design/Wireframes/3-Tic-Tac_Toe-Signin-To-Existing-Account.png)
![Game Options](./scott-design/Wireframes/4-Tic-Tac_Toe-Game-Options.png)
![Game Play](./scott-design/Wireframes/5-Tic-Tac_Toe-Game-Play.png)
![Game History](./scott-design/Wireframes/6-Tic-Tac_Toe-Game-History.png)
