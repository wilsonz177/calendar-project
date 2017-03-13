document.addEventListener('DOMContentLoaded', setup, false);
    document.getElementById('fwd').addEventListener('click', moveFwd, false);
    document.getElementById('back').addEventListener('click', moveBack, false);
    
    var current = new Date();
    var numericMonth = current.getMonth();
    var month = convertNumToMonth(numericMonth);
    var day = current.getDate();
    var year = current.getFullYear();
    var selectedDay = day;
    console.log(numericMonth);
    var formDate = document.getElementsByClassName('formDate');
    
    
    function moveFwd(){
      document.getElementById('selected').removeAttribute('id');
      //if you need to go to the new year
      if(numericMonth === 11){
            current = new Date(year+1, 0, 1, 0);
            console.log('nextyear');
      }else{
            current = new Date(year, numericMonth+1, 1, 0);
      }
      console.log(current);
      numericMonth = current.getMonth();
      month = convertNumToMonth(numericMonth);
      day = current.getDate();
      year = current.getFullYear();
      setup();      
    }
    function moveBack(){
      document.getElementById('selected').removeAttribute('id');
      //if you need to go to prev year
      if(numericMonth === 0){
            current = new Date(year-1, 11, 1, 0);
            console.log('prev year');
      }else{
            current = new Date(year, numericMonth-1, 1, 0);
      }
      console.log(current);
      numericMonth = current.getMonth();
      month = convertNumToMonth(numericMonth);
      day = current.getDate();
      year = current.getFullYear();
      setup();   
    }
    
    
    // FILLS THE CALENDAR DATES
    function setup(){
        //console.log(current);
        //
        //console.log(day);

        
        
        var d = new Date(year, numericMonth, 1, 0);
        var skipdays = d.getDay()-1;
        //console.log(d);
        //skip days from 0-6
        //console.log(skipdays);
        document.getElementById('calendarTitle').innerHTML = month + "  " + year;
        
        //FIND END DATE
        var enddate = current.monthDays();
        
        //get the array
        var array = document.getElementsByTagName('td');
        
         //CLEAR THE DATES ON THE CALENDAR
        for (i = 0; i < array.length; i++) {
            array[i].innerHTML = '';
        }
        
        //FILL CALENDAR W DATES
        for (i = skipdays+1; i < array.length; i++) {
            //console.log('happened');
            //array1[i] = array[i].getElementsByTagName("td");
            if(i-skipdays === enddate+1){
                  break;
            }
            array[i].innerHTML = i-skipdays;
            if(i-skipdays === day){
                  array[i].setAttribute('id', 'selected');
                  selectedDay = day;
                  formDate[0].innerHTML = month + " " + selectedDay + " " + year;
                  formDate[1].innerHTML = month + " " + selectedDay + " " + year;
                  getEventAjax();
            }
            array[i].addEventListener('click', displayDay, false);
        }
    }
    
    //function to find how many days in that month
    Date.prototype.monthDays= function(){
            var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
            return d.getDate();
      };
    
    //converts the numeric month 0-11 to the name of the month
    function convertNumToMonth(num_month){
        var answer;
        switch(num_month){
            case 0:
                answer = 'January';
                break;
            case 1:
                answer = 'February';
                break;
            case 2:
                answer = 'March';
                break;
           case 3:
                answer = 'April';
                break;
            case 4:
                answer = 'May';
                break;
            case 5:
                answer = 'June';
                break;
            case 6:
                answer = 'July';
                break;
            case 7:
                answer = 'August';
                break;
            case 8:
                answer = 'September';
                break;
            case 9:
                answer = 'October';
                break;
            case 10:
                answer = 'November';
                break;
            case 11:
                answer = 'December';
                break;
        }
        return answer;
    }
    
    
    //function to run when a day is clicked
    function displayDay(){
        document.getElementById('selected').removeAttribute('id');
        event.target.setAttribute('id', 'selected');
        
        var array = document.getElementsByTagName('td');
        var d = new Date(year, numericMonth, 1, 0);
        var enddate = current.monthDays();
        var skipdays = d.getDay()-1;
        
        for (i = skipdays+1; i < array.length; i++) {
            //console.log('happened');
            //array1[i] = array[i].getElementsByTagName("td");

            if(i-skipdays === enddate+1){
                  break;
            }
            if(array[i].getAttribute('id') === 'selected'){
                selectedDay = i-skipdays;
                break;
            }
        }
        console.log('yo', selectedDay);
        formDate[0].innerHTML = month + " " + selectedDay + " " + year;
        formDate[1].innerHTML = month + " " + selectedDay + " " + year;
        getEventAjax();
    }
    
document.getElementById('addeventbutton').addEventListener('click', addEventAjax, false);

function addEventAjax(){
    var username = 'barack';
    var title = document.getElementById('eventTitle').value;
    
    var hour = parseInt(document.getElementById('eventHour').value);
    var minute = parseInt(document.getElementById('eventMinute').value);
    
    
    var dataString = "username=" + encodeURIComponent(username) + "&title=" + encodeURIComponent(title) + "&month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year) + "&hour=" + encodeURIComponent(hour) + "&minute=" +encodeURIComponent(minute);
    console.log(dataString);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5AddEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xmlHttp.addEventListener("load", function(event){
    //    var jsonData = JSON.parse(event.target.responseText);
    //}, false);
    xmlHttp.send(dataString); // Send the data
    
    var reload = setInterval(function(){
        getEventAjax();
        clearInterval(reload);
    }, 10);
    
}


var mylist = document.getElementsByTagName('ul')[0];

function getEventAjax(){
    $( "ul" ).empty();
    var username = 'barack';
    console.log(selectedDay);
    var dataString = "username=" + encodeURIComponent(username) + "&month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year);
    //console.log(datastring);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5ViewEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        console.log(jsonData);
        //var mylist = document.getElementsByTagName('ul')[0];
        console.log(jsonData[0].count);
        console.log(typeof(jsonData[0].count));
        for(i = 1; i <= jsonData[0].count; i++){
            var newLi = document.createElement("li");  // creates a node with the tag name li
            var a = jsonData[i].title;
            var b = jsonData[i].hour;
            var c = jsonData[i].minute;
            var append = a.concat(": At ", b, " hour " , c, " minute");
            newLi.appendChild(document.createTextNode(append));
            mylist.appendChild(newLi);
        }
    }, false);
    xmlHttp.send(dataString); // Send the data
}