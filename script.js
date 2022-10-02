

// load = 215;
// yield_str =166;
// fos =2.5;
// crush_str =166;
// shear_str =83;


let load =document.getElementById('load');
let yield_str =document.getElementById('yield_str');
let fos =document.getElementById('fos');
let crush_str =document.getElementById('crush_str');
let shear_str =document.getElementById('shear_str');
let result=document.getElementById("result");
let load_value,fos_value,yield_str_value,shear_str_value,crush_str_value;
//Reload Function

load.onchange = function () {
    function changefunction() {
        load_value = load.value;
    }
    changefunction();
}

fos.onchange = function () {
    function changefunction() {
        fos_value = fos.value;
    }
    changefunction();
}

yield_str.onchange = function () {
    function changefunction() {
        yield_str_value = yield_str.value;
    }
    changefunction();
}

crush_str.onchange = function () {
    function changefunction() {
        crush_str_value = crush_str.value;
    }
    changefunction();
}

shear_str.onchange = function () {
    function changefunction() {
        shear_str_value = shear_str.value;
    }
    changefunction();
}


// 1. Failure of rod in tension

function dCalc(load,yield_str) {
    
    d= Math.pow((4*load*1000)/(Math.PI*yield_str),1/2);
    return d;
}
// 2. Knuckle pin failure in double shear

function d1Calc(load,shear_str) {
    
    d1= Math.pow((2*load*1000)/(Math.PI*shear_str),1/2);
    return d1;
}

// 3. Failure of rod eye in crushing

function tCalc(load,crush_str,d1) {
    
    t= load*1000/(d1*crush_str)

    return t;
}

// 4. FAilure of knuckle pin Bending 

function bendingStress(load,t,t1,d1) {
    sigma_b=(16*load*1000*((t1/3)+(t/4)))/(Math.Pi*Math.pow(d1,3))
    return sigma_b;
}

// 5. Failure of rod eye in shearing
function d2Calc(d1,load,t,shear_str) {
    d2= d1 + (load*1000/(t*shear_str));
    //  console.log("d2:" +d2)
    return d2;
}

// 6.  Failure of rod in tension

function d2Calc2(d1,load,t,yield_str) {
    d2_= d1 + (load*1000/(t*yield_str));
    // console.log("d2:" +d2)
    return d2_;

}



function evaluate() {
// console.log("TEst");
    // Solutions 
 d = dCalc(load_value,yield_str_value);

 d1= d1Calc(load_value,shear_str_value)

 t=tCalc(load_value,crush_str_value,d1);

 t1=0.75*t;
 t2= 0.5 *t;

 sigma_b= bendingStress(load_value,t,t1,d1)

 console.log( sigma_b<yield_str_value? "Design is Safe": "Design is not safe");

//  d2= (d2Calc(d1,load,t,shear_str) >  d2Calc(d1,load,t,yield_str) ) ? d2Calc(d1,load,t,shear_str) :d2Calc(d1,load,t,yield_str) ;
d2= d2Calc(d1,load_value,t,shear_str_value);
d2_= d2Calc2(d1,load_value,t,yield_str_value);
// console.log(d2,d2_)

if(d2>d2_){
    d2=d2;
}
if(d2<d2_){
    d2=d2_;
}

d3= 1.5* d;


console.log(d)
console.log(d1)
console.log(d2)
// console.log(d2_)
console.log(d3)
console.log(t)
console.log(t1)
console.log(t2)

ans=result.querySelectorAll(".ans");
// console.log(ans)
ans[0].innerHTML=d;
ans[1].innerHTML=d1;
ans[2].innerHTML=d2;
ans[3].innerHTML=d3;
ans[4].innerHTML=t;
ans[5].innerHTML=t1;
ans[6].innerHTML=t2;

}

// evaluate()

const btn= document.getElementById('btn')

btn.addEventListener("click",evaluate)