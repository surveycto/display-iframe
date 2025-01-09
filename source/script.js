/* global $, getPluginParameter, setMetaData */

var dateModifiedContainer = document.getElementById('dateModified')
var chartLink = getPluginParameter('link') // Get the link parameter.
$('#chart-frame').attr('src', chartLink) // Set the link for the iframe.
$('#chart').hide()

var dateModified = new Date(document.lastModified)
var message = 'Last updated ' + dateModified
var errorMessage = 'Sorry, this is taking a while! Are you connected to the internet? Wait a few moments, and try the Refresh button.'
var result = 'fail'
var answer = ' '

var checkConnectivity = async() => {
  try {
    var online = await fetch('https://github.com/surveycto/display-iframe/blob/master/extras/display_graph.jpg')
    return online.status >= 200 && online.status < 300
  } catch (err) {
    return false
  }
}

generateChart()

function generateChart () {
  if (checkConnectivity) {
    // The resource is accessible - you are **probably** online.
    $('.loading-container').hide() // Hide the loading section.
    $('#chart').show() // Hide the loading section.
    result = 'success'
    answer = result + '|' + dateModified.toString()
    drawChart()
    dateModifiedContainer.innerHTML = message
    setAnswer(result)
    setMetaData(answer)
  } else {
    // Something went wrong. Test textStatus/errorThrown to find out what. You may be offline.
    $('.loading-container').hide() // Hide the loading section.
    dateModifiedContainer.innerHTML = errorMessage
    result = 'fail'
    answer = result + '|' + dateModified
    setAnswer(result)
    setMetaData(answer)
  }
}

function refresh () {
  $('#chart-frame').attr('src', chartLink) // Set the link for the iframe.
  generateChart()
}

function drawChart () {
  /* Google by default draws the chart on 600px by 371px canvas. Access to the canvas using CSS is limited,
  so the function below resizes the iframe parent container first and then resizes the iframe to fit the chart on smaller screens */
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
}
