function openSect(sectName) {
    // hide by default
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display ="none";
    }

    //show specific page content
    document.getElementById(sectName).style.display ="block";
}

// default page
document.getElementById("defaultOpen").click();