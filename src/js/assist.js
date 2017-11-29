function drawAssist(team) {
    var field = d3.select("#field");

    var color = d3.scaleSequential(d3.interpolateLab("white", "#005824"))
        .domain([0, 15]);

    var radius = d3.scaleSqrt()
        .domain([0, 20])
        .range([0, 50]);

    var hexbin = d3.hexbin()
        .radius(45)
        .extent([[0, 0], [FIELD_LENGTH, FIELD_WIDTH]]);

    var assists = formatChances(team);
    // console.log(assists);

    field.append("g")
            .attr("class", "hexagon")
            .attr("clip-path", "url(#clip)")
        .selectAll("path")
        .data(hexbin(assists))
        .enter().append("path")
            .attr("class", "assist-bin")
            .attr("d", function(d) { return hexbin.hexagon(radius(d.length)); })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .style("fill", "red")
            // .style("fill", "#005824")
            // .style("fill", function(d) { return color(d.length); })
            .style("opacity", .5)
}

function formatChances(team) {
    var info = [];
    for (var c=0; c < CHANCES.length; c++) {
        var chance = CHANCES[c];
        if ((chance.home_team == team || chance.away_team == team) && chance.team != team && chance.icon != "penawarded" && chance.icon != "penmissed") {
            if ((!isNaN(chance.assist_x)) && (!isNaN(chance.assist_y))) {
                var assist_loc = [x(chance.assist_y), y(chance.assist_x)]; 
                // assist_loc[quality] = chance.chance_value;
                info.push(assist_loc);
            }
        }
    }
    return info;
}