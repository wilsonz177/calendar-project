<!DOCTYPE html>
<head>
<meta charset="utf-8"/>
<title>My Calendar</title>
<link rel="stylesheet" type="text/css"  href="CalendarStyles.css"/>

    
<!--**CITATION/SOURCES
 *
 * Calendar design partly from: http://www.java2s.com/Code/HTMLCSS/CSS-Controls/Calendarwithtable.htm
 * and also : https://gist.github.com/starzonmyarmz/4496814
 *
 *function for finding end date of a month: https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
 -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>

<body><div id="main">

<h1>Welcome to your Janky Calendar</h1>
<div id="calendarBorder">
    <header>
    <button class='fwdbackbutton' id='back'>«</button>
    <h2 id='calendarTitle'>July 2013</h2>
    <button class='fwdbackbutton' id='fwd'>»</button>
  </header>
<table class="calendar">
    <col class="weekend">
  <col class="weekday" span="5">
  <col class="weekend">
  <thead>
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="day"> </td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
    </tr>
    <tr>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
    </tr>
    <tr>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
    </tr>
    <tr>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
    </tr>
    <tr>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
    </tr>
    <tr>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
      <td class="day"></td>
    </tr>
  </tbody>
</table>
</div>
<br>

<div>
<h3> Events for <span class='formDate'></span></h3>
<ul>
      
</ul>
</div>


<br>
<div id='eventcreator'>
      <h3>Enter an event for <span class='formDate'></span></h3>
   
        Title: <input type ="text" id ='eventTitle'/>
        Hour: <select id='eventHour'>
            <?php
             for($i = 0; $i < 24; $i++){
                printf("<option value=%s> %s </option>", $i, $i);
             }
            ?>
        </select>
        Minute: <select id='eventMinute'>
            <?php
             for($i = 0; $i<60; $i+= 15){
                  printf("<option value=%s> %s </option>", $i, $i);
             }
            ?>
        </select>
        
        <button type="button" id='addeventbutton'>Submit</button>
    
</div>

<div id="eventEdit">
      <h3>Editing Event: "<span></span>" on <span class="formDate"></span></h3>
      Edit your Title:<input type ="text" id ='eventEditTitle' value=""/>
      Edit the time: <select id='eventEditHour'>
            <?php
             for($i = 0; $i < 24; $i++){
                printf("<option value=%s> %s </option>", $i, $i);
             }
            ?>
        </select> hour(s) and <select id='eventEditMinute'>
            <?php
             for($i = 0; $i<60; $i+= 15){
                  printf("<option value=%s> %s </option>", $i, $i);
             }
            ?>
        </select> minute(s)
      <button type="button" id='editeventbutton'>Submit</button>
</div>



<script type="text/javascript" src="CalendarScript.js"></script>

 
</div></body>
</html>