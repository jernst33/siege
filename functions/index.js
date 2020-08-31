// import * as admin from "firebase-admin";

// import {firestore} from "firebase-admin";
const RainbowSixApi = require('rainbowsix-api-node');
const R6 = new RainbowSixApi();

const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
//const db = firestore();
const admin = require('firebase-admin');
admin.initializeApp();

exports.getPlayerData = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const username = request.body.username;
    const platform = request.body.platform;
    //Get stats on the user on that platform
    R6.stats(username, platform, /*optional true or false if you want operator details or not*/).then(response => {
      console.log(response);
      return response;
    }).catch(error => {
      console.error(error)
    });

//For getting details about a user on R6 depending on platform
    R6.profile(username, platform).then(response => {
      console.log(response);
      return response;
    }).catch(error => {
      console.error(error);
    });
    return response.status(200).send({status: 200, message: 'Success'});
  })
});

exports.createMatch = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    if (request.method !== 'POST') {
      return response.status(400).send({status: 400, message: 'Request must be POST!'});
    }
    const { userId, map, rounds } = request.body;
    // let userId = request.body.userId;
    // let map = request.body.map;
    // let rounds = request.body.rounds;
    let winCount = 0;
    let lossCount = 0;
    let numberOfRounds = 0;
    let kills = 0;
    let deaths = 0;
    let assists = 0;
    let date = new Date();
    rounds.forEach(round => {
      kills += round.kills;
      deaths += round.deaths;
      assists += round.assists;
      if (round.result === 'win') {
        winCount += 1;
        numberOfRounds += 1;
      } else if (round.result === 'loss') {
        lossCount += 1;
        numberOfRounds += 1;
      }
    });

    let match = {
      numberOfRounds: numberOfRounds,
      kills: kills,
      deaths: deaths,
      assists: assists,
      result: '',
      date: date,
      user: userId
    };

    if (winCount > lossCount) {
      match.result = 'win';
    }
    else if (lossCount > winCount) {
      match.result = 'loss'
    }

    let matchId = recordMatch(match);

    rounds.forEach(round => {
      round.user = userId;
      let roundId = recordRound(round);
    });

    return response.status(200).send({status: 200, message: 'Match ' + matchId + ' successfully recorded'});
  });
});

function recordMatch(match) {
  admin.firestore()
    .collection('matches')
    .add(match)
    .then(doc => {
      console.log('Successfully recorded match ' + doc.id);
      return doc.id;
    })
    .catch(error => {
    console.error(error);
  });
}

function recordRound(round) {
  admin.firestore()
    .collection('rounds')
    .add(round)
    .then(doc => {
      console.log('Successfully recorded round ' + doc.id);
      return doc.id;
    }).catch(error => {
    console.error(error);
  });
}
