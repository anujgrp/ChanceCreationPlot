var FIELD = "#field";
$(document).ready(function() { 
    //initialize everything
    function init() {
        //draw field
        drawField();
        //bring in the data and give callback function to do something with the data
        readData(chanceQualityByAssistLoc);
        
    }
    init();

    function getFieldArr(length, width) {
        var arr = [];
        for (var c=0; c < length; c++) {
            var row = [];
            for (var r=0; r < width; r++) {
                row.push(0);
            }
            arr.push(row);
        }
        return arr;
    }

    function binField(field, blength, bwidth) {
        var bin = [];
        for (var r=0; r < field.length; r++) {
            var col = field[r];
            var bcol = [];
            for (var c=col.length; c >= 0; c--) {
                bcol.push(0);
            }   
            bin.push(bcol);
        }
        for (var r=0; r < field.length/2; r++) {
            var col = field[r];
            for (var c=col.length-1; c >= 0; c--) {
                var val = col[c];
                var bincol = Math.ceil((c+1)/bwidth)*bwidth;
                var binrow = Math.floor((r+1)/blength)*blength;
                if (bincol > 272) {
                    console.log("Row: " + r + ", Col: " + c);
                    console.log("BRow: " + binrow + ", BCol: " + bincol);
                }
                bin[binrow][bincol] += val;
            }
        }
        return bin;
    }

    function chanceQualityByAssistLoc() {
        //field will contain total data for every location
        //bins will contain averaged data for every location
        var field = getFieldArr(420, 273);
        for (var i=0; i < CHANCES.length; i++) {
            var c = CHANCES[i];
            if (c.icon != "penawarded" && c.icon != "penmissed") {
                if ((!isNaN(c.assist_x)) && (!isNaN(c.assist_y))) field[c.assist_y][c.assist_x+136] += c.chance_value;
            }
        }
        // console.log(field);
        var binned = binField(field, 7, 7);
        console.log(binned);
        drawMap(binned, 7, 7);
        // drawMap(field, 1, 1);
    }

    function drawMap(bins, binheight, binwidth) {
        console.log("drawing..");
        for (var r=0; r < bins.length; r++) {
            var col = bins[r];
            for (var c=0; c < col.length; c++) {
                var x = c-137, y = r, color = "gray", val = col[c];
                if (val > 5) color = "darkgreen";
                else if (val > 2) color = "green";
                else if (val > 1) color = "lightgreen";
                else if (val > .5) color = "coral";
                else if (val > .1) color = "red";
                else if (val > 0) color = "maroon";
                if (val != 0) drawRect(x, y, binheight, binwidth, color, val);
            }   
        }
    }

    function drawRect(x, y, h, w, color, v) {
        var svg = d3.select(FIELD);
        var c = svg.append("rect")
            .attr("height", h*FIELD_MULT)
            .attr("width", w*FIELD_MULT)
            .attr("x", X_FIELD_SCALE(x))
            .attr("y", Y_FIELD_SCALE(y))
            .style("fill", color)
            .style("stroke", color)
            .style("stroke-width", 0)
            .style("opacity", .5)
            .on("mouseover", function (d) {
                console.log("X: " + x + ", Y: " + y + "; Value: " + v);
            });
    }
    
});