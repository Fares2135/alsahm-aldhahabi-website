// تفاعلات خفيفة: القائمة الجوّالة، ظل الترويسة، الظهور عند التمرير
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // عدّاد الأرقام في شرائط الإحصائيات
  function countUp(el) {
    var m = el.textContent.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
    if (!m) return;
    var target = parseInt(m[2], 10), t0 = null;
    var dur = Math.min(1800, 500 + target * 30);
    function tick(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = m[1] + Math.round(target * k) + m[3];
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          countUp(en.target);
          cio.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.stat b').forEach(function (el) { cio.observe(el); });
  }

  // نموذج التواصل: يفتح بريد العميل برسالة جاهزة (لا يوجد خادم خلفي)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = 'رسالة من الموقع: ' + (d.get('subject') || 'استفسار عام');
      var body = 'الاسم: ' + d.get('name') + '\nالجوال: ' + d.get('phone') + '\nالبريد: ' + d.get('email') + '\n\n' + d.get('message');
      location.href = 'mailto:info@alsahmaldahabi.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
