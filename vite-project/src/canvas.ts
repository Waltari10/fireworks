/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const canvas: HTMLCanvasElement = document!.getElementById('canvas') as NonNullable<HTMLCanvasElement>
export const ctx = canvas.getContext('2d')!
