 let snumber;
const btn=document.querySelector(".btn");
btn.addEventListener("click",store)
function store(e)
{   e.preventDefault();
    snumber++
    let name=document.querySelector(".name").value;
let Mnumber=document.querySelector(".Mnumber").value;
 let address=document.querySelector(".address").value;

let obj= {
    name:name,
    Mnumber:Mnumber,
    address:address
}
 axios.post("https://crudcrud.com/api/a3099bc16cdd48c28d005704730808e6/student",obj)
 .then(res=> { console.log("displayed")
    display(res.data)
 })
 .catch(err=> console.log("error found"))
// console.log(Mnumber)
document.getElementById("Mnumber").value="";
document.getElementById("name").value="";
document.getElementById("address").value="";
}
 window.addEventListener("DOMContentLoaded",function() { 
    console.log("refresed")
    snumber=0
    axios.get("https://crudcrud.com/api/a3099bc16cdd48c28d005704730808e6/student")
    .then(res=> { 
        for(var i=0;i<res.data.length;i++)
        {    snumber++;
            display(res.data[i]);
        }
    })
    .catch(err=> console.log("failed to load due to error"))
 })
function display(obj)
{ let ul=document.getElementById("list");
ul.innerHTML+=`<li data-list=${obj.Mnumber} > Name: ${obj.name}, Mobile Number ${obj.Mnumber} address ${obj.address}
<Button onclick="editdetails('${obj.Mnumber}')">Edit </Button>
<Button onclick="closeDetails('${obj.Mnumber}')"> close</Button>
   </li>`
  const counter=document.getElementById("totalStudent").innerText=`Total enrolled student=${snumber}`
}
function closeDetails(Mno)
{   snumber=snumber-1;
    let item=document.querySelector(`li[data-list="${Mno}"]`)
    item.remove();

    axios.get("https://crudcrud.com/api/a3099bc16cdd48c28d005704730808e6/student")
  .then(res=> {
     let data;
    res.data.forEach((item)=>
    {  if(item.Mnumber==Mno)
   {
     data=item;
   }
    })  
    // console.log(data._id)
    axios.delete(`https://crudcrud.com/api/a3099bc16cdd48c28d005704730808e6/student/${data._id}`)
    .then(res=> console.log("data deleted"))
     .catch(err=> console.log("there is error in deletion"))
  })

}
function editdetails(Mno)
{   axios.get("https://crudcrud.com/api/a3099bc16cdd48c28d005704730808e6/student")
.then(res=> {
   let data;
  res.data.forEach((item)=>
  {  if(item.Mnumber==Mno)
 {
   data=item;
 }
  })  
  
  document.getElementById("Mnumber").value=data.Mnumber;
  document.getElementById("name").value=data.name;
  document.getElementById("address").value=data.address;
  closeDetails(data.Mnumber);
})


}