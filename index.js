const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Ngọc Phú';

// khai báo biến.
const player = $('.player');
const heading = $('.name-song');
const singer = $('.name-singer')
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progressBar = $('.progress-bar');
const progress = $('#progress');
const songDuration = $('.progress-time__duration');
const songCurrentTime = $('.progress-time__current-time');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const listMussic = $('.playlist-mussic');

const app = {
    currentIndex: 0, 
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isHoldProgressBar: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs : [
        { 
            name: 'Đời Là Thế Thôi',
            author: 'Phú Lê nào chứ không phải mình🥲',
            path: './assets/css/music/song0.mp3',
            image: './assets/css/img/img0.jpg',
        },
        { 
            name: '2 Phút Hơn - Pháo',
            author: 'Masew',
            path: './assets/css/music/song1.mp3',
            image: './assets/css/img/img1.jpg',
        },
        { 
            name: 'Thanh Xuân',
            author: 'Da LAB',
            path: '../assets/css/music/song2.mp3',
            image: './assets/css/img/img2.jpg',
        },
        { 
            name: 'Đừng Hỏi Em',
            author: 'Mỹ Tâm',
            path: './assets/css/music/song3.mp3',
            image: './assets/css/img/img3.jpg',
        },
        { 
            name: 'Hoa Nở Không Màu',
            author: 'Hoài Lâm',
            path: './assets/css/music/song4.mp3',
            image: './assets/css/img/img4.jpg',
        },
        { 
            name: 'Nàng Thơ',
            author: 'Hoàng Dũng',
            path: './assets/css/music/song5.mp3',
            image: './assets/css/img/img5.jpg',
        },
        { 
            name: 'LẠ LÙNG',
            author: 'Vũ',
            path: './assets/css/music/song6.mp3',
            image: './assets/css/img/img6.png',
        },
        { 
            name: 'Âm Thầm Bên Em',
            author: 'Sơn Tùng-MTP',
            path: './assets/css/music/song7.mp3',
            image: './assets/css/img/img7.jpg',
        },
        { 
            name: 'Mơ Hồ',
            author: 'Bùi Anh Tuấn',
            path: './assets/css/music/song8.mp3',
            image: './assets/css/img/img8.jpg',
        },
        { 
            name: 'Tháng Tư Là Lời Nói Dối Của Em',
            author: 'Hà Anh Tuấn',
            path: './assets/css/music/song9.mp3',
            image: './assets/css/img/img9.jpg',
        },
        { 
            name: ' Bài Này Chill Phết',
            author: 'Đen ft. MIN',
            path: './assets/css/music/song10.mp3',
            image: './assets/css/img/img10.jpg',
        },
        { 
            name: ' Cánh Hồng Phai',
            author: 'Quốc Thiên',
            path: './assets/css/music/song11.mp3',
            image: './assets/css/img/img11.jpg',
        },
        { 
            name: 'Chỉ Là Không Cùng Nhau',
            author: 'TĂNG PHÚC ft TRƯƠNG THẢO NHI',
            path: './assets/css/music/song12.mp3',
            image: './assets/css/img/img12.jpg',
        },
        { 
            name: 'Despacito',
            author: 'Luis Fonsi if Daddy Yankee',
            path: './assets/css/music/song13.mp3',
            image: './assets/css/img/img13.webp',
        },
        { 
            name: 'Thằng Điên',
            author: 'JUSTATEE x PHƯƠNG LY',
            path: './assets/css/music/song14.mp3',
            image: './assets/css/img/img14.jpg',
        },
        { 
            name: 'Nơi Này Có Anh',
            author: 'MTP',
            path: './assets/css/music/song15.mp3',
            image: './assets/css/img/img15.jpg',
        },
        { 
            name: 'Lối Nhỏ',
            author: 'Đen',
            path: './assets/css/music/song16.mp3',
            image: './assets/css/img/img16.jpg',
        },
        { 
            name: 'Thu Cuối',
            author: 'Mr.T ft Yanbi & Hằng Bingboong',
            path: './assets/css/music/song17.mp3',
            image: './assets/css/img/img17.jpg',
        },
        { 
            name: 'MÌNH CƯỚI NHAU ĐI',
            author: 'Pjnboys x Huỳnh James',
            path: './assets/css/music/song18.mp3',
            image: './assets/css/img/img18.jpg',
        },
        { 
            name: 'Cho Họ Ghét Đi Em',
            author: 'Pjnboys x Huỳnh James',
            path: './assets/css/music/song19.mp3',
            image: './assets/css/img/img19.jpg',
        },
    ],
    setConfig:function(key , value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    defineProperties:function () {
        Object.defineProperty(this, 'currentSong',{
            get:function () {
                return this.songs[this.currentIndex]
            }
        });
    },
    // time format
    timeFormat(seconds){
        const date = new Date(null)
        date.setSeconds(seconds)
        return date.toISOString().slice(14, 19)
    },
    // render ra web + app
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return`
                 <div class="song ${index === this.currentIndex ? 'addition':''}" data-index="${index}">
                    <div class="thumb">
                        <img alt="" class="cd__img" src="${song.image}">
                    </div>
                    <div class="body-list">
                        <h5 class="title">${song.name}</h5>
                        <p class="author">${song.author}</p>
                    </div>
                    <div class="option">
                        <span id="icon-menu-form"class="material-icons">more_vert</span>
                    </div>
                </div> 
            `
        })
        listMussic.innerHTML = htmls.join('')
    },
    handleEvents: function () {
        const _this = this;
        // xoay img 
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,// 10s
            iterations:Infinity
        })
        cdThumbAnimate.pause()
        // click play
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // khi tiến độ bài hát thay đổi
        // audio.ontimeupdate = function () {
        //     if(audio.duration) {
        //         const progressPercent = Math.floor(audio.currentTime / audio.duration*100)
        //         progress.value = progressPercent
        //     }
        // }
        audio.ontimeupdate = function() {
            songCurrentTime.textContent = _this.timeFormat(this.currentTime)
            const progressPercent = this.currentTime / this.duration * 100
            progress.style.width = progressPercent + '%'
        }
        // 
        progressBar.onmousedown = function(e) {
            audio.currentTime = e.offsetX / this.offsetWidth * audio.duration
            // Đặt cái này để làm được vừa giữ vừa kéo
            _this.isHoldProgressBar = true
        }
        progressBar.onchange = function(e) {
            if(_this.isHoldProgressBar){
                audio.currentTime = e.offsetX / this.offsetWidth * audio.duration
            }
        }
        // xử lý khi tua song
        // progress.onchange = function (e) {
        //     const seekTime = audio.duration / 100 * e.target.value;
        //     audio.currentTime = seekTime
        // }
        // xử lý khi next và lùi bài hát
        nextBtn.onclick = function (){
            if(_this.isRandom) {
                _this.playRandomSong()
            } else{
                _this.nextSong()
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function () {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong();
        }
        // khi random bài hát 
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        // xử lý lặp lại 1 bài hát
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        // xử lý Next bài hát khi kết thúc bài 
        audio.onended = function () {
            if(_this.isRepeat) {
                audio.play()
            }else {
                nextBtn.click()
            }
        }
        // xử lý hành vi người dùng click vào bài hát
        listMussic.onclick = function (e) {
            const songOption = e.target.closest('.song:not(.addition)');
            if(songOption || e.target.closest('.option')) {
                // khi click vào bài hát được chọn
                if (songOption){
                    _this.currentIndex = Number(songOption.dataset.index);
                    _this.loadCurrentSong();
                    _this.render()
                    audio.play();
                }
                // Khi click vào icon option
                if(e.target.closest('.option')) {

                }
            }
        }
    },
    // hàm loading bài hát ra giao diện.
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.addition').scrollIntoView({
                behavior:'smooth',
                block:'center',
                inline: 'center'
            })
        },300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.author;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        

        // Xử lý lấy tiến trình và thời lượng bài hát trước khi phát
        const _this = this
        audio.onloadedmetadata = function(){
            songCurrentTime.textContent = _this.timeFormat(this.currentTime.toFixed(2))
            songDuration.textContent = _this.timeFormat(this.duration.toFixed(2))
        }
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        // Object.assign(this , this.config)
    },
    nextSong:function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    prevSong:function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.song.length - 1;
        }
        this.loadCurrentSong()
    },
    playRandomSong: function (){
        let newIndex = this.currentIndex;
        do {
            newIndex = Math.floor(Math.random()*this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },
    start: function () {
        const _this = this;

        // loading cấu hình 
        this.loadConfig()
        // định nghĩa properties
        this.defineProperties()
        // xử lý logic 
        this.handleEvents()
        // loading update mussic render web
        this.loadCurrentSong()
        this.nextSong()
        this.render()
        // Actice trạng thái element repeat & radom
        randomBtn.classList.toggle('active', _this.isRandom);
        repeatBtn.classList.toggle('active', _this.isRepeat);
    }
}
app.start()