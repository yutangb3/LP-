/*スクロールアニメーション*/
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
});
