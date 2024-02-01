 

		var map, geocoder;
		function initialize() {
			var latlng = new google.maps.LatLng(31.230393, 121.473704);
			var options = {
				zoom: 11,
				center: latlng,
				disableDefaultUI: true,
				panControl: true,
				zoomControl: true,
				mapTypeControl: true,
				scaleControl: true,
				streetViewControl: false,
				overviewMapControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map_canvas"), options);
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({latLng: latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[3]) {
						parent.document.getElementById("kindeditor_plugin_map_address").value = results[3].formatted_address;
					}
				}
			});
		}
		function search(address) {
			if (!map) return;
			geocoder.geocode({address : address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setZoom(11);
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
				} else {
					alert("Invalid address: " + address);
				}
			});
		}
	
  

		var map, geocoder;
		function initialize() {
			var latlng = new google.maps.LatLng(31.230393, 121.473704);
			var options = {
				zoom: 11,
				center: latlng,
				disableDefaultUI: true,
				panControl: true,
				zoomControl: true,
				mapTypeControl: true,
				scaleControl: true,
				streetViewControl: false,
				overviewMapControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map_canvas"), options);
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({latLng: latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[3]) {
						parent.document.getElementById("kindeditor_plugin_map_address").value = results[3].formatted_address;
					}
				}
			});
		}
		function search(address) {
			if (!map) return;
			geocoder.geocode({address : address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setZoom(11);
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
				} else {
					alert("Invalid address: " + address);
				}
			});
		}
	
 