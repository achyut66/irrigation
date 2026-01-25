declare module "@sbmdkl/nepali-date-converter" {
    export class NepaliDateConverter {
      adToBs(year: number, month: number, day: number): {
        bsYear: number;
        bsMonth: number;
        bsDay: number;
      };
  
      bsToAd(year: number, month: number, day: number): {
        adYear: number;
        adMonth: number;
        adDay: number;
      };
    }
  }
  