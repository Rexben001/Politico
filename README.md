[![Build Status](https://travis-ci.org/Rexben001/Politico.svg?branch=develop)](https://travis-ci.org/Rexben001/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Rexben001/Politico/badge.svg?branch=develop)](https://coveralls.io/github/Rexben001/Politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/61d6fbc4ff34b3870c91/maintainability)](https://codeclimate.com/github/Rexben001/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/61d6fbc4ff34b3870c91/test_coverage)](https://codeclimate.com/github/Rexben001/Politico/test_coverage)

# Politico
Politico enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency.

## Feature ##
* There are two types of Users, the Admin and the regular User.
* Users can sign up.
* Users can log in.
* Admin (electoral body) can create political parties.
* Admin (electoral body) can delete a political party.
* Admin (electoral body) can create different political offices
* Users can vote for only one politician per political office.
* Users can see the results of an election.
* User can reset a password.
* A politician can create a petition against a concluded political office election.

## Technology needed to run the project locally ##
* Any text editor preferably Visual Studio Code
* Git Bash
* Any web browser preferably Google Chrome
* Postman

## Link to GitHub pages ##
   https://rexben001.github.io/Politico/

## Link to App on Heroku ##
https://politico-voting.herokuapp.com/

## Link to Pivotal Tracker Board ##
https://www.pivotaltracker.com/n/projects/2238808

## Link to API documentation ##
https://politico-voting.herokuapp.com/api-docs

## How to Clone project ##
To clone this repository:
* git clone https://github.com/Rexben001/Politico.git
* `cd /Politico` to move into the project folder 

## How test GitHub pages ##
To Log in,
* use `rexben.rb@gmail.com` as your email address and any password of your choice

## How to test the API endpoints
* `npm i` to install the npm packages
* `npm run start-dev` to start the server
* `npm test` to run the test files

## List of API Endpoints ##
* POST `/parties`
* GET `/parties`
* GET `/parties/:party_id`
* PATCH `/parties/:party_id/name`
* DELETE `/parties/:party_id`
* POST `/offices`
* GET `/offices`
* GET `/offices/:office_id`

## Author ##
* Ajewole Benjamin
