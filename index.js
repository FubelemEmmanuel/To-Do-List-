var task = [];
var i = 0;

setInterval(function() {
    decrementNumber();
  }, 86400000);


//load the date time field upon bluring on the input field to input task
$('.task-input').click(function()
{

    $('#setDate').show();
})

loadSavedTasks();//load data from the browser cache upon reload
//this is what happens when the button is click.
$('.btn-success').click(function()
{
    // localStorage.clear();

    if($('.date').val()==="")
    {
        alert('Please fill in the Task name');
    }
    else{
        $('#setDate').hide();
        if($('.task-input').val()!=='')
        {
            task.push($('.task-input').val());
          
            setTimeout(function()
        {
            $('#hide').addClass('flashcard');
            $('.flashcard').fadeIn(1000).fadeOut(2000);
            $('.hide').removeClass('flashcard');
        },1000);
     
        addTextToTable(task[i]);
        i +=1;
      
       
       
         $('.task-input').val('');  
        }
    
        else if($('.task-input').val()===''){
            alert('must enter something')
             
        }
       
    };
  
       
});


//function to add new tables upon creation of new task
function addTextToTable(texts)
{
    var date1 =new Date($('.date1').val()); 
    var date2 =new Date($('.date2').val()); 
    var difference = Math.abs(date2.getTime()-date1.getTime());
    var results = Math.round(difference/(1000*3600*24));
    var tableRow = $('#newTask');
    var row = $('<tr id="row"></tr>')
  var td1 = $('<td>'+texts+'</td>');
  var td4 = $('<td class="resultss">'+results+' days'+'</td>');
  var td2 = $('<td><input class="form-check-input line-through " type="checkbox" value="" id="flexCheckDefault"></td>');
  var td3 =$('<td><i class="fa-solid fa-trash fa-danger"></i></td>');
  tableRow.append(row).append(td1,td4,td2,td3);
  saveTasks();
  location.reload();
}

 //decrement the duration days
// // Decrement the number every 24 hours (86400000 milliseconds)
function decrementNumber() {
    $('.resultss').each(function() {
      var results = $(this);
      var currentValue = parseInt(results.text());
  
      if (currentValue > 0) {
        currentValue--;
        if (currentValue <= 4) {
          results.css('color', 'red');
        }
        results.text(currentValue + ' days');
        console.log('Number decremented. Current value:', currentValue);
      }
    });
    saveTasks();
  }

  



function saveTasks() {
    // Save the task array and table HTML to browser storage
    localStorage.setItem('tasks', JSON.stringify(task));
    localStorage.setItem('tableHTML', $('#newTask').html());
}

function loadSavedTasks() {
    // Retrieve the saved tasks and table HTML from browser storage
    var savedTasks = JSON.parse(localStorage.getItem('tasks'));
    var savedTableHTML = localStorage.getItem('tableHTML');

    if (savedTasks) {
        task = savedTasks;
        i = task.length;

        // Restore the table content
        $('#newTask').html(savedTableHTML);
    }

   
   // Add event listener to the checkbox
var $checkbox = $('.form-check-input');
var $resultCell = $('.resultss');

// Get the initial value of the result cell
var initialValue = $resultCell.text();
var initialColor = $resultCell.css('color');

// Add an event listener to the checkbox
$checkbox.on('change', function() {

  if (this.checked) {
   
    $resultCell.text('complete').css('color','green');
   
    $('.form-check-input').hide();
    saveTasks();
   
    
  // } else {
  //   // Checkbox is unchecked, revert the text to the initial value
  //   // $resultCell.text(initialValue).css('color',initialColor);
   
 
   
   
    
  }
});

$('.fa-trash').on('click', function() {
    // Get the row containing the checkbox
    
    var $row = $(this).closest('tr');
  
    // Toggle the 'line-through' class on the relevant table cells
    $row.find('td').remove(localStorage.removeItem('tasks'));
});
}