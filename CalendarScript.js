document.addEventListener('DOMContentLoaded', setup, false);
    document.getElementById('fwd').addEventListener('click', moveFwd, false);
    document.getElementById('back').addEventListener('click', moveBack, false);
    
    var current = new Date();
    var numericMonth = current.getMonth();
    var month = convertNumToMonth(numericMonth);
    var day = current.getDate();
    var year = current.getFullYear();
    console.log(numericMonth);
    
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
    
    function setup(){
        //console.log(current);
        //
        //console.log(day);

        
        
        var d = new Date(year, numericMonth, 1, 0);
        var skipdays = d.getDay()-1;
        //console.log(d);
        //skip days from 0-6
        //console.log(skipdays);
        document.getElementById('month').innerHTML = month + "  " + year;
        
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
            }
            array[i].addEventListener('click', displayDay, false);
        }
    }
    
    //function to find how many days in that month
    Date.prototype.monthDays= function(){
            var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
            return d.getDate();
      };
    
    function convertNumToMonth(num_month){
        var month;
        switch(num_month){
            case 0:
                month = 'January';
                break;
            case 1:
                month = 'February';
                break;
            case 2:
                month = 'March';
                break;
           case 3:
                month = 'April';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'June';
                break;
            case 6:
                month = 'July';
                break;
            case 7:
                month = 'August';
                break;
            case 8:
                month = 'September';
                break;
            case 9:
                month = 'October';
                break;
            case 10:
                month = 'November';
                break;
            case 11:
                month = 'December';
                break;
        }
        return month;
    }
    
    function displayDay(){
        document.getElementById('selected').removeAttribute('id');
        event.target.setAttribute('id', 'selected');
        
    }