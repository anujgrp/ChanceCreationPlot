var FIELD_MULT = 3,
    FIELD_WIDTH = 273 * FIELD_MULT,
    FIELD_LENGTH = 210 * FIELD_MULT,
    FIELD_MARGIN = 15,
    FIELD_COLOR = "olivedrab",
    LINE_COLOR = "white";
var X_FIELD_SCALE = d3.scaleLinear()
    .domain([136, -136])
    .range([FIELD_MARGIN, FIELD_WIDTH+FIELD_MARGIN]);
var Y_FIELD_SCALE = d3.scaleLinear()
    .domain([0, 210])
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
        .attr("width", FIELD_WIDTH)
        .attr("height", FIELD_LENGTH + FIELD_MARGIN+1)
        .attr("x", FIELD_MARGIN)
        .attr("y", FIELD_MARGIN)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw line through midfield
    svg.append("line")
        .attr("class", "center-line")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("x1", X_FIELD_SCALE(136))
        .attr("y1", Y_FIELD_SCALE(210))      
        .attr("x2", X_FIELD_SCALE(-136))
        .attr("y2", Y_FIELD_SCALE(210));
    //draw 6 yd box
    svg.append("rect")
        .attr("id", "six")
        .attr("width", 74*FIELD_MULT)
        .attr("height", 22*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(37))
        .attr("y", Y_FIELD_SCALE(0))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw 18 yd box
    svg.append("rect")
        .attr("id", "eighteen")
        .attr("width", 162*FIELD_MULT)
        .attr("height", 66*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(81))
        .attr("y", Y_FIELD_SCALE(0))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw pk spot
    svg.append("circle")
        .attr("id", "pk")
        .style("fill", LINE_COLOR) 
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(44))  
        .attr("r", 1 * FIELD_MULT);
    //draw center spot
    svg.append("circle")
        .attr("id", "center-spot")
        .style("fill", LINE_COLOR) 
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(210))  
        .attr("r", 1 * FIELD_MULT);
    //draw center circle
    svg.append("circle")
        .attr("class", "center-circle")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("cx", X_FIELD_SCALE(0))
        .attr("cy", Y_FIELD_SCALE(210)) 
        .attr("r", 40 * FIELD_MULT);
    //draw goal 
    svg.append("rect")
        .attr("id", "GOAL")
        .attr("width", 30*FIELD_MULT)
        .attr("height", FIELD_MARGIN/2)
        .attr("x", X_FIELD_SCALE(15))
        .attr("y", FIELD_MARGIN/2)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

}