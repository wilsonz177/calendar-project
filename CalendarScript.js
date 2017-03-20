    document.addEventListener('DOMContentLoaded', initialLoad, false);
    document.getElementById('fwd').addEventListener('click', moveFwd, false);
    document.getElementById('back').addEventListener('click', moveBack, false);
    document.getElementById('addeventbutton').addEventListener('click', addEventAjax, false);
    document.getElementById('editeventbutton').addEventListener('click', editEventAjax, false);
    document.getElementById('sharebutton').addEventListener('click', shareCalendar, false); //eventlistener for sharing
    document.getElementById('switchCalendar').addEventListener('click', switchCal, false);
    
    
    var current = new Date();
    var numericMonth = current.getMonth();
    var month = convertNumToMonth(numericMonth);
    var day = current.getDate();
    var year = current.getFullYear();
    var selectedDay = day;
    var formDate = document.getElementsByClassName('formDate');
    var dayEvents = [];
    var oldEdit = [];
    var selectedEventID;
    
    function initialLoad(){
        var username = document.getElementById('initial_username').textContent;
        console.log('username: ', username);
        if(username === 'Guest'){
            document.getElementById('everything_but_calendar').style.display = 'none';
        }
        setup();    
    }

    //EVENT CONSTRUCTOR
    function eventInfo(title, hour, minute, event_id){
        this.title = title;
        this.month = numericMonth;
        this.day = selectedDay;
        this.hour = hour;
        this.minute = minute;
        this.year = year;
        this.id = event_id;
    }
    
    function shareCalendar(){
        
    var addeduser = document.getElementById('sharedUser').value;
    
    var dataString = "shared=" + encodeURIComponent(addeduser);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5ShareCalendar.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString); // Send the data
    var reload = setInterval(function(){
        setup();
        clearInterval(reload);
    }, 10);
    
    }
    
    function switchCal(){ //changes to different calendar
        setup();
    }
    
    function moveFwd(){
      document.getElementById('selected').removeAttribute('id');
      //if you need to go to the new year
      if(numericMonth === 11){
            current = new Date(year+1, 0, 1, 0);
      }else{
            current = new Date(year, numericMonth+1, 1, 0);
      }
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
      }else{
            current = new Date(year, numericMonth-1, 1, 0);
      }
      numericMonth = current.getMonth();
      month = convertNumToMonth(numericMonth);
      day = current.getDate();
      year = current.getFullYear();
      setup();   
    }
    
    
    // FILLS THE CALENDAR DATES
    function setup(){

        var d = new Date(year, numericMonth, 1, 0);
        var skipdays = d.getDay()-1;
        document.getElementById('calendarTitle').innerHTML = month + "  " + year;
        
        //FIND END DATE
        var enddate = current.monthDays();
        
        //get the array
        var array = document.getElementsByTagName('td');
        
         //CLEAR THE DATES ON THE CALENDAR AND REMOVE EVENT LISTENERS
        for (i = 0; i < array.length; i++) {
            array[i].innerHTML = '';
            array[i].removeEventListener('click', displayDay, false);
        }
        
        //FILL CALENDAR W DATES
        for (i = skipdays+1; i < array.length; i++) {
            if(i-skipdays === enddate+1){
                  break;
            }
            array[i].innerHTML = i-skipdays;
            if(i-skipdays === day){
                  array[i].setAttribute('id', 'selected');
                  selectedDay = day;
                  formDate[0].innerHTML = month + " " + selectedDay + " " + year;
                  formDate[1].innerHTML = month + " " + selectedDay + " " + year;
                  formDate[2].innerHTML = month + " " + selectedDay + " " + year;
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
        document.getElementById('eventEdit').style.display = 'none';
        event.target.setAttribute('id', 'selected');
        
        var array = document.getElementsByTagName('td');
        var d = new Date(year, numericMonth, 1, 0);
        var enddate = current.monthDays();
        var skipdays = d.getDay()-1;
        
        for (i = skipdays+1; i < array.length; i++) {

            if(i-skipdays === enddate+1){
                  break;
            }
            if(array[i].getAttribute('id') === 'selected'){
                selectedDay = i-skipdays;
                break;
            }
        }

        formDate[0].innerHTML = month + " " + selectedDay + " " + year;
        formDate[1].innerHTML = month + " " + selectedDay + " " + year;
        formDate[2].innerHTML = month + " " + selectedDay + " " + year;
        getEventAjax();
    }
    
    
    function addEventAjax(){
    var title = document.getElementById('eventTitle').value;
    
    var hour = parseInt(document.getElementById('eventHour').value);
    var minute = parseInt(document.getElementById('eventMinute').value);
    
    
    var dataString = "title=" + encodeURIComponent(title) + "&month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year) + "&hour=" + encodeURIComponent(hour) + "&minute=" +encodeURIComponent(minute);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5AddEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString); // Send the data

    var reload = setInterval(function(){
        getEventAjax();
        clearInterval(reload);
    }, 10);
    
}


var mylist = document.getElementsByTagName('ul')[0];

function getEventAjax(){
    $( "ul" ).empty(); //clear the day's list of events and the event listeners associated w them
    var switchToThisCalendar = document.getElementById('pickCalendar').value;
    dayEvents = [];
    //create the data string and send the AJAX request
    var dataString = "month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year) + "&whosecalendar=" + encodeURIComponent(switchToThisCalendar);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5ViewEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //event listener and function to run when information is received
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        if (jsonData[0]['showAll'] === false){ //hides functionality for someone just viewing a calendar
            document.getElementById('eventcreator').style.visibility = "hidden";
            document.getElementById('shareCalendar').style.visibility = "hidden";
            //document.getElementById('eventEdit').style.visibility = "hidden";
        } else {
            document.getElementById('eventcreator').style.visibility = "visible";
            document.getElementById('shareCalendar').style.visibility = "visible";
            //document.getElementById('shareCalendar').style.visibility = "visible";
        }
        
        
        for(i = 1; i <= jsonData[0].count; i++){
            var newLi = document.createElement("li");  // creates a node with the tag name li
            dayEvents.push(new eventInfo(jsonData[i].title, jsonData[i].hour, jsonData[i].minute, jsonData[i].event_id)); //creates a eventInfo object and pushes it to the dayEvents array
            console.log('begin');
            var span0 = document.createElement("span");
            span0.setAttribute('class', 'spantitle');
            span0.innerHTML = dayEvents[i-1].title;
            newLi.appendChild(span0);
            newLi.appendChild(document.createTextNode(": At ")); //adds it to the list node
           
           
            var span1 = document.createElement("span");
            span1.setAttribute('class', 'spanhour');
            span1.innerHTML = dayEvents[i-1].hour;
            newLi.appendChild(span1);
            //var append2 = " hour ";
            newLi.appendChild(document.createTextNode(" hour "));
            var span2 = document.createElement("span");
            span2.setAttribute('class', 'spanminute');
            span2.innerHTML = dayEvents[i-1].minute;
            newLi.appendChild(span2);
            newLi.appendChild(document.createTextNode(" minute"));
            
            var span3 = document.createElement("span");
            span3.setAttribute('class', 'eventID');
            span3.innerHTML = dayEvents[i-1].id;
            newLi.appendChild(span3);
            
            console.log('end');
                if (jsonData[0]['showAll'] === true){
                //adding edit and delete buttons to list node and adding event listeners
                var editButton = document.createElement("button");
                editButton.setAttribute('type', 'button');
                editButton.setAttribute('class', 'editButton');
                editButton.appendChild(document.createTextNode('Edit'));
                editButton.addEventListener('click', displayEventEditor, false);
                newLi.appendChild(editButton);
                var deleteButton = document.createElement("button");
                var tempID = "" + i;
                deleteButton.setAttribute('type', 'button');
                deleteButton.setAttribute('class', 'deleteButton');
                deleteButton.setAttribute("id", tempID);
                deleteButton.appendChild(document.createTextNode('Delete'));
                newLi.appendChild(deleteButton);
                //add list node to mylist or <ul> tag
                //mylist.appendChild(newLi);
    
                deleteButton.addEventListener('click',
                                              
                function(){
        
                    var buttonNum = this.id;
                    var event = dayEvents[buttonNum - 1];
                    var eid = event.id;
        
                    var dataString = "event_id=" + encodeURIComponent(eid);
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open("POST", "Mod5DeleteEvent.php", true);
                    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xmlHttp.addEventListener("load", function(event){
                    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
                    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
                        getEventAjax();
                    }else{
                        alert("You did not delete the event.  "+jsonData.message);
                    }
                    }, false); // Bind the callback to the load event
                        xmlHttp.send(dataString); // Send the data
                }, false);
            }
             mylist.appendChild(newLi);
        }
        
        console.log('my dayevents array: ', dayEvents);
        
    }, false);
    xmlHttp.send(dataString); // Send the data
}

function displayEventEditor(){
    console.log('pressed');
    //show the event Edit portion of the page
    document.getElementById('eventEdit').style.display = 'block';
   
   // fill the edit portion with the correct information pertaining to the event
   
    var spanArray = event.target.parentNode.getElementsByTagName('span'); //this holds the title, hour, & minute
    console.log(event.target.parentNode);
    console.log('spanarray: ', spanArray);
    var yo = document.getElementById('eventEdit').getElementsByTagName('h3')[0].getElementsByTagName('span')[0]; //fill the title of h3
    var tempTitle = spanArray[0].textContent;
    yo.innerHTML =  tempTitle;
    
    document.getElementById('eventEditTitle').setAttribute('value', spanArray[0].textContent); //fill the input with title
    
    //fill the select tags with the right information
    var tempHour = parseInt(spanArray[1].textContent);
    var tempMinute = parseInt(spanArray[2].textContent);
    var hourOptions = document.getElementById('eventEditHour').getElementsByTagName('option');
    var minuteOptions = document.getElementById('eventEditMinute').getElementsByTagName('option');
    for(i = 0; i < hourOptions.length; i++){
       var a = parseInt(hourOptions[i].value);
        if(a === tempHour){
            hourOptions[i].setAttribute('selected', 'selected');
        }
    }
    for(i = 0; i < minuteOptions.length; i++){
       var b = parseInt(minuteOptions[i].value);
        if(b === tempMinute){
            minuteOptions[i].setAttribute('selected', 'selected');
        }
    }
    //fill the array with the old edits so you know how to find them?
    //oldEdit = [tempTitle, tempHour, tempMinute];
    selectedEventID = parseInt(spanArray[3].textContent);
}

function editEventAjax(){
    //get the information to send
    var editTitle = document.getElementById('eventEditTitle').value;
    var editHour = parseInt(document.getElementById('eventEditHour').value);
    var editMinute = parseInt(document.getElementById('eventEditMinute').value);
    
    
    var dataString = "event_id=" + encodeURIComponent(selectedEventID) +  "&title=" + encodeURIComponent(editTitle) + "&hour=" + encodeURIComponent(editHour) + "&minute=" +encodeURIComponent(editMinute);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5EditEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString); // Send the data
    var reload = setInterval(function(){
        getEventAjax();
        clearInterval(reload);
    }, 10);
}