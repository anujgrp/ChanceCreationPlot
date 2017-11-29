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
    // init(FIELD, teams[1], true); /*average team*/
    // init(FIELD, teams[13], true); /*good team*/
    // init(FIELD, teams[9], true); /*bad team*/
    // init(FIELD, teams[13], false);
    // setTimeout(function () {drawAssist(teams[13], true);}, 500);
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
        }
        if (conceded.checked) {
            drawAssist(team, false);
        }
    }
    
    
});