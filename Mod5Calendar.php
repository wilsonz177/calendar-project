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
    
</head>

<body><div id="main">

<h1>Welcome to your Janky Calendar</h1>
<div id="calendarBorder">
    <header>
    <button id='back'>«</button>
    <h2 id='month'>July 2013</h2>
    <button id='fwd'>»</button>
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

<div id='eventcreator'>
    <form id='eventform'>
        Title: <input type ="text" />
        Description: <textarea rows="4" cols="50" name="comment" form="eventform"></textarea>
        Hour: <select>
            <?php
             for($i = 0; $i < 24; $i++){
                printf("<option value=%s> %s </option>", $i, $i);
             }
            ?>
        </select>
        Minute: <select>
            <?php
             for($i = 0; $i<60; $i+= 15){
                  printf("<option value=%s> %s </option>", $i, $i);
             }
            ?>
        </select>
    </form>
</div>

<script type="text/javascript" src="CalendarScript.js"></script>
 
</div></body>
</html>