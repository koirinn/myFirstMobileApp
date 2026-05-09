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
        if (this.isPlaying) return;
        IncallManager.start({media : "audio"});
        IncallManager.setForceSpeakerphoneOn(true);
        IncallManager.setMicrophoneMute(true);


        IncallManager.startRingtone("sirensound", 1, "", 30);
        this.isPlaying = true;
    }

    stopSiren(){
        if (!this.isPlaying) return;
        IncallManager.stopRingtone();
        IncallManager.stop();
        this.isPlaying = false;
    }
}


export default SirenService.getInstance();