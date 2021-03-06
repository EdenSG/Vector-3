// (function() {
var app = angular.module('game', []);

/*

This is a remake of the Vector 3 game in the form of a web app, originally created by Greg Costikyan.
Like the original, This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License, the terms of which maybe found here: https://creativecommons.org/licenses/by-nc/4.0/.

*/

function ctrl($scope) {
    $scope.decrement = function(item) {
        item.count -= 1;
    }
}


var accelLevel = [0, 0]; // Tech levels
var laserLevel = [0, 0];

var ShipPoints = [48, 48]; // Ship points

var vpoints = [0, '<marquee scrollamount="820">AAAAAARRRRRRGGGGGG!</marquee>']; // Victory points

var sixpodShip = 16;
var ninepodShip = 32;
var twelvepodShip = 48;


function Player(name) {
    this.name = name;
    this.accelLevel = 0;
    this.laserLevel = 0;
    this.shipPoints = 48;
    this.victoryPoints = 0;
    this.ships = [];
    this.chosen = false;
    this.setLevels = function(accel, las) {
        this.accelLevel = accel;
        this.laserLevel = las;
        if (this.chosen === false) {
            panel1count--;
            angular.element($('#panel1')).scope().techCtrl.showNext();
            this.chosen = true;
        }
    };
}

function Ship(pods) {
    this.size = pods.length;
    this.pods = pods;
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.momentum = {
        x: 0,
        y: 0,
        z: 0
    };
    this.accel = {
        x: 0,
        y: 0,
        z: 0
    };
    this.alive = true;
}

function Pod(type) {
    this.type = type;
    this.alive = true;
}

var products = {
    sixpod: {
        cost: 16 + 2
    },
    ninepod: {
        cost: 32 + 4
    },
    twelvepod: {
        cost: 48 + 8
    },
    cargo: {
        cost: 1
    },
    cabin: {
        cost: 2
    },
    laser: {
        cost: 4
    }
};
players = [];
playerCount = 0;
// players[0] = new Player("bob");
// players[1] = new Player("fred");
// players[2] = new Player("george");

var panel1count = players.length;

app.controller('PlayerInitController', ['$scope', function($scope) {
    this.playerName = "";
    this.playerMessage = "Add player";
    this.players = players;
    this.addPlayer = function(pname) {
        this.players[playerCount] = (new Player(pname));
        playerCount++;
        this.playerName = "";
        this.playerMessage = "Add another player";
        players = this.players;
    };
}]).directive('shipSelect', function() {
    return {
        restrict: 'E',
        templateUrl: 'ship-select.html'
    };
});

app.controller('ShipStoreController', ["$scope", function($scope) {
    this.ships = ships;
    this.players = players;
    this.products = products;
    this.sixCost = 18;
    this.nineCost = 36;
    this.recalculateCosts = function() {
        // $scope.
    };
    this.buyShip = function(player, pod1, pod2, pod3, pod4) {
        player.ships.push(new Ship([
            new Pod(pod1),
            new Pod(pod2),
            new Pod(pod3),
            new Pod(pod4),
            ]));
        players[player].ships.push(player.ships);
    };
}]);
app.controller('TechPointsController', function() {
    this.ships = ships;
    this.players = players;
    // this.count = panel1count;
    this.shouldShowNext = false;
    this.showNext = function() {
        if (panel1count <= 0) {
            this.shouldShowNext = true;
        };
    }
});
// })();

// Costs (not used at the moment...)
var cargo = 1;
var cabin = 2;
var laser = 4;
var launch = 5;
var Screen = 8;
var tp = 6;
var gt = 2;
var ut = 1;
var m = 0.5;

var sixCost = 18; // Minimum cost of a 6-pod ship
var nineCost = 36; // Minimum cost of a 9-pod ship

var purchaseMessage = "";

var buttonsClicked = 0; // Count the number of buttons in the first screen when this == 2

function purchase(size) {
    if (size === 6) {
        var maxCost = sixCost;
        var attemptBuyCost = parseInt($("table select").eq(0).val()) + parseInt($("table select").eq(1).val());
        if (attemptBuyCost > sixCost) {
            angular.element($('#shipStore')).scope().shipstore.notification = "You have selected items that cost too much!";

        } else {
            angular.element($('#shipStore')).scope().shipstore.notification = "Pods successfully purchased!";
        }
    } else if (size === 9) {
        var maxCost = nineCost;
        var attemptBuyCost = parseInt($("table select").eq(0).val()) + parseInt($("table select").eq(1).val());
        if (attemptBuyCost > sixCost) {
            purchaseMessage = "You have selected items that cost too much!";
            $("#nine-pod-select").after(purchaseMessage);
        } else {
            purchaseMessage = "Pods successfully purchased!";
        }
    }
}

// var p0ships = new Array(); // Player 0's multidimensional array of ships.
// var p0shipsval = 0; // The first dimension contains the separate ships (ie. [0] is the first ship, [1] is the second, etc.).
// // The second dimension contains the ship-specific variables: destroyed, position, acceleration, pods.
// // [ship][0] contains the pods. 1=Cargo, 2=Cabin, 4=Laser.

// var p1ships = new Array();
// var p1shipsval = 0;


// $(document).ready(function() {

//     players[0] = new Player();

//     $('#sp1').text('Ship Points remaining: ' + ShipPoints[1]); // I don't know why it doesn't quite work without this, but it doesn't.
//     $('#start').click(function() { // Start off with the start button hidden. Start the 'click' event listener.
//         $(this).css('display', 'none'); // Hide button when clicked
//         $('#end').css('display', 'inherit'); // Show the End Game button
//         $('#results').remove(); // Remove the Game Results (if they exist)
//     });

//     $('*').removeAttr('disabled').trigger('change'); // Un-disable anything that shouldn't start disabled
//     // These check to see when one of the buttons about starting tech levels is clicked. When it is, both it and the other button for that player are disabled.
//     $('button[name="1"]').click(function() {
//         accelLevel[0] = 2; // Set Acceleration tech level
//         laserLevel[0] = 2; // Set Laser tech level
//         $('button[name="1"]').attr('disabled', '');
//         $('button[name="2"]').attr('disabled', '').addClass('secondary');
//         buttonsClicked++; // Increment the counter
//         removeFirstThing(); // A function that closes the dialog and opens the next one.
//     });
//     $('button[name="2"]').click(function() {
//         accelLevel[0] = 1; // Set Acceleration tech level
//         laserLevel[0] = 3; // Set Laser tech level
//         $('button[name="1"]').attr('disabled', '').addClass('secondary');
//         $('button[name="2"]').attr('disabled', '');
//         buttonsClicked++;
//         removeFirstThing();
//     });
//     $('button[name="3"]').click(function() {
//         accelLevel[1] = 2; // Set Acceleration tech level
//         laserLevel[1] = 2; // Set Laser tech level
//         $('button[name="3"]').attr('disabled', '');
//         $('button[name="4"]').attr('disabled', '').addClass('secondary');
//         buttonsClicked++;
//         removeFirstThing();
//     });
//     $('button[name="4"]').click(function() {
//         accelLevel[1] = 1; // Set Acceleration tech level
//         laserLevel[1] = 3; // Set Laser tech level
//         $('button[name="3"]').attr('disabled', '').addClass('secondary');
//         $('button[name="4"]').attr('disabled', '');
//         buttonsClicked++;
//         removeFirstThing();
//     });

//     // When one of the select boxes is changed, calculate and update the cost of the ship.
//     $('.initships0 .six-pod select').change(function(event) {
//         var sixvalues = $('.six-pod select option:selected');
//         sixCost = 16 + parseInt($('.six-pod select option:selected:first').attr('data-cost'));
//         sixCost = sixCost + parseInt($('.six-pod select option:selected:last').attr('data-cost'));
//         $('.initships0 .six-pod-cost').text(sixCost + ' Ship Points');
//     });
//     $('.initships0 .nine-pod select').change(function(event) {
//         var ninevalues = $('.initships0 .nine-pod select option:selected');
//         nineCost = 32 + parseInt($('.initships0 .nine-pod select option:selected').eq(0).attr('data-cost'));
//         nineCost = nineCost + parseInt($('.initships0 .nine-pod select option:selected').eq(1).attr('data-cost'));
//         nineCost = nineCost + parseInt($('.initships0 .nine-pod select option:selected').eq(2).attr('data-cost'));
//         nineCost = nineCost + parseInt($('.initships0 .nine-pod select option:selected').eq(3).attr('data-cost'));
//         $('.initships0 .nine-pod-cost').text(nineCost + ' Ship Points');
//     });

//     // ALWAYS check to see if the player can afford the ship(s). If not, disable the Purchase button.
//     $('body').keydown(function() {
//         CanBuyShips();
//     });
//     $('body').click(function() {
//         CanBuyShips();
//     });

//     // First, subtract the cost of the pending ship from the player's ship points and update number shown. Then, create new ship in p0ships array to correspond to ship purchased.
//     $('.initships0 #six-pod-select').click(function(event) {
//         ShipPoints[0] -= sixCost;
//         $('#sp0').text('Ship Points remaining: ' + ShipPoints[0]);
//         p0ships[p0shipsval] = new Array();
//         p0ships[p0shipsval][0] = [parseInt($('.initships0 .six-pod select option:selected:first').attr('data-cost')), parseInt($('.initships0 .six-pod select option:selected:last').attr('data-cost')), 2, 2, 2, 2];
//         p0shipsval++;
//     });
//     $('.initships0 #nine-pod-select').click(function(event) {
//         ShipPoints[0] -= nineCost;
//         $('#sp0').text('Ship Points remaining: ' + ShipPoints[0]);
//         p0ships[p0shipsval] = new Array();
//         p0ships[p0shipsval][0] = [parseInt($('.initships0 .nine-pod select option:selected').eq(0).attr('data-cost')), parseInt($('.initships0 .nine-pod select option:selected').eq(1).attr('data-cost')), parseInt($('.initships0 .nine-pod select option:selected').eq(2).attr('data-cost')), parseInt($('.initships0 .nine-pod select option:selected').eq(3).attr('data-cost')), 2, 2, 2, 2, 2];
//         p0shipsval++;
//     });




//     // When one of the select boxes is changed, calculate and update the cost of the ship.
//     $('.initships1 .six-pod select').change(function(event) {
//         var sixvalues = $('.initships1 .six-pod select option:selected');
//         sixCost = 16 + parseInt($('.initships1 .six-pod select option:selected:first').attr('data-cost'));
//         sixCost = sixCost + parseInt($('.initships1 .six-pod select option:selected:last').attr('data-cost'));
//         $('.initships1 .six-pod-cost').text(sixCost + ' Ship Points');
//     });
//     $('.initships1 .nine-pod select').change(function(event) {
//         var ninevalues = $('.initships1 .nine-pod select option:selected');
//         nineCost = 32 + parseInt($('.initships1 .nine-pod select option:selected').eq(0).attr('data-cost'));
//         nineCost = nineCost + parseInt($('.initships1 .nine-pod select option:selected').eq(1).attr('data-cost'));
//         nineCost = nineCost + parseInt($('.initships1 .nine-pod select option:selected').eq(2).attr('data-cost'));
//         nineCost = nineCost + parseInt($('.initships1 .nine-pod select option:selected').eq(3).attr('data-cost'));
//         $('.initships1 .nine-pod-cost').text(nineCost + ' Ship Points');
//     });


//     // First, subtract the cost of the pending ship from the player's ship points and update number shown. Then, create new ship in p1ships array to correspond to ship purchased.
//     $('.initships1 #six-pod-select').click(function(event) {
//         ShipPoints[1] -= sixCost;
//         $('#sp1').text('Ship Points remaining: ' + ShipPoints[1]);
//         p1ships[p1shipsval] = new Array();
//         p1ships[p1shipsval][0] = [parseInt($('.initships1 .six-pod select option:selected:first').attr('data-cost')), parseInt($('.initships1 .six-pod select option:selected:last').attr('data-cost')), 2, 2, 2, 2];
//         p1shipsval++;
//     });
//     $('.initships1 #nine-pod-select').click(function(event) {
//         ShipPoints[1] -= nineCost;
//         $('#sp1').text('Ship Points remaining: ' + ShipPoints[1]);
//         p1ships[p1shipsval] = new Array();
//         p1ships[p1shipsval][0] = [parseInt($('.initships1 .nine-pod select option:selected').eq(0).attr('data-cost')), parseInt($('.initships1 .nine-pod select option:selected').eq(1).attr('data-cost')), parseInt($('.initships1 .nine-pod select option:selected').eq(2).attr('data-cost')), parseInt($('.initships1 .nine-pod select option:selected').eq(3).attr('data-cost')), 2, 2, 2, 2, 2];
//         p1shipsval++;
//     });


//     $('#done0').click(function(event) {
//         $('.initships0').css({ // Then hide them...
//             'transform': 'translate(-200%, 0%)',
//             '-webkit-transform': 'translate(-200%, 0%)'
//         });
//         $('.initships1').css({ // And show the next dialog.
//             'transform': 'translate(-100%, 0%)',
//             '-webkit-transform': 'translate(-100%, 0%)'
//         });
//     });
//     $('#done1').click(function(event) {
//         $('.initships1').css({ // Then hide them...
//             'transform': 'translate(-200%, 0%)',
//             '-webkit-transform': 'translate(-200%, 0%)'
//         });
//         $('.p0grid').css({ // Then hide them...
//             'transform': 'translate(-100%, 0%)',
//             '-webkit-transform': 'translate(-100%, 0%)'
//         });
//     });

//     // When the End Game button is pressed, show game results, hide End Game button, and show New Game button.
//     $('#end').click(function() {
//         $('#start').css('display', 'inherit');
//         $('body').append('<div id="results"><p>Player 1 VP: <span class="vp">' + vpoints[0] + '<p>Player 2 VP: <span class="vp">' + vpoints[1] + '</div>');
//         $(this).css('display', 'none');
//         if (vpoints[0] < vpoints[1]) {
//             $('#results').append('<p>You win!</p>');
//         } else if (vpoints[0] > vpoints[1]) {
//             $('#results').append('<p><i>You</i> win!</p>');
//         } else {
//             $('#results').append('<p>Nobody wins!</p>');
//         }
//     });
// });

// var removeFirstThing = function() {
//     if (buttonsClicked == 2) { // Check if two buttons have been pressed
//         setTimeout(function() { // Wait for a bit
//             $('.inittech').css({ // Then hide them...
//                 'transform': 'translate(-200%, 0%)',
//                 '-webkit-transform': 'translate(-200%, 0%)'
//             });
//             $('.initships0').css({ // And show the next dialog.
//                 'transform': 'translate(-100%, 0%)',
//                 '-webkit-transform': 'translate(-100%, 0%)'
//             });
//             $('#sp0').text('Ship Points remaining: ' + ShipPoints[0]); // Show the number of Ship Points.
//         }, 250);

//     }
// };

// var CanBuyShips = function() {
//     if (sixCost > ShipPoints[0]) {
//         $('.initships0 #six-pod-select').attr('disabled', 'disabled');
//         $('.initships0 .six-pod').css('opacity', '0.6');
//     } else {
//         $('.initships0 #six-pod-select').removeAttr('disabled');
//         $('.initships0 .six-pod').css('opacity', '1');
//     }
//     if (nineCost > ShipPoints[0]) {
//         $('.initships0 #nine-pod-select').attr('disabled', 'disabled');
//         $('.initships0 .nine-pod').css('opacity', '0.6');
//     } else {
//         $('.initships0 #nine-pod-select').removeAttr('disabled');
//         $('.initships0 .nine-pod').css('opacity', '1');
//     }
//     if (ShipPoints[0] < 48) {
//         $('#done0').removeClass('disabled has-tip').removeAttr('data-tooltip');
//     }
//     if (sixCost > ShipPoints[1]) {
//         $('.initships1 #six-pod-select').attr('disabled', 'disabled');
//         $('.initships1 .six-pod').css('opacity', '0.6');
//     } else {
//         $('.initships1 #six-pod-select').removeAttr('disabled');
//         $('.initships1 .six-pod').css('opacity', '1');
//     }
//     if (nineCost > ShipPoints[1]) {
//         $('.initships1 #nine-pod-select').attr('disabled', 'disabled');
//         $('.initships1 .nine-pod').css('opacity', '0.6');
//     } else {
//         $('.initships1 #nine-pod-select').removeAttr('disabled');
//         $('.initships1 .nine-pod').css('opacity', '1');
//     }
//     if (ShipPoints[1] < 48) {
//         $('#done1').removeClass('disabled has-tip').removeAttr('data-tooltip');
//     }

// };

function nextPage() {
    var currentPanel = $('section.current');
    var nextPanel = $('section.current').next();
    // currentPanel.removeClass('current').addClass('panel-left').nextAll().find('section').eq(0).removeClass('panel-right').addClass('current');
    currentPanel.removeClass('current').addClass('panel-left').next().removeClass('panel-right').addClass('current');
}
