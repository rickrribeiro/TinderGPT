# Irei revisar e refatorar todas as alterações feitas nos dias 29 e 30, sai jogando qualquer coisa na pressa p terminar :p

TinderGPT is a project focused on enhancing the user experience of the popular dating app, Tinder. By leveraging the power of ChatGPT, this application provides intelligent suggestions for message responses, aiming to improve conversation flow and increase engagement between users.

Dependencies:

- redis (not implemented yet)
- docker (optional)
- node 18 (if not running on docker)
## configure envs
- access api/src/config
- create a file config.ts using config.sample.ts as example
- fill the file with your credentials

## run with docker: 
    docker-compose up -d
## run without docker: 
### installing & setup:

- access front and api and run: npm install

### run api:

- npm run start:dev

### run front:

- npm start

slides: https://docs.google.com/presentation/d/1jc-Sn5QFhB6A-trDUiPL3lmIzHPZsH3aYnciAhqrELg/edit?usp=sharing

next:
- enable/disable chatgpt
- make auth from the application
- login page
