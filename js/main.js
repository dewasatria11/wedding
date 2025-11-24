(function () {
    function replaceClass(id, oldClass, newClass) {
        var elem = $(`.${id}`);
        if (elem.hasClass(oldClass)) {
            elem.removeClass(oldClass);
        }
        elem.addClass(newClass);
    }

    function initNavigation() {
        var section = document.querySelectorAll('.s-menu');
        if (!section.length) {
            return;
        }

        var sections = {};
        Array.prototype.forEach.call(section, function (e) {
            sections[e.id] = e.offsetTop;
        });

        window.onscroll = function () {
            var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
            Object.keys(sections).forEach(function (key) {
                if (sections[key] - 200 <= scrollPosition) {
                    $('.nav-item').removeClass('activeNavItem');
                    $('.nav-link').removeClass('active');
                    var navLink = document.querySelector('a[id*=' + key + ']');
                    if (navLink && navLink.parentElement) {
                        navLink.parentElement.setAttribute('class', 'nav-item pt-0 activeNavItem');
                        navLink.setAttribute('class', 'nav-link pt-0 text-dark active');
                    }
                }
            });
        };

        var navs = document.getElementsByClassName('nav-link');
        for (var i = 0; i < navs.length; i++) {
            (function (idx) {
                navs[idx].onclick = function () {
                    var destination = $(section).eq(idx);
                    $('html,body').animate({ scrollTop: destination.offset().top + 20 }, 'slow');
                };
            })(i);
        }
    }

    function initParticles() {
        if (typeof particlesJS !== 'function') {
            return;
        }

        particlesJS('particles-js', {
            particles: {
                number: { value: 19, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000' },
                    polygon: { nb_sides: 6 },
                    image: { src: 'img/github.svg', width: 100, height: 100 }
                },
                opacity: {
                    value: 0.19240944730386272,
                    random: true,
                    anim: { enable: false, speed: 0.8932849335314796, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 72.15354273894853,
                    random: true,
                    anim: { enable: true, speed: 34.107242916656496, size_min: 56.84540486109416, sync: false }
                },
                line_linked: { enable: false, distance: 200, color: '#ffffff', opacity: 1, width: 2 },
                move: {
                    enable: true,
                    speed: 6.413648243462092,
                    direction: 'bottom-right',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 481, rotateY: 561 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false, mode: 'grab' },
                    onclick: { enable: false, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    function vtTracker(label, value) {
        var el = document.createElement('span');

        el.className = 'col-lg-4 col-md-4 col-sm-4 col-4 flip-clock__piece';
        el.innerHTML = '<b class=\"flip-clock__card card\"><b class=\"card__top\"></b><b class=\"card__bottom\"></b><b class=\"card__back\"><b class=\"card__bottom\"></b></b></b>' +
            '<span class=\"flip-clock__slot\">' + label + '</span>';

        this.el = el;

        var top = el.querySelector('.card__top'),
            bottom = el.querySelector('.card__bottom'),
            back = el.querySelector('.card__back'),
            backBottom = el.querySelector('.card__back .card__bottom');

        this.update = function (val) {
            if (val > 99) {
                val = ('0' + val).slice(-3);
            }
            else {
                val = ('0' + val).slice(-2);
            }

            if (val !== this.currentValue) {

                if (this.currentValue >= 0) {
                    back.setAttribute('data-value', this.currentValue);
                    bottom.setAttribute('data-value', this.currentValue);
                }
                this.currentValue = val;
                top.innerText = this.currentValue;
                backBottom.setAttribute('data-value', this.currentValue);

                this.el.classList.remove('flip');
                void this.el.offsetWidth;
                this.el.classList.add('flip');
            }
        };
        this.update(value);
    }

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        return {
            Total: t,
            Days: Math.floor(t / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((t / (1000 * 60 * 60)) % 24),
            Minutes: Math.floor((t / 1000 / 60) % 60),
            Seconds: Math.floor((t / 1000) % 60)
        };
    }

    function Clock(countdown, callback) {
        callback = callback || function () { };

        var updateFn = getTimeRemaining;

        this.el = document.createElement('div');
        this.el.className = 'row justify-content-center flip-clock';

        var trackers = {},
            t = updateFn(countdown),
            key, timeinterval;

        for (key in t) {
            if (key === 'Total') { continue; }
            trackers[key] = new vtTracker(key, t[key]);
            this.el.appendChild(trackers[key].el);
        }

        var i = 0;
        function updateClock() {
            timeinterval = requestAnimationFrame(updateClock);

            if (i++ % 10) { return; }

            var current = updateFn(countdown);
            if (current.Total < 0) {
                cancelAnimationFrame(timeinterval);
                for (key in trackers) {
                    trackers[key].update(0);
                }
                callback();
                return;
            }

            for (key in trackers) {
                trackers[key].update(current[key]);
            }
        }

        setTimeout(updateClock, 500);
    }

    function initCountdown() {
        var targetDate = '2026-01-06T10:00:00';
        var clock = new Clock(targetDate, function () {
            // Callback when countdown ends
        });

        var container = document.getElementsByClassName('wowFd')[0];
        if (container) {
            container.appendChild(clock.el);
        }
    }

    function openInvitation() {
        $('body').removeClass('modal-opened');
        $('.modalUndangan').animate({ top: '100vh', opacity: '0' }, 700, 'linear');
        $('.btnHalamanAwal').css('display', 'none');

        var audio = $('#myAudio').get(0);
        if (audio) {
            audio.play();
        }

        if (typeof WOW === 'function') {
            new WOW().init();
        }
    }
    window.openInvitation = openInvitation;

    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });

    var isPlaying = true;
    function toggleAudio() {
        var btn = $('.btnSong');
        var audio = document.getElementById('myAudio');
        if (!audio) {
            return;
        }

        if (!isPlaying) {
            audio.play();
            isPlaying = true;
            btn.html('<i class=\"fa fa-volume-up\" style=\"font-size:20px;margin-top:6px;\"></i>');
        } else {
            audio.pause();
            isPlaying = false;
            btn.html('<span class=\"fa-stack fa-2x\" style=\"font-size: 20px;margin-left: -6px;margin-top:-1px;\"><i class=\"fa fa-solid fa-volume-off fa-stack-1x\"></i><i class=\"fa fa-solid fa-times fa-stack-2x\" style=\"color:Tomato;font-size: 14px;margin-top: 13px!important;margin-left: 6px!important;\"></i></span>');
        }
    }

    function bindAudioButton() {
        $('.btnSong').off('click', toggleAudio).on('click', toggleAudio);
    }

    function enableSmoothScroll() {
        $('a[href*=\"#\"]').not('[href=\"#\"]').not('[href=\"#0\"]').not('[href^=\"#collapse\"]').not('[href^=\"#cek\"]').click(function (event) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 400, function () {
                        var $target = $(target);
                        $target.focus();
                        if (!$target.is(':focus')) {
                            $target.attr('tabindex', '-1');
                            $target.focus();
                        }
                    });
                }
            }
        });
    }

    function blockShortcuts() {
        document.onkeydown = function (e) {
            if (!e) {
                return true;
            }
            if (e.keyCode === 123) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
                return false;
            }
            return true;
        };
    }

    function blockContextMenu() {
        if (document.addEventListener) {
            document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            }, false);
        } else if (document.attachEvent) {
            document.attachEvent('oncontextmenu', function () {
                window.event.returnValue = false;
            });
        }
    }

    function initDownloadQr() {
        $('.btn-block-all').click(function (event) {
            event.preventDefault();
            var checkwidth = $('#nmt').val();
            var mxwidth = $('#nmttwo').val();
            var mxWidthResponsive = $('#nmtthree').val();
            $('.btn-block-all').prop('disabled', true);
            $('.mx-auto-width').html(mxwidth);

            if (typeof html2canvas !== 'function') {
                $('.mx-auto-width').html(mxWidthResponsive);
                $('.btn-block-all').prop('disabled', false);
                return;
            }

            html2canvas($('.row-container')[0], {
                logging: false,
                letterRendering: 1,
                proxy: 'https://app.sangmempelai.id/',
                useCORS: true
            }).then(function (canvas) {
                $('.mx-auto-width').html(mxWidthResponsive);
                var truewidth = checkwidth;
                var a = document.createElement('a');
                a.href = canvas.toDataURL('image/png', 1.0);
                a.download = truewidth;
                a.click();
                $('.btn-block-all').prop('disabled', false);
            });
        });
    }

    function prosesKonfirmasiKehadiran() {
        $('#simpanKonfirmasiKehadiran').attr('disabled', true);
        $('#simpanKonfirmasiKehadiran').html('<i class=\"fa fa-spinner fa-pulse fa-fw\"></i> Loading');

        var url = 'https://app.sangmempelai.id/cetak_web/prosesKonfirmasiKehadiran';

        var data = {
            undangan_konfirmasi_kehadiran: $('#undangan_konfirmasi_kehadiran').val(),
            linkto_konfirmasi_kehadiran: $('#linkto_konfirmasi_kehadiran').val(),
            nama_konfirmasi_kehadiran: $('#nama_konfirmasi_kehadiran').val(),
            telepon_konfirmasi_kehadiran: $('#telepon_konfirmasi_kehadiran').val(),
            email_konfirmasi_kehadiran: $('#email_konfirmasi_kehadiran').val(),
            info_konfirmasi_kehadiran: $('input[type=radio][name=info_konfirmasi_kehadiran]:checked').val(),
            jumlah_konfirmasi_kehadiran: $('#jumlah_konfirmasi_kehadiran').val(),
            keterangan_konfirmasi_kehadiran: $('#keterangan_konfirmasi_kehadiran').val()
        };

        $.ajax({
            url: url,
            data: data,
            method: 'POST',
            dataType: 'json',
            success: function (result) {
                if (result.code === 0) {
                    $('#simpanKonfirmasiKehadiran').attr('disabled', true);
                    $('#simpanKonfirmasiKehadiran').html('<i class=\"fa fa-save\"></i> Simpan');
                    $('#isiKonfirmasiKehadiran').css('display', 'none');
                    $('#suksesKonfirmasiKehadiran').css('display', 'block');
                    $('#modalKonfirmasiKehadiran').modal('hide');
                } else {
                    $('#simpanKonfirmasiKehadiran').attr('disabled', false);
                    $('#simpanKonfirmasiKehadiran').html('<i class=\"fa fa-save\"></i> Simpan');
                    $('#alertKonfirmasiKehadiran').html('<div class=\"alert alert-info\">' + result.message + '</div>');
                }
            }
        });
    }
    window.prosesKonfirmasiKehadiran = prosesKonfirmasiKehadiran;

    var SUPABASE_URL = window.SUPABASE_URL || 'https://your-project.supabase.co';
    var SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'your-anon-key';
    var supabaseClient = null;

    function renderWishList(wishes) {
        var container = $('#comments-container');
        container.empty();
        if (!wishes || !wishes.length) {
            container.append('<p class=\"text-light\">Belum ada ucapan.</p>');
            return;
        }
        wishes.forEach(function (item) {
            var wrapper = $('<div class=\"text-left mb-3 p-3\" style=\"background: rgba(255,255,255,0.06); border:1px solid #dd9f49; border-radius:8px;\"></div>');
            var name = $('<strong class=\"d-block text-light\"></strong>').text(item.nama || 'Tamu');
            var msg = $('<p class=\"mb-1 text-light\"></p>').text(item.pesan || '');
            var time = $('<small class=\"text-light\"></small>').text(item.created_at ? new Date(item.created_at).toLocaleString() : '');
            wrapper.append(name, msg, time);
            container.append(wrapper);
        });
    }

    async function loadWishes() {
        var container = $('#comments-container');
        if (!supabaseClient) {
            container.append('<p class=\"text-warning\">Konfigurasi Supabase belum diisi.</p>');
            return;
        }
        container.html('<p class=\"text-light\">Memuat ucapan...</p>');
        var result = await supabaseClient.from('wishes').select('id, nama, pesan, created_at').order('created_at', { ascending: false }).limit(50);
        if (result.error) {
            container.html('<p class=\"text-warning\">Gagal memuat ucapan.</p>');
            console.error(result.error);
            return;
        }
        renderWishList(result.data || []);
    }

    async function submitWish() {
        if (!supabaseClient) {
            alert('Supabase belum dikonfigurasi.');
            return;
        }
        var nama = ($('#nama_komentar_undangan').val() || '').trim() || 'Tamu';
        var pesan = ($('#isi_komentar_undangan').val() || '').trim();
        if (!pesan) {
            alert('Isi ucapan terlebih dahulu.');
            return;
        }
        var btn = $('#kirimKomentar');
        btn.prop('disabled', true).text('Mengirim...');
        var result = await supabaseClient.from('wishes').insert([{ nama: nama, pesan: pesan }]);
        btn.prop('disabled', false).html('<i class=\"fa fa-paper-plane\"></i> Kirim Ucapan');
        if (result.error) {
            alert('Gagal mengirim ucapan.');
            console.error(result.error);
            return;
        }
        $('#isi_komentar_undangan').val('');
        loadWishes();
    }

    function initSupabaseGuestbook() {
        if (!window.supabase || !SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.indexOf('your-project') !== -1 || SUPABASE_ANON_KEY === 'your-anon-key') {
            $('#comments-container').html('<p class=\"text-warning\">Supabase belum dikonfigurasi. Isi SUPABASE_URL dan SUPABASE_ANON_KEY.</p>');
            return;
        }
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        $('#kirimKomentar').off('click').on('click', submitWish);
        loadWishes();
    }

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                alert('Berhasil Salin Nomor Rekening: ' + text);
            } else {
                alert('Gagal menyalin. Silakan salin secara manual.');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            alert('Gagal menyalin. Silakan salin secara manual.');
        }

        document.body.removeChild(textArea);
    }

    function copasLink(value) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value).then(function () {
                alert('Berhasil Salin Nomor Rekening: ' + value);
            }).catch(function (err) {
                console.error('Gagal menyalin: ', err);
                fallbackCopyTextToClipboard(value);
            });
        } else {
            fallbackCopyTextToClipboard(value);
        }
    }
    window.copasLink = copasLink;

    function checkBrowser() {
        if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
        } else if (navigator.userAgent.indexOf('Edge') !== -1) {
        } else if (navigator.userAgent.indexOf('UCBrowser') !== -1) {
            $('#notSupport').modal('show');
        } else if (navigator.userAgent.indexOf('MiuiBrowser') !== -1) {
            $('#notSupport').modal('show');
        } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
        } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        } else if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) {
        } else { }
        if (navigator.userAgent.match(/samsung/i)) {
            $('#notSupport').modal('show');
        }
    }

    function initNavbarDrag() {
        var sliderNv = document.querySelector('.navbar');
        if (!sliderNv) {
            return;
        }

        var isDown = false;
        var startX;
        var scrollLeft;

        sliderNv.addEventListener('mousedown', function (e) {
            isDown = true;
            sliderNv.classList.add('active');
            startX = e.pageX - sliderNv.offsetLeft;
            scrollLeft = sliderNv.scrollLeft;
        });
        sliderNv.addEventListener('mouseleave', function () {
            isDown = false;
            sliderNv.classList.remove('active');
        });
        sliderNv.addEventListener('mouseup', function () {
            isDown = false;
            sliderNv.classList.remove('active');
        });
        sliderNv.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - sliderNv.offsetLeft;
            var walk = (x - startX) * 3;
            sliderNv.scrollLeft = scrollLeft - walk;
        });
    }

    function animateHeaderName() {
        var ctnt = 'Salsa & Sefri';
        var elen = '<span>' + ctnt.split('').join('</span><span>') + '</span>';
        var optn = document.getElementsByClassName('fontSecondaryTwo');
        for (var index = 0; index < optn.length; ++index) {
            optn[index].innerHTML = optn[index].innerHTML.replace(/\&nbsp;/g, '');
        }
        $(elen).hide().appendTo('.fontSecondaryTwo').each(function (i) {
            $(this).delay(100 * i).css({
                display: 'inline',
                opacity: 0
            }).animate({
                opacity: 1
            }, 100);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({ appId: '550695616171149', autoLogAppEvents: true, xfbml: true, version: 'v3.2' });
    };

    $(function () {
        checkBrowser();
        initNavigation();
        initParticles();
        initCountdown();
        bindAudioButton();
        enableSmoothScroll();
        initNavbarDrag();
        animateHeaderName();
        initDownloadQr();
        initSupabaseGuestbook();
    });
})();
