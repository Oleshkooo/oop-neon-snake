/// Speed
//Super Slow Speed
$(document).on("click", "#speed1", function () {
  $("#speed1").addClass("active");
  $("#speed2").removeClass("active");
  $("#speed3").removeClass("active");
  $("#speed4").removeClass("active");
  $("#speed5").removeClass("active");
  step = 6.5;
});
//Low Speed
$(document).on("click", "#speed2", function () {
  $("#speed1").removeClass("active");
  $("#speed2").addClass("active");
  $("#speed3").removeClass("active");
  $("#speed4").removeClass("active");
  $("#speed5").removeClass("active");
  speed = 5.5;
});
//Normal Speed
$(document).on("click", "#speed3", function () {
  $("#speed1").removeClass("active");
  $("#speed2").removeClass("active");
  $("#speed3").addClass("active");
  $("#speed4").removeClass("active");
  $("#speed5").removeClass("active");
  step = 4;
});
//High Speed
$(document).on("click", "#speed4", function () {
  $("#speed1").removeClass("active");
  $("#speed2").removeClass("active");
  $("#speed3").removeClass("active");
  $("#speed4").addClass("active");
  $("#speed5").removeClass("active");
  step = 2.5;
});
//Impossible Speed
$(document).on("click", "#speed5", function () {
  $("#speed1").removeClass("active");
  $("#speed2").removeClass("active");
  $("#speed3").removeClass("active");
  $("#speed4").removeClass("active");
  $("#speed5").addClass("active");
  step = 1.5;
});



///Food
//1 berry
$(document).on("click", "#food1", function () {
  $("#food1").addClass("active");
  $("#food2").removeClass("active");
  $("#food3").removeClass("active");
  foodNum = 1;
});
//2 berrys
$(document).on("click", "#food2", function () {
  $("#food1").removeClass("active");
  $("#food2").addClass("active");
  $("#food3").removeClass("active");
  foodNum = 2;
});
//3 berrys
$(document).on("click", "#food3", function () {
  $("#food1").removeClass("active");
  $("#food2").removeClass("active");
  $("#food3").addClass("active");
  foodNum = 3;
});



/// Trigger
//Goto Skins
$(document).on("click", "#goto-skins", function () {
  $("#food").addClass("hidden");
  $("#skins").removeClass("hidden");
});

//Goto Food
$(document).on("click", "#goto-food", function () {
  $("#skins").addClass("hidden");
  $("#food").removeClass("hidden");
});



/// Skins
//Skin 1 - Default
$(document).on("click", "#skin1", function () {
  $("#skin1").addClass("active");
  $("#skin2").removeClass("active");
  $("#skin3").removeClass("active");
  skin = 1;
  $("#canvas-flex").addClass("color-pink");
  $("#canvas-flex").removeClass("color-blue");
  $("#canvas-flex").removeClass("color-red");
});
//Skin 2 - Blue
$(document).on("click", "#skin2", function () {
  $("#skin1").removeClass("active");
  $("#skin2").addClass("active");
  $("#skin3").removeClass("active");
  skin = 2;
  $("#canvas-flex").removeClass("color-pink");
  $("#canvas-flex").addClass("color-blue");
  $("#canvas-flex").removeClass("color-red");
});
//Skin 3 - Red
$(document).on("click", "#skin3", function () {
  $("#skin1").removeClass("active");
  $("#skin2").removeClass("active");
  $("#skin3").addClass("active");
  skin = 3;
  $("#canvas-flex").removeClass("color-pink");
  $("#canvas-flex").removeClass("color-blue");
  $("#canvas-flex").addClass("color-red");
});