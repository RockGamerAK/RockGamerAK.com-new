document.querySelectorAll('.site-grid .grid .item .image-link').forEach(function(a, i) {
    a.style.backgroundImage = `url(https://image.thum.io/get/maxAge/12/width/${a.clientWidth*2}/${a.href})`
})
document.querySelectorAll('.site-grid .grid').forEach(function(g, i) {
    var eles = g.querySelectorAll('.item')
    var amt = eles.length
    var mod = amt % 3
    if (mod === 1) {
        eles[eles.length-1].classList.add('center')
    }
    else if (mod === 2) {
        eles[eles.length-2].classList.add('left')
        eles[eles.length-1].classList.add('right')
    }
})