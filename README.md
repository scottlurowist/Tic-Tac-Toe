# TIC TAC TOE: A Description

This application is a simplem single-player version of Tic Tac Toe. The player always
starts as the "X" player, and then is automatically assigned to the "O" player. This
alernation takes place until either one player wins or both players tie.

If a user is new to the application, they can create an account. From there the user
may signin to the app. They may change their password, play a game, view the number
of games played, and of course exit the app.



## Planning Story
The first thing that I did was to create 7 user stories and 6 wireframes based upon my
initial understanding of the requirements. 

Styling is my Kryptonite because I do not possess any artistic sensibilities. But I tend
to like dark themes and chose to go for that. Since Tic Tac Toe is a simple game, I wanted
the game to look polished by clean and simple. I used Bootstrap to style the handful of forms.
I wanted a hint of the Boostrap look. But I overrode Bootstrap's primary color to a shade of 
purple that I like so that it would appear that I am not totally dependent on Boostrap. I also
used Flexbox to align buttons.

I first took care of the low-hanging fruit by implementing the signup, signin, change password,
game options, and signout pages along with the corresponding web service invocations.

It became clear that since we are manually implementing an SPA, I wanted a pseudo-state
machine to hide and show the approptiate sections of the page, and properly show and hide 
buttons. That kept that logic in one place, reduced redundant jQuery queries to the DOM, 
and generally kept things DRY.

I also knew that I would create a JS module to implement a "game engine". This keeps track
of the player's moves, updates the game board, and scores each move. Due to my experience 
as a software developer, I was able to design in my head items such as the game logic. The
ideas come to me when I am in "diffuse mode" as most good ideas do.

When I started developing the game engine, I ran into my biggest problems was that I could not load
other modules into it. However, I soon realized that is because I now had circular depdendencies
with my CommonJS modules. I made sure that everythign included the game engine and not the
converse. This was my biggest stumbling blocks, but temporary.

I chose to focus on the game engine before I handled the web service call for update game.
That is because the web service call was low-hanging fruit. I did need to refactor my game
engine after I had the web service call in place; I had to refactor a single method into two.
I had to handle a gameboard click and first determine whether the user clicked a gameboard
cell already played. If so, then I simply return from the method an do no more processing.
Then the move needs to be scored in order to tell the update game service whether the game
is complete. 

Now the update game service is called.

If that is successful, I save the "gameboard" returned by the service for scoring purposes.
Then the game board is updated using .png images. I realized that since I was placing
an image inside a gameboard DIV cell, and my moves were triggered by handling a DIV cell
click, that the user could also click the image since it does not fully cover the grid 
cell. So now when I user clicks a cell already played, the event needs to check if either 
the cell or the image was clicked, and was that cell already clicked. That was my second
biggest issue, but it did not take me long to resolve it. 

Because I learned "to count" in Discrete Mathematics while earning my MS in Computer Science,
I determined that there is 8 ways to win the game, and only a single way to tie, assuming that
the user doesn't quit midgame. I also realized that a win cannot happen before the 5th move. So
I added a small check to not brute forcefully check the game board until the game is at move 5
or later. That is kind of overkill for this game, but that kind of thinking can mean much in a
real-word project.

My friend Paul Muller builds 3D virtual walkthroughs and such for a living. He created for me
the graphical assets that I use in the game, such as the animated GIF on the homepage, and
the graphics for the gameboard itself.

In the end I decided to focus on meeting the minimum requirements with no issues rather than
try to create fancy features with bugs. I wanted to translate the game into Russian because I 
speak Russian, but I thought I would end up rushing to finish. In the real world, giving the
requirements manager what they want is what counts.

### User Stories

- As a User I want to sign up so that I may play tic-tac-toe.
- As a User I want to sign in once I have created an account so that I may play tic-tac-toe.
- As a signed in User I want to change my password so that I can ensure that my account is secure.
- As a signed in User I want to sign out from the app so that my session is closed.
- As a player I want to be notified on-screen when I win, lose, or tie so that I have conclusion to a game.
- As a player who just finished a game, I want to be able to start a new game so that I can play tic-tac-toe
    again.
- As a player who has played games, I want to see a count of the number of games that I played so that
  I can determine whether I have a life.


### Technologies Directly Used

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
- Improve the psuedo-state machine.
- Improve the game engines to eliminate CommonJS circular dependencies.
- Use JS classes.
- Eliminate magic numbers and strings.
- Check for connection before invoking web services. The app hangs if
  I disconnect my WiFi.
- Make the status / notification area its own class or module. Then it could
  worry about writing info versus error messages, change font colors, etc.  

#### Wireframes:
![Home Page](./scott-design/Wireframes/1-Tic-Tac_Toe-Signup-Signin.png)
![Create An Account](./scott-design/Wireframes/2-Tic-Tac_Toe-Create-Account.png)
![Sign In To The App](./scott-design/Wireframes/3-Tic-Tac_Toe-Signin-To-Existing-Account.png)
![Game Options](./scott-design/Wireframes/4-Tic-Tac_Toe-Game-Options.png)
![Game Play](./scott-design/Wireframes/5-Tic-Tac_Toe-Game-Play.png)
![Game History](./scott-design/Wireframes/6-Tic-Tac_Toe-Game-History.png)
