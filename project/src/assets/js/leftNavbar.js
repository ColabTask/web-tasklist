var leftNavbar = document.getElementById('left-navbar');
var mainPanel = document.getElementById('main-panel');
//leftNavbar.style.display = 'none';
//mainPanel.style.marginLeft = '0px';

function openLeftNavbar(){
    var leftNavbar = document.getElementById('left-navbar');
    var mainPanel = document.getElementById('main-panel');

    if(leftNavbar.style.display == 'none'){
        leftNavbar.style.display = 'block';
        //mainPanel.style.marginLeft = '200px';
    }
    else{
        leftNavbar.style.display = 'none';
        //mainPanel.style.marginLeft = '0px';
    }
}
