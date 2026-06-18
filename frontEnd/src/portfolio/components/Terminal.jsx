import { useEffect, useState } from "react";

/**
 * Terminal — the self-typing hero terminal on /tech. Types out a short scripted
 * `whoami` session, then leaves a blinking prompt. Decorative (aria-hidden).
 * Script stays in English on purpose — terminals speak English.
 */
const SCRIPT = [
  { cmd: "whoami", out: ["vardges — full-stack developer · dubai"] },
  { cmd: "cat focus.txt", out: ["web platforms · cloud · security · automation"] },
  { cmd: "./status --check", out: ["[ OK ]  open_to_work=true"] },
];

const Terminal = () => {
  const [lines, setLines] = useState([]); // rendered history
  const [typed, setTyped] = useState(""); // current command being typed
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SCRIPT.length) return undefined;
    const { cmd, out } = SCRIPT[step];
    let i = 0;
    let outTimer;
    const typeTimer = setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(typeTimer);
        outTimer = setTimeout(() => {
          setLines((prev) => [...prev, { cmd, out }]);
          setTyped("");
          setStep((s) => s + 1);
        }, 450);
      }
    }, 55);
    return () => {
      clearInterval(typeTimer);
      clearTimeout(outTimer);
    };
  }, [step]);

  return (
    <div className="vp-terminal" dir="ltr" aria-hidden="true">
      <div className="vp-terminal__bar">
        <span className="vp-terminal__dot vp-terminal__dot--r" />
        <span className="vp-terminal__dot vp-terminal__dot--y" />
        <span className="vp-terminal__dot vp-terminal__dot--g" />
        <span className="vp-terminal__title">vardges@dubai: ~</span>
      </div>
      <div className="vp-terminal__body">
        {lines.map((l) => (
          <div key={l.cmd}>
            <p className="vp-terminal__cmd">
              <span className="vp-terminal__prompt">→&nbsp;~&nbsp;$</span> {l.cmd}
            </p>
            {l.out.map((o) => (
              <p className="vp-terminal__out" key={o}>
                {o}
              </p>
            ))}
          </div>
        ))}
        {step < SCRIPT.length && (
          <p className="vp-terminal__cmd">
            <span className="vp-terminal__prompt">→&nbsp;~&nbsp;$</span> {typed}
            <span className="vp-terminal__caret" />
          </p>
        )}
        {step >= SCRIPT.length && (
          <p className="vp-terminal__cmd">
            <span className="vp-terminal__prompt">→&nbsp;~&nbsp;$</span>
            <span className="vp-terminal__caret" />
          </p>
        )}
      </div>
    </div>
  );
};

export default Terminal;
