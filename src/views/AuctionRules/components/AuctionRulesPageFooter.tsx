const AuctionRulesPageFooter = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-border-primary flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-surface-primary flex items-center justify-center border border-border-primary">
          <span className="text-brand-primary font-black text-xs">AB</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-content-primary uppercase tracking-widest">Правила платформи</div>
          <div className="text-[9px] font-mono text-content-tertiary">Оновлено: травень 2026</div>
        </div>
      </div>
      <p className="text-center md:text-right text-[11px] text-content-tertiary max-w-md leading-relaxed">
        Зовнішні посилання відкриваються в новій вкладці. Офіційні формулювання залишаються на стороні Telegraph-статей.
      </p>
    </footer>
  );
}

export default AuctionRulesPageFooter;