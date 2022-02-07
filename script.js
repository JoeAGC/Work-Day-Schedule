$(document).ready(function () {
    
    $('#currentDay').text(moment().format('dddd, MMMM Do YYYY'));

 
    getScheduleFromLS();
    colorizor();

  
    function getScheduleFromLS() {
        var schedule;
        if (localStorage.getItem("schedule") === null) {
            schedule = [];
        } else {
            schedule = JSON.parse(localStorage.getItem("schedule"));
        }
        $.each(schedule, function (index, item) {
          
            $('#' + item.time).children('.description').append(item.plan);
          
            if (item.plan !== '') {
                clearPlan($('#' + item.time).children('.hour'));
            }
        });
        
    }


    function storeScheduleInLS(plan) {
        var newSchedule;
        if (localStorage.getItem("schedule") === null) {
          
            newSchedule = [plan];
        } else {
            newSchedule = JSON.parse(localStorage.getItem("schedule"));

           
            for (var i = 0; i < newSchedule.length; i++) {
                if (newSchedule[i].time === plan.time) {
                    newSchedule.splice(i, 1);
                }
            }
            newSchedule.push(plan);
        }
        
        localStorage.setItem("schedule", JSON.stringify(newSchedule));
    }

    
    function colorizor() {
        var timeOfDay = moment().hour();
        var timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

        $.each(timeSlots, function (index, slot) {

            var hrNum = slot < 13 ? slot : slot - 12;

            if ((timeOfDay > slot)) {
                $('#hour-' + hrNum).children('.description').addClass('past');
            } else if (timeOfDay < slot) {
                $('#hour-' + hrNum).children('.description').addClass('future');
            } else {
                $('#hour-' + hrNum).children('.description').addClass('present');
            }
        });
    }

   
    function clearPlan(domElement) {
        
        $(domElement).children('.clear').remove();

       
        var clearBtn = $('<button>');
        clearBtn.addClass('clear');
        clearBtn.text('Remove Plan');
        domElement.append(clearBtn);

        
        $('.clear').on('click', function (event) {
            $(this).parent('.hour').siblings('.description').empty();
            $(this).parent('.hour').siblings('.saveBtn').click();
            event.preventDefault();
            location.reload();                                   
        });
    }

    
    $('.saveBtn').on('click', function () {
        var scheduleItem = {
            plan: $(this).siblings('.description').val().trim(),
            time: $(this).parent().attr('id') 
        };
        var container = $(this).siblings('.hour');

        storeScheduleInLS(scheduleItem);
        clearPlan(container);
    });

});

function display_ct6() {
    var x = new Date()
    var ampm = x.getHours( ) >= 12 ? ' PM' : ' AM';
    hours = x.getHours( ) % 12;
    hours = hours ? hours : 12;
    var x1=x.getMonth() + 1+ "/" + x.getDate() + "/" + x.getFullYear(); 
    x1 = x1 + " - " +  hours + ":" +  x.getMinutes() + ":" +  x.getSeconds() + ":" + ampm;
    document.getElementById('ct6').innerHTML = x1;
    display_c6();
     }
     function display_c6(){
    var refresh=1000;
    mytime=setTimeout('display_ct6()',refresh)
    }
    display_c6()