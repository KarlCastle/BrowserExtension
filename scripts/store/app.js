var container = document.getElementById( 'error_box' );

if( container )
{
	var link = document.createElement( 'a' );
	link.className = 'steamdb_error_link';
	link.target = '_blank';
	link.href = GetHomepage() + 'app/' + GetCurrentAppID() + '/';
	link.appendChild( document.createTextNode( 'View on Steam Database' ) );
	
	container.appendChild( link );
}
else
{
	GetOption( { 'button-app': true, 'link-subid': true }, function( items )
	{
		var link, element, container;
		
		if( items[ 'button-app' ] )
		{
			container = document.querySelector( '#demo_block' );
			
			if( container )
			{
				link = document.createElement( 'a' );
				link.className = 'btnv6_blue_hoverfade btn_medium btn_steamdb';
				link.target = '_blank';
				link.href = GetHomepage() + 'app/' + GetCurrentAppID() + '/';
				
				element = document.createElement( 'span' );
				element.id = 'steamdb_bind_tooltip_on_me';
				element.dataset.storeTooltip = 'View on Steam Database';
				link.appendChild( element );
				
				var image = document.createElement( 'img' );
				image.className = 'ico16';
				image.src = GetLocalResource( 'icons/18.png' );
				
				element.appendChild( image );
				
				container.insertBefore( link, container.firstChild );
				
				// We need to bind a tooltip, and the only way to do that is to inject a script into the page
				element = document.createElement( 'script' );
				element.id = 'steamdb_bind_tooltip';
				element.type = 'text/javascript';
				element.appendChild( document.createTextNode( 'BindStoreTooltip( jQuery( "#steamdb_bind_tooltip_on_me" ) );' ) );
				
				document.head.appendChild( element );
			}
		}
		
		if( items[ 'link-subid' ] )
		{
			// Find each "add to cart" button
			container = document.querySelectorAll( 'input[name="subid"]' );
			
			var hasDropdowns = false, i = 0, subid = 0, subidElement, length = container.length;
			
			for( i = 0; i < length; i++ )
			{
				element = container[ i ];
				
				subid = element.value;
				
				element = element.parentElement.parentElement;
				
				subidElement = document.createElement( 'i' );
				subidElement.className = 'steamdb_subid';
				
				// Is this a subscription selector?
				if( subid.length === 0 )
				{
					if( element.querySelector( '.game_area_purchase_game_dropdown_selection' ) )
					{
						hasDropdowns = true;
						
						subidElement.appendChild( document.createTextNode( '(nothing selected)' ) );
						
						link = document.createElement( 'a' );
						link.className = 'steamdb_link' + ( element.querySelector( '.game_area_purchase_game_dropdown_left_panel' ) ? '' : ' steamdb_float_left' );
						link.target = '_blank';
						link.href = GetHomepage();
						link.appendChild( document.createTextNode( 'View on Steam Database ' ) );
						link.appendChild( subidElement );
						
						element.appendChild( link );
					}
				}
				else
				{
					subidElement.appendChild( document.createTextNode( '(' + subid + ')' ) );
					
					link = document.createElement( 'a' );
					link.className = 'steamdb_link steamdb_float_left';
					link.target = '_blank';
					link.href = GetHomepage() + 'sub/' + subid + '/';
					link.appendChild( document.createTextNode( 'View on Steam Database ' ) );
					link.appendChild( subidElement );
					
					element.appendChild( link );
				}
			}
			
			// We have to inject our JS directly into the page to hook Steam's functionatily
			if( hasDropdowns )
			{
				element = document.createElement( 'script' );
				element.id = 'steamdb_subscriptions_hook';
				element.type = 'text/javascript';
				element.src = GetLocalResource( 'scripts/store/subscriptions.js' );
				element.dataset.homepage = GetHomepage();
				
				document.head.appendChild( element );
			}
		}
	} );
}
