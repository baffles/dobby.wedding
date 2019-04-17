const countdown = require('countdown')

countdown.setLabels(null, null, ', and ', ', ', '', null)

var timerId = countdown(
	1568406600000, //new Date(2019, 9, 13, 16, 30),
	function(ts) { document.getElementById('countdown').innerHTML = 'In ' + ts.toHTML("strong") + '!'; },
	countdown.MONTHS | countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS,
	3
)