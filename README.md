# Mobile Flashcards Project

This project is the third project that I have to do for passing the _Udacity_'s _React Nanodegree_. 
It consists of developing a game that allows the users to add decks with cards. 
Each card will have a question and an answer. 
Then, they can start a quiz for each deck. 
The quiz consists of showing the question, and when the user desires, 
he can check the answer and determines if she/he got a right or a wrong result.
                                                                                                   
## Install and launch the project

To install and launch the project these steps must be follow:

* Install the dependencies: `yarn`
* Launch the project: `yarn start`
    * For an easy way to test the code, it can be possible to launch with _expo_ as folows: `expo start`
    
## Tested platforms

This project was tested on an **_Android_** device and **_Web emulator_**.

## Additional notes

In the requirements, it is said that _'Pressing on a deck in the list should generate an animation...'_. 
By default, the _react-native_ navigation library navigates through pages with an animation so I added a 
particular animation on _Quiz_ page. The animation consists of flippling the card to show the question or the answer.