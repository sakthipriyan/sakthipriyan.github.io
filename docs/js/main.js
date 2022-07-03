$( document ).ready(function() {

	function getLocation(){
		return encodeURIComponent($(location).attr('href'));
	}

	function getTitle(){
		return escape($(document).find("title").text());
	}

	$('#facebook').click(function(e){
		//We tell our browser not to follow that link
		e.preventDefault();
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + getLocation(), 
				'facebook-share-dialog-1', 
				'height=400, width=500,	top='+($(window).height()/2 - 200) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');		
	});
	
	$('#twitter').click(function(e){
		e.preventDefault();
		window.open('http://twitter.com/share?url=' + getLocation() + '&text=' + getTitle(), 
				'twitter-share-dialog-1', 
				'height=400, width=500,	top='+($(window).height()/2 - 200) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
	});

	$('#google').click(function(e){
		e.preventDefault();
		window.open('https://plus.google.com/share?url=' + getLocation(), 
				'google-share-dialog-1', 
				'height=400, width=500,	top='+($(window).height()/2 - 200) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
	});

	$('#linkedin').click(function(e) {
    e.preventDefault();
    window.open('https://www.linkedin.com/shareArticle?mini=true&source=sakthipriyan.com&url=' + getLocation() + '&title=' + getTitle(),
      'linkedin-share-dialog-1',
      'height=400, width=500,	top=' + ($(window).height() / 2 - 200) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  	});

	$('pre code').each(function(i, block) {
    	hljs.highlightBlock(block);
	});
});