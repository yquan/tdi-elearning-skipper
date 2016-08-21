console.log("DOM is ready to go!");

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

$('.elearning-course-info').remove();
chrome.storage.sync.get(["translations"], function(items){
    if(items.translations){
        $('div.content_elearning p').each(function() {
            var text = $(this).html();
            $(this).html(text.replace('intimidate',     '<u>intimidate</u>'        +' <i>(vt. 恐吓，威胁；胁迫)</i>')
                             .replace('intimidating',   '<u>intimidating</u>'      +' <i>(adj. 吓人的)</i>')
                             .replace('Boyle’s Law',    '<u>Boyle’s Law</u>'       +' <i>(波义耳定律)</i>')
                             .replace('Metric',         '<u>Metric</u>'            +' <i>(adj. 公制的；米制的；公尺的)</i>')
                             .replace('Imperial',       '<u>Imperial</u>'          +' <i>(adj.帝国的，皇帝的；皇家的，庄严的；特级的；度量衡英制的)</i>')
                             .replace('Dalton’s Law',   '<u>Dalton’s Law</u>'      +' <i>(道尔顿法则)</i>')
                             .replace('fraction',       '<u>fraction</u>'          +' <i>(n. 分数；部分；小部分；稍微)</i>')
                             .replace('combustion',     '<u>combustion</u>'        +' <i>(n. 燃烧，氧化；骚动)</i>')
                             .replace('prolonged',      '<u>prolonged</u>'         +' <i>(adj. 延长的；拖延的；持续很久的)</i>')
                             .replace('hypoxia',        '<u>hypoxia</u>'           +' <i>(n. [医] 低氧；组织缺氧；氧不足)</i>')
                             .replace('anoxic',         '<u>anoxic</u>'            +' <i>(adj. 缺氧的)</i>')
                             .replace('impaired',       '<u>impaired</u>'          +' <i>(adj. 受损的 v. 损害)</i>')
                             .replace('hyperoxia',      '<u>hyperoxia</u>'         +' <i>(n.（组织内）氧过多)</i>')
                             .replace('pulmonary',      '<u>pulmonary</u>'         +' <i>(adj. 肺的；有肺的；肺状的)</i>')
                             .replace('devastating',      '<u>devastating</u>'         +' <i>(adj. 毁灭性的；全然的 v. 摧毁；毁坏)</i>')
                             .replace('seizure',      '<u>seizure</u>'         +' <i>(n. 没收；夺取；捕获；（疾病的）突然发作)</i>')
                             .replace('nausea',      '<u>nausea</u>'         +' <i>(n. 恶心，晕船；极端的憎恶)</i>')
                             .replace('convulsions',      '<u>convulsions</u>'         +' <i>(n. [内科] 抽搐；社会动乱；哄堂大笑；震动)</i>')
                             .replace('acclimate',      '<u>acclimate</u>'         +' <i>(vi. 服水土；适应新环境 vt. 使适应；使服水土)</i>')
                             .replace('NOAA',      '<u>NOAA</u>'         +' <i>(abbr. 美国国家海洋和大气局（ National Oceanic and Atmospheric Administration）)</i>')
                             .replace('attain',      '<u>attain</u>'         +' <i>(vt. 达到，实现；获得；到达 vi. 达到；获得；到达 n. 成就)</i>')
                             .replace('irritation',      '<u>irritation</u>'         +' <i>(n. 刺激；激怒，恼怒，生气；兴奋；令人恼火的事)</i>')
                             .replace('respiratory tract',      '<u>respiratory tract</u>'         +' <i>([解剖] 呼吸道)</i>')
                             .replace('soreness',      '<u>soreness</u>'         +' <i>(n. 悲伤；痛苦；愤慨)</i>')
                             .replace('fudge factor',      '<u>fudge factor</u>'         +' <i>(容差系数)</i>')
                             .replace('metabolism',      '<u>metabolism</u>'         +' <i>(n. [生理] 新陈代谢)</i>')
                             .replace('metabolic',      '<u>metabolic</u>'         +' <i>(dj. 变化的；新陈代谢的)</i>')
                             .replace('respiration',      '<u>respiration</u>'         +' <i>(n. 呼吸；呼吸作用)</i>')
                             .replace('suffocation',      '<u>suffocation</u>'         +' <i>(n. 窒息；闷死)</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')
                             .replace('hyperoxia1',      '<u>hyperoxia1</u>'         +' <i>()</i>')

            );
        });
    }
});

var current = $('li.current');
var rests = current.nextAll('li').not(":last-child").find('a');
var restsToOpen = rests.length;
var opendTotal = 0;
var restsHrefs = rests.map(function(i,el) { return $(el).attr('href'); });
var exam = current.siblings(":last");
//rests.css( "background-color", "red" );

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!restsToOpen) { alert('Nowhere to go, it seems you are at exam page at the moment.'); return false;}
    if( request.message === "clicked_browser_action" ) {
      // add an entire page overlay and display it
      $('body').prepend('<div id="processing_overlay" style="background-color:rgba(0,0,0,0.5);;width:100%;height:100%;z-index:999999;top:0;left:0;position:fixed;text-align:center">'+
        '<div id="loading_overlay_outter" style="width:530px;text-align:left;">'+
        '<div id="loading_overlay" style="padding:30px 100px;background-color:#FFF;">'+
        '<h1 style="margin:0;"><svg width=\'30px\' height=\'30px\' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-spin"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g transform="translate(50 50)"><g transform="rotate(0) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(45) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.12s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.12s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(90) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.25s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.25s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(135) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.37s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.37s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(180) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.5s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.5s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(225) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.62s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.62s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(270) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.75s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.75s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g><g transform="rotate(315) translate(34 0)"><circle cx="0" cy="0" r="8" fill="#000"><animate attributeName="opacity" from="1" to="0.1" begin="0.87s" dur="1s" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="scale" from="1.5,1.0" to="1.0,1.0" begin="0.87s" dur="1s" repeatCount="indefinite"></animateTransform></circle></g></g></svg> '+
        '<span id="loading">Loading</span></h1>'+
        '<p style="margin: 0;">Sit tight, pages are being opened one by one,<br/> it may take some times - <span id="percentage_opened">0</span>% Done!.</p>'+
        '</div></div></div>');
      $('#loading_overlay_outter').center();
      var original = $("#loading").html(),
        i  = 0;
        setInterval(function() {

            $("#loading").append(" . ");
            i++;
            
            if(i == 6)
            {
                $("#loading").html(original);
                i = 0;
            }

        }, 300);

      chrome.runtime.sendMessage({"message": "open_new_tab", "urls": restsHrefs, 'exam_url': exam.find('a').attr('href')});
    }
    if( request.message === "tab_href_opened" ) {
      opendTotal = opendTotal + 1;
      percentage = Math.round((opendTotal/restsToOpen)*100)
      $('#percentage_opened').text(percentage);
      liHrefOpened = $("a[href='"+request.url+"']").parent();
      liHrefOpened.prev().removeClass("current");
      liHrefOpened.addClass("current");
    }
  }
);