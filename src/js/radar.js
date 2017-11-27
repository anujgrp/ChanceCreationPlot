var RADAR_WIDTH = 500,
    RADAR_HEIGHT = 500,
    RADAR_OUTSIDE_LINE = "black",
    RADAR_INSIDE_LINE = "gray";
function drawRadar() {
    var svg = d3.select(FIELD)
        .attr("width", RADAR_WIDTH+150)
        .attr("height", RADAR_HEIGHT+150)
        .style("background", "white");
    //midpoints
    var midX = RADAR_WIDTH/2, midY = RADAR_HEIGHT/2;
    //100 percentile
    var p100 = svg.append("g");
    p100.append("line")
        .attr("class", "P100")
        .style("stroke", RADAR_OUTSIDE_LINE)
        .style("stroke-width", 2)  
        .attr("x1", RADAR_WIDTH/2)
        .attr("y1", 0)      
        .attr("x2", 0)
        .attr("y2", RADAR_HEIGHT/2);
    p100.append("line")
        .attr("class", "P100")
        .style("stroke", RADAR_OUTSIDE_LINE)
        .style("stroke-width", 2)  
        .attr("x1", 0)
        .attr("y1", RADAR_HEIGHT/2)      
        .attr("x2", RADAR_WIDTH/2)
        .attr("y2", RADAR_HEIGHT);
    p100.append("line")
        .attr("class", "P100")
        .style("stroke", RADAR_OUTSIDE_LINE)
        .style("stroke-width", 2)  
        .attr("x1", RADAR_WIDTH/2)
        .attr("y1", RADAR_HEIGHT)      
        .attr("x2", RADAR_WIDTH)
        .attr("y2", RADAR_HEIGHT/2);
    p100.append("line")
        .attr("class", "P100")
        .style("stroke", RADAR_OUTSIDE_LINE)
        .style("stroke-width", 2)  
        .attr("x1", RADAR_WIDTH)
        .attr("y1", RADAR_HEIGHT/2)      
        .attr("x2", RADAR_WIDTH/2)
        .attr("y2", 0);
    p100.attr("transform", "translate(5,5)");
    //75 percentile
    var per = .75;
    var p75 = svg.append("g");
    p75.append("line")
        .attr("class", "P75")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX)
        .attr("y1", midY * (1-per))
        .attr("x2", midX * (1-per))
        .attr("y2", midY);
    p75.append("line")
        .attr("class", "P75")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX * (1-per))
        .attr("y1", midY)
        .attr("x2", midX)
        .attr("y2", midY + (midY * per));
    p75.append("line")
        .attr("class", "P75")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX)
        .attr("y1", midY + (midY * per))
        .attr("x2", midX + (midX * per))
        .attr("y2", midY);
    p75.append("line")
        .attr("class", "P75")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX + (midX * per))
        .attr("y1", midY)
        .attr("x2", midX)
        .attr("y2", midY * (1-per));
    p75.attr("transform", "translate(5,5)");
    //50 percentile
    per = .5;
    var p50 = svg.append("g");
    p50.append("line")
        .attr("class", "P50")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX)
        .attr("y1", midY * (1-per))
        .attr("x2", midX * (1-per))
        .attr("y2", midY);
    p50.append("line")
        .attr("class", "P50")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX * (1-per))
        .attr("y1", midY)
        .attr("x2", midX)
        .attr("y2", midY + (midY * per));
    p50.append("line")
        .attr("class", "P50")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX)
        .attr("y1", midY + (midY * per))
        .attr("x2", midX + (midX * per))
        .attr("y2", midY);
    p50.append("line")
        .attr("class", "P50")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX + (midX * per))
        .attr("y1", midY)
        .attr("x2", midX)
        .attr("y2", midY * (1-per));
    p50.attr("transform", "translate(5,5)");
    //25 percentile
    per = .25;
    var p25 = svg.append("g");
    p25.append("line")
        .attr("class", "P25")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX)
        .attr("y1", midY * (1-per))
        .attr("x2", midX * (1-per))
        .attr("y2", midY);
    p25.append("line")
        .attr("class", "P25")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX * (1-per))
        .attr("y1", midY)
        .attr("x2", midX)
        .attr("y2", midY + (midY * per));
    p25.append("line")
        .attr("class", "P25")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX)
        .attr("y1", midY + (midY * per))
        .attr("x2", midX + (midX * per))
        .attr("y2", midY);
    p25.append("line")
        .attr("class", "P25")
        .style("stroke", RADAR_INSIDE_LINE)
        .style("stroke-width", 1)  
        .attr("x1", midX + (midX * per))
        .attr("y1", midY)
        .attr("x2", midX)
        .attr("y2", midY * (1-per));
    p25.attr("transform", "translate(5,5)");
}

function getTeams() {
    var teams = [];
    for (var i=0; i < CHANCES.length; i++) {
        var c = CHANCES[i];
        if (!teams.includes(c.team)) {
            teams.push(c.team);
        }
    }
    teams.push("Liaoning FC");
    return teams;
}

function getPlayers() {
    var players = [];
    for (var i=0; i < CHANCES.length; i++) {
        var c = CHANCES[i];
        if (!players.includes(c.assister)) {
            if (c.assister != "-") {
                players.push(c.assister);
            }
        }
    }
    return players;
}

function calcPercentiles(name) {
    var teams = getTeams();
    var players = getPlayers();
    // console.log(players);
    var high = [], low = [],
        left = [], right = [];
    // for (var p = 0; p < players.length; p++) {
    //     player = players[p];
    //     high[player] = 0;
    //     low[player] = 0;
    //     left[player] = 0;
    //     right[player] = 0;
    // }
    for (var t = 0; t < teams.length; t++) {
        team = teams[t];
        high[team] = 0;
        low[team] = 0;
        left[team] = 0;
        right[team] = 0;
    }
    for (var i = 0; i < CHANCES.length; i++) {
        var c = CHANCES[i];
        switch (c.assist_type) {
            case "Cross High":
                // high[c.assister] += 1;
                // (c.assist_x < 0) ? left[c.assister] += 1 : (c.assist_x > 0) ? right[c.assister] += 1 : 0;
                high[c.team] += 1;
                (c.assist_x < 0) ? left[c.team] += 1 : (c.assist_x > 0) ? right[c.team] += 1 : 0;
                break;
            case "Cross Low":
                // low[c.assister] += 1;
                // (c.assist_x < 0) ? left[c.assister] += 1 : (c.assist_x > 0) ? right[c.assister] += 1 : 0;
                low[c.team] += 1;
                (c.assist_x < 0) ? left[c.team] += 1 : (c.assist_x > 0) ? right[c.team] += 1 : 0;
                break;
        }
    }
    //combine Liaoning Kaixin and Liaoning Whowin into Liaoning FC
    high["Liaoning FC"] = high["Liaoning Kaixin"] + high["Liaoning Whowin"];
    high["Liaoning Kaixin"] = 0;
    high["Liaoning Whowin"] = 0;
    low["Liaoning FC"] = low["Liaoning Kaixin"] + low["Liaoning Whowin"];
    low["Liaoning Kaixin"] = 0;
    low["Liaoning Whowin"] = 0;
    left["Liaoning FC"] = left["Liaoning Kaixin"] + left["Liaoning Whowin"];
    low["Liaoning Kaixin"] = 0;
    left["Liaoning Whowin"] = 0;
    right["Liaoning FC"] = right["Liaoning Kaixin"] + right["Liaoning Whowin"];
    right["Liaoning Kaixin"] = 0;
    right["Liaoning Whowin"] = 0;
    console.log(low);
    console.log(sortByKey(low));
}

function sortByKey(obj) {
    var keys = []; for(var key in obj) keys.push(obj[key]);
    return keys.sort(function(a,b){return a-b}).splice(2);
}
