# Chance Creation Plot

## Description

Web app used to display where teams create and concede chances from. The plot shows the average Chance Rating of a team binned by location of the assist.

### Examples

![Example](/src/img/example-1.png)

![Example](/src/img/example-2.png)

#### Competition

This is for a competition hosted by [Chance Analytics](https://chanceanalytics.com/2017/11/14/the-chance-analytics-data-visualization-competition/).

- Question 1: What are you trying to communicate with this viz?

This viz displays the locations from which teams create and concede chances. Grouping together by assist location shows where the chances are being created.
- Question 2: Who is your target audience? People working in the player/opposition scouting process at clubs or the average fan?

This would be useful for clubs trying to scout where the opposition likes to attack, and where they are most susceptible to being attacked.

#### Data

The data provided is from StrataData and comes from the 2017 Chinese Super League.

### Technologies Used

HTML/JS, D3.js, jQuery, Express

## Install

### Requirements

Node

### Directions

1. `git clone https://github.com/kyledijkstra/ChanceCreationPlot.git`

2. `cd ChanceCreationPlot`

3. `npm install`

4. `node server`

5. Visit localhost:8000 on your web browser

## User Guide

### Choose Team

Select a team from the dropdown

Change header background color

Change text color of team name

### Chances

Check for chances created (attacking)

Check for chances conceded (defending)