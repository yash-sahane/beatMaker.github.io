class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('#kickSound');
        this.snareAudio = document.querySelector('#snareSound');
        this.hihatAudio = document.querySelector('#hihatSound');
        this.currentKick = 'sounds/kick-808.wav';
        this.currentSnare = 'sounds/snare-808.wav';
        this.currentHihat = 'sounds/hihat-808.wav';
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.slider = document.querySelector('.tempo-slider');
        this.sliderText = document.querySelector('.tempo-nr');
        this.index = 0;
        this.bpm = 150;
        this.playBtn = document.querySelector('.play-stop');
        this.isPlaying = null;
    }

    repeat() {
        let step = this.index % 8;
        let activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bars => {
            bars.style.animation = 'playTrack .3s alternate ease-in-out 2';
            if (bars.classList.contains('active')) {
                if (bars.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0
                    this.kickAudio.play()
                }
                if (bars.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0
                    this.snareAudio.play()
                }
                if (bars.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0
                    this.hihatAudio.play()
                }
            }
        });
        console.log(step);
        this.index++;
    }

    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat()
            }, interval)
        } else {
            clearInterval(this.isPlaying)
            this.isPlaying = null
        }
    }

    updateBtn(e) {
        if (!this.isPlaying) {
            e.target.innerText = 'Stop'
            this.playBtn.classList.add('active')
        } else {
            e.target.innerText = 'Play'
            this.playBtn.classList.remove('active')
        }
    }

    activePad() {
        this.classList.toggle('active')
    }

    changeSound(e) {
        let selectName = e.target.name;
        let selectValue = e.target.value;
        console.log(selectValue)
        switch (selectName) {
            case 'kick-select':
                this.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectValue;
                break;
        }
    }

    muteSound(e) {
        const index = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            switch (index) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
           }
        } else {
            switch (index) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
           }
            
        }
    }

    updateTempo(e) {
        this.bpm = e.target.value; 
        clearInterval(this.isPlaying);
        this.isPlaying = null;

        const playBtn = document.querySelector('.play-stop');
        if (playBtn.classList.contains('active')) {
            this.start();
        }
    }
}

const drumKit = new Drumkit

drumKit.playBtn.addEventListener('click', function(e){
    drumKit.updateBtn(e)
    drumKit.start()
})

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad)
    pad.addEventListener('animationend', function () {
        this.style.animation = ''
    })
})

drumKit.playBtn.addEventListener('click', function () {
    drumKit.updateBtn()
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    })
})

drumKit.muteBtn.forEach(mute => {
    mute.addEventListener('click', function (e) {
        drumKit.muteSound(e);
    })
})

drumKit.slider.addEventListener('input', function(e){
    drumKit.sliderText.innerText = e.target.value;
})

drumKit.slider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
})


