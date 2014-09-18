/* global Backbone, jQuery, _ */
var ttfmakeFormatBuilder = ttfmakeFormatBuilder || {};

( function ( window, Backbone, $, _, ttfmakeFormatBuilder ) {
	'use strict';

	ttfmakeFormatBuilder.formats = ttfmakeFormatBuilder.formats || {};
	ttfmakeFormatBuilder.nodes.button = 'a.ttfmake-button';

	ttfmakeFormatBuilder.formats.button = ttfmakeFormatBuilder.FormatModel.extend({
		defaults: {
			update: false,
			text: 'Click Here',
			url: '',
			target: false,
			fontSize: '17',
			colorBackground: '#000000',
			colorBackgroundHover: '#e5e5e5',
			colorText: '#ffffff',
			colorTextHover: '#000000',
			paddingHorz: '6',
			paddingVert: '4',
			icon: ''
		},

		initialize: function() {
			var content = ttfmakeFormatBuilder.currentSelection.content || '',
				node = ttfmakeFormatBuilder.currentSelection.node || {};
			if ( '' !== content ) {
				this.set({ text: content });
			}
			if (true === this.get('update')) {
				this.parseAttributes( node );
			}
		},

		getOptionFields: function() {
			var items = [
				{
					type: 'label',
					label: 'Button'
				},
				{
					type: 'textbox',
					name: 'text',
					label: 'Text',
					value: this.get('text')
				},
				{
					type: 'textbox',
					name: 'url',
					label: 'URL',
					value: this.get('url')
				},
				{
					type: 'checkbox',
					name: 'target',
					label: 'Open link in a new window/tab',
					checked: this.get('target')
				},
				{
					type: 'textbox',
					name: 'fontSize',
					label: 'Font Size (px)',
					value: this.get('fontSize')
				},
				{
					type: 'textbox',
					name: 'colorBackground',
					label: 'Background Color',
					value: this.get('colorBackground')
				},
				{
					type: 'textbox',
					name: 'colorBackgroundHover',
					label: 'Background Color (hover)',
					value: this.get('colorBackgroundHover')
				},
				{
					type: 'textbox',
					name: 'colorText',
					label: 'Text Color',
					value: this.get('colorText')
				},
				{
					type: 'textbox',
					name: 'colorTextHover',
					label: 'Text Color (hover)',
					value: this.get('colorTextHover')
				},
				{
					type: 'textbox',
					name: 'paddingHorz',
					label: 'Horizontal Padding (px)',
					value: this.get('paddingHorz')
				},
				{
					type: 'textbox',
					name: 'paddingVert',
					label: 'Vertical Padding (px)',
					value: this.get('paddingVert')
				},
				{
					type: 'textbox',
					name: 'icon',
					label: 'Icon',
					value: this.get('icon')
				}
			];

			return items;
		},

		sanitizeOptions: function( data ) {
			var self = this;

			$.each(data, function(key, value) {
				if (self.has(key)) {
					var sanitized = self.escAttr(value);
					self.set(key, sanitized);
				}
			});
		},

		parseAttributes: function( node ) {
			var $node = $(node),
				fontSize, paddingHorz, paddingVert;
			if ( $node.text() ) this.set('text', $node.text());
			if ( $node.attr('href') ) this.set('url', $node.attr('href'));
			if ( $node.attr('data-hover-background-color') ) this.set('colorBackgroundHover', $node.attr('data-hover-background-color'));
			if ( $node.attr('data-hover-color') ) this.set('colorTextHover', $node.attr('data-hover-color'));
			if ( '_blank' === $node.attr('target') ) this.set('target', true);
			if ( $node.css('backgroundColor') ) this.set('colorBackground', $node.css('backgroundColor'));
			if ( $node.css('color') ) this.set('colorText', $node.css('color'));
			if ( $node.css('fontSize') ) {
				fontSize = parseInt( $node.css('fontSize') );
				this.set('fontSize', fontSize + '');
			}
			if ( $node.css('paddingLeft') ) {
				paddingHorz = parseInt( $node.css('paddingLeft') );
				this.set('paddingHorz', paddingHorz + '');
			}
			if ( $node.css('paddingTop') ) {
				paddingVert = parseInt( $node.css('paddingTop') );
				this.set('paddingVert', paddingVert + '');
			}
		},

		getHTML: function() {
			var $button = $('<a>'),
				content;

			$button.attr({
				href: this.get('url'),
				class: 'ttfmake-button',
				'data-hover-background-color': this.get('colorBackgroundHover'),
				'data-hover-color': this.get('colorTextHover')
			});
			if ( 'true' == this.get('target') ) {
				$button.attr('target', '_blank');
			}

			$button.css({
				backgroundColor: this.get('colorBackground'),
				color: this.get('colorText'),
				fontSize: this.get('fontSize') + 'px',
				padding: this.get('paddingVert') + 'px ' + this.get('paddingHorz') + 'px'
			});

			content = this.get('text');
			if ('' !== this.get('icon')) {
				content = this.get('icon') + content;
			}
			$button.text(content);

			return $button.wrap('<p>').parent().html();
		}
	});
})( window, Backbone, jQuery, _, ttfmakeFormatBuilder );