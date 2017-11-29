var FIELD_MULT = 2,
    FIELD_WIDTH = 273 * FIELD_MULT,
    FIELD_LENGTH = 420 * FIELD_MULT,
    FIELD_MARGIN = 15,
    FIELD_COLOR = "white",
    LINE_COLOR = "black";
var X_FIELD_SCALE = d3.scaleLinear()
    .domain([136, -136])
    .range([FIELD_MARGIN, FIELD_WIDTH+FIELD_MARGIN]);
var Y_FIELD_SCALE = d3.scaleLinear()
    .domain([0, 420])
    .range([FIELD_MARGIN, FIELD_LENGTH+FIELD_MARGIN]);

function drawField() {
    var svg = d3.select(FIELD)
        .attr("width", FIELD_WIDTH + (2*FIELD_MARGIN))
        .attr("height", FIELD_LENGTH + (2*FIELD_MARGIN))
        .style("background", FIELD_COLOR);
    drawLines();
}

function drawLines() {
    var svg = d3.select(FIELD);
    //draw sidelines
    svg.append("rect")
        .attr("id", "sidelines")
        .attr("class", "chalk")
        .attr("width", FIELD_WIDTH+1)
        .attr("height", FIELD_LENGTH)
        .attr("x", FIELD_MARGIN-1)
        .attr("y", FIELD_MARGIN)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw line through midfield
    svg.append("line")
        .attr("id", "center-line")
        .attr("class", "chalk")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("x1", X_FIELD_SCALE(136))
        .attr("y1", Y_FIELD_SCALE(210))      
        .attr("x2", X_FIELD_SCALE(-136))
        .attr("y2", Y_FIELD_SCALE(210));
    //draw top 6 yd box
    svg.append("rect")
        .attr("id", "topsix")
        .attr("class", "chalk")
        .attr("width", 74*FIELD_MULT)
        .attr("height", 22*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(37))
        .attr("y", Y_FIELD_SCALE(0))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw bottom 6 yd box
    svg.append("rect")
        .attr("id", "botsix")
        .attr("class", "chalk")
        .attr("width", 74*FIELD_MULT)
        .attr("height", 22*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(37))
        .attr("y", Y_FIELD_SCALE(420-22))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw top 18 yd box
    svg.append("rect")
        .attr("id", "topeighteen")
        .attr("class", "chalk")
        .attr("width", 162*FIELD_MULT)
        .attr("height", 66*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(81))
        .attr("y", Y_FIELD_SCALE(0))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw bottom 18 yd box
    svg.append("rect")
        .attr("id", "boteighteen")
        .attr("class", "chalk")
        .attr("width", 162*FIELD_MULT)
        .attr("height", 66*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(81))
        .attr("y", Y_FIELD_SCALE(420-66))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw top pk spot
    svg.append("circle")
        .attr("id", "toppk")
        .attr("class", "chalk")
        .style("fill", LINE_COLOR) 
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(44))  
        .attr("r", 1 * FIELD_MULT);
    //draw bottom pk spot
    svg.append("circle")
        .attr("id", "botpk")
        .attr("class", "chalk")
        .style("fill", LINE_COLOR) 
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(420-44))  
        .attr("r", 1 * FIELD_MULT);
    //draw center spot
    svg.append("circle")
        .attr("id", "center-spot")
        .attr("class", "chalk")
        .style("fill", LINE_COLOR) 
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(210))  
        .attr("r", 1 * FIELD_MULT);
    //draw center circle
    svg.append("circle")
        .attr("id", "center-circle")
        .attr("class", "chalk")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(210)) 
        .attr("r", 40 * FIELD_MULT);
    //draw top goal 
    svg.append("rect")
        .attr("id", "topgoal")
        .attr("class", "chalk")
        .attr("width", 30*FIELD_MULT)
        .attr("height", FIELD_MARGIN/2)
        .attr("x", X_FIELD_SCALE(15))
        .attr("y", FIELD_MARGIN/2)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw bottom goal 
    svg.append("rect")
        .attr("id", "botgoal")
        .attr("class", "chalk")
        .attr("width", 30*FIELD_MULT)
        .attr("height", FIELD_MARGIN/2)
        .attr("x", X_FIELD_SCALE(15))
        .attr("y", Y_FIELD_SCALE(420))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

}