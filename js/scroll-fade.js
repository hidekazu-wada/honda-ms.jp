// JS（observer で一度表示したら unobserve）
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    root: null, // ビューポート
    rootMargin: '0px 0px -10% 0px', // 下から10%入ったら発火
    threshold: 0, // 1px 入ったら判定
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        obs.unobserve(entry.target); // 1回きりなら
      }
    });
  }, options);

  document.querySelectorAll('.fade-in-up').forEach((el) => io.observe(el));
});
