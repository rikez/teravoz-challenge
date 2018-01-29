
window.addEventListener('load', (event) => {
	socketStarter();
	window.addEventListener('resize', addTableResponsive('#call-table'));
})

const socketStarter = () => {
	let i = 1;
	const socket = io();

	socket.on('connect', function () {
		console.log('Connecting socket io on the server');
	});

	socket.on('call-status', function(event) {
		$('#no-events-text').css('display', 'none');
		const keys = Object.keys(event);
		let str = `<div class="card mt-10">
                                <div class="card-block">
                                    <h4 class="card-title"> ${i}# Call Event</h4>`;

		for (let key of keys) {
			if (key === 'url') {
				str += `<a href="${event.url ? event.url : '#'}" target="_blank" class="card-link">Call Record</a>`;
				continue;
			}
			str += `<p class="card-text">${key}: ${event[key]}</p>`;
		}

		str += `</div></div>`;

		$('#event-content').prepend(str);
		i++;
	});
}


const isSmallScreen = () => $(window).width() <= 789 ? true : false;

const addTableResponsive = (context) => {
		if (isSmallScreen()) {
			$(context).addClass('table-responsive');
			return;
		}

		$(context).removeClass('table-responsive');
}

$(window).on('resize', () => addTableResponsive('#call-table'));

