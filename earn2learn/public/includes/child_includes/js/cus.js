var etl = {

	VAR:{
		varis : null
	},
	init:function () {
		// alert('sd');

		$('[data-slick]').each(function () {
			$(this).slick($(this).data('slick'))
		});

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		  $('[data-slick]').each(function () {
				$(this).slick('setPosition');
			});
		});

	}
}


$(document).ready(function () {
	//etl.init();

});
