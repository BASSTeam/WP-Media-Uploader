/**
 *
 * wpMediaUploader v1.0 2016-11-05
 * Copyright (c) 2016 Smartcat
 *
 * Modded by KaMeHb, (c) 2017 BASSTeam prod.
 * License: LGPL v3
 *
 */
(function($){
    $.wpMediaUploader = function( options ) {
        
        var settings = $.extend({
            
            target : '.smartcat-uploader', // The class wrapping the textbox
            uploaderTitle : 'Select or upload image', // The title of the media upload popup
            uploaderButton : 'Set image', // the text of the button in the media upload popup
            multiple : false, // Allow the user to select multiple images
            buttonText : 'Upload image', // The text of the upload button
            buttonClass : '.smartcat-upload', // the class of the upload button
            previewSize : '150px', // The preview image size
            modal : false, // is the upload button within a bootstrap modal ?
            buttonStyle : { // style the button
                color : '#fff',
                background : '#3bafda',
                fontSize : '16px',
                padding : '10px 15px',
            },
            onSelect : function(){},
            onOpen : function(){},
            onClose : function(){},
            linkWrapper : ['<div>', '</div>'],
            
        }, options );

        $( settings.target ).append(settings.linkWrapper[0] + '<a href="#" class="' + settings.buttonClass.replace('.','') + '">' + settings.buttonText + '</a>' + settings.linkWrapper[1]);

        $( settings.target + ' ' + settings.buttonClass ).css( settings.buttonStyle );

        $('body').on('click', settings.target + ' ' + settings.buttonClass, function(e){
            e.preventDefault();
            var custom_uploader = wp.media({
                title: settings.uploaderTitle,
                button: {
                    text: settings.uploaderButton
                },
                multiple: settings.multiple
            })
            .on('select', function(){
                $(settings.target).find('img').remove();
                !function(){
                    var attachment = custom_uploader.state().get('selection').first().toJSON(), a = [];
                    custom_uploader.state().get('selection').forEach(function(e){
                        a.push(e.id);
                        $(settings.target).append('<img src="' + e.attributes.url + '" style="height:' + settings.previewSize + '"/>');
                    });
                    $(settings.target).find('input').val(JSON.stringify(a));
                    if( settings.modal ) {
                        $('.modal').css( 'overflowY', 'auto');
                    }
                }();
                settings.onSelect();
            })
            .on('close', settings.onClose)
            .open();
            settings.onOpen();
        });
    }
})(jQuery);
