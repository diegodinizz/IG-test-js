// We import the object from the data file. Inside that object there is a function to get players data
const data = require('./data')

const players = data.getPlayers()

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

function printPlayers (players) {
  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    console.log(`PLAYER ${i + 1}`)
    console.log(`NAME: ${player.name}`)
    console.log(`LASTNAME: ${player.lastname}`)
    console.log(`POSITION: ${player.position}`)
  }
}

printPlayers(players)

/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

function printPlayersByNameLength (players) {
  const playersByNameLength = players
    .map(player => player.name)
    .sort((a, b) => b.length - a.length)
  console.log(playersByNameLength)
}

printPlayersByNameLength(players)

/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, all of them has 0.11 scoringChance, the result will be 1.1 average goals
 * Output example -> Goals per match: 2.19
 */

function printAverageGoalsPerMatch (players) {
  const goalsPerMatch = players.reduce(
    (acc, player) => acc + player.scoringChance / 100,
    0
  )
  console.log(`Goals per match: ${goalsPerMatch.toFixed(2)}`)
}

printAverageGoalsPerMatch(players)

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

function getPlayerPosition (name) {
  const player = players.find(player => player.name === name)
  console.log(`${player.name}: ${player.position}`)
}

getPlayerPosition('Diego')

/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance.
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

function splitPlayersIntoTeams (players) {
  // First shuffle the players
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = players[i]
    players[i] = players[j]
    players[j] = temp
  }

  const teamShuffle = players

  // Then split the players into 2 teams evenly
  const teamA = teamShuffle.slice(0, Math.floor(teamShuffle.length / 2))
  const teamB = teamShuffle.slice(Math.floor(teamShuffle.length / 2))

  // Then calculate the average score for each team
  const teamAScore = teamA.reduce(
    (acc, player) => acc + player.scoringChance / 100,
    0
  )
  const teamBScore = teamB.reduce(
    (acc, player) => acc + player.scoringChance / 100,
    0
  )

  console.log(`Team A: ${Math.round(teamAScore)}`)
  console.log(`Team B: ${Math.round(teamBScore)}`)
}

splitPlayersIntoTeams(players)
