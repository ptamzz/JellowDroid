/*
 * Get sound file corresponding to Main Button State
 */


//Action button is on
	if(mainButtonState == 1){
		//Like: First Sound
		audio = getAudioFile('media/home/like.mp3');

	} else if(mainButtonState == 2){
		//Like: Second Sound
		audio = getAudioFile('media/home/reallyLike.mp3');
		
	} else if(mainButtonState == 4){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/dontLike.mp3');
		
	} else if(mainButtonState == 5){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/reallyDontLike.mp3');

	} else if(mainButtonState == 7){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/yes.mp3');

	} else if(mainButtonState == 8){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/reallyYes.mp3');
		
	} else if(mainButtonState == 10){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/no.mp3');

	} else if(mainButtonState == 11){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/reallyNo.mp3');
		
	} else if(mainButtonState == 13){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/more.mp3');
		
	} else if(mainButtonState == 14){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/reallyMore.mp3');
		
	} else if(mainButtonState == 16){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/less.mp3');
		
	} else if(mainButtonState == 17){
		//DontLike: Second Sound
		audio = getAudioFile('media/home/reallyLess.mp3');
		
	} else {
		//Don't play audio
		var play = false;
	}
	
	if(!play){
		audio.play(); //Play Audio
		play = 1;
		
		audio = null;
	}