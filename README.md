![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/44424053-e1c7-4622-992e-a9fec4af6548)

# PLANET CONQUEROR APP

This App uses a **Mongo** database, an **Express** server and a **React** App.\
You will need [Docker](https://www.docker.com/products/personal/) installed to run this app.\
Or you will have to run each app separately.

## Available Scripts

### `docker-compose build` and `docker-compose up`
1. Creates `mongo`, `sw-app-planets-api`, and `sw-app-planets-web` images.
2. Creates `mongo_planets_db`, `planets-api`, and `planets-web` containers.
4. Starts app on http://localhost:3000.

Make sure you have the ports `27017`, `4000`, and `3000` available


## About the App
In this app you will be using the [Star Wars API](https://swapi.dev/documentation#planets) to get information about the different planets. You can conquer an available Planet or leave it if you already conquer it.

### Lobby
- When you first enter the app you will be asked for your Syth name.
- Your Syth name will be stored on the browser's local storage, so you don't have to enter it again at least you want to.
- Your Syth name will be used to update the status of Planets and to save your columns filter of the table.
![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/4923beae-ba6c-4367-99d6-4bbb08e3a767)


### Management page
- Once you enter your name you will see the management page:
  ![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/4dc0461a-7343-423b-91ec-a44764dda4f5)



### Planets table
- Here you will see the planets paginated to 10 items per page.
![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/e6596501-ffcb-492d-b2d2-8608a9daceb3)



### Planet management
- If you expand the row of a Planet you will see actions to do on that Planet.
- You will see the Name of the planet and an image of it, if there is no image for that planet a default one is shown.
- The image's speed rotation depends on the ROTATION PERIOD of the Planet.
- You will see the Current Status of the Planet (CONQUERER or AVAILABLE).
- If the Planet is AVAILABLE you can conquer it.
- If the Planet is CONQUERER but is conquered by you, you can leave it.
- If the Planet is CONQUERER and the Conquerer is another Syth, you can't do anything on that Planet.\
![planet1](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/6a90b6c9-e493-47e0-a121-86a3e35bc4b4)![planet2](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/f0eb941a-bf3c-4dcd-acfc-6462f4b20753)![planet3](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/a74dcd0f-ce27-40d9-a682-26b476cf99e1)





### Hide Columns
- You can select the columns you want to hide.
- The list of hidden columns is also stored on your local storage along with your conqueror name.
- This means that if you re-enter the app later or if you change to another conqueror name and then go back to the first one, you will see the hidden columns saved for each conqueror name.
![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/e3c1ec3c-fb28-4df9-8627-a89f69720588)



### Filters
`Search text`: It will search the input text on the Name column. Searching has a debounce time of 0.5 sec.
![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/0f0ac502-7828-449d-a943-9d42ba3da10b)



### Change Conqueror Name
- You can change your Conqueror name, it will redirect you to the lobby page.
- Your hidden columns list will not be deleted, if you re-enter with the same conqueror name in the future you will see them again.
- A list of hidden columns is stored with each conqueror's name.
![image](https://github.com/nicolas-logo/starwars-conqueror-app/assets/26005281/39c2c09a-33c7-472f-8e15-4ac465410d7f)


### Technical Annotations:
- The conqueror name entered is not case-sensitive.
- Searching have a debounce of 500ms, preventing sending multiple requests.
- A cancel token logic is applied when sending a request, this means that if a previous request is pending and a new one is sent, the previous one is canceled.
- An item is set on the local storage for each conqueror's name once it hides a column.
- Redux is configured to easily be expanded.
- Nothing is hardcoded, you have config files on `planets-api\src\data\configData.js` and `planets-web\src\utils\configData.js`
- Both, `planets-api` and `planet-web` have Jest and React tests that can be run by `npm test`
