//========post requests========



function CreateNewpostclicked(){
  let postid = document.getElementById("post-id-input").value
  let isCreate = postid == null || postid == ""
  
  
  
  
   const title = document.getElementById("post-title-input").value
   const body = document.getElementById("post-body-input").value
   const image = document.getElementById("post-image-input").files[0]
  
   let fromData = new FormData()
     fromData.append("title", title)
     fromData.append("body", body)
     fromData.append("image", image)
   
   const params = {
   "title": title,
  "body": body,
   "image": image 
  }
  const url = ``
   
  if (isCreate == true  ){
      const url = `${baseurl}/posts`
      toggleloader(true)
      axios.post(url, fromData,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/from-data"
          }
         } ) 
          .then( (response) => {  
           
            const modal = document.getElementById("create-post-Modal");
                            const modalInstance = bootstrap.Modal.getInstance(modal);
                            modalInstance.hide();
                            
                            Showalert("success","success") 
                            getposts ()
          }).catch( (error)=>{
          const messageOfErrorOfNew = error.response.data.message;
         Showalert (messageOfErrorOfNew , "danger")
          console.log(error)
          }).finally(()=>{
            toggleloader(false)})
    
  
  }else {
      fromData.append("_method","put")
      const url = `${baseurl}/posts/${postid}`
      toggleloader(true)
      axios.post(url, fromData,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/from-data"
          }
         } ) 
          .then( (response) => {  
           
            const modal = document.getElementById("create-post-Modal");
                            const modalInstance = bootstrap.Modal.getInstance(modal);
                            modalInstance.hide();
                            
                            Showalert("success","success") 
                            getposts ()
          }).catch( (error)=>{
          const messageOfErrorOfNew = error.response.data.message;
         Showalert (messageOfErrorOfNew , "danger")
          console.log(error)
          }).finally(()=>{
            toggleloader(false)})
  }
  
  }


// edit post
function editPostBtnClicked(postObject) {

  let  post = JSON.parse(decodeURIComponent(postObject));
 // عرض الكائن في الكونسول للتأكد
 console.log(post);
 
 document.getElementById("post-id-input").value=post.id
  document.getElementById("PostModelTitle").innerHTML = "Edit post"
  document.getElementById("post-title-input").value = post.title
  document.getElementById("post-body-input").value = post.body
 // document.getElementById("post-image-input").files[0] = post.image
 document.getElementById("post-model-submit-btn").innerHTML = "Update"
 
  console.log(post);
 
 
  let postModal = new bootstrap.Modal(document.getElementById("create-post-Modal"), {});
  postModal.toggle();
  
 }
 
 
 // delete post
 function deletePostBtnClicked(postObject) {
 
   let  post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
 
  document.getElementById("delete-post-id-input").value = post.id;
   let postModal = new bootstrap.Modal(document.getElementById("delete-post-Modal"), {});
   postModal.toggle();
   
  }
  function confirmpostclicked(){
   let token  = localStorage.getItem("token")
   const postId = document.getElementById("delete-post-id-input").value 
   const url = `${baseurl}/posts/${postId}`
   toggleloader(true)
   axios.delete(url,{
     headers: {
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
       "Content-Type": "multipart/from-data"
     }
   }
   ) 
     .then( (response) => {
       console.log(response)
       const modal = document.getElementById("delete-post-Modal");
       const modalInstance = bootstrap.Modal.getInstance(modal);
       modalInstance.hide();
       
       Showalert("the post has been removed","success") 
       getposts ()
     }).finally(()=>{
        toggleloader(false)})
  }


//========== end of post requests================
function profileClicked(){ 
  const user = getcurrentuser()
  const userId =user.id
 window.location = `profile.html?userid=${userId}`

}

function setupUI(){
    let token = localStorage.getItem("token");
    const logged_div = document.getElementById("logged-div");
    const logoutbtn = document.getElementById("logout-div")
    const addbtn = document.getElementById("add-btn");
    let addcommentbtn = document.getElementById("add-comment-div");
    if (token == null) {

        if (addbtn !=null){
            addbtn.style.setProperty("display","none","important")

        }
        if (addcommentbtn != null) {
          addcommentbtn.style.setProperty("display", "none", "important");
      }
      
      logged_div.style.setProperty("display","flex","important") 
      logoutbtn.style.setProperty("display","none","important") 

  
  }else{
    if (addbtn !=null){
        addbtn.style.setProperty("display","block","important") 
    }
    if (addcommentbtn != null) {
      addcommentbtn.style.setProperty("display", "flex", "important");
  }
    
    logged_div.style.setProperty("display","none","important") 
    logoutbtn.style.setProperty("display","flex","important")

  
  //   const user = getcurrentuser()
  //   document.getElementById("Nav-Name").innerHTML = user.username
  //   document.getElementById("Nav-Image").src = user.profile_image
  // }
  // console.log("token:", token);
  // console.log( "add-comment-div:", addcommentbtn);
  
  

  const user = getcurrentuser();

  // التحقق من وجود الكائن user قبل الوصول إلى خصائصه
  if (user) {
      document.getElementById("Nav-Name").innerHTML = user.username || "Guest"; // استخدام قيمة افتراضية مثل "Guest" في حالة عدم وجود username
      document.getElementById("Nav-Image").src = user.profile_image || "default-image.png"; // صورة افتراضية إذا لم يكن هناك صورة
  } else {
      console.error("User object is null or undefined");
      // يمكن التعامل مع هذا السيناريو (مثل عرض رسالة خطأ أو استخدام قيم افتراضية)
      document.getElementById("Nav-Name").innerHTML = "Guest";
      document.getElementById("Nav-Image").src = "default-image.png";
  }
  
  // console.log("token:", token);
  // console.log("add-comment-div:", addcommentbtn);
  
}
//   authentication
}

function loginbtnClicked()
{
  const username = document.getElementById("username-input").value
  const password = document.getElementById("password-input").value
const params = {
  "username": username,
 "password": password
}
const url = `${baseurl}/login`
toggleloader(true)
axios.post(url, params) 
  .then( (response) => {
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("user", JSON.stringify(response.data.user))
   
   
    const modal = document.getElementById("login-Modal");
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();
                    
                    Showalert("success","success") 
                    setupUI()
  }).catch( (error)=>{
    const messageOfErrorOfNew = error.response.data.message;
   Showalert (messageOfErrorOfNew , "danger")
    console.log(error)
    }).finally(()=>{
    
    
    toggleloader(false)})
}

function registerbtnClicked() {



  const name = document.getElementById("register-name-input").value
  const username = document.getElementById("register-username-input").value
  const password = document.getElementById("register-password-input").value
  const image = document.getElementById("register-image-input").files[0]
  console.log(name, username, password)


  let formData = new FormData();
formData.append("username", username);
formData.append("name", name);
formData.append("password", password);
formData.append("image", image);

  

const url = `${baseurl}/register`
axios.post(url, formData,
  // headers: {
  //   "Authorization": `Bearer ${localStorage.getItem("token")}`,
    
  // }
)
  .then( (response) => {
    console.log(response.data)
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("user", JSON.stringify(response.data.user))
   
   
    const modal = document.getElementById("register-Modal");
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();
                    
                    Showalert("New registration", "success");

                    setupUI()
  }).catch( (error)=>{
  const messageOfError = error.response.data.message;
Showalert (messageOfError , "danger")
  console.log(error)
} ).finally(()=>{
  toggleloader(false)})
}

function logout (){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
    // location.reload();

  setupUI()
  Showalert("You have logged out" , "success") 
 
}

function Showalert(customMessage,type) {

  const alertPlaceholder = document.getElementById('success-alert')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
appendAlert(customMessage, type)
 
//todo: hideallert
// setTimeout(() => {
//   const AlertToHide = bootstrap.Alert.getOrCreateInstance('#success-alert')
// AlertToHide.close()
// }, 3000);




}




function getcurrentuser(){
let user = null
const storageUser = localStorage.getItem("user")
 if (storageUser != null) {
    user = JSON.parse(storageUser);
  }
  return user

}


function toggleloader(show = true){
  if(show){
  document.getElementById("loader").style.visibility="visible"
  }
   else{
  document.getElementById("loader").style.visibility="hidden"
   }
  
   }