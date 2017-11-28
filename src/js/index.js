var FIELD = "#field";
$(document).ready(function() { 
    //initialize everything
    function init(f, team) {
        FIELD = f;
        //draw field
        drawField();
        //bring in the data and give callback function to do something with the data        
        readData(chanceQualityByAssistLoc, team);
    }
    init(FIELD, "Guangzhou Evergrande");
    // init("#field2", "Guangzhou Evergrande");

    
    
});