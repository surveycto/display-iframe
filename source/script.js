var chartLink = getPluginParameter('link') // Get the link parameter.
$('#chart-frame').attr('src', chartLink) // Set the link for the iframe.

/* Google by default draws the chart on 600px by 371px canvas. Access to the canvas using CSS is limited,
so the function below does some magic to fit the chart on smaller screens */
$(function () {
  $('#chart').each(function () {
    var $wrap = $(this)
    function iframeScaler () {
      var wrapWidth = $wrap.width() // width of the wrapper
      var wrapHeight = $wrap.height()
      var childWidth = $wrap.children('iframe').width() // width of child iframe
      var childHeight = $wrap.children('iframe').height() // child height
      var wScale = wrapWidth / childWidth
      var hScale = wrapHeight / childHeight
      var scale = Math.min(wScale, hScale) // get the lowest ratio
      $wrap.children('iframe').css({ transform: 'scale(' + scale + ')', 'transform-origin': 'left top' }) // set scale
    };
    $(window).on('resize', iframeScaler)
    $(document).ready(iframeScaler)
  })
})
