document.getElementById("save").onclick = function() {
save()
};

document.getElementById("restore").onclick = function() {
restore()
};


function restore(){

var input = document.getElementById("input");
var work = localStorage.getItem('work');
console.log(work);

input.value = work;
codeupdate();


}


function save(){

var input = document.getElementById("input");

localStorage.setItem('work', input.value);
  
}
