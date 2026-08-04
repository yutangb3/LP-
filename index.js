/*スクロールアニメーション*/
document.addEventListener('DOMContentLoaded',()=>{
const school_buttons=document.querySelectorAll('.schoolname_text');
    const rotate_buttons=document.querySelectorAll('.access_button');
    const cards=document.querySelectorAll('.schedule_place_card');
    const front_back_area=document.querySelectorAll('.front_back_area');

    school_buttons.forEach(button =>{
        button.addEventListener('click',() =>{
            front_back_area.forEach(card=>{
                card.classList.remove('active');
            });
            const target=button.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });

    rotate_buttons.forEach(rotate_button =>{
        rotate_button.addEventListener('click',()=>{
            const id=rotate_button.dataset.target;
            const front_backs=document.getElementById(id);
            front_back_area.forEach(area =>{
                area.classList.toggle('rotate');
            });
        });
    });

    const faq_element=document.querySelectorAll('.faq_element');
    const faq_element_a_all=document.querySelectorAll('.faq_element_a');
    const faq_title=document.querySelectorAll('.faq_title');
    const faq_button=document.querySelectorAll('.faq_button');

    faq_element.forEach(faq =>{
        faq.addEventListener('click',()=>{
            const faq_id=faq.dataset.target;
            const faq_element_a=document.getElementById(faq_id);
            if(faq_element_a.classList.contains('faq_open')){
                faq.querySelector('.faq_button').classList.remove('arrow_rotate');
                faq_element_a.classList.remove('faq_open');
            }else{
                faq_element_a_all.forEach(faq_a=>{
                    faq_a.classList.remove('faq_open');
                });
                faq_button.forEach(button=>{
                     button.classList.remove('arrow_rotate');
                });
                faq_element_a.classList.add('faq_open');
                faq.querySelector('.faq_button').classList.add('arrow_rotate');
            }
        });
    });

    const hamburger_menu=document.querySelector('.hamburger_menu');
    const header_menu=document.querySelector('.header_menus');
    hamburger_menu.addEventListener('click',()=>{
        header_menu.classList.toggle('hide');
    });

    header_menu.querySelectorAll('a').forEach(button=>{
        button.addEventListener('click',()=>{
            header_menu.classList.toggle('hide');
        });
    });
    let pastscrollY=0;
    window.addEventListener('scroll',()=>{
        const header=document.querySelector('.frame_header');
        if(pastscrollY>=window.scrollY){
            header.classList.add('scroll_hide');
        }else{
            header.classList.add('scroll_hide');
        };
        pastscrollY=window.scrollY;
    });

    const scroll_space_2=document.querySelector('.scroll_space_2');
    const track=document.querySelector('.track');
    let currentIndex=0;
    let pastIndex=0;
    window.addEventListener('scroll',()=>{
        const lesson_content=document.querySelectorAll('.lesson_content');
        const lesson_name_time=document.querySelectorAll('.lesson_name_time');
        const tiktok_scrollY=scroll_space_2.getBoundingClientRect();
        const lesson_text_transition=document.querySelectorAll('.lesson_text_transition');
        if(tiktok_scrollY.top<0 && tiktok_scrollY.top>-(584*2)){
            track.style.transform=`translateY(${tiktok_scrollY.top}px)`;
        }
        lesson_content.forEach(content=>{
            content.classList.remove('active');
        });
        lesson_name_time.forEach(name_time=>{
            name_time.classList.remove('active');
        });
        const scroll_position=window.scrollY+tiktok_scrollY.top;

        if(tiktok_scrollY.top>0){
            lesson_content[0].classList.add('active');
            lesson_name_time[0].classList.add('active');
        }else if(tiktok_scrollY.top>-584 && tiktok_scrollY.top<0){
            pastIndex=currentIndex;
            currentIndex=0;
            lesson_content[0].classList.add('active');
            lesson_name_time[0].classList.add('active');
            if(pastIndex!=currentIndex){
                window.scrollTo({
                    top:scroll_position,
                    behavior:"smooth"
                });
            }
        }else if(tiktok_scrollY.top<=-584 && tiktok_scrollY.top>-584*2){
            pastIndex=currentIndex;
            currentIndex=1;
            lesson_content[1].classList.add('active');
            lesson_name_time[1].classList.add('active');
            if(pastIndex!=currentIndex){
                window.scrollTo({
                    top:scroll_position+584,
                    behavior:"smooth"
                });
            }
        }else if(tiktok_scrollY.top<=-584*2 && tiktok_scrollY.top>-584*3){
            pastIndex=currentIndex;
            currentIndex=2;
            lesson_content[2].classList.add('active');
            lesson_name_time[2].classList.add('active');
            if(pastIndex!=currentIndex){
                window.scrollTo({
                    top:scroll_position+584*2,
                    behavior:"smooth"
                });
            }
        }else if(tiktok_scrollY.top>-584*3){
            lesson_content[2].classList.add('active');
            lesson_name_time[2].classList.add('active');
        };

        
    });
        
});
