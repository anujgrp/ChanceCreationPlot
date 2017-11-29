var CHANCES;

function readData(cb, arg1, arg2) {
    //read the data from the file and format it
    d3.csv("/data/cslchances17.csv", function(d) {
        return {
            game_id : +d.gsm_id,
            home_team : d.hometeam_team1,
            away_team : d.awayteam_team2,
            icon : d.icon,
            chance_rating : d.chanceRating,
            chance_value : xG(d.chanceRating),
            team : d.team,
            time : d.time,
            player : d.player,
            location_x : +d.location_x,
            location_y : +d.location_y,
            shot_quality : +d.shotQuality,
            body_part: d.bodyPart,
            outcome: d.outcome,
            assister: d.primaryPlayer,
            assist_type: d.primaryType,
            assist_x: +d.primaryLocation_x,
            assist_y: +d.primaryLocation_y
        };
    }, function(data) {
        //set global variable to newly formatted data
        CHANCES = data;
        //callback if there is one
        if (cb) cb(arg1, arg2);       
    });
}

//return expected goals value based on chance rating
function xG(chance) {
    var val;
    if (chance == "superbchance" || chance == "Superb") val = .83;
    else if (chance == "greatchance" || chance == "Great") val = .43;
    else if (chance == "verygoodchance" || chance == "Very Good") val = .22;
    else if (chance == "goodchance" || chance == "Good") val = .08;
    else if (chance == "fairlygoodchance" || chance == "Fairly Good") val = .05;
    else if (chance == "poorchance" || chance == "Poor") val = .03;
    else val = 0; //this excludes penalties
    return val;
}