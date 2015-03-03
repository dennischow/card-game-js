
var debug = true;

$(document).on('ready',function(e){
	cardGameMaster.init();
});

var cardGameMaster = {
	totalCard : 16,
	gameColor : [],
	gamePos : [],
	// cardCount : 0, 
	openedCount : 0,
	openedMax : 1,
	score : 0,
	root : null, 
	init : function(){
		this.root = $('#game-board');
		this.generateCard();
		this.engine();
		this.bindEvent();
	},
	generateCard : function(){
		for(var i=0; i<cardGameMaster.totalCard; i++){
			var listItem = $('<LI class="list-item" />');
			var cardOver = $('<SPAN class="card cover" />').appendTo( listItem );
			var cardContent = $('<SPAN class="card content" />').appendTo( listItem );
			$('.card-list',cardGameMaster.root).append( listItem );
		}
	},
	bindEvent : function(){
		$('.ui-btn.restart',cardGameMaster.root).on('click',function(e){
			location.reload();
		});

		$('.list-item',cardGameMaster.root).on('click',function(e){
			if( $(this).hasClass('opened') || $(this).hasClass('matched') ){
				return false;
			}

			var thisColor = $(this).data('cardNum');
			cardGameMaster.openedCount++;

			$(this).addClass('opened');
			cardGameMaster.matchTracking( thisColor );
		});
	},
	switchBack : function(){
		$('.list-item',cardGameMaster.root).removeClass('opened');
	},
	randomPos : function(){
		// Random number depence from to to total game color length. For now this keep increasing
		return Math.floor(Math.random() * cardGameMaster.gameColor.length);
	},
	engine : function(){
		// Game Color
		for(var i=0; i<(cardGameMaster.totalCard/2); i++){
			cardGameMaster.gamePos.push(i);
			cardGameMaster.gamePos.push(i);
		}

		// cardGameMaster.cardCount = cardGameMaster.gamePos.length;

		// if(debug) console.log( 'CardCount : ' + cardGameMaster.cardCount );
		if(debug) console.log( 'Game Color : ' + cardGameMaster.gameColor );
		if(debug) console.log( 'Game Pos : ' + cardGameMaster.gamePos );

		// Assign Position
		for(var i=0; i<cardGameMaster.totalCard; i++){
			var randomNum = cardGameMaster.randomPos();

			// Add to
			cardGameMaster.gameColor.splice( randomNum, 0, cardGameMaster.gamePos[i] ); // index, replace, add in
		}

		if(debug) console.log( 'Game Color : ' + cardGameMaster.gameColor );
		if(debug) console.log( 'Game Pos : ' + cardGameMaster.gamePos );

		// Assigning number to each Card
		$('.list-item',cardGameMaster.root).each(function(i,e){
			$(this).data('cardNum', cardGameMaster.gameColor[i]); // Store Number in behidd
		});

	},
	matchTracking : function(num){

		// Two Card Informations
		if( $('.list-item.opened',cardGameMaster.root).length > 0 ){
			var cardOne = $('.list-item.opened', cardGameMaster.root).eq( 0 );
			var cardOneNum = cardOne.data('cardNum');

			var cardTwo = $('.list-item.opened', cardGameMaster.root).eq( 1 );
			var cardTwoNum = cardTwo.data('cardNum');

			// MATCHED
			if( cardOneNum == cardTwoNum ){
				cardGameMaster.score++;
				cardOne.addClass('matched').removeClass('opened');
				cardTwo.addClass('matched').removeClass('opened');
				$('.panel.user .container.details .score .number',cardGameMaster.root).text( cardGameMaster.score );
				if(debug) console.log( 'Matched : ' + cardOneNum + ' : ' + cardTwoNum );
			}
		}

		// Only Two Card Each Time
		if( cardGameMaster.openedCount > cardGameMaster.openedMax ){
			cardGameMaster.openedCount = 0;
			setTimeout(function(){
				cardGameMaster.switchBack();
			},200);
		}
		if(debug) console.log( num );
		if(debug) console.log( cardGameMaster.openedCount );

		if( cardGameMaster.score >= cardGameMaster.totalCard / 2 ){
			alert( '好球! SMART MUTHAFUCKA' );
			return false;
		}

	}

}


