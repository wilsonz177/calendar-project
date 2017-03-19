document.addEventListener('DOMContentLoaded', initialLoad, false);
    document.getElementById('fwd').addEventListener('click', moveFwd, false);
    document.getElementById('back').addEventListener('click', moveBack, false);
    document.getElementById('addeventbutton').addEventListener('click', addEventAjax, false);
    document.getElementById('editeventbutton').addEventListener('click', editEventAjax, false);
    
    
    var current = new Date();
    var numericMonth = current.getMonth();
    var month = convertNumToMonth(numericMonth);
    var day = current.getDate();
    var year = current.getFullYear();
    var selectedDay = day;
    console.log('numeric month', numericMonth);
    var formDate = document.getElementsByClassName('formDate');
    var dayEvents = [];
    var oldEdit = [];
    
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
    
    function moveFwd(){
      document.getElementById('selected').removeAttribute('id');
      //if you need to go to the new year
      if(numericMonth === 11){
            current = new Date(year+1, 0, 1, 0);
            console.log('nextyear:');
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
            console.log('prev year:');
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
        
         //CLEAR THE DATES ON THE CALENDAR AND REMOVE EVENT LISTENERS
        for (i = 0; i < array.length; i++) {
            array[i].innerHTML = '';
            array[i].removeEventListener('click', displayDay, false);
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
        console.log('display day fxn');
        document.getElementById('selected').removeAttribute('id');
        document.getElementById('eventEdit').style.display = 'none';
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
        console.log('new selectedDay:', selectedDay);
        formDate[0].innerHTML = month + " " + selectedDay + " " + year;
        formDate[1].innerHTML = month + " " + selectedDay + " " + year;
        formDate[2].innerHTML = month + " " + selectedDay + " " + year;
        getEventAjax();
        
    }
    


function addEventAjax(){
    //var username = 'barack';
    var title = document.getElementById('eventTitle').value;
    
    var hour = parseInt(document.getElementById('eventHour').value);
    var minute = parseInt(document.getElementById('eventMinute').value);
    
    
    var dataString = "title=" + encodeURIComponent(title) + "&month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year) + "&hour=" + encodeURIComponent(hour) + "&minute=" +encodeURIComponent(minute);
    console.log(dataString);
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
    //var username = 'barack';
    dayEvents = [];
    console.log(selectedDay);
    //create the data string and send the AJAX request
    var dataString = "month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year);
    console.log('my datastring: ', dataString);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5ViewEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //event listener and function to run when information is received
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        console.log('jsonData', jsonData);
        //var mylist = document.getElementsByTagName('ul')[0];
        console.log('count:', jsonData[0].count);
        console.log('type of count', typeof(jsonData[0].count));
        for(i = 1; i <= jsonData[0].count; i++){
            var newLi = document.createElement("li");  // creates a node with the tag name li
            dayEvents.push(new eventInfo(jsonData[i].title, jsonData[i].hour, jsonData[i].minute, jsonData[i].event_id)); //creates a eventInfo object and pushes it to the dayEvents array
            
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
            //deleteButton.addEventListener('click', deleteEvent, false);
            newLi.appendChild(deleteButton);
            //add list node to mylist or <ul> tag
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
    oldEdit = [tempTitle, tempHour, tempMinute]; 
}

function editEventAjax(){
    //get the information to send
    //var username = 'barack';
    //var editTitle = document.getElementById('eventEditTitle').value;
    //var editHour = parseInt(document.getElementById('eventEditHour').value);
    //var editMinute = parseInt(document.getElementById('eventEditMinute').value);
    
    var editTitle = document.getElementById('eventEditTitle').value;
    var editHour = parseInt(document.getElementById('eventEditHour').value);
    var editMinute = parseInt(document.getElementById('eventEditMinute').value);
    
    var dataString = "oldTitle=" + encodeURIComponent(oldEdit[0]) + "&oldHour=" + encodeURIComponent(oldEdit[1]) + "&oldMinute=" + encodeURIComponent(oldEdit[2]) + "&title=" + encodeURIComponent(editTitle) + "&month=" + encodeURIComponent(numericMonth) + "&day=" + encodeURIComponent(selectedDay) + "&year=" + encodeURIComponent(year) + "&hour=" + encodeURIComponent(editHour) + "&minute=" +encodeURIComponent(editMinute);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "Mod5EditEvent.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString); // Send the data
    var reload = setInterval(function(){
        getEventAjax();
        clearInterval(reload);
    }, 10);
}

$("button.deleteButton").click(function() {
    
        $.ajax({
    
        type : 'POST',
        url  : 'Mod5DeleteEvent.php',
        data : { username : 'bar', bar : 'foo' },
        dataType: "json",

        success : function(response)
        {
            if(response.success ===true){
                window.location.replace("Mod5Calendar.php");
            }
            else if (response.success === false){
               $("#error").html("<b>Wrong Username/Password</b>");
            }
        }
   });
          
});