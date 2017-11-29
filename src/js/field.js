var FIELD_MULT = 2,
    FIELD_WIDTH = 273 * FIELD_MULT,
    FIELD_LENGTH = 421 * FIELD_MULT,
    MARGIN = {top: 15, left: 15, bottom: 15, right:15},
    FIELD_COLOR = "white",
    LINE_COLOR = "black";

var x = d3.scaleLinear()
    .domain([420, 0])
    .range([0, FIELD_LENGTH]);
var y = d3.scaleLinear()
    .domain([136, -136])
    .range([0, FIELD_WIDTH]);

function drawField() {
    var svg = d3.select("svg")
        .attr("height", FIELD_WIDTH + MARGIN.top + MARGIN.bottom)
        .attr("width", FIELD_LENGTH + MARGIN.left + MARGIN.right);
    var g = svg.append("g")
        .attr("id", "field")
        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
        .style("background", FIELD_COLOR);

    g.append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", FIELD_LENGTH)
        .attr("height", FIELD_WIDTH);

    g.append("rect")
        .attr("id", "sidelines")
        .attr("class", "lines")
        .attr("transform", "translate(" + x(420) + "," + y(136) + ")")
        .attr("height", FIELD_WIDTH)
        .attr("width", FIELD_LENGTH)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    g.append("rect")
        .attr("id", "defeighteen")
        .attr("class", "lines")
        .attr("x", x(420))
        .attr("y", y(81))
        .attr("height", 163*FIELD_MULT)
        .attr("width", 66*FIELD_MULT)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    g.append("rect")
        .attr("id", "atteighteen")
        .attr("class", "lines")        
        .attr("x", x(66))
        .attr("y", y(81))
        .attr("height", 163*FIELD_MULT)
        .attr("width", 66*FIELD_MULT)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    g.append("rect")
        .attr("id", "defsix")
        .attr("class", "lines")
        .attr("x", x(420))
        .attr("y", y(37))
        .attr("height", 75*FIELD_MULT)
        .attr("width", 22*FIELD_MULT)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    g.append("rect")
        .attr("id", "attsix")
        .attr("class", "lines")
        .attr("x", x(22))
        .attr("y", y(37))
        .attr("height", 75*FIELD_MULT)
        .attr("width", 22*FIELD_MULT)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    g.append("circle")
        .attr("id", "defpk")
        .attr("class", "lines")
        .attr("cx", x(44))
        .attr("cy", y(0))  
        .attr("r", 1 * FIELD_MULT)
        .style("fill", LINE_COLOR);
    g.append("circle")
        .attr("id", "attpk")
        .attr("class", "lines")
        .attr("cx", x(420-44))
        .attr("cy", y(0))
        .style("fill", LINE_COLOR) 
        .attr("r", 1 * FIELD_MULT);

    g.append("line")
        .attr("id", "center-line")
        .attr("class", "lines")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("x1", x(210))
        .attr("y1", y(136))
        .attr("x2", x(210))
        .attr("y2", y(-136));
    g.append("circle")
        .attr("id", "center-spot")
        .attr("class", "lines")
        .style("fill", LINE_COLOR) 
        .attr("cx", x(210))
        .attr("cy", y(0))  
        .attr("r", 1 * FIELD_MULT);
    g.append("circle")
        .attr("id", "center-circle")
        .attr("class", "lines")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("cx", x(210))
        .attr("cy", y(0)) 
        .attr("r", 40 * FIELD_MULT);
        
    
}

function drawAssist(team) {
    var field = d3.select("#field");

    var randomX = d3.randomNormal(FIELD_LENGTH / 2, 80),
        randomY = d3.randomNormal(FIELD_WIDTH / 2, 80),
        points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

    var color = d3.scaleSequential(d3.interpolateLab("white", "#005824"))
        .domain([0, 10]);

    var hexbin = d3.hexbin()
        .radius(39)
        .extent([[0, 0], [FIELD_LENGTH, FIELD_WIDTH]]);
    // console.log(points);
    // console.log(hexbin.centers())

    var assists = formatChances(team);
    console.log(assists);

    field.append("g")
            .attr("class", "hexagon")
            .attr("clip-path", "url(#clip)")
        .selectAll("path")
        .data(hexbin(assists))
        // .data(hexbin(points))
        .enter().append("path")
            .attr("d", hexbin.hexagon())
            // .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .style("fill", function(d) { return color(d.length); })
            .style("opacity", .5)
}

function formatChances(team) {
    var info = [];
    for (var c=0; c < CHANCES.length; c++) {
        var chance = CHANCES[c];
        if (chance.team == team && chance.icon != "penawarded" && chance.icon != "penmissed") {
            if ((!isNaN(chance.assist_x)) && (!isNaN(chance.assist_y))) {
                var assist_loc = [x(chance.assist_y), y(chance.assist_x)]; 
                // assist_loc[quality] = chance.chance_value;
                info.push(assist_loc);
            }
        }
    }
    return info;
}