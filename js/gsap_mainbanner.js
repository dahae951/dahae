gsap.timeline()
      .add(centerMain(), 0.2)
      .from('.ball',    {
          duration: 2,
          transformOrigin: '50% 50%',
          scale: 0,
          opacity: 0,
          ease: 'elastic',
          stagger: 0.2
        }, 0)
      

  function centerMain() {
    gsap.set('.main', { x: '50%', xPercent: -50, y: '50%', yPercent: -50 });
  }
  window.onresize = centerMain;

  window.onmousemove = (e) => {
    let winPercent = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        distFromCenter = 1 - Math.abs((e.clientX - window.innerWidth / 2) / window.innerWidth * 2);

    gsap.timeline({ defaults: { duration: 0.5, overwrite: 'auto' } })
        .to('.fillLight', { opacity: distFromCenter }, 0)
        .to('.bg', { x: 100 - 200 * winPercent.x, y: 20 - 40 * winPercent.y }, 0)
  }