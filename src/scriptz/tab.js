function openSect(sectName) {
    // hide by default
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display ="none";
    }

    //show specific page content
    document.getElementById(sectName).style.display ="block";
    if (document.getElementById(sectName)=="blender") {
        document.getElementById(sectName).style.display ="flex";
    } else if (document.getElementById(sectName)=="blend") {
        document.getElementById(sectName).style.display ="flex";
    }
}

// default page
document.getElementById("defaultOpen").click();