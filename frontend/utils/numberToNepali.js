export const toNepaliNumber = (number) => {
    const eng = "0123456789";
    const nep = "०१२३४५६७८९";
  
    return number.toString().replace(/[0-9]/g, (d) => nep[eng.indexOf(d)]);
  };