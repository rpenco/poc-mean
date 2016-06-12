// register application, controller, service, directives in Angular ------------------------

angular.module('khipsTodo', ['todoController', 'todoService', 'todoDirectives'])
	
	.run(function () {										// tips for MDL, upgrade DOM when view change

	    if(typeof MutationObserver === 'function'){			// if support MutationObserver (PhantomJS doesn't...)

		    var mdlUpgradeDom = false;
		    
		    setInterval(function() {
		      if (mdlUpgradeDom) {
		        componentHandler.upgradeDom();
		        mdlUpgradeDom = false;
		      }
		    }, 0);
		    
		    var observer = new MutationObserver(function () {
		      mdlUpgradeDom = true;
		    });
		    
		    observer.observe(document.body, {
		        childList: true,
		        subtree: true
		    });
	    }
	});