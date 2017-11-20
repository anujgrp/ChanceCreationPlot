var CHANCES;

function readData() {
    //read the data from the file and format it
    d3.csv("/data/cslchances17.csv", function(d) {
        return {
            competition : d.competition,
            game_id : +d.gsm_id,
            kickoff_date : d.kickoffDate,
            kickoff_time : d.kickoffTime,
            home_team : d.hometeam_team1,
            away_team : d.awayteam_team2,
            chance_rating : xG(d.changeRating),
            team : d.team,
            time : d.time,
            player : d.player,
            location_x : +d.location_x,
            location_y : +d.location_y,
            shot_quality : +d.shotQuality
        };
    }, function(data) {
        //set global variable to newly formatted data
        CHANCES = data;
        console.log(CHANCES);
    });
}

//return expected goals value based on chance rating
function xG(chance) {
    var val;
    switch (chance) {
        case "superbchance":
            val = .83;
            break;
        case "greatchance":
            val = .43;
            break;
        case "verygoodchance":
            val = .22;
            break;
        case "goodchance":
            val = .08;
            break;
        case "fairlygoodchance":
            val = .05;
            break;
        case "poorchance":
            val = .03;
            break;
        default:
            val = chance;
            break;
    }
    return val;
}