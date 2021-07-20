// (function()
// {
// 	var canvas = document.querySelector( "#canvas" );
// 	var context = canvas.getContext( "2d" );
// 	canvas.width = 280;
// 	canvas.height = 280;

// 	var Mouse = { x: 0, y: 0 };
// 	var lastMouse = { x: 0, y: 0 };
// 	context.fillStyle="black";
// 	context.fillRect(0,0,canvas.width,canvas.height);
// 	context.color = "white";
// 	context.lineWidth = 10;
//     context.lineJoin = context.lineCap = 'round';
	


// 	canvas.addEventListener( "mousemove", function( e )
// 	{
// 		lastMouse.x = Mouse.x;
// 		lastMouse.y = Mouse.y;

// 		Mouse.x = e.pageX - this.offsetLeft;
// 		Mouse.y = e.pageY - this.offsetTop;

// 	}, false );

// 	canvas.addEventListener( "mousedown", function( e )
// 	{
// 		canvas.addEventListener( "mousemove", onPaint, false );

// 	}, false );

// 	canvas.addEventListener( "mouseup", function()
// 	{
// 		canvas.removeEventListener( "mousemove", onPaint, false );

// 	}, false );

// 	var onPaint = function()
// 	{	
// 		context.lineWidth = context.lineWidth;
// 		context.lineJoin = "round";
// 		context.lineCap = "round";
// 		context.strokeStyle = context.color;
	
// 		context.beginPath();
// 		context.moveTo( lastMouse.x, lastMouse.y );
// 		context.lineTo( lastMouse.x+0.4, lastMouse.y+0.4 );
// 		context.closePath();
// 		context.stroke();
// 	};

	
(function()
{
	var canvas = document.querySelector( "#canvas" );
	var context = canvas.getContext( "2d" );

	context.fillStyle="black";
	context.fillRect(0,0,canvas.width,canvas.height);
	function debug()
	{
		/* CLEAR BUTTON */
		var clearButton = $( "#clearButton" );
		
		clearButton.on( "click", function()
		{
			
				context.clearRect( 0, 0, 280, 280 );
				context.fillStyle="black";
				context.fillRect(0,0,canvas.width,canvas.height);
			
		});

		/* COLOR SELECTOR */

		$( "#colors" ).change(function()
		{
			var color = $( "#colors" ).val();
			context.color = color;
		});
		
		/* LINE WIDTH */
		
		$( "#lineWidth" ).change(function()
		{
			context.lineWidth = $( this ).val();
		});
	}
	$("#canvas").click(function(e){

		getPosition(e); 
	});
	debug();
	var pointSize = 3;
	
	function getPosition(event){
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;
		   
		drawCoordinates(x,y);
	}
	
	function drawCoordinates(x,y){	
		 var ctx = document.getElementById("canvas").getContext("2d");
	
		 ctx.fillStyle = "#ffff"; // Red color
	
	   ctx.beginPath();
	   ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
	   ctx.fill();
	}
}());

