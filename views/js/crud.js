
const path = "http://localhost:5000";
var apartId = '';
var allApartments ;
//profile creation module
   $('#createApart').click(function(e){

      e.preventDefault()
      var apartNo = $('#apartNo').val();     
      var apartName = $('#apartName').val();
      var floorNo = $('#floorNo').val();
      var buildingName = $('#buildingName').val();
      var city = $('#city').val();
      var address = $('#address').val();
      var apartAreaSqFeet = $('#apartAreaSqFeet').val();
      var noOfRooms = $('#noOfRooms').val();
      var balcony = $('#balcony').prop("checked")

        let apartment = {
        
            "apartNo" : apartNo,
            "apartName" : apartName,
            "floorNo" : floorNo,
            "buildingName" : buildingName,
            "address" : address,
            "city": city,
            "apartAreaSqFeet" : apartAreaSqFeet,
            "noOfRooms": noOfRooms,
            "balcony": balcony
        }

        
      validation(apartment);
      callInsertApi(apartment);
 
   })
//end of the profile creation module 

//validations
$(document).on('change','#apartNo', function(){
  $('#apartNoSpan').html('')
})
$(document).on('change','#apartName', function(){
  $('#apartNameSpan').html('')
})
$(document).on('change','#floorNo', function(){
  $('#floorNoSpan').html('')
})
$(document).on('change','#buildingName', function(){
  $('#buildingNameSpan').html('')
})
$(document).on('change','#city', function(){
  $('#citySpan').html('')
})
$(document).on('change','#address', function(){
  $('#addressSpan').html('')
})
$(document).on('change','#apartAreaSqFeet', function(){
  $('#apartAreaSqFeetSpan').html('')
})
$(document).on('change','#noOfRooms', function(){
  $('#noOfRoomsSpan').html('')
})


function validation(apartment){
  var msg = 'Field must not be empty!'
  console.log(apartment)
  if(apartment.apartNo == ""){
    $('#apartNoSpan').html(msg)
  }
  if(apartment.apartName == ""){
    $('#apartNameSpan').html(msg)
  }
  if(apartment.floorNo == ""){
    $('#floorNoSpan').html(msg)
  }
  if(apartment.buildingName == ""){
    $('#buildingNameSpan').html(msg)
  }
  if(apartment.city == ""){
    $('#citySpan').html(msg)
  }
  if(apartment.address == ""){
    $('#addressSpan').html(msg)
  }
  if(apartment.apartAreaSqFeet == ""){
    $('#apartAreaSqFeetSpan').html(msg)
  }
  if(apartment.noOfRooms == ""){
    $('#noOfRoomsSpan').html(msg)
  }

}

function callInsertApi(apartment){
  if(apartment.apartNo != "" && apartment.apartName != "" && apartment.floorNo != "" && apartment.buildingName != "" && apartment.city != "" && apartment.address != "" && apartment.apartAreaSqFeet != "" && apartment.noOfRooms != ""){

    $.post(`${path}/apartment`, apartment, function(data, status){
      if(data){
        alert('Successfully Submitted!')
        location.reload()
      }
      
    })
    
  }
}


//get apartment
$(document).ready(function(){
   $.get(`${path}/apartment`, function(data, status){
      allApartments = data;
      data.forEach(apartment => {
        if(apartment.balcony == true){
          apartment.balcony = "Yes"
        }
        else{
          apartment.balcony = "No"
        }

         const html = `<tr  id = ${apartment._id} class= 'apartRow'><td>${apartment.apartNo}</td><td>${apartment.apartName}</td><td>${apartment.floorNo}</td><td>${apartment.buildingName}</td><td>${apartment.address}</td><td>${apartment.city}</td><td>${apartment.apartAreaSqFeet}</td><td>${apartment.noOfRooms}</td><td>${apartment.balcony}</td></tr>`

         $('#mytable').append(html)


      });


   })
})
//end of module

//select the row
$(document).on('click','tr.apartRow', function(){
   $(".contra").removeClass("contra");
   $(this).closest('tr').addClass("contra");
     apartId = $(this).closest('tr').attr('id');

    //  alert(apartId)

     allApartments.map((apart)=>{
      if(apart._id === apartId ){
        $('#apartNo').val(apart.apartNo);     
        $('#apartName').val(apart.apartName);
        $('#floorNo').val(apart.floorNo);
        $('#buildingName').val(apart.buildingName);
        $('#city').val(apart.city);
        $('#address').val(apart.address);
        $('#apartAreaSqFeet').val(apart.apartAreaSqFeet);
        $('#noOfRooms').val(apart.noOfRooms);
      // alert(apart.balcony)
      
        if(apart.balcony == "Yes"){
          $("input:checkbox").prop('checked', true);
        }
        else{
          $("input:checkbox").prop('checked', false);
        }

        
   }
 })

});
//end module

//Delete Apartment 
$('#delApart').click(function(e){
   e.preventDefault();
   if(!apartId){
     alert('First select the Apartment ')
   }else{
      $.post(`${path}/apartment/del/${apartId}`,'');
      alert("Deleted SuccessFully")
   location.reload()
   }
   
})
//end of delete profile module

// Edit profile
$("#editApart").click(function(e){
   e.preventDefault();
   if(!apartId){
      alert('First select the Apartment')
   }else{
    e.preventDefault()
    var apartNo = $('#apartNo').val();     
    var apartName = $('#apartName').val();
    var floorNo = $('#floorNo').val();
    var buildingName = $('#buildingName').val();
    var city = $('#city').val();
    var address = $('#address').val();
    var apartAreaSqFeet = $('#apartAreaSqFeet').val();
    var noOfRooms = $('#noOfRooms').val();
    var balcony = $('#balcony').prop("checked")

      let apartment = {
      
          "apartNo" : apartNo,
          "apartName" : apartName,
          "floorNo" : floorNo,
          "buildingName" : buildingName,
          "address" : address,
          "city": city,
          "apartAreaSqFeet" : apartAreaSqFeet,
          "noOfRooms": noOfRooms,
          "balcony": balcony
      }

      
    validation(apartment);
     callEditApi(apartment);


   }  
})


function callEditApi(apartment){
  if(apartment.apartNo != "" && apartment.apartName != "" && apartment.floorNo != "" && apartment.buildingName != "" && apartment.city != "" && apartment.address != "" && apartment.apartAreaSqFeet != "" && apartment.noOfRooms != ""){

    $.post(`${path}/apartment/edit/${apartId}`, apartment, function(data, status){
      if(data){
        alert('Successfully Submitted!')
        location.reload()
      }  
    })
    
  }
}
