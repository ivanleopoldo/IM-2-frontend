document.querySelectorAll('.appbar li a').
    forEach(link => {
        if(link.href === window.location.href){
            link.setAttribute('aria-current', 'page');
        }
    });
