var FIELD_MULT = 2,
    FIELD_WIDTH = 273 * FIELD_MULT,
    FIELD_LENGTH = 421 * FIELD_MULT,
    MARGIN = {top: 75, left: 100, bottom: 30, right: 100},
    FIELD_COLOR = "white",
    LINE_COLOR = "black",
    HEADER_COLOR = "black",
    TEXT_COLOR = "white";

var x = d3.scaleLinear()
    .domain([420, 0])
    .range([0, FIELD_LENGTH]);
var y = d3.scaleLinear()
    .domain([136, -136])
    .range([0, FIELD_WIDTH]);
var def_x = d3.scaleLinear()
    .domain([0, 420])
    .range([0, FIELD_LENGTH]);
var def_y = d3.scaleLinear()
    .domain([-136, 136])
    .range([0, FIELD_WIDTH]);

d3.selection.prototype.moveToFront = function() {  
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

function drawScales() {
    var field = d3.select("#field");
    //draw defending scale
    field.append("text")
        .attr("class", "defscale")
        .attr("x", -65)
        .attr("y", (FIELD_WIDTH/2)-85)
        .attr("dy", ".5em")
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "right")
        .text("Avg CR")
        .style("opacity", 0);
    field.append("text")
        .attr("class", "defscale")
        .attr("x", -(BINSIZE*3)-25)
        .attr("y", (FIELD_WIDTH/2)-60)
        .attr("dy", ".5em")
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "right")
        .text("High")
        .style("opacity", 0);
    field.append("text")
        .attr("class", "defscale")
        .attr("x", -(BINSIZE*3)-25)
        .attr("y", 60+(FIELD_WIDTH/2))
        .attr("dy", ".5em")
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "right")
        .text("Low")
        .style("opacity", 0);
    for (var i=0; i < defscale.length; i++) {
        field.append("path")
            .attr("class", "defscale")
            .attr("d", hexbin.hexagon(15))
            .attr("transform", "translate(" + (-BINSIZE-25) + "," + ((i*30)+((FIELD_WIDTH/2)-60)) + ")")
            .style("fill", defscale[defscale.length-(i+1)])
            .style("opacity", 0);
    }
    //draw attacking scale
    field.append("text")
        .attr("class", "attscale")
        .attr("x", FIELD_LENGTH+25)
        .attr("y", (FIELD_WIDTH/2)-85)
        .attr("dy", ".5em")
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "left")
        .text("Avg CR")
        .style("opacity", 0);
    field.append("text")
        .attr("class", "attscale")
        .attr("x", FIELD_LENGTH+BINSIZE+40)
        .attr("y", (FIELD_WIDTH/2)-60)
        .attr("dy", ".5em")
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "left")
        .text("High")
        .style("opacity", 0);
    field.append("text")
        .attr("class", "attscale")
        .attr("x", FIELD_LENGTH+BINSIZE+40)
        .attr("y", 60+(FIELD_WIDTH/2))
        .attr("dy", ".5em")
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "left")
        .text("Low")
        .style("opacity", 0);
    for (var i=0; i < attscale.length; i++) {
        field.append("path")
            .attr("class", "attscale")
            .attr("d", hexbin.hexagon(15))
            .attr("transform", "translate(" + (FIELD_LENGTH+BINSIZE+25) + "," + ((i*30)+((FIELD_WIDTH/2)-60)) + ")")
            .style("fill", attscale[attscale.length-(i+1)])
            .style("opacity", 0);
    }
}

function drawField() {
    var svg = d3.select("svg")
        .attr("height", FIELD_WIDTH + MARGIN.top + MARGIN.bottom)
        .attr("width", FIELD_LENGTH + MARGIN.left + MARGIN.right)
        .style("background", FIELD_COLOR);
    var header = svg.append("g")
        .attr("id", "header")
        .attr("transform", "translate(" + MARGIN.left + ",0)");
    header.append("rect")
        .attr("id", "head-bg")
        .attr("width", FIELD_LENGTH)
        .attr("height", MARGIN.top)
        .style("fill", HEADER_COLOR)
        .style("stroke", HEADER_COLOR)
        .style("stroke-width", 2)
        .style("opacity", .75);
    header.append("text")
        .attr("id", "head-text")
        .attr("x", FIELD_LENGTH/2)
        .attr("y", MARGIN.top/2)
        .attr("dy", ".5em")
        .style("font-size", "2em")
        .style("fill", TEXT_COLOR)
        .style("text-anchor", "middle")
        .style("opacity", .75);
        
        
    var g = svg.append("g")
        .attr("id", "field")
        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

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

    g.append("text")
        .attr("id", "arrow-text")
        .attr("class", "lines")
        .attr("x", FIELD_LENGTH/2)
        .attr("y", FIELD_WIDTH + 15)
        .style("font-size", ".75em")
        .style("fill", "black")
        .style("text-anchor", "middle")
        .text("Attacking Direction");
    g.append("svg:defs").append("marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");
    g.append("line")
        .attr("class", "lines")
        .attr("id", "direction")
        .attr("x1", 100)
        .attr("y1", FIELD_WIDTH + 20)
        .attr("x2", FIELD_LENGTH-100)
        .attr("y2", FIELD_WIDTH + 20)
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("marker-end","url(#triangle)");
    drawScales();
}

function clearField() {
    d3.selectAll(".assist-bin").remove();
    d3.selectAll(".lines").remove();
}

