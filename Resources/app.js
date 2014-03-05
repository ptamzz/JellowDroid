/*
 * Copyright Jellow Project at IDC, IIT Bombay
 * 
 * Licence: 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 *  modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//Constants declaration
var mainButtonState = null, //Set Main Button State
	actionButtonState = null,	//Which action button is currently active
	mainBtn = [], btn = [],	//button array declarations 
	inside = false, whichView = null, mainWhichBtn = null,
	temp = 1,					//Variable use to identify the current state of a button
	audio, win, mainHolderLeft, mainHolderRight, scrollView, centerButtons, homeButtonView, hmeBtn,	//View Global variables
	sideHolderWidth = 200, btnSize = 100, btnGap = 70;


//On device orientation change
	/* Ti.Gesture.addEventListener('orientationchange', function(e) {
		//Regenerate UI to accommodate new screen width-height on orientation change
		generateUI(true);
	}); */


//Main Windows & Views
	
	// create base UI tab and root window
	var win = Ti.UI.createWindow({  
	    title:'Jellow',
	    backgroundColor:'#fff',
	    top: 0,
	    left: 0,
	    type: 'bg',
	    backgroundImage:'images/background.jpg',
	    orientationModes : [
	        Titanium.UI.LANDSCAPE_LEFT
	    ]
	});

	//Main Views: Child to "win" window
		//Left Main Menu
		var mainHolderLeft = Ti.UI.createView({
			width: sideHolderWidth,
			height: 'auto',
			zIndex: 1,
			type: 'bg',
			//backgroundColor: '#CCC',
			left: 0
		});
		
		//Right Main Menu
		var mainHolderRight = Ti.UI.createView({
			width: sideHolderWidth,
			height: 'auto',
			type: 'bg',
			zIndex: 1
		});
		
		//ScrollView Holder
		var scrollView = Ti.UI.createScrollView({ 
			contentHeight: 'auto',
			top:0,
			showVerticalScrollIndicator:true, 
			showHorizontalScrollIndicator:true,
		});
		
		//Scrolling view: Buttons at the center
		var centerButtons = Ti.UI.createView({ 
			height: 'auto',
			left: sideHolderWidth+100,
			top:10,
			type: 'bg',
			zIndex: 5
		});
		
		var homeButtonView = Ti.UI.createView({
			height: btnSize+20,
			width: btnSize+20,
			bottom: btnSize,
			zIndex: 10
		});
		
			//HomeButton
			//Creating each button
			var hmeBtn  = Titanium.UI.createImageView({
				image:  'images/main_buttons/home.png',
				height: btnSize,
				width: btnSize,
				left: 10,
				title : 'goHome',
				type: 'action',
				value: 1
			});
			
			homeButtonView.add(hmeBtn);
			
			

 //Include Buttons & Function files
	Ti.include("buttons.js");
	Ti.include("functions.js");
	
//Generate UI
	generateUI(false);

//At click event identify which sound to play & plays it
	win.addEventListener('click', function(e){
		
		/*
		 var result = mainButtons.filter(function(o) {
		    return o.title === "Like";
		});
		
		var path = result.length ? result[0].path : null;
		
		Ti.API.info("Result: " + path);
		*/
		
		
	
		 // If click is not in one of the background views
		if (e.source.type != 'bg') {	
		
			//Get which button the user clicked
			var whichView = e.source.title;
			
			if(e.source.type == 'main'){
				
				//User clicked on any of the main buttons
				switch(whichView){
					case 'Like':
						setMainBtnState(e, 1, 2);
						break;
					
					case 'Yes':
						setMainBtnState(e, 7, 8);
						break;
					
					case 'More':
						setMainBtnState(e, 13, 14);
						break;
					
					case 'DontLike':
						setMainBtnState(e, 4, 5);
						break;
					
					case 'No':
						setMainBtnState(e, 10, 11);
						break;
					
					case 'Less':
						setMainBtnState(e, 16, 17);
						break;
					
					default:
						//Catch outlier
						mainButtonState = null;
				}
				
				temp = 1;	//Reseting button state for action buttons
		
			} else if (e.source.type == 'action'){
				//User clicked on any of the action buttons (center buttons)
				
				//Registering Button State & resetting it to new state
				switch(whichView){
					case 'Learning':
						setButtonState(e, 19, learningButtons);
						actionButtonState = 19;
						break;
						
					case 'Eating':
						setButtonState(e, 20, eatingButtons);
						actionButtonState = 20;
						break;
						
					case 'Play':
						setButtonState(e, 21, playButtons);
						actionButtonState = 21;
						break;
						
					case 'People':
						setButtonState(e, 22, peopleButtons);
						actionButtonState = 22;
						break;
						
					case 'Other':			
						setButtonState(e, 23, othersButtons);
						actionButtonState = 23;
						break;
						
					case 'Animals':
						setButtonState(e, 24, animalsButtons);
						actionButtonState = 24;
						break;
						
					case 'Body':
						setButtonState(e, 25, bodyButtons);
						actionButtonState = 25;
						break;
						
					case 'Books':
						setButtonState(e, 26, booksButtons);
						actionButtonState = 26;
						break;
						
					case 'Colors':
						setButtonState(e, 27, colorsButtons);
						actionButtonState = 27;
						break;
					
					case 'HomeObjects':
						setButtonState(e, 28, homeObjectsButtons);
						actionButtonState = 28;
						break;
						
					case 'Shapes':
						setButtonState(e, 29, shapesButtons);
						actionButtonState = 29;
						break;
						
					case 'Stationery':
						setButtonState(e, 30, stationaryButtons);
						actionButtonState = 30;
						break;
						
					case 'Ant':
						setButtonState(e, 31, 1);
						actionButtonState = 31;
						break;
						
					case 'Cat':
						setButtonState(e, 32, 1);
						actionButtonState = 32;
						break;
						
					case 'Cockroach':
						setButtonState(e, 33, 1);
						actionButtonState = 33;
						break;
					
					case 'Dog':
						setButtonState(e, 34, 1);
						actionButtonState = 34;
						break;
						
					case 'Fly':
						setButtonState(e, 35, 1);
						actionButtonState = 35;
						break;
						
					case 'Mosquito':
						setButtonState(e, 36, 1);
						actionButtonState = 36;
						break;
						
					//Body Buttons
					case 'Ears':
						setButtonState(e, 37, 1);
						actionButtonState = 37;
						break;
						
					case 'Eyes':
						setButtonState(e, 38, 1);
						actionButtonState = 38;
						break;
						
					case 'Fingers':
						setButtonState(e, 39, 1);
						actionButtonState = 39;
						break;
						
					case 'Hair':
						setButtonState(e, 40, 1);
						actionButtonState = 40;
						break;
						
					case 'Hand':
						setButtonState(e, 41, 1);
						actionButtonState = 41;
						break;
						
					case 'Head':
						setButtonState(e, 42, 1);
						actionButtonState = 42;
						break;
					
					case 'Legs':
						setButtonState(e, 43, 1);
						actionButtonState = 43;
						break;
						
					case 'Mouth':
						setButtonState(e, 44, 1);
						actionButtonState = 44;
						break;
						
					case 'Stomach':
						setButtonState(e, 45, 1);
						actionButtonState = 45;
						break;
						
					//Books Buttons
					case 'BedTimeStories':
						setButtonState(e, 46, 1);
						actionButtonState = 46;
						break;
						
					case 'Comics':
						setButtonState(e, 47, 1);
						actionButtonState = 47;
						break;
						
					case 'DrawingBook':
						setButtonState(e, 48, 1);
						actionButtonState = 48;
						break;
						
					case 'Maths':
						setButtonState(e, 49, 1);
						actionButtonState = 49;
						break;
					
					case 'RhymesBook':
						setButtonState(e, 50, 1);
						actionButtonState = 50;
						break;
						
					case 'SchoolNotebook':
						setButtonState(e, 51, 1);
						actionButtonState = 51;
						break;
						
					case 'Words':
						setButtonState(e, 52, 1);
						actionButtonState = 52;
						break;
					
					//Colors
					case 'Black':
						setButtonState(e, 53, 1);
						actionButtonState = 53;
						break;
					
					case 'Blue':
						setButtonState(e, 54, 1);
						actionButtonState = 54;
						break;
					
					case 'Brown':
						setButtonState(e, 55, 1);
						actionButtonState = 55;
						break;
					
					case 'Golden':
						setButtonState(e, 56, 1);
						actionButtonState = 56;
						break;
					
					case 'Green':
						setButtonState(e, 57, 1);
						actionButtonState = 57;
						break;
					
					
					case 'Red':
						setButtonState(e, 58, 1);
						actionButtonState = 58;
						break;
					
					case 'Silver':
						setButtonState(e, 59, 1);
						actionButtonState = 59;
						break;
					
					case 'White':
						setButtonState(e, 60, 1);
						actionButtonState = 60;
						break;
					
					case 'Yellow':
						setButtonState(e, 61, 1);
						actionButtonState = 61;
						break;
					
					//Home Objects
					case 'Chair':
						setButtonState(e, 62, 1);
						actionButtonState = 62;
						break;
					
					case 'Door':
						setButtonState(e, 63, 1);
						actionButtonState = 63;
						break;
					
					case 'Fan':
						setButtonState(e, 64, 1);
						actionButtonState = 64;
						break;
					
					case 'Kitchen':
						setButtonState(e, 65, 1);
						actionButtonState = 65;
						break;
					
					case 'Sofa':
						setButtonState(e, 66, 1);
						actionButtonState = 66;
						break;
					
					case 'Table':
						setButtonState(e, 67, 1);
						actionButtonState = 67;
						break;
					
					case 'Toilet':
						setButtonState(e, 68, 1);
						actionButtonState = 68;
						break;
					
					case 'Window':
						setButtonState(e, 69, 1);
						actionButtonState = 69;
						break;
					
					//Shapes
					case 'Circle':
						setButtonState(e, 70, 1);
						actionButtonState = 70;
						break;
					
					case 'Freeform':
						setButtonState(e, 71, 1);
						actionButtonState = 71;
						break;
					
					case 'Line':
						setButtonState(e, 72, 1);
						actionButtonState = 72;
						break;
					
					case 'Rectangle':
						setButtonState(e, 73, 1);
						actionButtonState = 73;
						break;
					
					case 'Square':
						setButtonState(e, 74, 1);
						actionButtonState = 74;
						break;
					
					case 'Triangle':
						setButtonState(e, 75, 1);
						actionButtonState = 75;
						break;
						
					//Stationeries
					case 'BlankPaper':
						setButtonState(e, 76, 1);
						actionButtonState = 76;
						break;
					
					case 'ColoredPaper':
						setButtonState(e, 77, 1);
						actionButtonState = 77;
						break;
					
					case 'Crayons':
						setButtonState(e, 78, 1);
						actionButtonState = 78;
						break;
					
					case 'Eraser':
						setButtonState(e, 79, 1);
						actionButtonState = 79;
						break;
					
					case 'Pen':
						setButtonState(e, 80, 1);
						actionButtonState = 80;
						break;
					
					case 'Pencil':
						setButtonState(e, 81, 1);
						actionButtonState = 1;
						break;
					
					case 'Pouch':
						setButtonState(e, 82, 1);
						actionButtonState = 82;
						break;
					
					case 'Scale':
						setButtonState(e, 83, 1);
						actionButtonState = 3;
						break;
					
					case 'Sharpener':
						setButtonState(e, 84, 1);
						actionButtonState = 84;
						break;
					
				//Eating Buttons
					case 'AddOns':
						setButtonState(e, 85, addOnsButtons);
						actionButtonState = 85;
						break;
					
					case 'Beverages':
						setButtonState(e, 86, beveragesButtons);
						actionButtonState = 86;
						break;
					
					case 'Breakfast':
						setButtonState(e, 87, breakfastButtons);
						actionButtonState = 87;
						break;
					
					case 'Cutlery':
						setButtonState(e, 88, cutleryButtons);
						actionButtonState = 88;
						break;
					
					case 'Dinner':
						setButtonState(e, 89, mealButtons);
						actionButtonState = 89;
						break;
					
					case 'Fruit':
						setButtonState(e, 90, fruitsButtons);
						actionButtonState = 90;
						break;
					
					case 'Lunch':
						setButtonState(e, 91, mealButtons);
						actionButtonState = 91;
						break;
					
					case 'Snacks':
						setButtonState(e, 92, snacksButtons);
						actionButtonState = 92;
						break;
						
					//AddOns
					case 'Butter':
						setButtonState(e, 93, 1);
						actionButtonState = 93;
						break;
					
					case 'Jam':
						setButtonState(e, 94, 1);
						actionButtonState = 94;
						break;
					
					case 'Masala':
						setButtonState(e, 95, 1);
						actionButtonState = 95;
						break;
					
					case 'Pepper':
						setButtonState(e, 96, 1);
						actionButtonState = 96;
						break;
					
					case 'Pickle':
						setButtonState(e, 97, 1);
						actionButtonState = 97;
						break;
					
					case 'Salt':
						setButtonState(e, 98, 1);
						actionButtonState = 98;
						break;
					
					case 'Sauce':
						setButtonState(e, 99, 1);
						actionButtonState = 99;
						break;
					
					case 'Sugar':
						setButtonState(e, 100, 1);
						actionButtonState = 100;
						break;
						
					//Beverages
					case 'Juice':
						setButtonState(e, 101, 1);
						actionButtonState = 101;
						break;
					
					case 'Milk':
						setButtonState(e, 102, 1);
						actionButtonState = 102;
						break;
					
					case 'Milkshake':
						setButtonState(e, 103, 1);
						actionButtonState = 103;
						break;
					
					case 'Tea':
						setButtonState(e, 104, 1);
						actionButtonState = 104;
						break;
			
					//Breakfast
					case 'Bread':
						setButtonState(e, 105, 1);
						actionButtonState = 105;
						break;
					
					case 'Cornflakes':
						setButtonState(e, 106, 1);
						actionButtonState = 106;
						break;
					
					case 'Eggs':
						setButtonState(e, 107, 1);
						actionButtonState = 107;
						break;
					
					case 'Milk':
						setButtonState(e, 108, 1);
						actionButtonState = 108;
						break;
					
					case 'Porridge':
						setButtonState(e, 109, 1);
						actionButtonState = 109;
						break;
					
					case 'Rice':
						setButtonState(e, 110, 1);
						actionButtonState = 110;
						break;
						
					//Cutlery
					case 'Bowl':
						setButtonState(e, 111, 1);
						actionButtonState = 111;
						break;
					
					case 'Fork':
						setButtonState(e, 112, 1);
						actionButtonState = 112;
						break;
					
					case 'Glass':
						setButtonState(e, 113, 1);
						actionButtonState = 113;
						break;
					
					case 'Knife':
						setButtonState(e, 114, 1);
						actionButtonState = 114;
						break;
					
					case 'Plate':
						setButtonState(e, 115, 1);
						actionButtonState = 115;
						break;
					
					case 'Spoon':
						setButtonState(e, 116, 1);
						actionButtonState = 116;
						break;
			
					//Dinner, Lunch: Meal
					case 'Curd':
						setButtonState(e, 117, 1);
						actionButtonState = 117;
						break;
					
					case 'Curry':
						setButtonState(e, 118, 1);
						actionButtonState = 118;
						break;
					
					case 'Dal':
						setButtonState(e, 119, 1);
						actionButtonState = 119;
						break;
					
					case 'Khichdi':
						setButtonState(e, 120, 1);
						actionButtonState = 120;
						break;
					
					case 'NonVeg':
						setButtonState(e, 121, 1);
						actionButtonState = 121;
						break;
					
					case 'Pizza':
						setButtonState(e, 122, 1);
						actionButtonState = 122;
						break;
					
					case 'Rice':
						setButtonState(e, 123, 1);
						actionButtonState = 123;
						break;
					
					case 'Roti':
						setButtonState(e, 124, 1);
						actionButtonState = 124;
						break;
						
					//Fruit
					case 'Apple':
						setButtonState(e, 125, 1);
						actionButtonState = 125;
						break;
					
					case 'Banana':
						setButtonState(e, 126, 1);
						actionButtonState = 126;
						break;
					
					case 'Grapes':
						setButtonState(e, 127, 1);
						actionButtonState = 127;
						break;
					
					case 'Guava':
						setButtonState(e, 128, 1);
						actionButtonState = 128;
						break;
					
					case 'Mango':
						setButtonState(e, 129, 1);
						actionButtonState = 129;
						break;
					
					case 'Orange':
						setButtonState(e, 130, 1);
						actionButtonState = 130;
						break;
					
					case 'Pineapple':
						setButtonState(e, 131, 1);
						actionButtonState = 131;
						break;
					
					case 'Pomegranate':
						setButtonState(e, 132, 1);
						actionButtonState = 132;
						break;
					
					case 'Watermelon':
						setButtonState(e, 133, 1);
						actionButtonState = 133;
						break;
					
					//Lunch menu is same as dinner: check one set up
				
					//Fruit
					case 'Biscuits':
						setButtonState(e, 134, 1);
						actionButtonState = 134;
						break;
					
					case 'Chats':
						setButtonState(e, 135, 1);
						actionButtonState = 135;
						break;
					
					case 'Chocolate':
						setButtonState(e, 136, 1);
						actionButtonState = 136;
						break;
					
					case 'IceCream':
						setButtonState(e, 137, 1);
						actionButtonState = 137;
						break;
					
					case 'NonVeg':
						setButtonState(e, 138, 1);
						actionButtonState = 138;
						break;
					
					case 'Noodles':
						setButtonState(e, 139, 1);
						actionButtonState = 139;
						break;
					
					case 'Pasteries':
						setButtonState(e, 140, 1);
						actionButtonState = 140;
						break;
					
					case 'Sweets':
						setButtonState(e, 141, 1);
						actionButtonState = 141;
						break;
					
					case 'Wafers':
						setButtonState(e, 142, 1);
						actionButtonState = 142;
						break;
		
				//Play
					case 'Music':
						setButtonState(e, 143, musicButtons);
						actionButtonState = 143;
						break;
					
					case 'OutdoorGames':
						setButtonState(e, 144, outdoorGamesButtons);
						actionButtonState = 144;
						break;
					
					case 'Puzzles':
						setButtonState(e, 145, 1);
						actionButtonState = 145;
						break;
					
					case 'Toys':
						setButtonState(e, 146, toysButtons);
						actionButtonState = 146;
						break;
					
					case 'TV':
						setButtonState(e, 147, tvButtons);
						actionButtonState = 147;
						break;
					
					case 'VideoGames':
						setButtonState(e, 148, 1);
						actionButtonState = 148;
						break;
		
					//Music
					case 'ChangeMusic':
						setButtonState(e, 149, 1);
						actionButtonState = 149;
						break;
					
					case 'LetsDance':
						setButtonState(e, 150, 1);
						actionButtonState = 150;
						break;
					
					case 'VolumeUp':
						setButtonState(e, 151, 1);
						actionButtonState = 151;
						break;
					
					case 'VolumeDown':
						setButtonState(e, 152, 1);
						actionButtonState = 152;
						break;
					
					//Outdoor Games
					case 'Cars':
						setButtonState(e, 153, 1);
						actionButtonState = 153;
						break;
					
					case 'Garden':
						setButtonState(e, 154, 1);
						actionButtonState = 154;
						break;
					
					case 'Swing':
						setButtonState(e, 155, 1);
						actionButtonState = 155;
						break;
					
					case 'Terrace':
						setButtonState(e, 156, 1);
						actionButtonState = 156;
						break;
					
					case 'Walk':
						setButtonState(e, 157, 1);
						actionButtonState = 157;
						break;
					
					//Toys
					case 'Cars':
						setButtonState(e, 158, 1);
						actionButtonState = 158;
						break;
					
					case 'ActionFigures':
						setButtonState(e, 159, 1);
						actionButtonState = 159;
						break;
					
					case 'PlayWithMe':
						setButtonState(e, 160, 1);
						actionButtonState = 160;
						break;
					
					case 'SoftToys':
						setButtonState(e, 161, 1);
						actionButtonState = 161;
						break;
		
					//TV
					case 'NextChannel':
						setButtonState(e, 162, 1);
						actionButtonState = 162;
						break;
					
					case 'PreviousChannel':
						setButtonState(e, 163, 1);
						actionButtonState = 163;
						break;
					
					case 'VolumeUp':
						setButtonState(e, 164, 1);
						actionButtonState = 164;
						break;
					
					case 'VolumeDown':
						setButtonState(e, 165, 1);
						actionButtonState = 165;
						break;
						
					//Video Games
		
					//People
					case 'Dad':
						setButtonState(e, 166, 1);
						actionButtonState = 166;
						break;
					
					case 'Mom':
						setButtonState(e, 167, 1);
						actionButtonState = 167;
						break;
					
					case 'Brother':
						setButtonState(e, 168, 1);
						actionButtonState = 168;
						break;
					
					case 'Sister':
						setButtonState(e, 169, 1);
						actionButtonState = 169;
						break;
					
					case 'Friends':
						setButtonState(e, 170, 1);
						actionButtonState = 170;
						break;
					
					case 'Teacher':
						setButtonState(e, 171, 1);
						actionButtonState = 171;
						break;
					
					case 'Nurse':
						setButtonState(e, 172, 1);
						actionButtonState = 172;
						break;
					
					case 'Doctor':
						setButtonState(e, 173, 1);
						actionButtonState = 173;
						break;
		
				//Others Button
					case 'Clothes':
						setButtonState(e, 174, clothesButtons);
						actionButtonState = 174;
						break;
					
					case 'Emergency':
						setButtonState(e, 175, emergencyButtons);
						actionButtonState = 175;
						break;
					
					case 'Hygiene':
						setButtonState(e, 176, hygieneButtons);
						actionButtonState = 176;
						break;
					
					case 'School':
						setButtonState(e, 177, schoolButtons);
						actionButtonState = 177;
						break;
					
					case 'Sleep':
						setButtonState(e, 178, sleepButtons);
						actionButtonState = 178;
						break;
					
					case 'Time':
						setButtonState(e, 179, timeButtons);
						actionButtonState = 179;
						break;
		
					//Clothes
					case 'ChangeFootwear':
						setButtonState(e, 180, 1);
						actionButtonState = 180;
						break;
					
					case 'ChangeInnerwear':
						setButtonState(e, 181, 1);
						actionButtonState = 181;
						break;
						
						
					case 'ChangeJeans':
						setButtonState(e, 182, 1);
						actionButtonState = 182;
						break;
					
					case 'ChangeTShirt':
						setButtonState(e, 183, 1);
						actionButtonState = 183;
						break;
					
					case 'WearNightClothes':
						setButtonState(e, 184, 1);
						actionButtonState = 184;
						break;
					
					//Emergency
					case 'Bandage':
						setButtonState(e, 185, 1);
						actionButtonState = 185;
						break;
					
					case 'Help':
						setButtonState(e, 186, 1);
						actionButtonState = 186;
						break;
					
					case 'Medicine':
						setButtonState(e, 187, 1);
						actionButtonState = 187;
						break;
					
					//Hygiene
					case 'Bath':
						setButtonState(e, 188, 1);
						actionButtonState = 188;
						break;
					
					case 'Brush':
						setButtonState(e, 189, 1);
						actionButtonState = 189;
						break;
					
					case 'Facewash':
						setButtonState(e, 190, 1);
						actionButtonState = 190;
						break;
					
					case 'Toilet':
						setButtonState(e, 191, 1);
						actionButtonState = 11;
						break;
					
					case 'Vomit':
						setButtonState(e, 192, 1);
						actionButtonState = 192;
						break;
					
					//School
					case 'Bag':
						setButtonState(e, 193, 1);
						actionButtonState = 193;
						break;
					
					case 'Books':
						setButtonState(e, 194, 1);
						actionButtonState = 194;
						break;
					
					case 'Bottle':
						setButtonState(e, 195, 1);
						actionButtonState = 195;
						break;
					
					case 'DontWantToGo':
						setButtonState(e, 196, 1);
						actionButtonState = 196;
						break;
					
					case 'HomeWork':
						setButtonState(e, 197, 1);
						actionButtonState = 197;
						break;
					
					//Sleep
					case 'Door':
						setButtonState(e, 198, 1);
						actionButtonState = 198;
						break;
					
					case 'Fan':
						setButtonState(e, 199, 1);
						actionButtonState = 199;
						break;
					
					case 'FeelingCold':
						setButtonState(e, 200, 1);
						actionButtonState = 200;
						break;
					
					case 'FeelingWarm':
						setButtonState(e, 201, 1);
						actionButtonState = 201;
						break;
					
					case 'Light':
						setButtonState(e, 202, 1);
						actionButtonState = 202;
						break;
					
					case 'Window':
						setButtonState(e, 203, 1);
						actionButtonState = 203;
						break;
					
					//Time
					case 'Afternoon':
						setButtonState(e, 204, 1);
						actionButtonState = 204;
						break;
					
					case 'CurrentTime':
						setButtonState(e, 205, 1);
						actionButtonState = 205;
						break;
					
					case 'Evening':
						setButtonState(e, 206, 1);
						actionButtonState = 206;
						break;
					
					case 'Morning':
						setButtonState(e, 207, 1);
						actionButtonState = 207;
						break;
					
					case 'Night':
						setButtonState(e, 208, 1);
						actionButtonState = 208;
						break;
					
					case 'Tomorrow':
						setButtonState(e, 209, 1);
						actionButtonState = 209;
						break;
					
					case 'Yesterday':
						setButtonState(e, 210, 1);
						actionButtonState = 210;
						break;
						
					case 'goHome':
						setButtonState(e, 0, homeButtons);
						actionButtonState = 0;
						break;
					
					default:
						//do nothing
				}
				
			}
			
			
			/* ------------------------------ */
		
				//If No actions are selected
					if(actionButtonState == null){
						
						 //Figuring out which main button audio to play
						Ti.include("o.js");	//Get audio file corresponding toe Main Button State
						
					} else {
					
						//Figuring out which action audio to play
						Ti.include("g.js");	//Get Sound file corresponding to Action Button ID & State
						
					}
				
		
			/* ------------------------------ */
		
		} //Ends if (e.source.type != 'bg)
		
	});
	
	
