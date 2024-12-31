setupUI()

getusers ()
function getusersid () {
const urlParams =new URLSearchParams(window.location.search);
console.log(urlParams);
const id = urlParams.get("userid")
console.log(id) 
return id;

}

function getusers(){


const id = getusersid()
axios.get(`${baseurl}/users/${id}`)
 .then( (response) => {
  
const user = response.data.data
document.getElementById("p-email").innerHTML = user.email
 document.getElementById("p-name").innerHTML = user.name
 document.getElementById("p-username").innerHTML = user.username
 document.getElementById("p-image").src = user.profile_image
 document.getElementById("p-name").innerHTML = `${user.username}'s` 
 //posts and comments
 document.getElementById("profile-posts-count").innerHTML = user.posts_count
 document.getElementById("profile-comments-count").innerHTML = user.comments_count

 });

 }

 getposts ()
function getposts () {

    const id = getusersid()
axios.get(`${baseurl}/users/${id}/posts`)
 .then( (response) => {
   const posts = response.data.data
document.getElementById("user-posts").innerHTML = " "

 for (post of posts){
   const author = post.author
   let posttitle = ""

   //show or hide (edit) button  
   let user = getcurrentuser ()
   let isMypost = user != null && post.author.id == user.id
    let editBtnContent =``
    if (isMypost){
        editBtnContent = `
        <button class='btn btn-outline-danger' style='margin-left:5px; float:right' onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>   

        <button class='btn btn-outline-primary' style='float: right' onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>   ` 
 
    }


   if (post.title !=null){
     posttitle = post.title

   }

   let content = `
   <div class="d-flex justify-content-center mt-4">
       <div class="col-9"> 
     <div class="card shadow" >
       <div class="card-header">
      <img class="rounded-circle border border-2 " src="${author.profile_image}" style="height: 40px;width: 40px;">
      <b>${author.username}</b> 
      ${editBtnContent}
       </div>
       <div class="card-body" onclick="postclicked(${post.id})" style="cursor:pointer"> 
           <img class="w-100"  src="${post.image}" alt="">
           <h6 style="color: rgb(154, 152, 152);">
              ${post.created_at}
           </h6>
         <h5 class="card-title">  ${posttitle}</h5>
         <p>${post.body}</p>
         <hr>
         <div>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
               <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
             </svg>
           <span>
               ${post.comments_count}

               <span id="post-tags">
                 <button class="btn btn-sm rounded-5" background-color:gray; color:white; >
                 policy
                   </Button>
                   <button class="btn btn-sm rounded-5" background-color:gray; color:white; >
                 policy
                   </Button>
                 </span>

           </span>

         </div>
       </div>
     </div>
   `

   const tagsHtml = post.tags.map((tag) => `<span class="badge bg-secondary mx-1">${tag.arabic_name}</span>`).join(" ");

let content1 = `
   <div class="d-flex justify-content-center mt-4">
       <div class="col-9"> 
           <div class="card shadow">
               <div class="card-header">
                   <img class="rounded-circle border border-2" src="${author.profile_image}" style="height: 40px; width: 40px;">
                   <b>${author.username}</b>
               </div>
               <div class="card-body"> 
                   <img class="w-100" src="${post.image}" alt="">
                   <h6 style="color: rgb(154, 152, 152);">
                       ${post.created_at}
                   </h6>
                   <h5 class="card-title">${posttitle}</h5>
                   <p>${post.body}</p>
                   <hr>
               </div>
           </div>
       </div>
   </div>`;


   document.getElementById("user-posts").innerHTML += content
   // طريقة المدرس ف الtags
 //   const currentposTagsId = `post-tags-${post.id}`
 //   document.getElementById(currentposTagsId).innerHTML += ""
 //   for (tag of post.tags) {
 //     console.log(tag)
 //       let content =
 //      ` <button class="btn btn-sm rounded-5 background-color:gray; color:white;">
                 
 //         ${tag.name}
                 
 //               </Button>
 //               `
 //                document.getElementById(currentposTagsId).innerHTML += content
 //   }
 }
  })

 }