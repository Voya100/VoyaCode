import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {

  // Converts hsl to rgb with the power of math
  hslToRgb([hue, saturation, lightness]: number[]){
    
    if(saturation === 0){
      return [255, 255, 255];
    }

    hue /= 360;
    saturation /= 100;
    lightness /= 100;

    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    const red = this.hueTransform(p, q, hue + 1/3);
    const green = this.hueTransform(p, q, hue);
    const blue = this.hueTransform(p, q, hue - 1/3);

    return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
  }

  rgbToHsl([red, green, blue]: number[]){
    red /= 255, green /= 255, blue /= 255;
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2;
    let saturation = lightness;
    let hue = lightness;

    if(max === min){
      hue = saturation = 0;
    }else{
      const d = max - min;
      saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
        case green: hue = (blue - red) / d + 2; break;
        case blue: hue = (red - green) / d + 4; break;
      }
      hue /= 6;
    }

    return [hue*360, saturation*100, lightness*100];
  }

  // Helps to create optimal contrast with background
  getContrastColor(red: number, green: number, blue: number){
    const L = 0.2126 * red/255 + 0.7152 * green/255 + 0.0722 * blue/255;
    return L > 0.5 ? 'black' : 'white';
  }
  
  // Helper function for hslToRgb
  private hueTransform(p: number, q: number, t: number){
    if(t < 0){ t += 1; }
    if(t > 1){ t -= 1; }
    if(t < 1/6){ return p + (q - p) * 6 * t; }
    if(t < 1/2){ return q; }
    if(t < 2/3){ return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
}
