window.addEventListener('load', () => {
	let long;
	let lat;
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			let temperatureDescription = document.querySelector('.temperature-description');
			let temperatureDegree = document.querySelector('.temperature-degree');
			let locationTimezone = document.querySelector('.location-timezone');
			let temperatureSection = document.querySelector('.temperature');
			let temperatureSpan = document.querySelector('.temperature span');


			const proxy = "http://cors-anywhere.herokuapp.com/"
			const api = `${proxy}https://api.darksky.net/forecast/e892a4bd3105a9f9c0b7c98ea5818a70/${lat},${long}`
			
			fetch(api)
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log(data); 
				const {temperature, summary, icon } = data.currently;
				//Set  DOM Elements from the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				//Formular for celsius
				let celsius = (temperature - 32) * (5/9);
				//Set Icon
				setIcons(icon, document.querySelector('.icon'));
				//Change Temperature to Celsius/Farenheit
				temperatureSection.addEventListener('click', () => {
					if(temperatureSpan.textContent === "F"){
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celsius);
					}else{
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent =temperature;
					}
				})
			}); 
		});

	}/*else{  
		h1.textContent = "hey this is not working because reason"
	}*/


function setIcons(icon, iconID){
	const skycons = new Skycons({ color: "white"});
	//replace - by _ in the curren
	const currentIcon = icon.replace(/-/g, "_").toUpperCase();
	skycons.play();
	return skycons.set(iconID, Skycons[currentIcon]);
};

}); 

console.log('hello world!')