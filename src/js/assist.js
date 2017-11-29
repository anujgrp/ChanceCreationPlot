function getFieldArr(length, width) {
    var arr = [];
    for (var r=0; r < length; r++) {
        var col = [];
        for (var c=0; c < width; c++) {
            var obj = {};
            obj.value = 0;
            obj.total = 0;
            col.push(obj);
        }
        arr.push(col);
    }
    return arr;
}

function binField(field, blength, bwidth) {
    var bin = [];
    for (var r=0; r < field.length; r++) {
        var col = field[r];
        var bcol = [];
        for (var c=0; c <= col.length; c++) {
            var obj = {};
            obj.value = 0;
            obj.total = 0;
            bcol.push(obj);
        }
        bin.push(bcol);
    }
    for (var r=0; r < field.length-1; r++) {
        var col = field[r];
        for (var c=col.length-1; c >= 0; c--) {
            var val = col[c].value;
            var tot = col[c].total;
            var bincol = Math.ceil((c+1)/bwidth)*bwidth;
            var binrow = Math.floor((r+1)/blength)*blength;
            bin[binrow][bincol].value += val;
            bin[binrow][bincol].total += tot;
        }
    }
    return bin;
}

function chanceQualityByAssistLoc(team) {
    //field will contain total data for every location
    //bins will contain averaged data for every location
    var field = getFieldArr(416, 273);
    for (var i=0; i < CHANCES.length; i++) {
        var c = CHANCES[i];
        if (c.team == team && c.icon != "penawarded" && c.icon != "penmissed") {
            if ((!isNaN(c.assist_x)) && (!isNaN(c.assist_y))) {
                field[c.assist_y][c.assist_x+136].value += c.chance_value;
                field[c.assist_y][c.assist_x+136].total += 1;   
            }
        }
    }
    var binned = binField(field, 39, 39);
    drawMap(binned, 39);
}

function percentile(p, n) {
    return Math.floor((n*p)/100 + .5);
}

function drawMap(bins, binsize) {
    var all = [];
    for (var r=0; r < bins.length; r++) {
        var col = bins[r];
        for (var c=0; c < col.length; c++) {
            var x = c-136, y = r, color = "gray", val = col[c].value, tot = col[c].total;
            var avg = tot > 0 ? val/tot : 0;
            if (tot > 0) all.push(tot);
            var scale = ["#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824"];
            if (avg >= .21) color = scale[4];
            else if (avg >= .1195) color = scale[3];
            else if (avg >= .065) color = scale[2];
            else if (avg >= .04) color = scale[1];
            else if (avg >= 0) color = scale[0];
            
            if (tot > 12) size = binsize*.99; 
            else if (tot > 8) size = binsize*.8;
            else if (tot > 6) size = binsize*.6;
            else if (tot > 3) size = binsize*.4;
            else if (tot > 0) size = binsize*.2;

            if (tot > 0) drawRect(x, y, binsize, size, color, avg);

        }   
    }
    all.sort(function (a,b){return a-b;});
    console.log(all);
    console.log("20th percentile: " + all[percentile(20, all.length)]);
    console.log("40th percentile: " + all[percentile(40, all.length)]);
    console.log("60th percentile: " + all[percentile(60, all.length)]);
    console.log("80rd percentile: " + all[percentile(80, all.length)]);
}

function drawRect(x, y, binsize, size, color, v) {
    var svg = d3.select(FIELD);
    var cx = x - binsize/2;
    var cy = y + binsize/2;
    var scale = d3.scaleLinear(d3.schemeCategory10);
    var c = svg.append("rect")
        .attr("class", "assist-bin")
        .attr("height", size*FIELD_MULT)
        .attr("width", size*FIELD_MULT)
        .attr("x", X_FIELD_SCALE(cx+(size/2)))
        .attr("y", Y_FIELD_SCALE(cy-(size/2)))
        .style("fill", color)
        .style("opacity", .75)
        // .on("mouseover", function (d) {console.log(v);});
}