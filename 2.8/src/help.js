/**
 * @file Ripple
 * @author leon <ludafa@outlook.com>
 * 参考自: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame
 */

export const requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

export const cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame;
