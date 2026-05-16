import IncallManager from "react-native-incall-manager";

class SirenService{
    private static instance : SirenService;
    private isPlaying = false;

    static getInstance(){
        if (!SirenService.instance){
            SirenService.instance = new SirenService();
        }
        return SirenService.instance;
    }

    startSiren(){
        console.log("Попытка запустить сирену...");
        if (this.isPlaying) return;
        IncallManager.start({media : "audio"});
        IncallManager.setForceSpeakerphoneOn(true);
        IncallManager.setMicrophoneMute(true);


        IncallManager.startRingtone("siren-sound", 1, "", 10);
        this.isPlaying = true;
    }

    stopSiren(){
        console.log("Попытка остановить сирену...");
        if (!this.isPlaying) return;
        IncallManager.stopRingtone();
        IncallManager.stop();
        this.isPlaying = false;
    }
}


export default SirenService.getInstance();