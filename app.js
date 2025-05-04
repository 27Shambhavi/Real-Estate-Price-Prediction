function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    
    var data = {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    };
    console.log("Data being sent to server:", data);

    var url = "http://127.0.0.1:5000/predict_home_price";
  
    $.post(url,data, function(response) {
        console.log("Response from server:", response);
        if (response.estimated_price) {
            estPrice.innerHTML = "<h2>" + response.estimated_price.toString() + " Lakh</h2>";
        } else {
            estPrice.innerHTML = "<h2>Could not estimate the price. Please try again later.</h2>";
        }
    }).fail(function(xhr, status, error) {
        console.error("Error: ", error);
        estPrice.innerHTML = "<h2>Error: Could not fetch price</h2>";
    });
}
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_name"; // Use this if you are NOT using nginx which is first 7 tutorials
    
    $.get(url,function(data, status) {
        console.log("got response for get_location_name request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;