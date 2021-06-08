/* global $, getPluginParameter, setMetaData */

var dateModifiedContainer = document.getElementById('dateModified') // Container that displays the date modified.
var chartLink = getPluginParameter('link') // Get the link parameter.
$('#chart-frame').attr('src', chartLink) // Set the link for the iframe.
$('#chart').hide() // Hide the chart by default.

var dateModified = new Date(document.lastModified) // Store date modified.
var message = 'Last updated ' + dateModified // Store message to be displayed.
var errorMessage = 'Sorry, this is taking a while! Are you connected to the internet? Wait a few moments, and try the Refresh button.' // Store error message.
var result = 'fail' // Store result of connection default is fail.
var answer = ' ' // Variable to store final answer.

generateChart()

// FUNCTIONS

function generateChart () {
  if (navigator.onLine) { // If browser is online.
    $('.loading-container').show() // Hide the loading section.
    $('#chart-frame').on('load', function () {
      $('.loading-container').hide() // Hide the loading section.
      $('#chart').show() // Hide the loading section.
    })
    result = 'success'
    answer = result + '|' + dateModified.toString()
    drawChart()
    dateModifiedContainer.innerHTML = message
    setAnswer(result)
    setMetaData(answer)
  } else {
    // $('.loading-container').hide() // Hide the loading section.
    dateModifiedContainer.innerHTML = errorMessage
    result = 'fail'
    answer = result + '|' + dateModified
    $('#chart').hide() // Hide the loading section.
    setAnswer(result)
    setMetaData(answer)
  }
}

function refresh () {
  $('#chart').hide() // Hide the loading section.
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
    // $('.loading-container').hide()
  })
}
