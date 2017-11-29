var FIELD = "#field";
$(document).ready(function() {
    var teams = [ "Beijing Guoan", "Changchun Yatai", "Chongqing Dangdai Lifan", "Guangzhou Evergrande",
                "Guangzhou R&F", "Guizhou Zhicheng", "Hebei CFFC", "Henan Jianye", "Jiangsu Suning",
                "Liaoning Kaixin", "Liaoning Whowin", "Shandong Luneng", "Shanghai Shenhua",
                "Shanghai SIPG", "Tianjin Quanjian", "Tianjin Teda", "Yanbian Funde"
            ]; 
    //initialize everything
    function init(f, team) {
        FIELD = f;
        //draw field
        drawField();
        //bring in the data and give callback function to do something with the data        
        readData(chanceQualityByAssistLoc, team);
    }
    // init(FIELD, teams[0]);
    cycleTeams(0);
    function cycleTeams(t) {
        if (t < teams.length) {
            init(FIELD, teams[t]);
            setTimeout(function () {clearField(); drawField()}, 3000);
            setTimeout(function () {cycleTeams(t+1)}, 3500);
        }
    }

    function clearField() {
        d3.selectAll(".assist-bin").remove();
        d3.selectAll(".chalk").remove();
    }
    
    // init("#field2", "Guangzhou Evergrande");

    
    
});