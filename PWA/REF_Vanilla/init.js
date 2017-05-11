(function(){
    
    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }


    // Register
    if('serviceWorker' in navigator){
        navigator.serviceWorker
            .register('./sw.js')
            .then(function(swRegistration){
                console.log("serviceWorker registered!")

                var appServerKey = urlB64ToUint8Array("BLY8DvCrbEF7fy2Ryio-h4iRAenqchwplyeXfG6SpQ3O85OzRAdSezYw2BdHOThseTPn12F2zz-35PnjXO25q1I")

                swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: appServerKey
                }).then(function(subscription){
                    console.log("Subscribed!")
                    console.log(subscription)
                })
            })
    }
})()