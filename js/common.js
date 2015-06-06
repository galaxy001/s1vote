$(document).ready(function(){
  $.ajax({
  url: 'data.json',
  success: function(data){
    var dynatable = $('#my_table').dynatable({
      dataset: {
        records: data.results,
        perPageDefault: 50,
        perPageOptions: [10,20,50,100,200,500],
      },
      features: {
        paginate: true,
        recordCount: true,
        search: true,
        perPageSelect: true
      },
      inputs: {
        perPagePlacement: 'after',
        perPageText: '每页显示: ',
        paginationPrev: '前页',
        paginationNext: '后页',

      }
    }).data('dynatable');


    $('#search-state').change( function() {
    var value = $(this).val();
    if (value === "") {
      dynatable.queries.remove("contr_state");
    } else {
      dynatable.queries.add("contr_state",value);
    }
    dynatable.process();
    });

    $('#search-year').change( function() {
    var value = $(this).val();
    if (value === "") {
      dynatable.queries.remove("year");
    } else {
      dynatable.queries.add("year",value);
    }
    dynatable.process();
    });

    $('#search-season').change( function() {
    var value = $(this).val();
    if (value === "") {
      dynatable.queries.remove("season");
    } else {
      dynatable.queries.add("season",value);
    }
    dynatable.process();
    });

    $('#update_date').text(data.update);

  }
});
});