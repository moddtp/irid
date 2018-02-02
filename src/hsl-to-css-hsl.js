export default function hslToCSSHSL (hsl) {
  return (
    "hsl" +
    (hsl.a ? "a" : "") +
    "(" +
    Math.round(hsl.h * 360) +
    ", " +
    Math.round(hsl.s * 100) +
    "%, " +
    Math.round(hsl.l * 100) +
    "%" +
    (hsl.a ? ", " + hsl.a.toFixed(2) : "") +
    ")"
  );
}
