


var SeriesData=new Array();//массив со всеми готовыми данными для поля series highchart\\!!!!!!!


var chartS=new Array();//массив содержащий все графики

var spaceVal=new Array();//массив с перерывами в работе//временный массив





var Ylines=new Array();//горизонтальные уровни предупреждений//массив нельзя уничтожать потому что графики ссылаются именно на него

var ColorChartLines=new Array();//цветовая гамма графика

var addSeries=new Array();//массив содержащий списки графиков выыеденных в данный момент в конкретный контейнер//глобальный массив//необходимо для работы интелектуального нижнего навибара

var colorOk='#43A047', colorWarning='#FFB300', colorStop='#ef5350',colorAlarm='#e53935';//цвета графиков в конкретных зонах 


function createINITaddSeries(inArr){
	var outArr=new Array();
	for (var i=0; i<inArr.length;i++){
		outArr[i]=[i];
	}
	return outArr;
	}//так как мы должны постоянно отслеживать в каком контейнере какой график, то для этих целей заводим объект в котором номер контенера- номер массива, а выведенные графики это элементы в массиве


//функция при передаче в которую массивов с авариями предупреждениями и остановка выплевывает готовый объект с массивами для каждого графика подставляемый в графики 
function crCHyAxisValue(ArrWn,ArrSt,ArrAl){//передаем массивы предупреждений, стопов, аварий
	var TotalArr=[];
	for (var i = 0; i <ArrWn.length; i++) {
		TotalArr.push([
			{ 		id: 'plotLinesWarning',
	                value: ArrWn[i],
	                color: colorWarning,
	                dashStyle: 'shortdash',
	                width: 2,
	                label: {
	                    text: 'Внимание'
	                }
	        },
	        {
	            	id: 'plotLinesStop',
	                value: ArrSt[i],
	                color: colorStop,
	                dashStyle: 'shortdash',
	                width: 2,
	                label: {
	                    text: 'Остановка'
	                }
	        },
	        {       id: 'plotLinesAlarm',
	                value: ArrAl[i],
	                color: colorAlarm,
	                dashStyle: 'shortdash',
	                width: 3,
	                label: {
	                    text: 'Авария'
	                }
	        }]
	    )
	}
	return TotalArr;
	};
Ylines=crCHyAxisValue(WARNING,STOP,ALARM);

//функция позволяет создать объект разукрашивающий графики
function crCHyColorCharts(ArrWn,ArrSt,ArrAl){//передаем массивы предупреждений, стопов, аварий
	var TotalArr=[];
	for (var i = 0; i <ArrWn.length; i++) {
		TotalArr.push([{
	            value: ArrWn[i],
	            color: colorOk
	        }, 
				{
	            value: ArrSt[i],
	            color: colorWarning
	        }, 
			{
	        	value: ArrAl[i],
	            color: colorStop
	        },
			{
	        	color: colorAlarm
	        }]
	    )
	}
	return TotalArr;
	};
ColorChartLines= crCHyColorCharts(WARNING,STOP,ALARM);

var arrStartPause=new Array();//массив содержащий состояние ПАУЗА\СТОП всех графиков
function createSTARTPAUSEarr(inArr){//функция создает массив с количеством элементов равных количеству графиков и все они false
	var outArr=new Array();
	for (var i=0; i<inArr.length;i++){
		outArr.push(false);
	}
	return outArr;
	}




			spaceVal=breakSpace(DateArray);//создаем массив с перерывами в работе оборудования\\пуляешь в него массив с датами а на выходе получаешь массив с перерывами в работе сервера



			SeriesData=CreateSeries(NamePointCharts,DataArr,ColorChartLines);//создаем объект с данными и параметрами которые в последствии и будет подставляться для рисования графика


//добавить заголовок 

$('#breadNameStanok').text(zag);

// //добавляем верхний нав бар
// $("body").append('<nav class="navbar navbar-light navbar-expand-lg sticky-top flex-wrap border border-info" style="font-family:Ubuntu, sans-serif;color:#3949ab;background-color:#ffffff;"><div class="container-fluid"><a href="#" class="navbar-brand" style="font-family:Ubuntu, sans-serif;color:#e53535;">Переход по узлам:</a><button data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span class="sr-only">Выбирите узел перехода</span><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse align-items-center flex-wrap" id="navcol-1"></div></div></nav>');


//добавляем кнопки в верхний навибар, создаем боковую панель
arrPropertiesHeader.forEach(function(nameElement, numberGrafic){
			// $('div#navcol-1').append('<a class="btn btn-primary mx-1 my-1" role="button" href="#'+arrPropertiesHeader[numberGrafic]+'" style="font-family:Ubuntu, sans-serif;">'+NamePointCharts[numberGrafic]+'</a>');//создаем кнопки перехода по графикам, их id и подписываем их


			$('#container-full').append('<div class="container-fluid border border-dark" style="margin-top:5vh;"><div class="row" id="FP'+numberGrafic+'"> \
				<div class="col-12 col-sm-12 col-xl-3 flex-column border border-top-0 border-primary"><div class="row d-flex d-md-flex justify-content-center align-items-center m-auto m-md-auto" style="font-family:Ubuntu, sans-serif;margin-top:0px;margin-bottom:0px;padding-top:10px;"> \
				<div class="col-12 col-sm-12 col-md-12 d-flex d-sm-flex d-md-flex flex-column flex-grow-1 flex-shrink-1 flex-fill justify-content-center align-items-center align-content-center align-self-center m-auto justify-content-sm-center align-content-sm-center align-self-sm-center m-sm-auto flex-md-column flex-md-grow-1 flex-md-shrink-1 flex-md-fill justify-content-md-center align-content-md-center align-self-md-center m-md-auto" style="padding-top:0px;padding-bottom:5px;"> \
				                   </div></div> \
				         <div class="row align-items-center" style="margin-top:5px;margin-bottom:5px;margin-right:-22px;"><div class="col-6 text-md-center text-sm-center"> \
				        <span class="justify-content-start">Уставка аварии:</span></div><div class="col-6 col-md-6 col-xl-6 d-flex justify-content-center align-self-center justify-content-md-center text-center justify-content-sm-center"> \
				        <input type="number" placeholder="Введите уставку" class="float-right align-self-start flex-nowrap text-center" name="ALARM'+numberGrafic+'" id="ALARM'+numberGrafic+'" style="z-index:5;" /></div> </div> \
				        <div class="row align-items-center" style="margin-right:-22px;margin-left:-15px;margin-top:0px;margin-bottom:5px;"> \
				        <div class="col-6 align-self-center text-md-center text-sm-center"><span class="justify-content-start">Уставка остановки:</span></div> \
				        <div class="col-6 col-md-6 col-xl-6 d-flex flex-fill justify-content-center justify-content-sm-center m-md-auto text-center justify-content-md-center justify-content-sm-center"> \
				        <input type="number" placeholder="Введите уставку" name="STOP'+numberGrafic+'" class="float-right align-self-start flex-nowrap text-center" id="STOP'+numberGrafic+'" style="z-index:5;" /></div></div> \
				        <div class="row align-items-center" style="margin-top:5px;margin-right:-22px;margin-bottom:5px;padding-top:0px;"> \
				        <div class="col-6 align-self-center text-md-center text-sm-center"><span class="justify-content-start text-center">Уставка предупреждения:</span></div> \
				        <div class="col-6 d-flex justify-content-center justify-content-sm-center justify-content-md-center"> \
				        <input type="number" placeholder="Введите уставку" class="float-right flex-nowrap text-center" name="WARNING'+numberGrafic+'" id="WARNING'+numberGrafic+'" style="z-index:5;" /></div> \
				           </div><div class="row no-gutters justify-content-center align-items-center">\
				           <div class="col-12 justify-content-center align-items-center align-content-center" style="margin-bottom:10px;margin-top:10px;margin-right:0px;margin-left:0px;padding-right:0px;padding-left:0px;font-family:Ubuntu, sans-serif;">\
				           <button class="btn btn-success btn-block" type="button" style="padding:7px;padding-right:30px;padding-left:30px;padding-top:10px;padding-bottom:10px;"  id="changeYaxesNameValue'+numberGrafic+'">Применить</button></div></div>\
				           <div class="row"><div class="col-12 d-flex flex-grow-0 flex-shrink-0 flex-fill justify-content-center align-items-center align-content-center">\
				           <span class="text-monospace" style="font-family:Ubuntu, sans-serif;font-size:21px;">Вывод вспомогательных линий</span></div></div>\
				           <div class="row no-gutters" style="margin-top:5px;margin-bottom:5px;"><div class="col-6 d-flex align-items-center flex-nowrap" style="cursor:pointer;">\
				           <i class="material-icons mr-2 chST" id="STOPcheck'+numberGrafic+'" style="z-index:5;">check_box</i><span>Линия остановки</span></div>\
				           <div class="col-6 d-flex align-items-center flex-nowrap" style="cursor:pointer;"><i class="material-icons mr-2 chAL" id="ALARMcheck'+numberGrafic+'" style="z-index:5;">check_box</i>\
				           <span>Линия аварии</span></div></div>\
				           <div class="row no-gutters" style="margin-top:5px;margin-bottom:5px;"><div class="col-8 d-flex align-items-center flex-nowrap" style="cursor:pointer;">\
				           <i class="material-icons mr-2 chWR" id="WARNINGcheck'+numberGrafic+'" style="z-index:5;">check_box</i>\
				           <span>Линия предупреждения</span></div></div><div class="row" style="margin-top:5px;margin-bottom:5px;">\
				           <div class="col-12 col-xl-12 align-self-center m-auto" style="margin-top:5px;margin-bottom:5px;">\
				           <span class="text-monospace d-flex flex-fill justify-content-center m-auto" style="font-family:Ubuntu, sans-serif;font-size:21px;">Вывод данных во времени</span>\
				           </div></div><div class="row"><div class="col-6 col-xl-6 text-md-center">\
				           <span class="justify-content-start">Начало графика:</span></div><div class="col-6 col-xl-6 d-flex flex-fill justify-content-center align-self-center flex-wrap m-auto">\
				           <input type="datetime-local" step="1" class="float-right chDate" name="DATEfrom'+numberGrafic+'" id="DATEfrom'+numberGrafic+'" style="font-family:Ubuntu, sans-serif;width:179px;font-size:12px;z-index:5;" /></div></div>\
				           <div class="row" style="margin-top:5px;margin-bottom:5px;"><div class="col-6 col-xl-6 text-md-center"><span class="justify-content-start">Окончание графика:</span>\
				           </div><div class="col-6 col-xl-6 d-flex flex-fill justify-content-center align-self-center flex-wrap m-auto">\
				           <input type="datetime-local" step="1" class="float-right" name="DATEto'+numberGrafic+'"  id="DATEto'+numberGrafic+'" style="font-family:Ubuntu, sans-serif;width:179px;font-size:12px;z-index:5;" /></div></div>\
				           <div class="row" style="margin-top:10px;margin-bottom:5px;"><div class="col-6 col-xl-6 d-flex flex-fill justify-content-center m-auto">\
				           <button class="btn btn-secondary pushCalendar" type="button" id="calendar'+numberGrafic+'" style="padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;">Вывести период</button></div>\
				           <div id="huiniaEbanaia" class="col-6 col-xl-6 d-flex flex-fill justify-content-center">\
				           <button class="btn btn-outline-success my-2 my-sm-0" onclick="subscribe()" type="submit" id="push" >Получать уведомления</button></div></div></div></div>\
				           <div id="insertTable"></div>\
				</div>');


	$('div#FP'+numberGrafic+'').append('<div class="col-12 col-sm-12 col-lg-9 col-xl-9 d-flex float-none flex-grow-1 flex-fill justify-content-center align-items-center align-content-center align-self-center m-auto" id="container'+numberGrafic+'" style="width:100%;height:100%;margin-left:0px;margin-right:0px;padding-left:28px;"></div>');


chartS[numberGrafic]=CHARTastMonitor(NameCharts[numberGrafic],'container'+numberGrafic,numberGrafic);//рисуем графики
});

arrStartPause=createSTARTPAUSEarr(arrPropertiesHeader);//создаем массив с паузами
addSeries=createINITaddSeries(arrPropertiesHeader);//создаем массив с графиками содержащимися в каждом контейнере-графике
FillFilds("WARNING",WARNING);//заполняем поля предупреждение
FillFilds("ALARM",ALARM);//заполняем поля стоп
FillFilds("STOP",STOP);	//заполняем поля авария
SetMinMaxDatepicker();//определяем минимальные и максимальные даты выводимые в календаре

//нижний отступ между графиками и нижним навибаром
$('body').append('<div class="container-fluid" id="padBot"><div style="padding-bottom:100px;"></div></div>')

//рисуем нижний навибар
// $('body').append('<nav class="navbar navbar-light navbar-expand-xl fixed-bottom bg-white border border-info" style="font-family:Ubuntu, sans-serif;color:#3949ab;padding-left:16px;padding-bottom:45px; text-align:center;"><img src="/MVLab.png">  ООО "MVLab" разаботка ПО  <div class="container-fluid" style="display:none;"><a href="#" class="navbar-brand" style="font-family:Ubuntu, sans-serif;color:#e53535;">Отображение точек:</a><button data-toggle="collapse" data-target="#navcol-2" class="navbar-toggler"><span class="sr-only">Выберите точки для добавления:</span><span class="navbar-toggler-icon"></span></button><div style="display:none;" class="collapse navbar-collapse flex-wrap" id="navcol-2"></div></nav>');//Рисуем основные элементы

arrPropertiesHeader.forEach(function(nameElement, numberGrafic){//добавляем в нижний навибар кнопки
	
	$('div#navcol-2').append('<button class="btn btn-primary pushButtonVisible  mx-1 my-1" type="button" style="font-family:Ubuntu, sans-serif;width:91.4844px;" id="visible'+arrPropertiesHeader[numberGrafic]+'">'+NamePointCharts[numberGrafic]+'</button>');
	});//рисуем нижний навибар

//также добавляем кнопку которая убирает лишнее с графика
$('div#navcol-2').append('<button class="btn btn-primary mx-1 my-1" type="button" style="font-family:Ubuntu, sans-serif;width:91.4844px;" id="ResetVisible">Сброс</button>');


//определяем периоды когда даталог не писался
function breakSpace(arrDate){
	var breakArr=new Array();
	for (var i=1;(i< arrDate.length);i++){
		if (arrDate[i]-arrDate[i-1]<15000){
			breakArr.push({from: arrDate[i-1],
			to: arrDate[i]});
		}
	}
	return breakArr;
	};

//функция рисует график
function CHARTastMonitor(tit, container,i){
	Highcharts.setOptions({
            lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                exportButtonTitle: "Экспорт",
                printButtonTitle: "Печать",
                rangeSelectorFrom: "С",
                rangeSelectorTo: "По",
                rangeSelectorZoom: "Период",
                downloadPNG: 'Скачать PNG',
                downloadJPEG: 'Скачать JPEG',
                downloadPDF: 'Скачать PDF',
                downloadSVG: 'Скачать SVG',
                printChart: 'Напечатать график',
                downloadCSV: 'Скачать CSV'
            }
    });

	var chartName = Highcharts.stockChart(container, {
    chart: {
        height: 600,
        // backgroundColor: "#EEF2F5",             
    	resetZoomButton: {
        theme: {
            display: 'none'
        }
    },
        type: 'line',
        zoomType: 'x',
          events: {
            load: function () {
                    loadChart=true;
             } 
      }  
    },
    boost: {
        useGPUTranslations: true
    },
        title: {
        text: tit
    },
    legend: {
        enabled: false,
        borderWidth: 0
    },

    time: {
        useUTC: false
    },
    // exporting: {
    //     enabled: true
    // },
    rangeSelector: {
        buttons: [{
            count: 60,
            type: 'minute',
            text: '1ч'
        }, {
            count: 320,
            type: 'minute',
            text: '6ч'
        },
        {
            count: 720,
            type: 'minute',
            text: '12ч'
        },
        {
            count: 1440,
            type: 'minute',
            text: '24ч'
        }, 
        {	count: 3,
        	type: 'day',
        	text: '3д'
        },
        {	count: 7,
        	type: 'day',
        	text: '7д'
        },
        {	count: 14,
        	type: 'day',
        	text: '14д'
        },
        {	count: 30,
        	type: 'day',
        	text: '30д'
        },
        {
            type: 'all',
            text: 'Всё'
        }
        ],
        inputEnabled: false,
        selected: 0,
        
        buttonSpacing: 30,
        buttonTheme: { // styles for the buttons  
        width:45,
            style: {
                    color: '#000000',  
                },
                states: {
                    hover: {
                    fill: '#42A5F5',
                    style: {
                            color: 'white'
                            }
                    },
                    select: {
                        fill: '#29B6F6',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
    },
   
    xAxis: {
                type: 'datetime',
                minRange: 600000,
                breaks: [spaceVal]
            },
           
    yAxis: {
    	opposite:false,
    	plotLines: Ylines[i],
    	    title: {
            enabled: true,
            text: ' Виброскорость <b>мм/с</b><br>(СКР 50000 измерений)',
            style: {
                fontWeight: 'normal'
            }
        }
    },

     credits: {
      enabled: false
  },
    subtitle: {
        text: 'Приближение осуществляется выделением области и навигатором внизу графика'
    },
    series: [SeriesData[i]]
	});
	
	return chartName;
	};



function CreateSeries(namePoint,dataPoint,arrColor){//создает объект с массивами данных для каждого массива данных которые подставляются в график
	var inSeries=new Array();
	var OneSeries=new Array();
	namePoint.forEach(function(item,i){
	OneSeries={
	//showInNavigator: true,
    name: namePoint[i],
    data: dataPoint[i],
    id:'idpoint'+i,
    tooltip: {
        valueDecimals: 2
        },
    zones: arrColor[i],
    turboThreshold: 1000000000
		};
	inSeries.push(OneSeries);
	});
	return	inSeries;
	};

//красывый переход между графиками
$("body").delegate("#navcol-1 a","click", function (event) {
        var NavHeight=$("#navcol-1").outerHeight();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        
        $('body,html').animate({
            scrollTop: $(id).offset().top - NavHeight -30
        }, 1500);
        event.preventDefault();
    	});

//функция определения видимой высоты контейнера
$.fn.visibleHeight = function() {
    var elBottom, elTop, scrollBot, scrollTop, visibleBottom, visibleTop;
    scrollTop = $(window).scrollTop();
    scrollBot = scrollTop + $(window).height();
    elTop = this.offset().top;
    elBottom = elTop + this.outerHeight();
    visibleTop = elTop < scrollTop ? scrollTop : elTop;
    visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    return visibleBottom - visibleTop
	}

$("body").delegate('.pushButtonVisible','click',function(e){//умный обработчик определяющий по одному нижнему навибару для всех куда пользователь хочет добавить график
	
	var ArrHeigth=[];
	for (var i = 0; i < arrPropertiesHeader.length; i++) {
		var conH=$('#container'+i+'').visibleHeight();
		ArrHeigth.push(conH);
	};
	var max=Math.max.apply(Math,ArrHeigth);
	if (max>0){
	var indexCon=ArrHeigth.indexOf(max);//определили номер контайнера в котором необходимо делать изменения
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер нажатой кнопки
	if (indexCon!=NumbButton){
	if (chartS[indexCon].get("idpoint"+NumbButton)==undefined) {
	chartS[indexCon].addSeries(SeriesData[NumbButton]);
	addSeries[indexCon].push(+NumbButton);
	} else {chartS[indexCon].get("idpoint"+NumbButton).remove();
	// var elemIndex=$.inArray(+NumbButton,addSeries[indexCon]);
	// addSeries[indexCon].splice(elemIndex,1);
	addSeries[indexCon] = jQuery.grep(addSeries[indexCon], function(value) {
        return value != NumbButton;
      });
	}}
	}
	chartS[indexCon].series[chartS[indexCon].series.length-1].zones=ColorChartLines[indexCon];
	chartS[indexCon].series[chartS[indexCon].series.length-1].redraw();
	});//добавляет и убирает линии графиков

function FillFilds(nameFields,fillArr){//заполнение полей цифрами: указываем id и массив со значениями
	for (var i = 0; i < arrPropertiesHeader.length; i++) {
	 	$("#"+nameFields+i).val(fillArr[i])
	 } 
	};

//отображение и скрытие полосок по У
$("body").delegate('.chWR','click',function(e){

	if ($(this).text()=='check_box'){//это условие делает из иконок полнофункционирующий чекбокс
		$(this).text('check_box_outline_blank');
		}
		else{
		$(this).text('check_box');
		};
	
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения
	
	 if ($('#WARNINGcheck0').text()=='check_box') { 
    chartS[NumbButton].yAxis[0].addPlotLine(Ylines[NumbButton][0]);
	} else {
	  chartS[NumbButton].yAxis[0].removePlotLine('plotLinesWarning');
	}
	Ylines=crCHyAxisValue(WARNING,STOP,ALARM);
	});

$("body").delegate('.chST','click',function(e){
	if ($(this).text()=='check_box'){
		$(this).text('check_box_outline_blank');
	}
	else{
		$(this).text('check_box');
	};
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения
	 if ($('#STOPcheck0').text()=='check_box') {
    chartS[NumbButton].yAxis[0].addPlotLine(Ylines[NumbButton][1]);
	} else {
	  chartS[NumbButton].yAxis[0].removePlotLine('plotLinesStop');
	}
	Ylines=crCHyAxisValue(WARNING,STOP,ALARM);
	});

$("body").delegate('.chAL','click',function(e){
	if ($(this).text()=='check_box'){
		$(this).text('check_box_outline_blank');
	}
	else{
		$(this).text('check_box');
	};
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения
	 if ( $('#ALARMcheck0').text()=='check_box') {
    chartS[NumbButton].yAxis[0].addPlotLine(Ylines[NumbButton][2]);
	} else {
  	chartS[NumbButton].yAxis[0].removePlotLine('plotLinesAlarm');
	}
	Ylines=crCHyAxisValue(WARNING,STOP,ALARM);
	});
//////////
// определяет минимальную и максимальную выставляемые даты
function SetMinMaxDatepicker (){
	var minY=new Date(DateArray[0]).getFullYear();
			   var minM=new Date(DateArray[0]).getMonth()+1;
			   if (minM.toString().toString().length==1){minM='0'+minM;}
			   var minD=new Date(DateArray[0]).getDate();
			   if (minD.toString().length==1){minD='0'+minD;}
			   var minH=new Date(DateArray[0]).getHours();
			   if (minH.toString().length==1){minH='0'+minH;}
			   var minMs=new Date(DateArray[0]).getMinutes();
			   if (minMs.toString().length==1){minMs='0'+minMs;}
			   var minS=new Date(DateArray[0]).getSeconds();
			   if (minS.toString().length==1){minS='0'+minS;}

			   var setMinDate=minY+'-'+minM+'-'+minD+'T'+minH+':'+minMs+':'+minS;

			   var maxY=new Date(DateArray[DateArray.length-1]).getFullYear();
			   var maxM=new Date(DateArray[DateArray.length-1]).getMonth()+1;
			   if (maxM.toString().length==1){maxM='0'+maxM;}
			   var maxD=new Date(DateArray[DateArray.length-1]).getDate();
			   if (maxD.toString().length==1){maxD='0'+maxD;}
			   var maxH=new Date(DateArray[DateArray.length-1]).getHours();
			   if (maxH.toString().length==1){maxH='0'+maxH;}
			   var maxMs=new Date(DateArray[DateArray.length-1]).getMinutes();
			   if (maxMs.toString().length==1){maxMs='0'+maxMs;}
			   var maxS=new Date(DateArray[DateArray.length-1]).getSeconds();
			   if (maxS.toString().length==1){maxS='0'+maxS;}

			   var setMaxDate=maxY+'-'+maxM+'-'+maxD+'T'+maxH+':'+maxMs+':'+maxS;


			   for (var i=0; i <arrPropertiesHeader.length; i++) {
			   	$("#DATEfrom"+i).attr('value', setMinDate);
			   	$("#DATEfrom"+i).attr('min', setMinDate);
			   	$("#DATEfrom"+i).attr('max', setMaxDate);

			   	$("#DATEto"+i).attr('value', setMaxDate);
			   	$("#DATEto"+i).attr('min', setMinDate);
			   	$("#DATEto"+i).attr('max', setMaxDate);
			   	}  

		};
/////////
$("body").delegate('.pushCalendar','click',function(e){
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения
	 
   var PreviusTime=$('#DATEfrom'+NumbButton).val();
   var NextTime=$('#DATEto'+NumbButton).val();
    
   NextTime=VariousParseDate(NextTime);
   PreviusTime=VariousParseDate(PreviusTime);
   
 	chartS[NumbButton].xAxis[0].setExtremes(PreviusTime,NextTime);
	});//обработчик выводит на экране график от и до 

function VariousParseDate(parseDate){//функция парсит даты как с секундами так и без 
   var parse=d3.utcParse("%Y-%m-%dT%H:%M:%S");
   var parseWITHOUTsecond=d3.utcParse("%Y-%m-%dT%H:%M");

	if (parseDate.length==16){
		parseDate=parseWITHOUTsecond(parseDate);
	} else if (parseDate.length==19){
		parseDate=parse(parseDate);}
	parseDate.setHours(parseDate.getHours()-3);
	 parseDate=parseDate.getTime();
	return parseDate;
	}

$("body").delegate('.changeY','click',function(e){
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения
	 
	ALARM[NumbButton] = +$('#ALARM'+NumbButton).val();
    WARNING[NumbButton] = +$('#WARNING'+NumbButton).val();
    STOP[NumbButton] = +$('#STOP'+NumbButton).val();
   
 	chartS[NumbButton].yAxis[0].removePlotLine('plotLinesWarning');
    chartS[NumbButton].yAxis[0].removePlotLine('plotLinesAlarm');
    chartS[NumbButton].yAxis[0].removePlotLine('plotLinesStop');

    Ylines=crCHyAxisValue(WARNING,STOP,ALARM);

    if ($('#WARNINGcheck'+NumbButton).text()=='check_box') {
    	chartS[NumbButton].yAxis[0].addPlotLine(Ylines[NumbButton][0]);
    };

    if ($('#STOPcheck'+NumbButton).text()=='check_box') {

        chartS[NumbButton].yAxis[0].addPlotLine(Ylines[NumbButton][1]);
    };

    if ($('#ALARMcheck'+NumbButton).text()=='check_box') {

        chartS[NumbButton].yAxis[0].addPlotLine(Ylines[NumbButton][2]);
    };




    //добавить запись чисел в ПЛК
    // setTAG('WARNING'+NumbButton,WARNING[NumbButton]);
    // setTAG('STOP'+NumbButton,STOP[NumbButton]);
    // setTAG('ALARM'+NumbButton,ALARM[NumbButton]);



    //!!!!ЗДЕСЬ ты изменяешь значения уровней в своей БАЗЕ, тоесть обновляешь значения уровней только в своей базе, значения на графике и так изменятся


	ColorChartLines= crCHyColorCharts(WARNING,STOP,ALARM);

		chartS[NumbButton].series[0].zones=ColorChartLines[NumbButton];
		chartS[NumbButton].series[0].redraw();
		chartS[NumbButton].series[chartS[NumbButton].series.length-1].zones=ColorChartLines[NumbButton];
		chartS[NumbButton].series[chartS[NumbButton].series.length-1].redraw();
	

	});

	

// setInterval(function(){//ПОСТОЯННОЕ ОБНОВЛЕНИЕ ЗНАЧЕНИЙ ОНЛАЙН ВИБРАЦИИ
	
	
// 	var enUPDval=true;
// 	arrStartPause.forEach(function(nm){
// 		if (nm==true){
// 			enUPDval=false;
// 			return false;
// 		}
// 	});

// 	if ((enUPDval==true) && (loadChart==true)){//только обновление полей ТЕКУЩЕЕ ЗНАЧЕНИЕ
	
                                 
//                         arrPropertiesHeader.forEach(function(nm,im){
//                         	changeColorCurrentNumber(nm,WARNING[im],STOP[im],ALARM[im],onlineArray[im+1])//ставим im+1 так как onlineArray содержит первый элемент дату
//                         })

// 	} else if ((enUPDval==false) && (loadChart==true)){//обновляет график
	
                                                           
//                         arrPropertiesHeader.forEach(function(nm,im){
                        	
//                         	changeColorCurrentNumber(nm,WARNING[im],STOP[im],ALARM[im],onlineArray[im+1]);

//                         arrStartPause.forEach(function(nm,im){
//                         	if (arrStartPause[im]==true){
//                         		addSeries[im].forEach(function(nmm){
                        			
//                         			chartS[im].get('idpoint'+nmm).addPoint({x:onlineArray[0],
//                          y:onlineArray[nmm+1]}, false, false);
//                         		})
                        		
//                         		chartS[+im].redraw();
//                         	}
                        		
                        	
//                         })


//     })

// 	}
	
// 	}
// 	,1000);

function changeColorCurrentNumber(id,warning,stop,alarm,value){
	var th=$("#"+id);
	th.html(value);
	if (value<=warning){
                            th.css('color', colorOk);
                         } else if ((value>warning)&&(value<stop)){
                            th.css('color', colorWarning);    
                         } else if ((value<alarm)&&(value>stop)){
                            th.css('color', colorStop);
                        } else {th.css('color', colorAlarm);}//функция изменяет цвет динамически изменяющихся цифр//функция изменяет цвета чисел выводимая на экран в зависимости от их величины
	}

$("body").delegate('.pushPause','click',function(e){
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения

	 arrStartPause[NumbButton]= !arrStartPause[NumbButton];

	 if (arrStartPause[NumbButton]==true){ $("#onlinePause"+NumbButton).html('Пауза'); chartS[NumbButton].redraw();}
	else {$("#onlinePause"+NumbButton).html('Старт');}

  
	});//изменение массива с паузами и изменение текста кнопки//обработчик ПАУЗА\СТОП график


$("body").delegate('.chDate','change',function(e){
	var NumbButton=$(this).attr('id').match(/\d+/)[0];//номер графика для изменения

	 $('#DATEto'+NumbButton).attr('min', $('#DATEfrom'+NumbButton).val());


	 if (($('#DATEfrom'+NumbButton).val())>($('#DATEto'+NumbButton).val()))
  	{
  		($('#DATEto'+NumbButton).val($('#DATEfrom'+NumbButton).val())); 
  }

	});//обработчик которые при изменении поля даты ОТ больше чем указано в поле ДО изменяет значение в поле ДО

$("body").delegate('#ResetVisible','click',function(e){//обработчик сбрасывает графики не принадлежащие данному контейнеру
	var ArrHeigth=[];
	for (var i = 0; i < arrPropertiesHeader.length; i++) {
		var conH=$('#container'+i+'').visibleHeight();
		ArrHeigth.push(conH);
	};
	var max=Math.max.apply(Math,ArrHeigth);
	if (max>0){
	var indexCon=ArrHeigth.indexOf(max);//определили номер контайнера в котором необходимо делать изменения
	addSeries[indexCon]=unique(addSeries[indexCon]);
	for (var i = 1; i < addSeries[indexCon].length; i++) {
		chartS[indexCon].get('idpoint'+addSeries[indexCon][i]).remove();
	}
	addSeries[indexCon].splice(1,addSeries[indexCon].length-1);
	}


	})


function unique(arr) {//функция убирает из массива все повторы и делает все его значения уникальными
  var result = [];

  nextInput:
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i]; // для каждого элемента
      for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
        if (result[j] == str) continue nextInput; // если да, то следующий
      }
      result.push(str);
    }

  return result;
}
$("#changeYaxesNameValue0").click(function(){
    var obj = {};
    obj.alarm=$("#ALARM0").val();
    obj.stop = $("#STOP0").val(); 
    obj.warning = $("#WARNING0").val();
             $.ajax({
   url: 'vibro.php?id='+window.id+'&updategran=1',
   method:"POST",
   data: obj,
   success: function(data){
   data = JSON.parse(data);
    if(data==1){
       reloadF();
    }else{
        alert('error');
        
        reloadF();
    }
   }
 });
});
