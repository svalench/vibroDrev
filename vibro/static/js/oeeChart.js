	moment.locale("ru");
	var chartOEE;
	var idChart='chartOEE';
	var clWork="#66BB6A";
	var clAlarm="#ef5350";
	var clStop= "#BDBDBD";
	var clPause= "#FFCA28";
	var tabs, tabs1, tabs2, obor;
	var selects;
  var as;
  var nalSecl,nalserdl;
	var saveCategory,saveSeriesName,saveComment,oborname,saveId,saveTimeX,saveTimeX2,saveColor,seria;
var Hch;
Hch=  $(window).height()-$("#headerID").height()-$("#breadcrumbsID").height()-$("#padBot").height()-$("#StatusNetwork").height();
if (Hch<600) {
Hch=600;
}
function seclevel(e){
  var nalSecl;
tabs1='<select required onchange="serdLevel(this)" class="browser-default  form-control" name="secAgregat" id="secAgregat"><option  selected="selected" value="">Выберите агрегат</option>'
  console.log(selects);
	 $.each(selects,function(a3,b3){
								 
	 	if(b3.name==e.value){
      obor=b3.id;
  if(b3.secondLevel){nalSecl=1;}

	 		$.each(b3.secondLevel,function(a,b){
tabs1+=' <option  value="'+b.name+'">'+b.name+'</option>';

	 		});
	 	}
	});
	 		tabs1+="</select><div class='form-group' id='serdlevelinsert'></div>";
     if(nalSecl!=undefined){
      $("#forseclevel").html(tabs1);
    }
	 	}

function serdLevel(e){
tabs2='<select class="browser-default  form-control" name="serdAgregat" id="serdAgregat" required><option  selected="selected" value="">Выберите узел</option>'
as=0;
   $.each(selects,function(a3,b3){
                 
    if(b3.id==obor){
      $.each(b3.secondLevel,function(a,b){
           if(b.name==e.value){
            if(b.serdlevel){nalserdl=1;  as=1;}

              $.each(b.serdlevel,function(a1,b1){   
              tabs2+=' <option value="'+b1.name+'">'+b1.name+'</option>';
              
              });
          }
      });
    }
  });
      tabs2+="</select>";
      if(as==1){
        $("#serdlevelinsert").css("display","block");
      
      $("#serdlevelinsert").html(tabs2);

    }else{$("#serdlevelinsert").css("display","none");}
    }

	Highcharts.setOptions({
     lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        resetZoom: '  СБРОСИТЬ ЗУМ  '
            }
    			});
	
chartOEE=Highcharts.chart('chartOEE', {
    chart: {
    	 height: Hch,
    	   zoomType: 'x',
        type: 'xrange',
        panning: true,
        panKey: 'ctrl',
        animation: false,
        event:{
        	load:{function(){
        		chartOEE.update({yAxis:{labels:{y:-chartOEE.yAxis[0].minPixelPadding+9}}});
        	}
        	}
        },
        resetZoomButton: {
        	theme: {
        		fill: 'white',
                stroke: 'silver',
                r: 5,
                states: {
                    hover: {
                        fill: '#41739D',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
        position: {
            y: -30,
            x: -20
        },
       },
       },
       credits: {
      enabled: false
  },
       legend: {
        itemDistance: 50
    		},
       boost: {
        useGPUTranslations: true
    },
    time: {
        useUTC: false
    },
     
    colors: [clWork, clAlarm, clStop, clPause],
    plotOptions: {
    	series: {
    		//pointPadding: 0.1,
    		//pointWidth: 30,

            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                      $("#sluzh").css("display","none");
     $("#rem").css("display","none");
      $("#agr").css("display","none");
                      $("#idgr").val(this.id);
                       $('#prichina').val("");
                    	saveId=this.id;
                    	oborname=this.yCategory;     	                	                  	
                   		seria=this;
                      var pri=this.prichina;
                      console.log(this);

                   		function getGroup(){
							$.ajax({
							    type: "GET",
							    url: "/getGroup.php?id="+seria.yCategory,
							  success: function(msg){
							     selects = JSON.parse(msg);
								console.log(selects);
                   tabs='<select onchange="seclevel(this)" required class="browser-default  form-control" name="ferstAgregat" id="ferstAgregat"><option  selected="selected">Выберите агрегат</option>'
								    $.each(selects,function(a3,b3){
								    	 tabs+=' <option value="'+b3.name+'">'+b3.name+'</option>'
								    });
								    	tabs+='</select>'
								    	$("#insertDivSelect").html(tabs);
                      //  if(this.prichina==="Погодные условия (сильный ветер)"){
                      //    $('#prichina').val("Погодные условия (сильный ветер)");
                      // }else if(pri.prichina==="Отсутствие сырья"){
                      //    $('#prichina').val("Отсутствие сырья");
                      // }else if(pri.prichina==="Отсутствие пара"){
                      //    $('#prichina').val("Отсутствие пара");
                      // }else if(pri.prichina===undefined){
                      //    $('#prichina').val("");
                      // }else{
                      //      $.each(selects,function(a3,b3){
                 
                      //     if(b3.name===seria.prichina){ $("#ferstAgregat").val(seria.prichina); return;}
                      //     $.each(b3.secondLevel,function(a,b){
                      //        if(b.name===seria.prichina){ $("#ferstAgregat").val(seria.prichina); return;}
                         
                                

                      //             $.each(b.serdlevel,function(a1,b1){   
                                 
                      //             });
                      //     });
                        
                      // });
                      // }
							  }
							});
						}


							getGroup();




                   		$("#id").val(saveId);
                   		$("#oborname").val(oborname);
                   		$("#timeStr").val(this.options.x/1000);
                   		$("#timeEnd").val(this.options.x2/1000);
                   					if(this.series.name==="Простой"){
							$("#prich").css("display","block");
						}else{	$("#prich").css("display","none");}
						if(this.series.name==="Выключен"){
							$("#prich").css("display","block");
							
						}
            if(this.series.name==="Авария"){
              $("#prich").css("display","block");
              
            }
							if(this.series.name==="Работает"){
							$("#prich").css("display","none");
							
						}
                    	$('#categoryID').text(this.yCategory+':');
                    	$('#statusID').text(this.series.name);
                    	$('#statusID').css('color', this.color);
                    	if (this.name==undefined){
                    	$('#commentID').val('');
                    	$('#commentID').attr('placeholder','Введите комментарий');	
                    	}else
                    	{
                    	$('#commentID').val(this.name);
                    	}

                    	$('#timeXID').text(moment(this.options.x).format('lll'));
                    	$('#timeX2ID').text(moment(this.options.x2).format('lll'));
                        $('#modalComment').modal('toggle');
                    }
                }
            }
        },
    xrange: {
      borderRadius: 0,
      borderWidth: 0,

      grouping: false,
      colorByPoint: false   
    },

  },
    
 tooltip: {
        
 		// backgroundColor: 'white',
 		// borderWidth: 3,
 		// borderRadius: 4,
        useHTML: true,
        formatter: function () {
            if (typeof(this.key)==='string'){
            	comment=this.key
            } else {comment='';}

            return '<div style="border-width:3;border-radius:4;background-color:white;z-index:10;"><h5  class="text-center" style="text-transform: uppercase;">'+this.yCategory+'</h5><div class="table-responsive table-bordered">  <table class="table table-sm">       <tbody>            <tr class="align-content-center ">                <td>Состояние</td>                <td nowrap><strong>'+this.series.name+'</strong><span> c </span><strong>'+moment(this.x).format('lll')+'</strong><br><span> по </span><strong>'+moment(this.x2).format('lll')+'</strong></td>            </tr>            <tr class="align-content-center">                <td>Комментарий</td>                <td><em>'+comment+'</em></td>            </tr>        </tbody>    </table></div><div>';
        },
    },



    title: {
        text: 'СВОДНАЯ ТАБЛИЦА OEE',
        style: {
                font: '22px Arial, sans-serif',

            }
    },
  xAxis: {
                type: 'datetime',
                minRange: 60000,

                tickAmount: 10
            },
    yAxis: {
    	opposite:false,
        title: {
            text: ''
        },
        categories: window.strCategories,
        reversed: true,
        gridLineColor: '#ffffff',
        gridZIndex:-20,
        labels: {
        	align: 'left',
        	x: 0,
            y: -16,
        	// format: '{value}'+' Q='+function(){return value}+' OEE='+63,
            useHTML: true,
            formatter: function(){return '<a href="oeePoint/1/1/"><span style="z-index:-5;font:16px Arial, sans-serif;white-space: nowrap;text-transform: uppercase;">'+this.value+' как то разбить '+'</span></a>' },
            style: {
            	// maxWidth: '20px',
              	// whiteSpace: 'nowrap',
                font: '16px Arial, sans-serif',
                textTransform: "uppercase"
                   }
        }
    },
    
    series: window.strData

});


$('#hour').click(function(){
	var min,max;
	max=MM(chartOEE);
	min=max-60*60*1000;
	chartOEE.xAxis[0].setExtremes(min,max);
});

$('#day').click(function(){
	var min,max;
	max=MM(chartOEE);
	min=max-24*60*60*1000;
	chartOEE.xAxis[0].setExtremes(min,max);
});
$('#week').click(function(){
	var min,max;
	max=MM(chartOEE);
	min=max-7*24*60*60*1000;
	chartOEE.xAxis[0].setExtremes(min,max);
});
$('#month').click(function(){
	var min,max;
	max=MM(chartOEE);
	min=max - 30*24*60*60*1000;
	chartOEE.xAxis[0].setExtremes(min,max);
});

$('#shift').click(function(){
	ShiftSet();
});

$(document).ready(function(){
	ShiftSet();
	chartOEE.yAxis[0].options.labels.y=-chartOEE.yAxis[0].minPixelPadding+10;
	chartOEE.yAxis[0].redraw();

});


function ShiftSet(){
	var shift1beg,shift2beg,shift3beg;//начало трех смен в часах
	var shift1end,shift2end,shift3end;//конец трех смен в часах
	shift1beg=7;shift2beg=15;shift3beg=23;
	shift1end=15;shift2end=23;shift3end=7;
  var min,max;
  var n=new Date()
  var hourNow=n.getHours();
  if (hourNow>=shift1beg && hourNow<shift1end) {
  max=new Date(n.getFullYear(),n.getMonth(),n.getDate(),shift1end,0,0,0);
  min=new Date(n.getFullYear(),n.getMonth(),n.getDate(),shift1beg,0,0,0);
  max=max.getTime();
  min=min.getTime();
 
  } else if (hourNow>=shift2beg && hourNow<shift2end) {
  max=new Date(n.getFullYear(),n.getMonth(),n.getDate(),shift2end,0,0,0);
  min=new Date(n.getFullYear(),n.getMonth(),n.getDate(),shift2beg,0,0,0);
  max=max.getTime();
  min=min.getTime();
  } else if (hourNow>=shift3beg && hourNow<shift3end) {
  max=new Date(n.getFullYear(),n.getMonth(),n.getDate(),shift3end,0,0,0);
  min=new Date(n.getFullYear(),n.getMonth(),n.getDate(),shift3beg,0,0,0);
  max=max.getTime();
  min=min.getTime();
  }
  chartOEE.xAxis[0].setExtremes(min,max);
};


function MM(nameChart){
	var max;
if (nameChart.xAxis[0].dataMax<nameChart.xAxis[0].max){
		max=nameChart.xAxis[0].dataMax;
	}else{
	max=nameChart.xAxis[0].max;
}
return max;
}


function apdatecoment(){
 seria.name=$('#commentID').val();
    $('#modalComment').modal('toggle');
}