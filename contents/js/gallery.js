const $ = require('jquery')

$('#us').magnificPopup({
	delegate: 'a',
	type: 'image',
	tLoading: 'Loading image #%curr%...',
	mainClass: 'mfp-img-mobile',
	gallery: {
		enabled: true,
		navigateByImgClick: true,
		preload: [0, 1]
	},
	image: {
		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		titleSrc: function(item) {
			return $('.photo-title', item.el).text() +
				' <small>' + $('.photo-location', item.el).text() + '</small>'
		}
	}
});