(function ( $ ) {
	"use strict";

	var containers = { 
		"top-left": null,
		"top-center": null,
		"top-right": null,
		"bottom-left": null,
		"bottom-center": null,
		"bottom-right": null
	};

	function addNotificationToContainer(notificationElement, position) {
		if(!containerElementInitialzied(position)) {
			initializeContainerElement(position);
		}
		if(position.indexOf("top") >= 0) {
			containers[position].prepend(notificationElement);
		} else {
			containers[position].append(notificationElement);
		}

	}

	function containerElementInitialzied(position) {
		return containers[position] !== null;
	}

	function initializeContainerElement(position) {
		containers[position] = $("<div>")
			.addClass("notify-container")
			.addClass("notify-container-" + position);
		containers[position].appendTo("body");
	}

	function closeAll() {
		while(notifications.length > 0) {
			console.log(notifications.pop());
		}
	}
	    
    var Notification = function(options) {
        var settings = $.extend(Notification.defaultSettings, options);
		var notificationElement;
		var visibleNotificationCss = { };
		var hiddenNotificationCss = { };
		initialize();
		
		
		
		function initialize() {
			initializenotificationElement();
			initializeStopOnMouseOver();
			initializeTimeoutAfterMouseOver();
			initializeClickToClose();
		}
		
		function initializenotificationElement() {
			createnotificationElement();
			addNotificationToContainer(notificationElement, settings.position);

			initializeContent();
			initializeCloseButton();
			initializeStyleObjects();
			setStartupNotificationStyle();
			
		}
		
        function createnotificationElement() {
            notificationElement = $("<div>")
                .addClass("notify")
                .addClass("notify-" + settings.status); 
	    }

		function initializeStyleObjects() {
			var verticalPosition = settings.position.indexOf("top") >= 0 ? "top" : "bottom";
			var marginProperty = "margin-" + verticalPosition;
			
			visibleNotificationCss["opacity"] = 1;
			visibleNotificationCss[marginProperty] = notificationElement.css(marginProperty);

			hiddenNotificationCss["opacity"] = 0;
			hiddenNotificationCss[marginProperty] = -notificationElement.outerHeight();
		}
		
		function setStartupNotificationStyle() {
			notificationElement.css(hiddenNotificationCss);
		}
		
		function initializeStopOnMouseOver() {
			if(settings.stopOnMouseOver) {
				notificationElement.on('mouseover', function(){
					clearClosingTimer();
				});
			}
		}
			
		function initializeTimeoutAfterMouseOver() {
			if(settings.stopOnMouseOver && settings.timeoutAfterMouseOver > 0) {
				notificationElement.on('mouseout', function(){
					clearClosingTimer();
					setClosingTimer(settings.timeoutAfterMouseOver);
				});
			}
		}
			
		function initializeClickToClose() {
			if(settings.clickToClose) {
				notificationElement.on('click', closeNotification);
			}
		}

		function initializeCloseButton() {
			if(settings.showCloseButton) {
				notificationElement.prepend(createCloseButtonElement());
			}
		}
		
        function createCloseButtonElement() {
            return $("<button>")
                .attr("type", "button")
                .addClass("close")
                .html("&times;")
                .on('click', closeNotification);
        }
		
		function initializeContent() {
			notificationElement.append(settings.message);
		}
		
		function closeNotification() {
			clearClosingTimer();
			notificationElement.animate(hiddenNotificationCss, removeNotificationFromDom)
		}
				
		function showNotification() {
			notificationElement.animate(visibleNotificationCss, initializeDisplayTimeout);
		}
		
		function initializeDisplayTimeout() {
			if(settings.displayTimeout > 0) {
				setClosingTimer(settings.displayTimeout);
			}
		}
		
		function clearClosingTimer() {
			clearTimeout(notificationElement.closingTimer);
		}
		
		function removeNotificationFromDom() {
			notificationElement.remove();
		}
		
		function setClosingTimer(timeoutValue) {
			notificationElement.closingTimer = setTimeout(closeNotification, timeoutValue);
		}

        this.show = showNotification;
	}
	Notification.defaultSettings = {
		message: "",
		status: "default",
		position: "top-right",
		displayTimeout: 5000,
		clickToClose: true,
		showCloseButton: true,
		stopOnMouseOver: true,
		timeoutAfterMouseOver: 2000
	};
	
    $.notify = function(options) {
		new Notification(options).show();
    }    
}(jQuery));

function ShowHint(text) {
    if (!($(".notify-info").length) && text.length > 0) {
        $.notify({
            message: text,
            position: "top-center",
            status: "info",
            displayTimeout: 0,
            stopOnMouseOver: false
        });
    }
}