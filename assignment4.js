// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  var arr;
  $('.panel').empty();
  $.ajax({
    dataType: 'json',
    url: 'http://www.mattbowytz.com/simple_api.json',
    data: {
      data: "all",
      format: "json"
    },
    success: function(data) {
      console.log(data);
      arr = data;
      // alert(jsonData);
   }
  });

  $(document).on('keyup', '.flexsearch-input', function(){
    $('.panel').empty();
    var x = document.getElementsByClassName("flexsearch-input");
    var toDisplay = [];
    var counter = 0;

    $.each(arr['data'], function(index, jsonData)
    {
      for(i = 0; i < jsonData.length; i++)
      {

        if(jsonData[i].toLowerCase().startsWith(x[0].value.toLowerCase()) && x[0].value != '')
        {
          toDisplay[counter] = jsonData[i];
          counter += 1;
        }
      }
    });

    if(toDisplay.length == 0)
    {
      $('.panel').hide("fast");
      $('.panel').empty();
    }
    else
    {
      console.log(toDisplay);
      $.each(toDisplay, function(index, value){
        $('.panel').html( $('.panel').html() + "<div><a href='http://www.google.com/#q=" + value + "' target='_blank'>" + value + "</a></div>")
      });
      // var str = $('.panel').text(toDisplay.join("\n"));
      $('.panel').slideDown("fast");
    }


  });

  $('form').submit(function(event){
    var data = document.getElementsByClassName("flexsearch-input");
    window.open('http://www.google.com/#q=' + data[0].value, '_blank');
    // var link = $(this).find('a').attr('target', '_blank');
    // window.open(link.attr('http://www.google.com/#q=' + data[0].value));
  });


  console.log('Keepin\'n it clean with an external script!');
})();
