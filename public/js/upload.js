$("#vendor-upload").on("click", function(){
    $("#panel-header").html("<span class='glyphicon glyphicon-cloud-upload'></span>Upload Vendor File");
    $(this).hide();
    $("#order-form").hide();
    $("#vendor-form").show();
    $("#order-upload").show();
});

$("#order-upload").on("click", function(){
    $("#panel-header").html("<span class='glyphicon glyphicon-cloud-upload'></span>Upload Order File");
    $(this).hide();
    $("#vendor-form").hide();    
    $("#order-form").show();
    $("#vendor-upload").show();    
});

