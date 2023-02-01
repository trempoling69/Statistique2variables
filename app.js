//*FONCTION DE RECUPERATION DES INPUT
let recupList = () => {
  let valueX = 0;
  let valueY = 0;
  let TableauX = [];
  let TableauY = [];
  valueX = document.getElementById("valueXlist").value;
  valueY = document.getElementById("valueYlist").value;
  let TableauXString = valueX.split(",");
  let TableauYString = valueY.split(",");
  for (let index = 0; index < TableauXString.length; index++) {
    TableauX.push(parseFloat(TableauXString[index]));
  }
  for (let index = 0; index < TableauYString.length; index++) {
    TableauY.push(parseFloat(TableauYString[index]));
  }
  return {
    TableauX: TableauX,
    TableauY: TableauY
  };
};

//*FONCTIONS D'AFFICHAGE
let affichageListBasique = () => {
  affichage("ListX").textContent += `${recupList().TableauX}`;
  affichage("ListY").textContent += `${recupList().TableauY}`;
};

let affichageListSlice = (tab, id) => {
  affichage(`list${id}G1`).textContent += `[${sliceList(tab).firstList}]`;
  affichage(`list${id}G2`).textContent += `[${sliceList(tab).secondList}]`;
};

let affichageCoordonnePoint = (tabx, taby, point) => {
  affichage(`result${point}`).textContent += `${point}( ${
    calculcoordonneG(tabx, taby)[`X${point}`]
  } ; ${calculcoordonneG(tabx, taby)[`Y${point}`]} )`;
};

let affichageCalcula = (tabx, taby) => {
  affichage("calcula").textContent += `a = (${
    calculcoordonneG(tabx, taby).Yg2
  } - ${calculcoordonneG(tabx, taby).Yg1}) / (${
    calculcoordonneG(tabx, taby).Xg2
  } - ${calculcoordonneG(tabx, taby).Xg1})`;
};

let affichagea = (tabx, taby) => {
  affichage("resulta").textContent += `${calcula(tabx, taby).a}`;
};

let affichageEquationPourb = (tabx, taby) => {
  affichage("equationPourb").textContent += `b =  ${
    calculcoordonneG(tabx, taby).Yg1
  } - ${calcula(tabx, taby).a} *  ${calculcoordonneG(tabx, taby).Xg1}`;
};

let affichageb = (tabx, taby) => {
  affichage("resultb").textContent += `b = ${calculb(tabx, taby).b}`;
};

let affichageEquationMayer = (tabx, taby) => {
  affichage("equationMayer").textContent += `y = ${
    calcula(tabx, taby).a
  } * x + ${calculb(tabx, taby).b}`;
};

//?spe méthode covariance

let affichageCov = (tabx, taby) => {
  affichage("resultCov").textContent += `covariance(x,y) = ${calculCov(
    tabx,
    taby
  )}`;
};
let affichageVarx = (tabx) => {
  affichage("resultVar").textContent += `V(x) = ${calculCov(tabx, tabx)}`;
};

let affichageaParCov = (tabx, taby) => {
  affichage("resultaParCov").textContent += `a = ${
    calculaParCov(tabx, taby).a
  }`;
};

let affichagebParCov = (tabx, taby) => {
  affichage("resultbParCov").textContent += `b = ${
    calculbParCov(tabx, taby).b
  }`;
};

let affichageEquationCov = (tabx, taby) => {
  affichage("equationCov").textContent += `y = ${
    calculaParCov(tabx, taby).a
  } * x + ${calculbParCov(tabx, taby).b}`;
};

//? spé méthode moindres carrés
let affichagem = (tabx, taby) => {
  affichage("resultatm").textContent += `m = ${calculm(tabx, taby).m}`;
};

let affichageh = (tabx, taby) => {
  affichage("resultath").textContent += `h = ${calculh(tabx, taby).h}`;
};

let affichageEquationMC = (tabx, taby) => {
  affichage("equationMC").textContent += `y = ${calculm(tabx, taby).m} * x + ${
    calculh(tabx, taby).h
  }`;
};

//? spé coeff corr

let affichageCoeffCorr = (tabx, taby) => {
  affichage("resultcoeff").textContent += `r = ${
    calculCoeffCorr(tabx, taby).r
  }`;
};

//? spé ajustement exponentiel

let affichageListZ = (taby, ecart) => {
  affichage("listz").textContent += `[${creaListz(taby, ecart).tabz}]`;
};

let affichagemZ = (tabx, tabz) => {
  affichage("resultatmZ").textContent += `m = ${calculm(tabx, tabz).m}`;
};

let affichagehZ = (tabx, tabz) => {
  affichage("resultathZ").textContent += `h = ${calculh(tabx, tabz).h}`;
};

let affichageEquationAE = (tabx, tabz) => {
  affichage("equationAE").textContent += `ln(y) = ${
    calculm(tabx, tabz).m
  } * x + ${calculh(tabx, tabz).h}`;
};

let affichageEquationFAE = (tabx, tabz) => {
  affichage("equationFAE").textContent += `y = ${Math.exp(
    calculh(tabx, tabz).h
  )} * ${Math.exp(calculm(tabx, tabz).m)} ** x`;
};

//*FONCTION DE CALCULS LOGIQUE

let affichage = (id) => {
  return document.getElementById(id);
};
let moyenneTab = (tab) => {
  let og = 0;
  let size = tab.length;
  for (let index = 0; index < size; index++) {
    og = tab[index] + og;
  }
  return og / size;
};

let calculcoordonnePoint = (tabx, taby) => {
  let x = moyenneTab(tabx);
  let y = moyenneTab(taby);
  return {
    x: x,
    y: y,
  };
};

let calculcoordonneG = (tabx, taby) => {
  let g1 = calculcoordonnePoint(
    sliceList(tabx).firstList,
    sliceList(taby).firstList
  );
  let Xg1 = g1.x;
  let Yg1 = g1.y;
  let g2 = calculcoordonnePoint(
    sliceList(tabx).secondList,
    sliceList(taby).secondList
  );
  let Xg2 = g2.x;
  let Yg2 = g2.y;
  let g = calculcoordonnePoint(tabx, taby);
  let gx = g.x;
  let gy = g.y;
  //   let Yg1 = calculcoordonnePoint(sliceList(taby).firstList);
  return {
    Xg1: Xg1,
    Yg1: Yg1,
    Xg2: Xg2,
    Yg2: Yg2,
    Xg: gx,
    Yg: gy,
  };
};

let sliceList = (tab) => {
  let middle = tab.length / 2;
  let firstPart = tab.slice(0, middle);
  let secondPart = tab.slice(middle);
  return {
    firstList: firstPart,
    secondList: secondPart,
  };
};

let calcula = (tabx, taby) => {
  let haut =
    calculcoordonneG(tabx, taby).Yg2 - calculcoordonneG(tabx, taby).Yg1;
  let bas = calculcoordonneG(tabx, taby).Xg2 - calculcoordonneG(tabx, taby).Xg1;
  let a = haut / bas;
  return {
    a: a,
  };
};

let calculb = (tabx, taby) => {
  let b =
    calculcoordonneG(tabx, taby).Yg1 -
    calcula(tabx, taby).a * calculcoordonneG(tabx, taby).Xg1;
  return {
    b: b,
  };
};

//? methode covariance

let sommearray = (tabx, taby) => {
  arraysomme = 0;
  for (let index = 0; index < tabx.length; index++) {
    arraysomme = tabx[index] * taby[index] + arraysomme;
  }
  return arraysomme;
};

let calculCov = (tabx, taby) => {
  let somme = sommearray(tabx, taby);
  cov = (1 / tabx.length) * somme - moyenneTab(tabx) * moyenneTab(taby);
  return cov;
};

let calculaParCov = (tabx, taby) => {
  let a = calculCov(tabx, taby) / calculCov(tabx, tabx);
  return {
    a: a,
  };
};

let calculbParCov = (tabx, taby) => {
  let b = moyenneTab(taby) - calculaParCov(tabx, taby).a * moyenneTab(tabx);
  return {
    b: b,
  };
};

//? methode moindres carrés
let calculm = (tabx, taby) => {
  let haut = 0;
  let bas = 0;
  let m = 0;
  for (let index = 0; index < tabx.length; index++) {
    haut =
      (tabx[index] - moyenneTab(tabx)) * (taby[index] - moyenneTab(taby)) +
      haut;
  }
  for (let index = 0; index < tabx.length; index++) {
    bas = (tabx[index] - moyenneTab(tabx)) ** 2 + bas;
  }
  m = haut / bas;
  return {
    m: m,
  };
};

let calculh = (tabx, taby) => {
  let h = moyenneTab(taby) - calculm(tabx, taby).m * moyenneTab(tabx);
  return {
    h: h,
  };
};

//? méthode coeff corrélation

let calculCoeffCorr = (tabx, taby) => {
  let haut = 0;
  let bas = 0;
  let sommx = 0;
  let sommy = 0;
  let coef = 0;
  let multi = 0;
  for (let index = 0; index < tabx.length; index++) {
    haut =
      (tabx[index] - moyenneTab(tabx)) * (taby[index] - moyenneTab(taby)) +
      haut;
  }
  for (let index = 0; index < tabx.length; index++) {
    sommx = (tabx[index] - moyenneTab(tabx)) ** 2 + sommx;
    sommy = (taby[index] - moyenneTab(taby)) ** 2 + sommy;
    bas = Math.sqrt(sommx) * Math.sqrt(sommy);
  }
  coef = haut / bas;
  return {
    r: coef,
  };
};

//? méthode ajustement exponentiel

let creaListz = (taby, ecart) => {
  tabz = [];
  for (let index = 0; index < taby.length; index++) {
    tabz.push(Math.log(taby[index] - ecart));
  }
  return {
    tabz: tabz,
  };
};

//*FONCTIONS DE RESOLUTION AVEC LES METHODES
let resolutionMayer = (tabx, taby) => {
  affichageListSlice(tabx, "X");
  affichageListSlice(taby, "Y");
  affichageCoordonnePoint(tabx, taby, "g1");
  affichageCoordonnePoint(tabx, taby, "g2");
  affichageCoordonnePoint(tabx, taby, "g");
  affichageCalcula(tabx, taby);
  affichagea(tabx, taby);
  affichageEquationPourb(tabx, taby);
  affichageb(tabx, taby);
  affichageEquationMayer(tabx, taby);
};

let resolutionCov = (tabx, taby) => {
  affichageCov(tabx, taby);
  affichageVarx(tabx);
  affichageaParCov(tabx, taby);
  affichagebParCov(tabx, taby);
  affichageEquationCov(tabx, taby);
};
let resolutionMC = (tabx, taby) => {
  affichagem(tabx, taby);
  affichageh(tabx, taby);
  affichageEquationMC(tabx, taby);
};
let resolutionCoeffCor = (tabx, taby) => {
  affichageCoeffCorr(tabx, taby);
};

let resolutionExpo = (tabx, taby) => {
  let ecart = document.getElementById("ecartZ").value;
  affichageListZ(taby, ecart);
  affichagemZ(tabx, creaListz(taby, ecart).tabz);
  affichagehZ(tabx, creaListz(taby, ecart).tabz);
  affichageEquationAE(tabx, creaListz(taby, ecart).tabz);
  affichageEquationFAE(tabx, creaListz(taby, ecart).tabz);
};

let btnsend = document.getElementById("envoyerlist");
btnsend.addEventListener("click", () => {
  let TableauX = recupList().TableauX;
  let TableauY = recupList().TableauY;
  affichageListBasique();
  resolutionMayer(TableauX, TableauY);
  resolutionCov(TableauX, TableauY);
  resolutionMC(TableauX, TableauY);
  resolutionCoeffCor(TableauX, TableauY);
  resolutionExpo(TableauX, TableauY);
});

// 70,90,115,140,170,220
