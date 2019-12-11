# Podium

*Leave an impression.*

Podium is a personalized solution designed to polish speaking ability and elevate confidence.

<img src="screenshots/podiumHome.png"
     alt="Podium Home Page"
     style="width: 80%; height : auto;" />

## As a user you can...

Log in to record new sessions and track your progress over time.

Practice a speech, talk, or presentation and receive immediate feedback.

Learn about your habits and understand your strengths and weaknesses.

Gain insight into how your words will be received.

## Our Team
- Kiara Anderson
- Lina Dinh
- Mallory LeeWong
- Haley Sambursky

## Our Tech Stack
- Frontend
  - Javascript
  - React-Redux
  - D3
  - Web Speech API
  - Material-UI
- Backend
  - Node
  - Express
  - Sequelize
  - postgreSQL
  - sentiment(npm)

## How does Podium work?

Podium is a robust full stack application. We used React and Redux to create an interactive single page application. Building off of that, we used D3 to make all of the visually stunning graphs. Both D3 and React have the power to alter the DOM, so a major challenge we faced was getting the two to mesh together seamlessly. With the user experience as our main priority, we utlized Material-UI to create a clean, and easy to use interface. To get the speech transcriptions we chose to use the Web Speech API. It directly converts your speech into text, without the need for storing any audio files.

We needed a place to store the speech information, our users, filler words, and wpm descriptions, as well as define relationships between these models, so we set up a postgreSQL database with the Sequelize ORM. Before creation of a speech instance, we run a custom built algorithm to locate all of the filler words, and in addition we run the sentiment package on the speech transcript. We communicate with the database through our API built with Express and Node.


## Try it Out

*Let Podium be your coach*

Try it for yourself at <https://podium--app.herokuapp.com/>
