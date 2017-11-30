var FIELD = "#field";
$(document).ready(function() {
    var teams = [ "Beijing Guoan", "Changchun Yatai", "Chongqing Dangdai Lifan", "Guangzhou Evergrande",
                "Guangzhou R&F", "Guizhou Zhicheng", "Hebei CFFC", "Henan Jianye", "Jiangsu Suning",
                "Liaoning Kaixin", "Liaoning Whowin", "Shandong Luneng", "Shanghai Shenhua",
                "Shanghai SIPG", "Tianjin Quanjian", "Tianjin Teda", "Yanbian Funde"
            ]; 
    //initialize everything
    function init(f, team, att) {
        FIELD = f;
        //draw field
        drawField();
        //add teams to option select
        addOptions();
        //bring in the data      
        readData();
    }
    init();
    // cycleTeams(0);
    function cycleTeams(t) {
        if (t < teams.length) {
            init(FIELD, teams[t], false);
            setTimeout(function () {drawAssist(teams[t], true);}, 500);
            setTimeout(function () {clearField();}, 2500);
            setTimeout(function () {cycleTeams(t+1)}, 3000);
        }
    }

    function addOptions() {
        var ts = document.getElementById("team-select");
        for (t in teams) {
            var team = teams[t];
            var option = document.createElement("option");
            option.text = team;
            ts.add(option);
        }
        var bgs = document.getElementById("bg-select");
        var txs = document.getElementById("text-select");
        var colors = ["black", "blue", "gold", "gray", "green", "orange", "red", "white"];
        for (c in colors) {
            var color = colors[c];
            var option = document.createElement("option");
            option.text = color;
            bgs.add(option);
        }
        $("#text-select").html($("#bg-select").html());
        bgs.onchange = function() {d3.select("#head-bg").style("fill", bgs.value).style("stroke", bgs.value)};
        txs.onchange = function() {d3.select("#team-text").style("fill", txs.value)};
        
        ts.onchange = function() {optionsChanged(ts.value)};
        document.getElementById("created").onchange = function() {optionsChanged(ts.value)};
        document.getElementById("conceded").onchange = function() {optionsChanged(ts.value)};
    }

    function optionsChanged(team) {
        var created = document.getElementById("created");
        var conceded = document.getElementById("conceded");
        d3.selectAll(".assist-bin").remove();
        if (created.checked) {
            drawAssist(team, true);
            d3.selectAll(".attscale").style("opacity", .75);
        } else {
            d3.selectAll(".attscale").style("opacity", 0);
        }
        if (conceded.checked) {
            drawAssist(team, false);
            d3.selectAll(".defscale").style("opacity", .75);
        } else {
            d3.selectAll(".defscale").style("opacity", 0);
        }
    }
    
    
});