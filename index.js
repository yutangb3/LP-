/*スクロールアニメーション*/
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.svg_text');
    const overlay = document.querySelector('.fake_first_view');
    const header = document.querySelector('.frame_header');
    const first_view = document.querySelector('.first_view');
    const scroll_space = document.querySelector('.scroll_space');
    const first_view_content = document.querySelector('.first_view_content');
    const scroll_lead = document.querySelector('.scroll_lead');

    window.addEventListener('scroll', () => {
        const vh = window.innerHeight;
        const progress = Math.min(window.scrollY / vh, 1);
        const scale = 4 + progress * 100;
        const opacity_overlay = 1 - Math.max(progress - 0.7, 0) / 0.3;
        const opacity_appear = Math.max(progress - 0.9, 0) / 0.1;
        const opacity_scroll_lead = Math.max(0.4 - progress, 0) / 0.4;

        console.log({
            scrollY: window.scrollY,
            vh: vh,
            progress: progress,
            scale: scale
        });
        text.style.transform = `translate(723px,400px) scale(${scale})`;
        overlay.style.opacity = opacity_overlay;
        header.style.opacity = opacity_appear;
        scroll_lead.style.opacity = opacity_scroll_lead;
        first_view_content.style.opacity = opacity_appear;
    });



    const school_buttons = document.querySelectorAll('.schoolname_text');
    const rotate_buttons = document.querySelectorAll('.access_button');
    const cards = document.querySelectorAll('.schedule_place_card');
    const front_back_area = document.querySelectorAll('.front_back_area');

    school_buttons.forEach(button => {
        button.addEventListener('click', () => {
            front_back_area.forEach(card => {
                card.classList.remove('active');
            });
            const target = button.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });

    rotate_buttons.forEach(rotate_button => {
        rotate_button.addEventListener('click', () => {
            const id = rotate_button.dataset.target;
            const front_backs = document.getElementById(id);
            front_back_area.forEach(area => {
                area.classList.toggle('rotate');
            });
        });
    });

    const faq_element = document.querySelectorAll('.faq_element');
    const faq_element_a_all = document.querySelectorAll('.faq_element_a');
    const faq_title = document.querySelectorAll('.faq_title');
    const faq_button = document.querySelectorAll('.faq_button');

    faq_element.forEach(faq => {
        faq.addEventListener('click', () => {
            const faq_id = faq.dataset.target;
            const faq_element_a = document.getElementById(faq_id);
            if (faq_element_a.classList.contains('faq_open')) {
                faq.querySelector('.faq_button').classList.remove('arrow_rotate');
                faq_element_a.classList.remove('faq_open');
            } else {
                faq_element_a_all.forEach(faq_a => {
                    faq_a.classList.remove('faq_open');
                });
                faq_button.forEach(button => {
                    button.classList.remove('arrow_rotate');
                });
                faq_element_a.classList.add('faq_open');
                faq.querySelector('.faq_button').classList.add('arrow_rotate');
            }
        });
    });

    const hamburger_menu = document.querySelector('.hamburger_menu');
    const header_menu = document.querySelector('.header_menus');
    hamburger_menu.addEventListener('click', () => {
        header_menu.classList.toggle('hide');
    });

    header_menu.querySelectorAll('a').forEach(button => {
        button.addEventListener('click', () => {
            header_menu.classList.toggle('hide');
        });
    });
    let pastscrollY = 0;
    let scroll_time;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.frame_header');
        if (pastscrollY >= window.scrollY) {
            header.classList.remove('scroll_hide');
        } else {
            header.classList.add('scroll_hide');
        };
        pastscrollY = window.scrollY;
    });

    const scroll_space_2 = document.querySelector('.scroll_space_2');
    const track = document.querySelector('.track');
    const lesson_content = document.querySelectorAll('.lesson_content');
    const lesson_name_time = document.querySelectorAll('.lesson_name_time');

    function tiktok_scroll() {
        const tiktok_scrollY = scroll_space_2.getBoundingClientRect();
        if (tiktok_scrollY.top <= 0 && tiktok_scrollY.top >= -(584 * 2)) {
            lessonScroll = true;
            track.style.transform = `translateY(${tiktok_scrollY.top}px)`;
        }

        lesson_name_time.forEach(lesson_name_time => {
            lesson_name_time.classList.remove('active');
        });

        lesson_content.forEach(lesson_content => {
            lesson_content.classList.remove('active');
        });

        if (tiktok_scrollY.top > -584 + 3) {
            lesson_content[0].classList.add('active');
            lesson_name_time[0].classList.add('active');
        } else if (tiktok_scrollY.top <= -584 + 3 && tiktok_scrollY.top > (-584 * 2) + 3) {
            lesson_content[1].classList.add('active');
            lesson_name_time[1].classList.add('active');
        } else if (tiktok_scrollY.top <= (-584 * 2) + 3) {
            lesson_content[2].classList.add('active');
            lesson_name_time[2].classList.add('active');
        }

        let currentIndex = 0;
        let pastIndex = -1;

        const lesson_text_transition = document.querySelectorAll('.lesson_text_transition');
        clearTimeout(scroll_time);
        scroll_time = setTimeout(() => {
            const tiktok_scrollY = scroll_space_2.getBoundingClientRect();
            const scroll_position = window.scrollY + tiktok_scrollY.top;
            console.log(scroll_position);
            currentIndex = Math.min(2, Math.max(0, Math.floor((Math.abs(tiktok_scrollY.top) + 292) / 584)));
            if (tiktok_scrollY.top < 0 && tiktok_scrollY.top > -(584 * 2)) {
                window.scrollTo({
                    top: Math.floor(scroll_position + currentIndex * 584),
                    behavior: "smooth"
                });
            }


            if (pastIndex !== currentIndex) {
                lesson_text_transition.forEach(text => {
                    text.classList.remove('active');
                });
            };

            lesson_text_transition[currentIndex * 4 + 0].classList.add('active');
            lesson_text_transition[currentIndex * 4 + 1].classList.add('active');
            lesson_text_transition[currentIndex * 4 + 2].classList.add('active');
            pastIndex = currentIndex;

        }, 80);
    }

    let ticking = false;

    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    tiktok_scroll();
                    ticking = false;
                });
            }
        }, { passive: true });

        const sp_time = document.querySelector('.sp_time');
        setInterval(() => {
            const now = new Date();
            const hour = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            sp_time.textContent = `${hour}:${minutes}`;
        }, 1000);

    }
    /*下からふわっと浮かび上がってくる */
    const before_animations = document.querySelectorAll('.before_animation');
    const observer_1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('before_animation');
                entry.target.classList.add('after_animation');
                observer_1.unobserve(entry.target);
            }
        });
    });

    before_animations.forEach(before_animation => {
        observer_1.observe(before_animation);
    })


    const before_animations_lefts = document.querySelectorAll('.before_animation_left')
    const observer_2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('before_animation_left');
                entry.target.classList.add('after_animation_right');
                observer_2.unobserve(entry.target);
            }
        });
    });

    before_animations_lefts.forEach(before_animations_left => {
        observer_2.observe(before_animations_left);
    })

    const before_animations_rights = document.querySelectorAll('.before_animation_right')
    const observer_3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('before_animation_right');
                entry.target.classList.add('after_animation_left');
                observer_3.unobserve(entry.target);
            }
        });
    });

    before_animations_rights.forEach(before_animations_right => {
        observer_3.observe(before_animations_right);
    })

    const animation_scales = document.querySelectorAll('.animation_scale');
    const observer_4 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.scale = "1.1";
                setTimeout(() => {
                    entry.target.style.scale = "1.0";
                    observer_4.unobserve(entry.target);
                }, 250);
            }
        });
    }, {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0
    });

    animation_scales.forEach(animation_scale => {
        observer_4.observe(animation_scale);
    });

    const frame_header = document.querySelector('.frame_header');
    const frame_lesson = document.querySelector('.frame_lesson');
    const observer_5 = new IntersectionObserver((entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                frame_header.style.opacity = "0";
            } else {
                frame_header.style.opacity = "1";
            }
        });
    }));

    observer_5.observe(frame_lesson);

    const voice_imgs = document.querySelectorAll('.voice_img');
    const voice_cards = document.querySelectorAll('.voice_card');
    const observer_6 = new IntersectionObserver((entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                voice_imgs.forEach(voice_img => {
                    voice_img.classList.remove('cut_img');
                });
                observer_6.unobserve(entry.target);
            }
        });
    }), {
        rootMargin: "0% 0% -80% 0%",
        threshold: 0
    });

    voice_cards.forEach(voice_card => {
        observer_6.observe(voice_card);
    });


});


