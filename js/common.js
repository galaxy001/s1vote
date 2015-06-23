function timeConvert(timestapm){
	var new_date= new Date(timestapm);
	var year=new_date.getFullYear();
	var month='0'+(parseInt(new_date.getMonth())+1).toString();
	var day='0'+new_date.getDate();
	return year+'-'+month.substr(-2)+'-'+day.substr(-2);
}

$(document).ready(function(){
  $.ajax({
  url: 'http://s1vote.com/',
  jsonp: "callback",
  dataType: "jsonp",
  success: function(data){
  	//pre-process
  	var i;
  	var re=/\[(\d{4})\.(\d{1,2})\]\[(.*)\](.*)/;
  	var item_rank=1;
  	var format_data=[];
  	for (i in data){
  		var match=re.exec(data[i].thread_title);
  		console.log(match);
  		if (match !=null){
  			var item={};
  			item.year=parseInt(match[1]);
  			item.season=parseInt(match[2]);
  			item.title='<a href=\"'+data[i].detail_url+'\">'+match[4].split('/')[0]+'</a>';
  			item.rank=item_rank;
  			item_rank++;
  			item.avg_score=parseInt(data[i].average_score);
  			item.vote_count=parseInt(data[i].total_score_count);
  			item.view_count=parseInt(data[i].view_count);
  			item.reply_count=parseInt(data[i].reply_count);
			item.post_time=timeConvert(data[i].post_time*1000);
			if (data[i].variance>=20){
				item.contr_state='你死我活';
			}
			else if (data[i].variance>=13) {
				item.contr_state='褒贬不一';
			}
			else if (data[i].variance>=6){
				item.contr_state='略有分歧';
			}
			else{
				item.contr_state='全员一致';
			}

  			format_data.push(item);
  		}
  		
  	}
  	//pre-process done
    var dynatable = $('#my_table').dynatable({
      dataset: {
        records: format_data,
        perPageDefault: 50,
        perPageOptions: [10,20,50,100,200,500]
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
    dynatable.sorts.add('rank', 1)
    dynatable.process();

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

    //$('#update_date').text(data.update);
    $('#update_date').text(timeConvert(new Date()));

  }
});
});