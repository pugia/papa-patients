var APP = {

	days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'],
	turns: [],
	
	init: function() {
		
		var self = this;
		
		self.turns = Array.apply(null, Array(6)).map(function(i,e){return e+1});
		
		self.sideBar();
		self.tableView();
		self.loadData();
		self.bindEvents();

	},
	
	bindEvents: function() {
		
		var self = this;
		
		$('#save_user').on('click', function() {
			
			$.post('/users', {
				first_name: $('#first_name').val(),
				last_name: $('#last_name').val(),
				phone_1: $('#phone_1').val(),
				phone_2: $('#phone_2').val(),
				day: $('#day').val(),
				turn: $('#turn').val()
			}).done(function(d) {
			
				if (d.status) { 
					self.loadData(); 
				}
			
			})	
		
		})
		var bar = $('#sideBar > div.filters')
		bar.on('click', 'button', function(e) {
			e.preventDefault();
			
			bar.find('button').removeClass('active');
			$(this).toggleClass('active');
			
			if ($(this).hasClass('active')) {
				self.loadData($(this).attr('data-day'), $(this).attr('data-turn'))
			} else {
				self.loadData();
			}
			
		})
		
		$('#show_all').on('click', function() {
			bar.find('button').removeClass('active');
			self.loadData();
		})
		
		$('#users_data').on('show.bs.modal', function(e) {
			var id = $(e.relatedTarget).attr('data-user');
			if (id) {
				
			} else {
				$(this).find('input').val('');
				$(this).find('select > option:eq(0)').attr('selected','selected');
			}
			console.log(id);
			
		})
		
		
	},
	
	loadData: function(day, turn) {
		
		var self = this;
		var day = day || null;
		var turn = turn || null;
		
		
		var table_tpl = _.template($('#row_template').html());
		var tbody = $('#tbody').html('');
		$.get('/users', {
			day: day,
			turn: turn
		}, function(data) {
			if (data) {
				$.each(data, function(i,e) {	
					
					var tdul = $('td[data-day="'+e.day+'"][data-turn="'+e.turn+'"] ul');
					var li = $('<li>').text(e.first_name +' '+e.last_name).attr('data-id', e.id);
					tdul.append(li);
					
					e.day = self.days[e.day];
					tbody.append(table_tpl(e));
				})
			}
		})
		
	},
	
	sideBar: function() {
		
		var self = this;
		var bar  = $('#sideBar > div.filters');
		
		$.each(self.days, function(i,e) {
			
			bar.append($('<h4>').text(e));
			var group = $('<div>').addClass('btn-group btn-group-sm').attr('role', 'group').appendTo(bar);
			var button = $('<button>').addClass('btn btn-default').attr('data-day', i).attr('data-turn', 'null').text('Tutti').appendTo(group);
			$.each(self.turns, function(a,b) {
				var button = $('<button>').addClass('btn btn-default').attr('data-day', i).attr('data-turn', b).text(b).appendTo(group);
			})			
			
		})
		
	},
	
	tableView: function() {
		
		var self = this;
		var table = $('#table_view');
		
		// header
		var tr = $('<tr>');
		tr.append($('<th>'));
		$.each(self.days, function(h,d) {
			
			var td = $('<th>').text(d);
			tr.append(td)
			
		})
		table.append(tr);
		
		
		$.each(self.turns, function(i,t) {
			
			var tr = $('<tr>');
			var th = $('<th>').text(t).appendTo(tr);

			$.each(self.days, function(h,d) {
				
				var td = $('<td>').attr('data-day', h).attr('data-turn', t);
				var ul = $('<ul>').appendTo(td);
				tr.append(td)
				
			})
			
			table.append(tr);
			
		})
				
	}
	
	
}