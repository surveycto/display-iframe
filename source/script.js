/* global $, getPluginParameter */

var dateModifiedContainer = document.getElementById('dateModified')

var chartLink = getPluginParameter('link') // Get the link parameter.
$('#chart-frame').attr('src', chartLink) // Set the link for the iframe.
$('#chart').hide()

var dateModified = new Date(document.lastModified)
var message = 'Last Updated ' + dateModified
var errorMessage = 'Sorry, this is taking while! Are you connected to the internet? Wait a few moments, and try the Refresh button.'

var checkConnectivity = {
  isInternetConnected: function () {
    return $.get({
      url: 'https://cors-anywhere.herokuapp.com/https://www.gstatic.com/generate_204',
      dataType: 'text',
      cache: false
    })
  }
}

checkConnectivity.isInternetConnected().done(function () {
  // The resource is accessible - you are **probably** online.
  $('.loading-container').hide() // Hide the loading section.
  $('#chart').show() // Hide the loading section.
  drawChart()
  dateModifiedContainer.innerHTML = message
}).fail(function (jqXHR, textStatus, errorThrown) {
  // Something went wrong. Test textStatus/errorThrown to find out what. You may be offline.
  $('.loading-container').hide() // Hide the loading section.
  dateModifiedContainer.innerHTML = errorMessage
})

function refresh () {
  $('#chart-frame').attr('src', chartLink) // Set the link for the iframe.
  $('#chart').show() // Hide the loading section.
  drawChart()
  dateModifiedContainer.innerHTML = message
  document.getElementById('chart-frame').src = document.getElementById('chart-frame').src
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
