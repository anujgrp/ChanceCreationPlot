var BINSIZE = 19.5;
var hexbin = d3.hexbin()
    .size([FIELD_LENGTH, FIELD_WIDTH])
    .radius(BINSIZE);
var attscale = ["#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824"],
    defscale = ["#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000"];
function drawAssist(team, attacking) {
    var field = d3.select("#field");
    d3.select("#team-text").text(team);
    var radius = d3.scaleSqrt()
        .domain([0, 20])
        .range([0, 45]);

    var assistLocations = formatChances(team, attacking);

    field.append("g")
            .attr("class", "hexagon")
            .attr("clip-path", "url(#clip)")
        .selectAll("path")
        .data(hexbin(assistLocations))
        .enter().append("path")
            .attr("class", "assist-bin")
            .attr("d", function(d) { return hexbin.hexagon(radius(d.length)); })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .style("fill", function(d) { return color(d3.mean(d, function(d) { return d[2]; }), attacking); })
            .style("opacity", .75);
    d3.select("#sidelines").moveToFront();
}

function formatChances(team, attacking) {
    var loc = [];
    for (var c=0; c < CHANCES.length; c++) {
        var chance = CHANCES[c];
        if (attacking) { //chances created
            if (chance.team == team && chance.icon != "penawarded" && chance.icon != "penmissed") {
                if ((!isNaN(chance.assist_x)) && (!isNaN(chance.assist_y)) && chance.assist_y < 200) {
                    var assist_loc = [x(chance.assist_y), y(chance.assist_x), chance.chance_value];
                    loc.push(assist_loc);
                }
            }
        } else { //chances conceded
            if ((chance.home_team == team || chance.away_team == team) && chance.team != team && chance.icon != "penawarded" && chance.icon != "penmissed") {
                if ((!isNaN(chance.assist_x)) && (!isNaN(chance.assist_y)) && chance.assist_y < 200) {
                    var assist_loc = [def_x(chance.assist_y), def_y(chance.assist_x), chance.chance_value];
                    loc.push(assist_loc);
                }
            }
        }
    }
    return loc;
}

function color(avg, attacking) {
    var scale = [], c="white";
    if (attacking) scale = attscale;
    else scale = defscale;
    if (avg >= .21) c = scale[4];
    else if (avg >= .1195) c = scale[3];
    else if (avg >= .065) c = scale[2];
    else if (avg >= .04) c = scale[1];
    else if (avg >= 0) c = scale[0];
    return c;
}

