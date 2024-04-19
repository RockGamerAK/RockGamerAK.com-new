var largestWidth = 0
document.querySelectorAll('.nav-btn').forEach(function(b, i) {
    if (b.clientWidth > largestWidth) largestWidth = b.clientWidth
})
document.querySelector('.nav-btn').parentNode.style.setProperty('--min-width', `${largestWidth/16}rem`)

function goToUrl(btn, target) {
    var link = btn
    if (typeof link !== 'string') {
        link = btn.getAttribute('url')
        target = btn.getAttribute('target')
        if (!!target === false) {
            if (link.includes('://')) target = '_blank'
        }
    }
    if (!!target === false || target == null) target = '_self'
    if (!!link === false) link = '/'
    if (target === '_blank') {
        window.open(link)
    }
    else if (target === '_parent') {
        parent.location.href = link
    }
    else if (target === '_top') {
        top.location.href = link
    }
    else if (target.startsWith('_') === false) {
        document.getElementById(target).src = link
    }
    else if (target === '_self') {
        location.href = link
    }
    else {
        location.href = link
    }
}