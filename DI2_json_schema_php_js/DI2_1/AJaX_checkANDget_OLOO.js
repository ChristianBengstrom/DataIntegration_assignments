'use strict';

 let Ajax = {
    init() {
        this.respObj = null;
        this.ajaxobj = false;
        try {
            this.ajaxobj = new XMLHttpRequest();
        } catch(err) {
            window.alert(err.message + " Get yourself a browser ;)");
        }
    },

    getFile(filename) {
        try {
            this.ajaxobj.addEventListener('load', function(ev) {
                        if (ev.target.readyState === 4) {                 // this line dosent need to be there when using the load addEventListener
                            if (ev.target.status === 200) {               // this line dosent need to be there when using the load addEventListener
                                // it was a load event, ie successful return from server
                                this.respObj = ev.target.responseText;
                                callBack(this.respObj);
                            }
                        }
                    });
            this.ajaxobj.open("GET", filename);  //what does this do?
            this.ajaxobj.send("");               //what does this do?
        } catch(err) {
            alert(err.message + 'WTF');
        }
    }
}
